import AVLTree from "../utils/Treemaputils";

export const createAVLTree = (foodList) => {
  const tree = new AVLTree();
  foodList.forEach(food => tree.insert(food.name, parseInt(food.quantity, 10)));
  return tree.getInOrder();
};

export const squarify = (data, x, y, width, height) => {
  let totalValue = data.reduce((sum, item) => sum + item.value, 0);
  let rectangles = [];
  let offsetX = x;
  let offsetY = y;
  let remainingWidth = width;
  let remainingHeight = height;

  data.forEach(item => {
    let itemArea = (item.value / totalValue) * width * height;
    let itemWidth, itemHeight;
    if (remainingWidth > remainingHeight) {
      itemWidth = itemArea / remainingHeight;
      itemHeight = remainingHeight;
      rectangles.push({ ...item, x: offsetX, y: offsetY, width: itemWidth, height: itemHeight });
      offsetX += itemWidth;
      remainingWidth -= itemWidth;
    } else {
      itemWidth = remainingWidth;
      itemHeight = itemArea / remainingWidth;
      rectangles.push({ ...item, x: offsetX, y: offsetY, width: itemWidth, height: itemHeight });
      offsetY += itemHeight;
      remainingHeight -= itemHeight;
    }
  });

  return rectangles;
};