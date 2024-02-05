// Create a Cache class
class Cache {
    // Constructor to initialize capacity, cache and keyScores map
    constructor(capacity) {
        // Set the capacity of the cache
        this.capacity = capacity;
        // Map used to store key-value pairs, providing efficient lookup, insertion and deletion operations
        this.cache = new Map();
        // Map used to store scores for keys, used for eviction policy
        this.keyScores = new Map();
    }

    // Get the value associated with the specified key
    get(key) {
        // Get the value for the key from the cache
        const cachedValue = this.cache.get(key);
        if (cachedValue) {
            // If the value exists, update the score and return the value
            this.keyScores.set(key, this.calculateScore(key)); // Update score
            return cachedValue.value;
        } else {
            // If the value does not exist, return -1
            return -1;
        }
    }

    // Put the value and weight associated with the specified key
    put(key, value, weight) {
        if (this.cache.has(key)) {
            // If the key already exists, update the value and last accessed time
            this.cache.set(key, { value, weight, lastAccessedTime: Date.now() });
        } else {
            // If the key does not exist, check the capacity
            if (this.cache.size >= this.capacity) {
                // If the capacity is full, evict one key
                this.evict();
            }
            // Add the key-value pair to the cache and keyScores
            this.cache.set(key, { value, weight, lastAccessedTime: Date.now() });
            this.keyScores.set(key, this.calculateScore(key));
        }
    }

    // Evict the key with the least score
    evict() {
        // Find the key with the least score
        const keyWithLeastScore = this.keyScores.entries().reduce((minEntry, entry) => {
            return entry[1] < minEntry[1] ? entry : minEntry;
        })[0];
        // Delete the key from the cache and keyScores
        this.cache.delete(keyWithLeastScore);
        this.keyScores.delete(keyWithLeastScore);
    }

    // Calculate the score for the key
    calculateScore(key) {
        const cachedValue = this.cache.get(key);
        return cachedValue.weight / (Math.log(Date.now() - cachedValue.lastAccessedTime + 1) + 1);
    }
}


/*

1. get(key):

Time complexity: O(1)
The get(key) method uses the Map.get() method,
which has an average-case time complexity of O(1). 
This means that the time it takes to retrieve a value from the cache is independent of the number of items stored in it.
The cache's efficient hash-based structure allows for quick retrieval of values by key.

2. put(key, value, weight):
Average-case time complexity: O(1)
In most cases, put(...) also has a time complexity of O(1) due to the efficient Map.set() operation.

Worst-case time complexity: O(N)
In the worst-case scenario, where the cache is full and eviction is necessary, the time complexity can become O(N) due to the evict() operation.
This is because evict() involves finding the key with the least score, which involves iterating through the keyScores map.
*/