import SearchInterface from '@/components/search/SearchInterface';

export default function Home() {
    return (
        <div className="container relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-10">
            <SearchInterface />
        </div>
    );
}
