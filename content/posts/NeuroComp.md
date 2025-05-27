+++
title = "Introduction to Neuromorphic Computing"
date = "2024-05-21"
[taxonomies] tags=["systems"]
+++

# Background
// back with some data -- motivatoin to read mroe SNN papers
-- concepts of in memory computing and neuromorphic computing 

Introduction to SNNs
- https://cnvrg.io/spiking-neural-networks/#elementor-toc__heading-anchor-1
- FPGA impl of SNN: https://arxiv.org/pdf/2010.01200

# Bibliography

# See also


-- hardware for the LLMS part -- go into the algorithmic side -- what exaclty he has done 
-- compare pranava wrok with the AAAI paper -- optimise the model
-- TA work in the next sem 


Yes, PyTorch provides several built-in tools specifically designed for memory profiling and benchmarking. Here are the most useful ones for your use case:

## PyTorch Profiler (Recommended)

The PyTorch Profiler is the most comprehensive tool, offering detailed memory and performance analysis:

```python
import torch
from torch.profiler import profile, record_function, ProfilerActivity

def benchmark_with_pytorch_profiler(model, inputs):
    with profile(
        activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
        record_shapes=True,
        profile_memory=True,
        with_stack=True
    ) as prof:
        with record_function("model_inference"):
            outputs = model(**inputs)
    
    # Export detailed results
    prof.export_chrome_trace("trace.json")  # View in chrome://tracing
    prof.export_stacks("/tmp/profiler_stacks.txt", "self_cuda_memory_usage")
    
    # Print memory summary
    print(prof.key_averages().table(sort_by="cuda_memory_usage", row_limit=10))
    
    return prof
```

## torch.cuda Memory Profiling

For GPU memory analysis:

```python
import torch

class CUDAMemoryProfiler:
    def __init__(self):
        if torch.cuda.is_available():
            torch.cuda.reset_peak_memory_stats()
    
    def get_memory_stats(self):
        if not torch.cuda.is_available():
            return {}
        
        return {
            'allocated': torch.cuda.memory_allocated() / 1024**2,  # MB
            'cached': torch.cuda.memory_reserved() / 1024**2,     # MB
            'max_allocated': torch.cuda.max_memory_allocated() / 1024**2,
            'max_cached': torch.cuda.max_memory_reserved() / 1024**2
        }
    
    def memory_summary(self):
        if torch.cuda.is_available():
            return torch.cuda.memory_summary()
        return "CUDA not available"

# Usage
profiler = CUDAMemoryProfiler()

# Before model loading
initial_stats = profiler.get_memory_stats()

# Load and run model
model = load_model()
outputs = model(inputs)

# After inference
final_stats = profiler.get_memory_stats()
print(f"Memory used: {final_stats['allocated'] - initial_stats['allocated']:.2f} MB")
```

## torch.utils.benchmark

PyTorch's benchmarking utility for systematic performance testing:

```python
import torch.utils.benchmark as benchmark

def benchmark_memory_usage(model, inputs, num_runs=100):
    def run_inference():
        return model(**inputs)
    
    # CPU benchmark
    cpu_timer = benchmark.Timer(
        stmt='run_inference()',
        setup='import torch',
        globals={'run_inference': run_inference}
    )
    
    # GPU benchmark with memory tracking
    if torch.cuda.is_available():
        def gpu_inference():
            torch.cuda.synchronize()
            initial_mem = torch.cuda.memory_allocated()
            result = model(**inputs)
            torch.cuda.synchronize()
            final_mem = torch.cuda.memory_allocated()
            return result, final_mem - initial_mem
        
        gpu_timer = benchmark.Timer(
            stmt='gpu_inference()',
            globals={'gpu_inference': gpu_inference}
        )
        
        gpu_results = gpu_timer.timeit(num_runs)
        print(f"GPU timing: {gpu_results}")
    
    cpu_results = cpu_timer.timeit(num_runs)
    print(f"CPU timing: {cpu_results}")
    
    return cpu_results, gpu_results if torch.cuda.is_available() else None
```

## Custom Memory Tracker Context Manager

A PyTorch-native memory tracking context:

