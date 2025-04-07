import React from "react";
import { GaugeComponent } from "react-gauge-component";

const EmployeeExperience = ({ result }) => {
  
  const feedback = result?.onboarding_experience?.feedback;
  let emotionalStateValue = -1;

 
  if (feedback && feedback === 'Poor') {
    emotionalStateValue = 0;
  }
  else if (feedback && feedback === 'Average') {
    emotionalStateValue = 33;
  }
  else if (feedback && feedback === 'Good') {
    emotionalStateValue = 66;
  }
  else if (feedback && feedback === 'Excellent') {
    emotionalStateValue = 100;
  }

  return (
    <div className="p-4 mt-10">
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
        <div className="rounded-xl p-4 bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Onboarding Experience</h2>
          </div>

          <div className="flex flex-col items-center">
            <GaugeComponent
              id="gauge-component"
              value={emotionalStateValue}
              type="radial"
              style={{ width: "60%", height: "60%" }}
              labels={{
                valueLabel: {
                  formatTextValue: () => "",
                },
                markLabel: false,
              }}
              arc={{
                width: 0.2,
                padding: 0.02,
                cornerRadius: 1,
                subArcs: [
                  { limit: 33, color: "#EA4228", showTick: false },
                  { limit: 66, color: "#F5CD19", showTick: false },
                  { limit: 100, color: "#5BE12C", showTick: false },
                ],
              }}
              pointer={{ type: "needle", color: "#464A4F" }}
            />
            <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
              {(feedback) ? feedback : 'Not Available'}
            </div>
          </div>
        </div>

       
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded p-4 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Transition Details</h2>

         
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-200">Onboarding Feedback</span>
              <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                {feedback}
              </span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {`Employee rated their onboarding experience as ${feedback} with some
              suggestions for improvement.`}
            </p>
          </div>

         
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-200">Initial Training</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {(result?.onboarding_experience?.training_completed) ? "completed all required training modules" :
                "training in progress"}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-200">Mentor Assigned</span>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {(result?.onboarding_experience?.mentor_assigned) ? `A mentor has been successfully assigned.` : 
                `No mentor has been assigned yet.`}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

         
          <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-3 mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {(result?.onboarding_experience?.training_completed) ? `Employee has successfully transitioned into their role with "${feedback}" feedback on the onboarding process. All required training has been completed.`:
              'Employee has not yet completed all required training. Onboarding is still in progress.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExperience;