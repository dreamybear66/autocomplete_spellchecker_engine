/**
 * TrieNode represents a single node in the Trie data structure
 */
export class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;
    frequency: number;
    word: string;

    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.frequency = 0;
        this.word = '';
    }
}

/**
 * Trie data structure for efficient prefix-based autocomplete
 * Time Complexity: O(k) for insert and search, where k is the length of the word/prefix
 * Space Complexity: O(ALPHABET_SIZE * N * M) where N is number of words, M is average word length
 */
export class Trie {
    private root: TrieNode;
    private wordCount: number;

    constructor() {
        this.root = new TrieNode();
        this.wordCount = 0;
    }

    /**
     * Insert a word into the Trie with its frequency
     * @param word - The word to insert
     * @param frequency - The frequency/weight of the word (default: 1)
     */
    insert(word: string, frequency: number = 1): void {
        if (!word) return;

        let current = this.root;
        const normalizedWord = word.toLowerCase();

        for (const char of normalizedWord) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char)!;
        }

        if (!current.isEndOfWord) {
            this.wordCount++;
        }

        current.isEndOfWord = true;
        current.frequency = frequency;
        current.word = normalizedWord;
    }

    /**
     * Search for all words with a given prefix
     * @param prefix - The prefix to search for
     * @returns Array of objects containing word and frequency, sorted by frequency
     */
    search(prefix: string): Array<{ word: string; frequency: number }> {
        if (!prefix) return [];

        const normalizedPrefix = prefix.toLowerCase();
        let current = this.root;

        // Navigate to the prefix node
        for (const char of normalizedPrefix) {
            if (!current.children.has(char)) {
                return []; // Prefix not found
            }
            current = current.children.get(char)!;
        }

        // Collect all words with this prefix
        const results: Array<{ word: string; frequency: number }> = [];
        this.collectWords(current, results);

        // Sort by frequency (descending) and then alphabetically
        return results.sort((a, b) => {
            if (b.frequency !== a.frequency) {
                return b.frequency - a.frequency;
            }
            return a.word.localeCompare(b.word);
        });
    }

    /**
     * Helper method to collect all words from a given node
     */
    private collectWords(
        node: TrieNode,
        results: Array<{ word: string; frequency: number }>
    ): void {
        if (node.isEndOfWord) {
            results.push({ word: node.word, frequency: node.frequency });
        }

        for (const child of node.children.values()) {
            this.collectWords(child, results);
        }
    }

    /**
     * Get the path of nodes traversed for a given prefix (for visualization)
     * @param prefix - The prefix to trace
     * @returns Array of characters in the path and number of nodes traversed
     */
    getNodePath(prefix: string): { path: string[]; nodesTraversed: number } {
        if (!prefix) return { path: [], nodesTraversed: 0 };

        const normalizedPrefix = prefix.toLowerCase();
        const path: string[] = [];
        let current = this.root;
        let nodesTraversed = 0;

        for (const char of normalizedPrefix) {
            if (!current.children.has(char)) {
                break;
            }
            path.push(char);
            current = current.children.get(char)!;
            nodesTraversed++;
        }

        return { path, nodesTraversed };
    }

    /**
     * Check if a word exists in the Trie
     * @param word - The word to check
     * @returns true if the word exists, false otherwise
     */
    contains(word: string): boolean {
        if (!word) return false;

        const normalizedWord = word.toLowerCase();
        let current = this.root;

        for (const char of normalizedWord) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }

        return current.isEndOfWord;
    }

    /**
     * Get the total number of words in the Trie
     */
    getWordCount(): number {
        return this.wordCount;
    }

    /**
     * Get the root node (for visualization purposes)
     */
    getRoot(): TrieNode {
        return this.root;
    }

    /**
     * Calculate approximate memory usage in bytes
     */
    getMemoryUsage(): number {
        // Approximate: each node has a Map, boolean, number, and string
        // Map overhead + pointer size + boolean + number + string
        const nodeSize = 100; // Approximate bytes per node
        return this.countNodes(this.root) * nodeSize;
    }

    /**
     * Count total nodes in the Trie
     */
    private countNodes(node: TrieNode): number {
        let count = 1; // Count current node
        for (const child of node.children.values()) {
            count += this.countNodes(child);
        }
        return count;
    }
}
