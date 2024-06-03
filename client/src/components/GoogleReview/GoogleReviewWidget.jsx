/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

const GoogleReviewWidget = () => {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.src = "https://static.elfsight.com/platform/platform.js";
        script.dataset.useServiceCore = "true";
        script.defer = true;

        // Append the script element to the document body
        document.body.appendChild(script);

        // Cleanup function to remove the script when the component is unmounted
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="elfsight-app-c929a515-62bc-42d3-b686-be06713f05d2" data-elfsight-app-lazy></div>
    );
};

export default GoogleReviewWidget;
