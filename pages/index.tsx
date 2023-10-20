import { useState } from 'react';
import Head from "next/head";
import Pill from '@/components/Pill'

interface PillState {
    label: string;
    selected: boolean;
}

export default function Home() {
    const initialPills: PillState[] = [
        { label: 'All content', selected: true },
        { label: 'Toyota', selected: false },
        { label: 'Ford', selected: false },
        { label: 'Honda', selected: false },
        { label: 'BMW', selected: false },
        { label: 'Audi', selected: false },
        { label: 'Mercedes', selected: false },
    ];

    const [pills, setPills] = useState<PillState[]>(initialPills);
    const [selectAllTogglesAllContent, setSelectAllTogglesAllContent] = useState<boolean>(true);


    const handleSelect = (selectedLabel: string) => {
        if (selectedLabel === 'All content') {
            setPills(pills.map(pill => ({ ...pill, selected: pill.label === 'All content' })));
        } else {
            const updatedPills = pills.map(pill => {
                if (pill.label === selectedLabel) {
                    return { ...pill, selected: !pill.selected };
                } else if (pill.label === 'All content') {
                    return { ...pill, selected: false };
                }
                return pill;
            });

            if (selectAllTogglesAllContent) {
                const allOtherPillsSelected = updatedPills.every(pill => pill.selected || pill.label === 'All content');
                if (allOtherPillsSelected) {
                    setPills(pills.map(pill => ({ ...pill, selected: pill.label === 'All content' })));
                    return;
                }
            }
            setPills(updatedPills);
        }
    };

    const allContentSelected = pills.find(pill => pill.label === 'All content')?.selected;
    const excludedCategories = allContentSelected ? [] : pills.filter(pill => !pill.selected && pill.label !== 'All content').map(pill => pill.label);

    return (
        <>
            <Head>
                <title>Pills prototype</title>
            </Head>
            <div className="p-4 space-y-4">
                <div className="space-y-2">
                    {pills.map(pill => (
                        <Pill key={pill.label} label={pill.label} selected={pill.selected} onSelect={handleSelect} />
                    ))}
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        checked={selectAllTogglesAllContent}
                        onChange={(e) => setSelectAllTogglesAllContent(e.target.checked)}
                        id="toggleCheckbox"
                    />
                    <label htmlFor="toggleCheckbox" className="ml-2">
                        All categories selected selects All Content
                    </label>
                </div>
                <div>
                    <span className="font-bold">Excluded Categories:</span>
                    <pre className="mt-2">{JSON.stringify(excludedCategories, null, 2)}</pre>
                </div>
            </div>
        </>

    );
}
