import React from 'react';
import DiscountList from './DiscountList';
import ProductOverview from './ProductOverview';
import NavigationTabs from './NavigationTabs';
import NavigationButtons from './NavigationButtons';

const DiscountManager: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-4">
                <button className="bg-[#767676] text-white px-4 py-2">
                    Previous
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3">
                    <div className="bg-[#30bbd9] text-white p-4 font-medium">
                        Discounts
                    </div>

                    <DiscountList />

                    <NavigationButtons />
                </div>

                <div className="w-full md:w-1/3">
                    <ProductOverview />
                </div>
            </div>

            <NavigationTabs />
        </div>
    );
}

export default DiscountManager;