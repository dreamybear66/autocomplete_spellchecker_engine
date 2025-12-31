export class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEndOfWord: boolean = false;
    frequency: number = 0;
    char: string;

    constructor(char: string = '') {
        this.char = char;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string, frequency: number = 1): void {
        let node = this.root;
        for (const char of word.toLowerCase()) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode(char));
            }
            node = node.children.get(char)!;
        }
        node.isEndOfWord = true;
        node.frequency += frequency;
    }

    search(prefix: string): { word: string; frequency: number }[] {
        let node = this.root;
        for (const char of prefix.toLowerCase()) {
            if (!node.children.has(char)) return [];
            node = node.children.get(char)!;
        }

        const results: { word: string; frequency: number }[] = [];
        this._findAllWords(node, prefix, results);
        return results;
    }

    private _findAllWords(node: TrieNode, currentPrefix: string, results: { word: string; frequency: number }[]): void {
        if (node.isEndOfWord) {
            results.push({ word: currentPrefix, frequency: node.frequency });
        }

        for (const [char, childNode] of node.children) {
            this._findAllWords(childNode, currentPrefix + char, results);
        }
    }

    // Get nodes visited for metrics
    getNodesTraversed(prefix: string): number {
        let count = 0;
        let node = this.root;
        for (const char of prefix.toLowerCase()) {
            count++;
            if (!node.children.has(char)) break;
            node = node.children.get(char)!;
        }
        return count;
    }
}
