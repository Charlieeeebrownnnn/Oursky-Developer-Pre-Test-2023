// Constructor to create a new TokenStore instance
function TokenStore() {
    // Stores token prefixes and their counts as key-value pairs
    this.data = new Map();
    // Tracks the total number of tokens ingested
    this.totalTokens = 0;
   }
   
   // Ingests a token string and updates the token counts
   TokenStore.prototype.ingest = function (tokenString) {
    // Splits the token string into individual tokens using colon (:) as the delimiter
    const tokens = tokenString.split(":");
   
    // Iterates through each token in the string
    for (let i = 0; i < tokens.length; i++) {
      // Creates a prefix by joining tokens from the beginning up to the current token
      const prefix = tokens.slice(0, i + 1).join(":");
   
      // Increments the count for the prefix in the data map
      this.data.set(prefix, !this.data.get(prefix) ? 1 : this.data.get(prefix) + 1);
    }
   
    // Increments the total number of tokens
    this.totalTokens++;
   };
   
   // Calculates the appearance frequency of a given prefix
   TokenStore.prototype.appearance = function (prefix) {
    // Checks if the prefix exists in the data map
    if (!this.data.has(prefix)) {
      // Returns 0 if the prefix is not found
      return 0;
    }
   
    // Calculates the appearance frequency by dividing the prefix count by the total number of tokens
    return this.data.get(prefix) / this.totalTokens;
   };
   
   // Example usage
   // Creates a new TokenStore instance
   const store = new TokenStore();
   
   // Ingests multiple token strings
   store.ingest('oursky:uk:dev');
   store.ingest('oursky:hk:design');
   store.ingest('oursky:hk:pm');
   store.ingest('oursky:hk:dev');
   store.ingest('skymaker');
   
   // Logs the appearance frequencies of specific prefixes
   console.log(store.appearance("oursky")); // 0.8
   console.log(store.appearance("oursky:hk")); // 0.6