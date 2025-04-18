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
    }) => void;
    basePrice?: number;
}

const AddDiscountModal: React.FC<AddDiscountModalProps> = ({
    isOpen,
    onClose,
    onSave,
    basePrice = 1000.00
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
            setPriceType('monthly');
            setDiscountType('percentage');
            setDiscountValue('');
            setDuration('');
            setNewPrice(`€ ${basePrice.toFixed(2).replace('.', ',')}`);
            setDescription('');
        }
    }, [isOpen, basePrice]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            type: priceType,
            discountType,
            value: discountValue,
            duration,
            newPrice,
            description
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
            <div className="bg-white rounded-lg w-[764px] h-auto p-4 overflow-y-auto">
                <h2 className="text-xl font-medium mb-4">Add discount</h2>

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
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400 ml-3 flex items-center justify-center bg-white">
                                {priceType === 'one-time' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#30bbd9]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md text-sm flex items-center justify-between ${priceType === 'monthly'
                                ? 'bg-[#30bbd9] text-white'
                                : 'bg-gray-100 text-gray-500'
                                }`}
                            onClick={() => setPriceType('monthly')}
                        >
                            <span>Monthly price</span>
                            <div className="w-4 h-4 rounded-full border-2 border-gray-400 ml-3 flex items-center justify-center bg-white">
                                {priceType === 'monthly' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#30bbd9]" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
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

                {priceType === 'monthly' && (
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

                <div className="mb-4">
                    <label className="block text-sm mb-1">Description</label>
                    <input
                        type="text"
                        className="w-full border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#30bbd9]"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder=""
                    />
                </div>

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
                        Add
                    </button>
                </div>
            </div>
        </div>

    );
};

export default AddDiscountModal;