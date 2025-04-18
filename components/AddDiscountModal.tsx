import { useState, useEffect } from "react";

interface AddDiscountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (discountData: {
        type: 'one-time' | 'monthly';
        discountType: 'percentage' | 'fixed';
        value: string;
        duration: string;
        newPrice: string;
        description: string;
        isManualAdd: boolean;
    }) => void;
    basePrice?: number;
    discountToEdit?: {
        type: 'one-time' | 'monthly';
        discountType: 'percentage' | 'fixed';
        value: string;
        duration: string;
        description: string;
    } | null;
}

const AddDiscountModal: React.FC<AddDiscountModalProps> = ({
    isOpen,
    onClose,
    onSave,
    basePrice = 1000.00,
    discountToEdit = null
}) => {
    const [priceType, setPriceType] = useState<'one-time' | 'monthly'>('monthly');
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
    const [discountValue, setDiscountValue] = useState('');
    const [duration, setDuration] = useState('');
    const [newPrice, setNewPrice] = useState(`€ ${basePrice.toFixed(2).replace('.', ',')}`);
    const [description, setDescription] = useState('');

    useEffect(() => {
        let calculatedPrice = basePrice;

        if (discountValue && !isNaN(parseFloat(discountValue))) {
            if (discountType === 'percentage') {
                const percentageDiscount = parseFloat(discountValue) / 100;
                calculatedPrice = basePrice * (1 - percentageDiscount);
            } else {
                calculatedPrice = basePrice - parseFloat(discountValue);
            }
        }

        setNewPrice(`€ ${calculatedPrice.toFixed(2).replace('.', ',')}`);
    }, [discountType, discountValue, basePrice]);

    useEffect(() => {
        if (isOpen) {
            if (discountToEdit) {
                setPriceType(discountToEdit.type);
                setDiscountType(discountToEdit.discountType);
                setDiscountValue(discountToEdit.value);
                setDuration(discountToEdit.duration);
                setDescription(discountToEdit.description);

                const value = parseFloat(discountToEdit.value);
                let calculatedPrice = basePrice;

                if (!isNaN(value)) {
                    calculatedPrice = discountToEdit.discountType === 'percentage'
                        ? basePrice * (1 - value / 100)
                        : basePrice - value;
                }

                setNewPrice(`€ ${calculatedPrice.toFixed(2).replace('.', ',')}`);
            } else {
                setPriceType('monthly');
                setDiscountType('percentage');
                setDiscountValue('');
                setDuration('');
                setNewPrice(`€ ${basePrice.toFixed(2).replace('.', ',')}`);
                setDescription('');
            }
        }
    }, [isOpen, basePrice, discountToEdit]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            type: priceType,
            discountType,
            value: discountValue,
            duration,
            newPrice,
            description,
            isManualAdd: true
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg w-[764px] h-auto p-4 overflow-y-auto">
                <h2 className="text-xl font-medium mb-4">
                    {discountToEdit ? 'Edit Discount' : 'Add Discount'}
                </h2>

                <div className="mb-4">
                    <p className="mb-1 text-sm">For which price do you calculate the discount?</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            className={`px-4 py-2 rounded-md text-sm flex items-center justify-between ${priceType === 'one-time'
                                ? 'bg-[#30bbd9] text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                            onClick={() => setPriceType('one-time')}
                        >
                            <span>One time price</span>
                            <div className="m-2">
                                {priceType === 'one-time' ?
                                    <img src="/icons/tick_fill.svg" alt="Edit" width={20} height={20} />
                                    : <img src="/icons/round_fill.svg" alt="Edit" width={20} height={20} />
                                }
                            </div>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-sm flex items-center justify-between ${priceType === 'monthly'
                                ? 'bg-[#30bbd9] text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                            onClick={() => { !discountToEdit ? setPriceType('monthly') : '' }}
                        >
                            <span>Monthly price</span>
                            <div className="m-2">
                                {priceType === 'monthly' ?
                                    <img src="/icons/tick_fill.svg" alt="Edit" width={20} height={20} />
                                    : <img src="/icons/round_fill.svg" alt="Edit" width={20} height={20} />
                                }
                            </div>
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Discount</label>
                    <div className="flex">
                        <div className="relative">
                            <select
                                className="appearance-none border rounded-l-md py-1.5 px-3 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                                value={discountType}
                                onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                            >
                                <option value="percentage">%</option>
                                <option value="fixed">€</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-gray-700">
                                <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                        <input
                            type="text"
                            className="flex-1 border border-l-0 rounded-r-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            placeholder="Enter value"
                        />
                    </div>
                </div>

                {priceType === 'monthly' && !discountToEdit && (
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Duration</label>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full border rounded-md py-1.5 px-3 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Enter duration"
                            />
                            <div className="absolute inset-y-0 right-2 flex items-center text-gray-500 text-xs">
                                months
                            </div>
                        </div>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm mb-1">New price</label>
                    <input
                        type="text"
                        className="w-full border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                        value={newPrice}
                        readOnly
                    />
                </div>

                {!discountToEdit && <div className="mb-4">
                    <label className="block text-sm mb-1">Description</label>
                    <input
                        type="text"
                        className="w-full border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=""
                    />
                </div>
                }
                <div className="flex justify-between">
                    <button
                        className="px-4 py-1.5 text-sm text-[#30bbd9] hover:underline"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1.5 text-sm bg-[#30bbd9] text-white rounded-md hover:bg-[#1fa0b5]"
                        onClick={handleSave}
                    >
                        {discountToEdit ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDiscountModal;
