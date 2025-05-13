
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Link } from 'react-router-dom';

// Mock resource data
const educationalLinks = [
  {
    id: 1,
    title: "MDN Web Docs",
    description: "Comprehensive documentation for web developers.",
    url: "https://developer.mozilla.org/",
    category: "Web Development"
  },
  {
    id: 2,
    title: "FreeCodeCamp",
    description: "Learn to code with free courses, projects, and certifications.",
    url: "https://www.freecodecamp.org/",
    category: "Learning Platform"
  },
  {
    id: 3,
    title: "Khan Academy",
    description: "Free education in mathematics, sciences, and more.",
    url: "https://www.khanacademy.org/",
    category: "General Education"
  },
  {
    id: 4,
    title: "Coursera",
    description: "Online courses from top universities and companies.",
    url: "https://www.coursera.org/",
    category: "Online Courses"
  }
];

const pdfs = [
  {
    id: 1,
    title: "JavaScript Fundamentals Cheatsheet",
    description: "A quick reference guide for JavaScript basics.",
    fileSize: "1.2 MB",
    category: "Programming"
  },
  {
    id: 2,
    title: "Effective Learning Strategies",
    description: "Research-backed methods to improve learning outcomes.",
    fileSize: "0.8 MB",
    category: "Education"
  },
  {
    id: 3,
    title: "CSS Grid Layout Guide",
    description: "Comprehensive guide to using CSS Grid for layouts.",
    fileSize: "2.4 MB",
    category: "Web Development"
  },
  {
    id: 4,
    title: "Design Principles Handbook",
    description: "Core design principles and their application in digital products.",
    fileSize: "3.7 MB",
    category: "Design"
  }
];

const Resources = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <h1>Resources</h1>
        <p className="text-xl mb-10 text-muted-foreground">
          A curated collection of educational materials and references.
        </p>
        
        <section className="mb-16">
          <h2>Educational Links</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {educationalLinks.map(resource => (
              <div key={resource.id} className="border rounded-lg p-5">
                <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-full">
                  {resource.category}
                </span>
                <h3 className="text-xl mt-2 mb-2">{resource.title}</h3>
                <p className="text-muted-foreground mb-4">{resource.description}</p>
                <a 
                  href={resource.url}
                  className="text-sm font-medium inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit website →
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2>Educational PDFs</h2>
          <div className="space-y-4 mt-6">
            {pdfs.map(pdf => (
              <div key={pdf.id} className="border rounded-lg p-5 flex justify-between items-center">
                <div>
                  <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-muted rounded-full">
                    {pdf.category}
                  </span>
                  <h3 className="text-xl mt-2 mb-1">{pdf.title}</h3>
                  <p className="text-muted-foreground">{pdf.description}</p>
                  <span className="text-xs text-muted-foreground mt-1 block">Size: {pdf.fileSize}</span>
                </div>
                <div>
                  <button 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
                    onClick={() => alert(`This would download ${pdf.title} in a real app`)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Resources;
