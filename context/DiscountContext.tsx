import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DiscountType } from '../types/discount';

type DiscountContextType = {
    discounts: DiscountType[];
    setDiscounts: React.Dispatch<React.SetStateAction<DiscountType[]>>;
};

const DiscountContext = createContext<DiscountContextType | undefined>(undefined);

export const DiscountProvider = ({ children }: { children: ReactNode }) => {
    const [discounts, setDiscounts] = useState<DiscountType[]>([
        { name: 'Discount name', value: 250.00, type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: 5, type: 'percentage', period: 'one time', editable: true, isActive: true },
        { name: 'Discount name', value: 250.00, type: 'fixed', period: 'monthly', isActive: true },
        { name: 'Discount name', value: 25, type: 'percentage', period: 'monthly first 3 months', isActive: false },
        { name: 'Discount name', value: 250.00, type: 'fixed', period: 'one time', isActive: true },
        { name: 'Discount name', value: 50.00, type: 'fixed', period: 'monthly first 3 months', editable: true, isActive: false },
        { name: 'Discount name', value: 25, type: 'percentage', period: 'one time', isActive: false },
        { name: 'Discount name', value: 25, type: 'percentage', period: 'monthly', isActive: true, isManualAdd: true },
    ]);

    return (
        <DiscountContext.Provider value={{ discounts, setDiscounts }}>
            {children}
        </DiscountContext.Provider>
    );
};

export const useDiscount = (): DiscountContextType => {
    const context = useContext(DiscountContext);
    if (!context) {
        throw new Error('useDiscount must be used within a DiscountProvider');
    }
    return context;
};
