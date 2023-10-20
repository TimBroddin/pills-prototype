import React from 'react';

interface PillProps {
    label: string;
    selected: boolean;
    onSelect: (label: string) => void;
}

const Pill: React.FC<PillProps> = ({ label, selected, onSelect }) => {
    return (
        <button
            onClick={() => onSelect(label)}
            className={`px-4 py-2 rounded-full border-2 ${
                selected
                    ? 'bg-blue-500 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-600'
            }`}
        >
            {label}
        </button>
    );
};

export default Pill;
