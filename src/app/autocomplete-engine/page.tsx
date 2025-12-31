import SearchInterface from '@/components/search/SearchInterface';

export default function AutocompleteEnginePage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-cta font-bold">Autocomplete Engine</h2>
          <p className="text-muted-foreground">
            Prefix-based search optimization using high-performance Trie traversal.
          </p>
        </div>
        <SearchInterface />
      </div>
    </div>
  );
}