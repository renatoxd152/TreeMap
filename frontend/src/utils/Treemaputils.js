export class TreeNode {
  constructor(value, left = null, right = null, height = 1) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = height;
  }
}

const getHeight = (node) => (node ? node.height : 0);

const getBalance = (node) => (node ? getHeight(node.left) - getHeight(node.right) : 0);

const rotateRight = (y) => {
  const x = y.left;
  const T2 = x.right;

  x.right = y;
  y.left = T2;

  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;
  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;

  return x;
};

const rotateLeft = (x) => {
  const y = x.right;
  const T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;
  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;

  return y;
};

export const insertNode = (node, value) => {
  if (!node) return new TreeNode(value);

  if (parseInt(value.quantity, 10) < parseInt(node.value.quantity, 10)) {
    node.left = insertNode(node.left, value);
  } else {
    node.right = insertNode(node.right, value);
  }

  node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;

  const balance = getBalance(node);

  if (balance > 1 && parseInt(value.quantity, 10) < parseInt(node.left.value.quantity, 10)) {
    return rotateRight(node);
  }

  if (balance < -1 && parseInt(value.quantity, 10) > parseInt(node.right.value.quantity, 10)) {
    return rotateLeft(node);
  }

  if (balance > 1 && parseInt(value.quantity, 10) > parseInt(node.left.value.quantity, 10)) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }

  if (balance < -1 && parseInt(value.quantity, 10) < parseInt(node.right.value.quantity, 10)) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  return node;
};

export const createAVLTree = (data) => {
  let root = null;
  data.forEach(item => {
    root = insertNode(root, item);
  });

  return root;
};





