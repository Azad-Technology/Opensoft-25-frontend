import React, { useEffect } from "react";
import Navbar from "../../components/sections/Navbar/Navbar";
import content from "./BlogContent";
import { Link } from "react-router-dom";

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }, []);

  return (
    <>
      <div className="p-4 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white" />
        <Navbar />
        <main className="mt-16 flex-grow mb-4">
          <hr className="mb-6 mt-[60px]" />
          <h1 className="text-5xl font-bold mb-4 text-gray-900 text-center mb-10">Blog Series</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.map((blog,index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md border bg-gradient-to-br from-white to-green-100/50 transition-all hover:shadow-lg border-green-200 hover:border-green-400">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{blog.title}</h3>
                    <p className="text-gray-600 mb-4">{blog.snippet}</p>
                    <Link 
                      to={`/blog/${blog.id}`}
                      className="flex items-center font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read More 
                      <svg className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div> 
        </main>
      </div>
      <footer className="bg-black pb-8 border-t border-white/10">
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Deloitte. All rights reserved.
            </p>
          </div>
      </footer>
    </>
  );
};

export default BlogPage;