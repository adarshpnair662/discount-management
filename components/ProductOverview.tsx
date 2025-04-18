import React, { useState, useEffect } from 'react';
import { useDiscount } from '@/context/DiscountContext';

const ProductOverview: React.FC = () => {
    const { discounts } = useDiscount()
    const [productPrice, setProductPrice] = useState(1000)
    let basePrice = 10000.00;
    useEffect(() => {
        let totalDiscountAmount = 0;

        discounts.forEach((discount) => {
            if (discount.isActive) {
                const value = discount.value;
                if (discount.isActive) {
                    if (discount.type === 'percentage') {
                        totalDiscountAmount += (basePrice * value) / 100;
                    } else {
                        totalDiscountAmount += value;
                    }
                }
            }
        });

        const updatedPrice = basePrice - totalDiscountAmount;
        setProductPrice(updatedPrice > 0 ? updatedPrice : 0);
    }, [discounts]);


    return (
        <div className="bg-white border border-gray-200">
            <div className="p-4 flex items-start gap-4">
                <div className="flex-grow">
                    <div className="w-full flex justify-center">
                        <img src="/assets/charging-station.png" alt="Charging Station" className="w-fit h-auto" />
                    </div>

                    <h2 className="text-xl text-gray-700 font-medium mb-2">Overview</h2>
                    <div className="mb-1 flex justify-between">
                        <div>Webasto Pure II laadpaal type 2</div>
                        <div>€ {basePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="mb-3 flex justify-between text-sm">
                        <div className="text-gray-600">Maandelijkse prijs</div>
                        <div>€ 10,00</div>
                    </div>
                    <button className="text-primary">Edit</button>
                </div>
            </div>

            <div className="bg-[#EDF6FB] p-4 border-t border-gray-200 mb-5">
                <div className="flex justify-between mb-4 font-bold">
                    <div>Eventually per month excl. btw</div>
                    <div>€ 10,00</div>
                </div>
            </div>

            <div className="bg-[#EDF6FB] p-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                    <div>Subtotal onetime costs excl. btw</div>
                    <div>€ {basePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
                {discounts.map((discount, index) => {
                    if (discount.isActive) {
                        return (
                            <div key={index} className="flex justify-between mb-2 text-gray-600">
                                <div>{discount.name}</div>
                                <div>- € ${discount.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                            </div>
                        );
                    }
                    return null;
                })}
                <div className="flex justify-between font-bold">
                    <div>One time costs excl. btw</div>
                    <div>€ {productPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductOverview;