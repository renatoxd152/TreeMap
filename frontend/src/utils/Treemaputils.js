export class TreeNode {
    constructor(value, left = null, right = null) {
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }
  
  export const insertNode = (root, value) => {
    if (!root) return new TreeNode(value);
  
    if (parseInt(value.quantity, 10) < parseInt(root.value.quantity, 10)) {
      root.left = insertNode(root.left, value);
    } else {
      root.right = insertNode(root.right, value);
    }
  
    return root;
  };
  
  export const createBinaryTree = (data) => {
    let root = null;
    data.sort((a, b) => b.quantity - a.quantity).forEach(item => {
      root = insertNode(root, item);
    });
    return root;
  };
  