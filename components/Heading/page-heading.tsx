import React from 'react';
 
export default function PageHeading({ heading }: {
    heading: React.ReactNode;
}
) {
    return (
        <>
            <h4 className="text-xl py-2 font-bold tracking-tight">
                {heading}
             </h4>

        </>
    );
}
