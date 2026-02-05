/**
 * Calculate the Levenshtein Distance (Edit Distance) between two strings
 * This measures the minimum number of single-character edits (insertions, deletions, substitutions)
 * required to change one string into another.
 * 
 * Time Complexity: O(m * n) where m and n are the lengths of the two strings
 * Space Complexity: O(m * n) for the DP table
 */
export function levenshteinDistance(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    const m = s1.length;
    const n = s2.length;

    // Create a 2D DP table
    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(0));

    // Initialize base cases
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i; // Cost of deleting all characters from s1
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j; // Cost of inserting all characters to s1
    }

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                // Characters match, no operation needed
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Take minimum of three operations
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Deletion
                    dp[i][j - 1],     // Insertion
                    dp[i - 1][j - 1]  // Substitution
                );
            }
        }
    }

    return dp[m][n];
}

/**
 * Calculate the Damerau-Levenshtein Distance
 * This extends Levenshtein distance to include transposition of adjacent characters
 * 
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
export function damerauLevenshteinDistance(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    const m = s1.length;
    const n = s2.length;

    const dp: number[][] = Array(m + 1)
        .fill(null)
        .map(() => Array(n + 1).fill(Infinity));

    dp[0][0] = 0;

    for (let i = 1; i <= m; i++) {
        dp[i][0] = i;
    }
    for (let j = 1; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;

            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,      // Deletion
                dp[i][j - 1] + 1,      // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );

            // Transposition
            if (
                i > 1 &&
                j > 1 &&
                s1[i - 1] === s2[j - 2] &&
                s1[i - 2] === s2[j - 1]
            ) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
            }
        }
    }

    return dp[m][n];
}

/**
 * Find the closest matching words from a dictionary based on edit distance
 * @param word - The misspelled word
 * @param dictionary - Array of correct words
 * @param maxDistance - Maximum edit distance to consider (default: 2)
 * @param maxResults - Maximum number of suggestions to return (default: 5)
 * @returns Array of suggestions with their edit distances, sorted by distance
 */
export function findClosestMatches(
    word: string,
    dictionary: string[],
    maxDistance: number = 2,
    maxResults: number = 5
): Array<{ word: string; distance: number; confidence: 'high' | 'medium' | 'low' }> {
    const suggestions: Array<{ word: string; distance: number }> = [];

    for (const dictWord of dictionary) {
        const distance = levenshteinDistance(word, dictWord);

        if (distance <= maxDistance && distance > 0) {
            suggestions.push({ word: dictWord, distance });
        }
    }

    // Sort by distance (ascending) and take top results
    const sorted = suggestions
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults);

    // Add confidence levels
    return sorted.map(({ word, distance }) => ({
        word,
        distance,
        confidence: distance === 1 ? 'high' : distance === 2 ? 'medium' : 'low'
    }));
}

/**
 * Calculate similarity percentage between two strings
 * @returns Percentage similarity (0-100)
 */
export function calculateSimilarity(str1: string, str2: string): number {
    const maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 100;

    const distance = levenshteinDistance(str1, str2);
    return ((maxLength - distance) / maxLength) * 100;
}

/**
 * Check if a word is likely a typo based on edit distance threshold
 */
export function isLikelyTypo(word: string, correctWord: string, threshold: number = 2): boolean {
    return levenshteinDistance(word, correctWord) <= threshold;
}