```python
import torch
from contextlib import contextmanager

@contextmanager
def memory_tracker(device='cuda'):
    """Context manager to track memory usage"""
    if device == 'cuda' and torch.cuda.is_available():
        torch.cuda.reset_peak_memory_stats()
        torch.cuda.synchronize()
        start_mem = torch.cuda.memory_allocated()
        
        yield
        
        torch.cuda.synchronize()
        end_mem = torch.cuda.memory_allocated()
        peak_mem = torch.cuda.max_memory_allocated()
        
        print(f"Memory used: {(end_mem - start_mem) / 1024**2:.2f} MB")
        print(f"Peak memory: {peak_mem / 1024**2:.2f} MB")
    else:
        yield

# Usage
with memory_tracker():
    model = load_model()
    outputs = model(inputs)
```

## Model Memory Analysis Tool

For detailed model architecture memory analysis:

```python
import torch
import torch.nn as nn

def analyze_model_memory(model, input_shape):
    """Analyze memory usage of each layer"""
    def get_model_size(model):
        param_size = 0
        buffer_size = 0
        
        for param in model.parameters():
            param_size += param.nelement() * param.element_size()
        
        for buffer in model.buffers():
            buffer_size += buffer.nelement() * buffer.element_size()
        
        return param_size, buffer_size
    
    # Model parameters memory
    param_size, buffer_size = get_model_size(model)
    model_size_mb = (param_size + buffer_size) / 1024**2
    
    # Activation memory estimation
    dummy_input = torch.randn(*input_shape)
    hooks = []
    activations_memory = 0
    
    def hook_fn(module, input, output):
        nonlocal activations_memory
        if isinstance(output, torch.Tensor):
            activations_memory += output.nelement() * output.element_size()
        elif isinstance(output, (list, tuple)):
            for o in output:
                if isinstance(o, torch.Tensor):
                    activations_memory += o.nelement() * o.element_size()
    
    # Register hooks
    for name, module in model.named_modules():
        if len(list(module.children())) == 0:  # leaf modules
            hooks.append(module.register_forward_hook(hook_fn))
    
    # Forward pass to calculate activations
    with torch.no_grad():
        _ = model(dummy_input)
    
    # Clean up hooks
    for hook in hooks:
        hook.remove()
    
    activations_mb = activations_memory / 1024**2
    
    return {
        'model_size_mb': model_size_mb,
        'activations_mb': activations_mb,
        'total_mb': model_size_mb + activations_mb,
        'parameters': sum(p.numel() for p in model.parameters())
    }
```

## Comprehensive Benchmark Script

Combining all PyTorch tools:

```python
def comprehensive_pytorch_benchmark(original_model, modified_model, test_inputs):
    results = {}
    
    for name, model in [("original", original_model), ("modified", modified_model)]:
        print(f"\n=== Benchmarking {name} model ===")
        
        # 1. PyTorch Profiler
        with profile(activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
                    profile_memory=True, record_shapes=True) as prof:
            with record_function(f"{name}_inference"):
                for inputs in test_inputs:
                    _ = model(**inputs)
        
        # 2. Memory analysis
        memory_stats = analyze_model_memory(model, test_inputs[0]['input_ids'].shape)
        
        # 3. CUDA memory tracking
        cuda_profiler = CUDAMemoryProfiler()
        with memory_tracker():
            for inputs in test_inputs:
                _ = model(**inputs)
        
        # 4. Benchmark timing
        timing_results = benchmark_memory_usage(model, test_inputs[0])
        
        results[name] = {
            'profiler': prof,
            'memory_analysis': memory_stats,
            'cuda_stats': cuda_profiler.get_memory_stats(),
            'timing': timing_results
        }
    
    return results
```

## TensorBoard Integration

For visualization:

```python
from torch.utils.tensorboard import SummaryWriter

def log_memory_comparison(results, log_dir="./logs"):
    writer = SummaryWriter(log_dir)
    
    for model_name, stats in results.items():
        writer.add_scalar(f'Memory/ModelSize_{model_name}', 
                         stats['memory_analysis']['model_size_mb'])
        writer.add_scalar(f'Memory/Activations_{model_name}', 
                         stats['memory_analysis']['activations_mb'])
        writer.add_scalar(f'Memory/Total_{model_name}', 
                         stats['memory_analysis']['total_mb'])
    
    writer.close()
```

These PyTorch-native tools provide more accurate and detailed memory profiling than external tools, especially for GPU memory usage and layer-by-layer analysis. The PyTorch Profiler is particularly powerful for understanding exactly where memory is being used in your weight-shared model.
