'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to autocomplete engine page
        router.push('/autocomplete-engine');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-pulse text-primary text-xl">Loading...</div>
            </div>
        </div>
    );
}
