import React from 'react';
import { useState } from 'react';

type DiscountType = {
    name: string;
    value: string;
    type: 'fixed' | 'percentage';
    period: 'one time' | 'monthly' | 'monthly first 3 months';
    editable?: boolean;
    isActive: boolean;
};

const DiscountList: React.FC = () => {
    const [discounts, setDiscounts] = useState<DiscountType[]>([
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: '5 %', type: 'percentage', period: 'one time', editable: true, isActive: true },
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'monthly', isActive: true },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'monthly first 3 months', isActive: false },
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: '€ 50,00', type: 'fixed', period: 'monthly first 3 months', editable: true, isActive: false },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'one time', isActive: false },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'monthly', isActive: true },
    ]);

    const toggleSwitch = (index: number) => {
        const updated = [...discounts];
        updated[index].isActive = !updated[index].isActive;
        setDiscounts(updated);
    };

    return (
        <div className="bg-white border border-gray-200">
            <div className="p-4 flex justify-center">
                <button className="text-primary flex items-center">
                    <span className="mr-2">+</span>
                    Add manual discount
                </button>
            </div>

            {discounts.map((discount, index) => (
                <div key={index} className="border-t border-gray-200 p-4 flex justify-between items-center">
                    <div className="text-gray-700">{discount.name}</div>
                    <div className="flex items-center gap-4">
                        {discount.editable && (
                            <button className="text-primary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                        <div className="text-gray-700">- {discount.value} {discount.period}</div>
                        <div
                            onClick={() => toggleSwitch(index)}
                            className={`w-[70px] h-[35px] flex items-center cursor-pointer transition-colors duration-300 ${discount.isActive ? 'bg-[#30bbd9]' : 'bg-gray-300'}`}
                        >
                            <div
                                className={`w-6 h-6 bg-white transition-all duration-300 transform ${discount.isActive ? 'translate-x-[34px]' : 'translate-x-[4px]'}`}
                            ></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DiscountList;