### Part 1
Write code that implements a binary search tree in an object-oriented fashion with the following features and properties:
- In the tree one can address nodes using a key. No assumption should be made about the type of the key.
- Each node also stores a value. Again, no assumption should be made about the type of the value.
- Implement a method to store a value under a given key in the tree, and another one to retrieve the value stored under a given key. These should complete in time proportional to the depth of the tree. There is no need to implement deletion of nodes or tree balancing.
- Provide a means through which other programmers who use your code can specify the mechanism for choosing which of the descendant nodes to follow when traversing the tree to insert or retrieve a value.

See:
  - shared.ts
  - shared.types.ts
  - binarySearchTree.ts
  - binarySearchTree.test.ts

### Part 2
Extend the code so that each node could have a maximum of three children instead of two.

See:
  - shared.ts
  - shared.types.ts
  - ternarySearchTree.ts
  - ternarySearchTree.test.ts