export type DiscountType = {
    name: string;
    value: number;
    type: 'fixed' | 'percentage';
    period: 'one time' | 'monthly' | 'monthly first 3 months' | any;
    editable?: boolean;
    isActive: boolean;
    isManualAdd?: boolean;
};