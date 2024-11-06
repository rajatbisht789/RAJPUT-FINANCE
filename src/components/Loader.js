// Loader.js
import React from 'react';

const Loader = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white/90 z-50">
        <div className="w-16 h-16 border-4 border-t-transparent border-gray-800 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-800">Loading...</p>
    </div>
);

export default Loader;
