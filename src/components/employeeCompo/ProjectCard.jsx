import React from 'react';
import { motion } from 'framer-motion';

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

const statusColors = {
  'not-started': 'bg-gray-500',
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
};

export const ProjectCard = ({ project }) => {
  if (!project) return null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {project.name || 'Untitled Project'}
        </h3>
        <span
          className={`px-2 py-1 text-xs font-medium text-white rounded-full ${
            priorityColors[project.priority] || 'bg-green-400'
          }`}
        >
          {project.priority ? (project.priority.charAt(0).toUpperCase() + project.priority.slice(1)) : "Medium"}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.assignees && project.assignees.length > 0 ? (
            project.assignees.map((assignee) => (
              <span
                key={assignee}
                className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full text-sm text-gray-700 dark:text-gray-300"
              >
                {assignee}
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">No assignees</span>
          )}
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
            <span className="text-sm text-gray-700 dark:text-gray-300">{project.progress || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress || 0}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-2 rounded-full ${statusColors[project.status] || 'bg-gray-400'}`}
            />
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Start</p>
            <p className="text-gray-700 dark:text-gray-300">{project.startDate || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">End</p>
            <p className="text-gray-700 dark:text-gray-300">{project.endDate || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[project.status] || 'bg-gray-400'
            } text-white`}
          >
            {project.status ? project.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "Not Started"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;