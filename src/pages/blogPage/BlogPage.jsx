import React, { useEffect } from "react";
import Navbar from "../../components/sections/Navbar/Navbar";
import content from "./BlogContent";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowBigLeft } from "lucide-react";

const BlogPage = () => {
  const { user } = useAuth();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <div className="p-4 relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-white" />
        <Navbar />
        <main className="mt-16 flex-grow mb-4">
          <hr className="mb-6 mt-[60px]" />
          
          {/* Improved responsive header section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-0">
              Blog Series
            </h1>
            
            {user !== null && (
              <Link
                to={
                  user?.role_type === "hr"
                    ? "/admin/dashboard"
                    : "/employee/dashboard"
                }
                className="flex items-center text-base sm:text-lg hover:text-primary transition-colors"
              >
                <ArrowBigLeft className="h-4 w-4 mr-1" />
                return to dashboard
              </Link>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((blog) => (
              <Link
                to={`/blog/${blog.id}`}
                key={blog.id}
                className="rounded-lg overflow-hidden shadow-md border bg-gradient-to-br from-white to-green-100/50 transition-all hover:shadow-lg border-green-200 hover:border-green-400 hover:no-underline"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{blog.snippet}</p>
                  <div className="flex items-center font-medium text-primary hover:text-primary/80 transition-colors">
                    Read More
                    <svg
                      className="h-4 w-4 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <footer className="bg-black pb-8 border-t border-white/10">
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} MINDFLIX. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default BlogPage;