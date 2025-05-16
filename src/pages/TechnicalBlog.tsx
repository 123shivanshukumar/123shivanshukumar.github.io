import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Clock, ExternalLink } from 'lucide-react';
import { marked } from 'marked';

// Mock blog post metadata (same as before)
export const technicalPostsMetadata = [{
    id: "Hyperplonk",
    title: "Hyperplonk IOP - avoiding FFTs",
    excerpt: "In this blog I will discuss about an amazing improvement over the Plonk IOP, for proving circuits",
    date: "2024-05-16",
    readTime: "5 minute read",
    category: "Blockchains and Zero Knowledge Proofs"
  }];

interface PostMetadata {
  id: string;
  title?: string;
  excerpt?: string;
  date?: string;
  readTime?: string;
  category?: string;
}

interface BlogPost extends PostMetadata {
  content?: string;
}

const TechnicalBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostContents = async () => {
      try {
        // Try to load Markdown files directly from the file system
        const loadedPosts = technicalPostsMetadata.map(post => ({
          ...post,
          content: '' // We don't need content for the list view
        }));
        
        setPosts(loadedPosts);
      } catch (error) {
        console.error("Error loading blog post contents:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPostContents();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-container">
          <p>Loading blog posts...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="page-container">
        <div className="mb-10">
          <Link to="/blog/technical" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to all blogs
          </Link>
          <h1 className="mt-4">Technical Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, experiences, and Technical reflections.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p>No blog posts found. Add some markdown files to your content directory!</p>
          </div>
        ) : (
          <div className="space-y-12">
            {posts.map(post => (
              <article key={post.id} id={`${post.id}`} className="border-b border-terminal-gray/20 pb-10">
                <div className="blog-meta">
                  {post.readTime && <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>}
                  {post.date && <span>{post.readTime && <span className="mx-2">•</span>} Published: {post.date}</span>}
                  {post.category && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Category: {post.category}</span>
                    </>
                  )}
                </div>
                <h2 className="blog-title">
                  <span className="blog-title-prefix">##</span>
                  <Link to={`/blog/technical/${post.id}`} className="blog-title-text hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt && <p className="text-lg mb-4">{post.excerpt}</p>}
                {/* Removed the conditional rendering for full content and the "Read More" button */}
              </article>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TechnicalBlog;
