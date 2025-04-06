import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const ErrorMessage = ({
    redirectPath = "/employee/chat",
}) => {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ minWidth: 768 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const handleRedirect = () => {
        navigate(redirectPath);
    };

    return (
        <div className="flex items-center w-full justify-center p-2 rounded-sm bg-yellow-100 border-[1px] border-yellow-500 dark:bg-yellow-700 mb-4 hover:cursor-pointer " onClick={handleRedirect}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className='text-yellow-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                    </svg>
                </div>
                <div className="ml-1">{isDesktop &&
                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-100 "  >
                        We've noticed some changes in your Wellbeing patterns. Taking a moment to reflect can be helpful.
                        <span className="font-bold dark:text-yellow-200 text-yellow-900 hover:cursor-pointer"> Click here </span>
                        to check in with our chat feature - it's a simple way to track your wellbeing.
                    </h3>}
                    {isMobile && <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-100 "  >
                        We've noticed some changes in your Wellbeing recently.
                        <span className="font-bold dark:text-yellow-200 text-yellow-900 hover:cursor-pointer"> Click here </span>
                        to check in - it's a simple way to track how you're feeling.
                    </h3>}
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;