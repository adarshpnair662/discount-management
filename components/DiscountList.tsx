import React, { useState } from 'react';
import AddDiscountModal from './AddDiscountModal';
import { useDiscount } from '@/context/DiscountContext';
import { DiscountType } from '../types/discount';
import DeleteConfirmation from './DeleteConfirmation'

const DiscountList: React.FC = () => {
    const [isAddDiscountModalOpen, setIsAddDiscountModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const { discounts, setDiscounts } = useDiscount();

    const toggleSwitch = (index: number) => {
        const updated = [...discounts];
        updated[index].isActive = !updated[index].isActive;
        setDiscounts(updated);
    };

    const handleAddOrUpdateDiscount = (discountData: {
        type: 'one-time' | 'monthly';
        discountType: 'percentage' | 'fixed';
        value: string;
        duration: string;
        newPrice: string;
        description: string;
        isManualAdd: boolean;
    }) => {
        const newDiscount: DiscountType = {
            name: discountData.description || 'Discount name',
            value: parseFloat(discountData.value),
            type: discountData.discountType,
            period: discountData.type === 'one-time'
                ? 'one time'
                : discountData.duration
                    ? `monthly first ${discountData.duration} months`
                    : 'monthly',
            isActive: true,
            editable: true,
            isManualAdd: discountData.isManualAdd
        };

        if (editIndex !== null) {
            const updated = [...discounts];
            updated[editIndex] = newDiscount;
            setDiscounts(updated);
            setEditIndex(null);
        } else {
            setDiscounts([...discounts, newDiscount]);
        }

        setIsAddDiscountModalOpen(false);
    };

    const handleRemoveDiscount = (index: number) => {
        setDiscounts(prev => prev.filter((_, i) => i !== index));
    };

    const handleEditDiscount = (index: number) => {
        setEditIndex(index);
        setIsAddDiscountModalOpen(true);
    };

    const getEditDiscountData = (index: number) => {
        const d = discounts[index];
        return {
            type: d.period === 'one time' ? 'one-time' : 'monthly' as 'monthly' | 'one-time',
            discountType: d.type,
            value: d.value.toString(),
            duration: d.period.includes('monthly first')
                ? d.period.replace('monthly first ', '').replace(' months', '')
                : '',
            description: d.name,
        };
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDiscountIndex, setSelectedDiscountIndex] = useState<number | null>(null);

    const handleDeleteClick = (index: number) => {
        setSelectedDiscountIndex(index);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedDiscountIndex !== null) {
            handleRemoveDiscount(selectedDiscountIndex); // <-- Add this line
        }
        setShowDeleteModal(false);
        setSelectedDiscountIndex(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedDiscountIndex(null);
    };


    return (
        <div className="bg-white border border-gray-200">
            <div className="p-4 flex justify-center">
                <button
                    className="text-primary flex items-center"
                    onClick={() => {
                        setEditIndex(null);
                        setIsAddDiscountModalOpen(true);
                    }}
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
                            <button className="text-primary"
                                onClick={() => handleEditDiscount(index)}>
                                <img src="/icons/penchil_edit.svg" alt="Edit" width={15} height={15} />
                            </button>
                        )}
                        <div className="text-gray-700">
                            - {discount.type === 'percentage'
                                ? `${discount.value} %`
                                : `€ ${discount.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} {discount.period}
                        </div>
                        {discount.isManualAdd && discount.editable ? (
                            <div className="flex gap-2">
                                <button
                                    className="text-[#26B7CD] p-1"
                                    onClick={() => handleEditDiscount(index)}
                                >
                                    <img src="/icons/penchil_edit.svg" alt="Edit" width={15} height={15} />
                                </button>
                                <button
                                    className="text-[#26B7CD] p-1"
                                    onClick={() => handleDeleteClick(index)}
                                >
                                    <img src="/icons/delete.svg" alt="Delete" width={15} height={15} />
                                </button>
                            </div>
                        ) : (
                            <div
                                onClick={() => toggleSwitch(index)}
                                className={`w-[70px] h-[35px] flex items-center cursor-pointer transition-colors duration-300 ${discount.isActive ? 'bg-[#30bbd9]' : 'bg-gray-300'}`}
                            >
                                <div
                                    className={`w-6 h-6 bg-white transition-all duration-300 transform ${discount.isActive ? 'translate-x-[34px]' : 'translate-x-[4px]'}`}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <AddDiscountModal
                isOpen={isAddDiscountModalOpen}
                onClose={() => {
                    setIsAddDiscountModalOpen(false);
                    setEditIndex(null);
                }}
                onSave={handleAddOrUpdateDiscount}
                basePrice={1000.00}
                discountToEdit={editIndex !== null ? getEditDiscountData(editIndex) : null}
            />

            {showDeleteModal && (
                <DeleteConfirmation
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default DiscountList;
