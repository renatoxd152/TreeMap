class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.height = 1;
    this.left = null;
    this.right = null;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  rightRotate(y) {
    let x = y.left;
    let T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insertNode(node, key, value) {
    if (!node) {
      return new Node(key, value);
    }

    if (key < node.key) {
      node.left = this.insertNode(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.insertNode(node.right, key, value);
    } else {
      return node;
    }

    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    let balance = this.getBalance(node);

    if (balance > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }

    if (balance < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }

    if (balance > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  insert(key, value) {
    this.root = this.insertNode(this.root, key, value);
  }

  inOrder(node, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push({ key: node.key, value: node.value });
      this.inOrder(node.right, result);
    }
    return result;
  }

  

  getInOrder() {
    return this.inOrder(this.root);
  }
  

  
}

export default AVLTree;