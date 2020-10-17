- No random access, no constant-time access, O(n)
- Final item's pointer is null
- Sometimes want to track the tail for easy appending
- Insertion is easy and constant, O(1)

Doubly-linked lists: links to next AND previous


- Arrays are stored in a contiguous block of memory
- When array size changes, the memory needs to be re-allocated

Extendable array
- Double the size when you need more space
  - In this case, cost of adding elements is constant (only need to double every 2^x, which diminishes?)

