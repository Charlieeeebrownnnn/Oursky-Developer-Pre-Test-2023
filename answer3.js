function iter_recur(n) {
    if (n < 2) {
        throw new Error('Invalid input');  // Raise an error for invalid input
      }
    
      let cur_sum = 0;  // Initialize the current sum to 0
    
      for (let i = 2; i <= n; i++) {  // Iterate from 2 to n (inclusive)
        cur_sum += 1 / i;          // Add the current term (1/i) to the sum
        cur_sum *= 1 - 1 / (i * (i - 1));  // Adjust the sum for the next term
      }
    
      return cur_sum;  // Return the final calculated sum
    }