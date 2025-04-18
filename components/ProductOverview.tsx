import React from 'react';
import charger from '../public/assets/charging-station.png'

const ProductOverview: React.FC = () => {
    return (
        <div className="bg-white border border-gray-200">
            <div className="p-4 flex items-start gap-4">
                <div className="flex-grow">
                    <h2 className="text-xl text-gray-700 font-medium mb-2">Overview</h2>
                    <div className="mb-1 flex justify-between">
                        <div>Webasto Pure II laadpaal type 2</div>
                        <div>€ 1.000,00</div>
                    </div>
                    <div className="mb-3 flex justify-between text-sm">
                        <div className="text-gray-600">Maandelijkse prijs</div>
                        <div>€ 10,00</div>
                    </div>
                    <button className="text-primary">Edit</button>
                </div>
                <div>
                    <img src="/assets/charging-station.png" alt="Charging Station" className="w-16 h-auto" />
                </div>
            </div>

            <div className="bg-blue-100 p-4 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                    <div>Eventually per month excl. btw</div>
                    <div>€ 10,00</div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                    <div>Subtotal onetime costs excl. btw</div>
                    <div>€ 1.000,00</div>
                </div>
                <div className="flex justify-between mb-2 text-gray-600">
                    <div>Discount name</div>
                    <div>- € 250,00</div>
                </div>
                <div className="flex justify-between">
                    <div>Onetime costs excl. btw</div>
                    <div>€ 750,00</div>
                </div>
            </div>
        </div>
    );
}

export default ProductOverview;