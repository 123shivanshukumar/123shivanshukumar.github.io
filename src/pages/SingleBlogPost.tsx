// src/pages/SingleBlogPost.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { marked } from 'marked';
import { personalPostsMetadata } from './PersonalBlog'; // Add this line

interface BlogPost {
  id: string;
  title?: string;
  date?: string;
  readTime?: string;
  category?: string;
  content?: string;
}

const SingleBlogPost = () => {
  const { id } = useParams<{ id: string }>(); // Get the 'id' from the URL params
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPostContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming your 'id' in the URL matches the 'id' in your metadata
        const postMetadata = personalPostsMetadata.find(p => p.id === id);
        console.log("SingleBlogPost: postMetadata after find:", postMetadata); // Add this line

        if (postMetadata) {
          try {
            const markdownModule = await import(`../content/blog/${postMetadata.id}.md?raw`);
            const content = marked(markdownModule.default);
            setPost({ ...postMetadata, content });
          } catch (mdError) {
            console.error(`Error loading content for post ${id}:`, mdError);
            setError("Failed to load blog post content.");
          }
        } else {
          setError(`Blog post with ID ${id} not found.`);
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    loadPostContent();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="page-container">
          <p>Loading blog post...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="page-container">
          <p className="text-red-500">{error || 'Blog post not found.'}</p>
          <Link to="/blog/personal" className="text-sm text-muted-foreground hover:text-foreground mt-4 inline-block">
            ← Back to all blogs
          </Link>
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
          <h1 className="mt-4">{post.title}</h1>
          {post.date && <p className="text-sm text-muted-foreground">Published: {post.date}</p>}
        </div>
        {post.content && (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </div>
    </MainLayout>
  );
};

export default SingleBlogPost;
