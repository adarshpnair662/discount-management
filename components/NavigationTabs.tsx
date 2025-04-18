import React from 'react';

const NavigationTabs: React.FC = () => {
    return (
        <div className="mt-8 bg-gray-300 rounded">
            <div className="p-4 border-b border-gray-400">
                <div className="text-gray-700">Klantgegevens</div>
            </div>
            <div className="p-4 border-b border-gray-400">
                <div className="text-gray-700">Productgegevens</div>
            </div>
            <div className="p-4">
                <div className="text-gray-700">Checkout</div>
            </div>
        </div>
    );
}

export default NavigationTabs;