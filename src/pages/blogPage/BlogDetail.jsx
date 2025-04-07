import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/sections/Navbar/Navbar";
import content from "./BlogContent";
import "./blogDetail.css";

const BlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const blog = content.find((blog) => blog.id === blogId);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    })
  }, []);

  return (
    <>
      <div className="relative flex flex-col min-h-screen bg-white p-4">
        <main className="absolute inset-0 -z-10 flex-grow bg-gradient-to-b from-green-50/50 to-white" />
          <Navbar />
          <article className="blog-article">
            <hr className="mb-6" />
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-primary">
                {blog.title}
              </h1>
              <Link to="/blog" className="inline-flex text-lg items-center text-gray-600 hover:text-primary transition-colors pb-6 pr-4">
                <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Back
              </Link>
            </div>

            <div className="key-takeaways">
              <h3>Key Takeaways</h3>
              <ul>
                {blog.keyTakeaways.map((takeaway, index) => (
                  <li key={index}>{takeaway}</li>
                ))}
              </ul>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }} />

            <div className="reflection-questions">
              <h3>Reflection Questions</h3>
              <ul>
                {blog.reflectionQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>

            {blog.actionSteps && (
              <div className="action-steps">
                <h3>Action Steps</h3>
                <ol>
                  {blog.actionSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {blog.resources && (
              <div className="resources">
                <h3>Additional Resources</h3>
                <ul>
                  {blog.resources.map((resource, index) => (
                    <li key={index}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title}
                      </a>
                      {resource.description && <p className="resource-description">{resource.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
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