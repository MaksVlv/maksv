import React, { useState, useEffect } from 'react';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    if (loading) {
        return (
            <div className="fixed z-50 top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-300">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"/>
            </div>
        );
    }

    return null;
};

export default Loader;
