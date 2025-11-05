import React from 'react';
import { Loader2 } from 'lucide-react'; // Make sure you've installed lucide-react

const LoadingSpinner = () => {
return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full text-center">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
    <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
    </div>
);
};

export default LoadingSpinner;