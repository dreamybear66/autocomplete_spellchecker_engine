/**
 * Item in the Priority Queue
 */
export interface PriorityQueueItem<T> {
    value: T;
    priority: number;
}

/**
 * Priority Queue implementation using a binary heap
 * Supports both min-heap and max-heap configurations
 */
export class PriorityQueue<T> {
    private heap: PriorityQueueItem<T>[];
    private isMaxHeap: boolean;

    /**
     * @param isMaxHeap - true for max-heap (higher priority first), false for min-heap (lower priority first)
     */
    constructor(isMaxHeap: boolean = true) {
        this.heap = [];
        this.isMaxHeap = isMaxHeap;
    }

    /**
     * Insert an item with a given priority
     * Time Complexity: O(log n)
     */
    insert(value: T, priority: number): void {
        const item: PriorityQueueItem<T> = { value, priority };
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    /**
     * Extract the item with highest/lowest priority (depending on heap type)
     * Time Complexity: O(log n)
     */
    extractTop(): T | null {
        if (this.isEmpty()) return null;

        const top = this.heap[0].value;
        const last = this.heap.pop()!;

        if (this.heap.length > 0) {
            this.heap[0] = last;
            this.bubbleDown(0);
        }

        return top;
    }

    /**
     * Peek at the top item without removing it
     * Time Complexity: O(1)
     */
    peek(): T | null {
        return this.isEmpty() ? null : this.heap[0].value;
    }

    /**
     * Get the priority of the top item
     */
    peekPriority(): number | null {
        return this.isEmpty() ? null : this.heap[0].priority;
    }

    /**
     * Check if the queue is empty
     */
    isEmpty(): boolean {
        return this.heap.length === 0;
    }

    /**
     * Get the size of the queue
     */
    size(): number {
        return this.heap.length;
    }

    /**
     * Get all items as an array (sorted by priority)
     */
    toArray(): T[] {
        return [...this.heap]
            .sort((a, b) => this.compare(a, b))
            .map(item => item.value);
    }

    /**
     * Clear all items from the queue
     */
    clear(): void {
        this.heap = [];
    }

    /**
     * Bubble up the item at the given index
     */
    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.compare(this.heap[index], this.heap[parentIndex]) <= 0) {
                break;
            }

            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    /**
     * Bubble down the item at the given index
     */
    private bubbleDown(index: number): void {
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let largest = index;

            if (
                leftChild < this.heap.length &&
                this.compare(this.heap[leftChild], this.heap[largest]) > 0
            ) {
                largest = leftChild;
            }

            if (
                rightChild < this.heap.length &&
                this.compare(this.heap[rightChild], this.heap[largest]) > 0
            ) {
                largest = rightChild;
            }

            if (largest === index) break;

            this.swap(index, largest);
            index = largest;
        }
    }

    /**
     * Compare two items based on heap type
     * Returns positive if a has higher priority, negative if b has higher priority
     */
    private compare(a: PriorityQueueItem<T>, b: PriorityQueueItem<T>): number {
        return this.isMaxHeap
            ? a.priority - b.priority
            : b.priority - a.priority;
    }

    /**
     * Swap two items in the heap
     */
    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}
