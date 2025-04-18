import React from 'react';

interface DeleteConfirmationProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="relative bg-white w-full max-w-md p-6 shadow-lg">

                <button
                    onClick={onCancel}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
                >
                    <img src="/icons/cross_close.svg" alt="Edit" width={12} height={12} />
                </button>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold text-[#808080] mb-2">Delete discount</h3>
                    <p className="text-[#808080]">Are you sure you want to delete this discount?</p>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-[#CC4B37] text-white hover:bg-red-700 transition"
                    >
                        Delete discount
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
