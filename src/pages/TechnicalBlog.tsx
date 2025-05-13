
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Clock, ExternalLink } from 'lucide-react';

// Mock blog post data
const technicalPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    excerpt: "A deep dive into the most useful React hooks and when to use them.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-04-25",
    readTime: "3 minute read",
    category: "Web Development"
  },
  {
    id: 2,
    title: "The Power of CSS Grid",
    excerpt: "How to leverage CSS Grid for complex layouts with minimal code.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-02-12",
    readTime: "2 minute read",
    category: "CSS"
  },
  {
    id: 3,
    title: "Introduction to TypeScript",
    excerpt: "Getting started with TypeScript and its benefits over plain JavaScript.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-03-05",
    readTime: "3 minute read",
    category: "TypeScript"
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    excerpt: "Techniques and best practices to make your React applications faster.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "2023-04-02",
    readTime: "4 minute read",
    category: "React"
  }
];

const TechnicalBlog = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <div className="mb-10">
          <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to all blogs
          </Link>
          <h1 className="mt-4">Technical Blog</h1>
          <p className="text-xl text-muted-foreground">
            Deep dives into code, development concepts, and technical solutions.
          </p>
        </div>
        
        <div className="space-y-12">
          {technicalPosts.map(post => (
            <article key={post.id} id={`${post.id}`} className="border-b border-terminal-gray/20 pb-10">
              <div className="blog-meta">
                <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
                <span className="mx-2">•</span>
                <span>Published: {post.date}</span>
              </div>
              <h2 className="blog-title">
                <span className="blog-title-prefix">##</span> 
                <span className="blog-title-text">{post.title}</span>
              </h2>
              <p className="text-lg mb-4">{post.excerpt}</p>
              <div className="prose max-w-none">
                <p>{post.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default TechnicalBlog;
