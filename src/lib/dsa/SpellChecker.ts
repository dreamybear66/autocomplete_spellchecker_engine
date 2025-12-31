export function getLevenshteinDistance(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, () =>
        Array.from({ length: b.length + 1 }, () => 0)
    );

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1, // deletion
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }

    return matrix[a.length][b.length];
}

class BKTreeNode {
    word: string;
    children: Map<number, BKTreeNode> = new Map();

    constructor(word: string) {
        this.word = word;
    }
}

export class BKTree {
    root: BKTreeNode | null = null;

    add(word: string): void {
        if (!this.root) {
            this.root = new BKTreeNode(word);
            return;
        }

        let node = this.root;
        while (true) {
            const distance = getLevenshteinDistance(word, node.word);
            if (distance === 0) return;

            if (!node.children.has(distance)) {
                node.children.set(distance, new BKTreeNode(word));
                break;
            }
            node = node.children.get(distance)!;
        }
    }

    search(query: string, maxDistance: number): { word: string; distance: number }[] {
        if (!this.root) return [];

        const results: { word: string; distance: number }[] = [];
        const candidates: BKTreeNode[] = [this.root];

        while (candidates.length > 0) {
            const node = candidates.pop()!;
            const distance = getLevenshteinDistance(query, node.word);

            if (distance <= maxDistance) {
                results.push({ word: node.word, distance });
            }

            // BK-Tree search optimization: only search children where distance +/- maxDistance
            const low = distance - maxDistance;
            const high = distance + maxDistance;

            for (const [d, child] of node.children) {
                if (d >= low && d <= high) {
                    candidates.push(child);
                }
            }
        }

        return results;
    }
}
