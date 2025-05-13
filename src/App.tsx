import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import PersonalBlog from "./pages/PersonalBlog";
import TechnicalBlog from "./pages/TechnicalBlog";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import SingleBlogPost from "./pages/SingleBlogPost"; // Import the new component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/personal" element={<PersonalBlog />} />
          <Route path="/blog/personal/:id" element={<SingleBlogPost />} /> {/* Add this route */}
          <Route path="/blog/technical" element={<TechnicalBlog />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
