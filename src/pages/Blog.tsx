import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { Clock, ExternalLink } from 'lucide-react';

// Mock blog post data
const personalPosts = [
  {
    id: 1,
    title: "Shortcodes Demos",
    excerpt: "radion comes with some handy shortcodes to make your life easier and your posts more exciting.",
    date: "2017-09-24",
    readTime: "1 minute read",
    category: "Personal Growth"
  },
  {
    id: 2,
    title: "My Journey Through Southeast Asia",
    excerpt: "Chronicles and insights from six months of travel across Thailand, Vietnam, and Indonesia.",
    date: "2023-01-03",
    readTime: "5 minute read",
    category: "Travel"
  }
];

const technicalPosts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    excerpt: "A deep dive into the most useful React hooks and when to use them.",
    date: "2023-04-25",
    readTime: "3 minute read",
    category: "Web Development"
  },
  {
    id: 2,
    title: "The Power of CSS Grid",
    excerpt: "How to leverage CSS Grid for complex layouts with minimal code.",
    date: "2023-02-12",
    readTime: "2 minute read",
    category: "CSS"
  }
];

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search')?.toLowerCase();

  // If user navigates directly to /blog with no search query, show the categories
  useEffect(() => {
    if (!searchQuery && location.pathname === '/blog') {
      // We'll keep this page as a categories overview
      console.log('Blog categories overview');
    }
  }, [searchQuery, location.pathname]);

  // Filter posts based on search query if present
  const filteredPersonalPosts = searchQuery 
    ? personalPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery) || 
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery)
      )
    : [];

  const filteredTechnicalPosts = searchQuery 
    ? technicalPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery) || 
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.category.toLowerCase().includes(searchQuery)
      )
    : [];
    
  return (
    <MainLayout>
      <div className="page-container">
        {searchQuery ? (
          // Show search results
          <div>
            <h2 className="text-2xl mb-6">Search results for: "{searchQuery}"</h2>
            
            {(filteredPersonalPosts.length > 0 || filteredTechnicalPosts.length > 0) ? (
              <div className="space-y-10">
                {filteredPersonalPosts.map(post => (
                  <article key={post.id} className="pb-6 border-b border-terminal-gray/20">
                    <h2 className="blog-title">
                      <span className="blog-title-prefix">##</span> 
                      <Link to={`/blog/personal#${post.id}`} className="blog-title-text">
                        {post.title}
                      </Link>
                    </h2>
                    <div className="blog-meta">
                      <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>Published: {post.date}</span>
                    </div>
                    <p className="mb-4 text-foreground">{post.excerpt}</p>
                    <Link to={`/blog/personal#${post.id}`} className="blog-readmore">
                      Read More <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </article>
                ))}
                
                {filteredTechnicalPosts.map(post => (
                  <article key={post.id} className="pb-6 border-b border-terminal-gray/20">
                    <h2 className="blog-title">
                      <span className="blog-title-prefix">##</span> 
                      <Link to={`/blog/technical#${post.id}`} className="blog-title-text">
                        {post.title}
                      </Link>
                    </h2>
                    <div className="blog-meta">
                      <span className="flex items-center"><Clock size={14} className="mr-1" /> {post.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>Published: {post.date}</span>
                    </div>
                    <p className="mb-4 text-foreground">{post.excerpt}</p>
                    <Link to={`/blog/technical#${post.id}`} className="blog-readmore">
                      Read More <ExternalLink size={14} className="ml-1" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <p>No posts found matching your search.</p>
            )}
          </div>
        ) : (
          // Show blog categories
          <div>
            <h1 className="text-3xl mb-8">Blog Categories</h1>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-terminal-gray/20 p-6 rounded-md hover:border-pink transition-colors">
                <h2 className="text-2xl mb-4 text-pink">Personal Blog</h2>
                <p className="mb-6">Thoughts, experiences, and personal reflections.</p>
                <Link to="/blog/personal" className="blog-readmore">
                  View Personal Posts <ExternalLink size={14} className="ml-1" />
                </Link>
              </div>
              <div className="border border-terminal-gray/20 p-6 rounded-md hover:border-orange transition-colors">
                <h2 className="text-2xl mb-4 text-orange">Technical Blog</h2>
                <p className="mb-6">Deep dives into code, development concepts, and technical solutions.</p>
                <Link to="/blog/technical" className="blog-readmore">
                  View Technical Posts <ExternalLink size={14} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Blog;
