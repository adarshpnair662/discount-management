import React from 'react';

const NavigationButtons: React.FC = () => {
    return (
        <div className="flex justify-between mt-6">
            <button className="text-[#30bbd9] px-4 py-2">
                Previous
            </button>
            <button className="bg-[#30bbd9] text-white px-6 py-2 rounded">
                Next
            </button>
        </div>
    );
}

export default NavigationButtons;