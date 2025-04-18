import React, { useState } from 'react';
import AddDiscountModal from './AddDiscountModal';

type DiscountType = {
    name: string;
    value: string;
    type: 'fixed' | 'percentage';
    period: 'one time' | 'monthly' | 'monthly first 3 months' | any;
    editable?: boolean;
    isActive: boolean;
    isManualAdd?: boolean;
};

const DiscountList: React.FC = () => {
    const [isAddDiscountModalOpen, setIsAddDiscountModalOpen] = useState(false);
    const [discounts, setDiscounts] = useState<DiscountType[]>([
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: '5 %', type: 'percentage', period: 'one time', editable: true, isActive: true },
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'monthly', isActive: true },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'monthly first 3 months', isActive: false },
        { name: 'Discount name', value: '€ 250,00', type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: '€ 50,00', type: 'fixed', period: 'monthly first 3 months', editable: true, isActive: false },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'one time', isActive: false },
        { name: 'Discount name', value: '25 %', type: 'percentage', period: 'monthly', isActive: true, isManualAdd: true },
    ]);

    const toggleSwitch = (index: number) => {
        const updated = [...discounts];
        updated[index].isActive = !updated[index].isActive;
        setDiscounts(updated);
    };

    const handleAddDiscount = (discountData: any) => {
        const newDiscount: DiscountType = {
            name: discountData.description || 'Discount name',
            value: discountData.discountType === 'percentage'
                ? `${discountData.value} %`
                : `€ ${discountData.value}`,
            type: discountData.discountType === 'percentage' ? 'percentage' : 'fixed',
            period: discountData.type === 'one-time'
                ? 'one time'
                : discountData.duration
                    ? `monthly first ${discountData.duration} months`
                    : 'monthly',
            isActive: true,
            editable: true,
            isManualAdd: discountData.isManualAdd
        };

        setDiscounts([...discounts, newDiscount]);
    };

    const handleRemoveDiscount = (index: number) => {
        setDiscounts(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="bg-white border border-gray-200">
            <div className="p-4 flex justify-center">
                <button
                    className="text-primary flex items-center"
                    onClick={() => setIsAddDiscountModalOpen(true)}
                >
                    <span className="mr-2">+</span>
                    Add manual discount
                </button>
            </div>

            {discounts.map((discount, index) => (
                <div key={index} className="border-t border-gray-200 p-4 flex justify-between items-center">
                    <div className="text-gray-700">{discount.name}</div>
                    <div className="flex items-center gap-4">
                        {discount.editable && !discount.isManualAdd && (
                            <button className="text-primary">
                                <img src="/icons/penchil_edit.svg" alt="Edit" width={15} height={15} />
                            </button>
                        )}
                        <div className="text-gray-700">- {discount.value} {discount.period}</div>
                        {discount.isManualAdd && discount.editable ?
                            <div>
                                <button className="text-[#26B7CD] p-1">
                                    <img src="/icons/penchil_edit.svg" alt="Edit" width={15} height={15} />
                                </button>
                                <button className="text-[#26B7CD] p-1"
                                    onClick={() => handleRemoveDiscount(index)}>
                                    <img src="/icons/delete.svg" alt="Edit" width={15} height={15} />
                                </button>
                            </div>
                            : <div
                                onClick={() => toggleSwitch(index)}
                                className={`w-[70px] h-[35px] flex items-center cursor-pointer transition-colors duration-300 ${discount.isActive ? 'bg-[#30bbd9]' : 'bg-gray-300'}`}
                            >
                                <div
                                    className={`w-6 h-6 bg-white transition-all duration-300 transform ${discount.isActive ? 'translate-x-[34px]' : 'translate-x-[4px]'}`}
                                ></div>
                            </div>
                        }
                    </div>
                </div>
            ))}

            <AddDiscountModal
                isOpen={isAddDiscountModalOpen}
                onClose={() => setIsAddDiscountModalOpen(false)}
                onSave={handleAddDiscount}
                basePrice={1000.00}
            />
        </div>
    );
}

export default DiscountList;