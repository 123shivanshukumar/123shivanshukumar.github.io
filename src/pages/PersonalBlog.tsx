import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Clock, ExternalLink } from 'lucide-react';
import { marked } from 'marked';

// Mock blog post metadata (same as before)
export const personalPostsMetadata = [{
    id: "1",
    title: "Rebooting",
    excerpt: "Exploring the impact of daily meditation and mindfulness practices.",
    date: "2023-05-10",
    readTime: "4 minute read",
    category: "Personal Growth"
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

const PersonalBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPostContents = async () => {
      try {
        const postsWithContent = await Promise.all(
          personalPostsMetadata.map(async (postMetadata) => {
            try {
              const markdownModule = await import(`../content/blog/${postMetadata.id}.md?raw`);
              const content = marked(markdownModule.default);
              return { ...postMetadata, content };
            } catch (error) {
              console.error(`Error loading content for post ${postMetadata.id}:`, error);
              return { ...postMetadata, content: '' };
            }
          })
        );
        setPosts(postsWithContent);
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
          <Link to="/blog/personal" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to all blogs
          </Link>
          <h1 className="mt-4">Personal Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, experiences, and personal reflections.
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
                  <Link to={`/blog/personal/${post.id}`} className="blog-title-text hover:underline">
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

export default PersonalBlog;
