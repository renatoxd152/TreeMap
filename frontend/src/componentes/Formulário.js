import React, { useEffect, useState } from 'react';
import '../treemap.css';

const getRandomColor = () => `hsl(${Math.random() * 360}, 70%, 80%)`;

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);

  if (parseInt(value.quantity, 10) < parseInt(root.value.quantity, 10)) {
    root.left = insertNode(root.left, value);
  } else {
    root.right = insertNode(root.right, value);
  }

  return root;
};


const createBinaryTree = (data) => {
  let root = null;
  data.sort((a, b) => b.quantity - a.quantity).forEach(item => {
    root = insertNode(root, item);
  });
  return root;
};

const Treemap = ({ node, totalQuantity }) => {
    if (!node) return null;
  
    const nodeSize = (node.value.quantity / totalQuantity) * 100;
    
    const nodeStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid black',
      margin: '0',
      padding: '5px',
      backgroundColor: node.value.color,
      flex: `${nodeSize}%`,
      boxSizing: 'border-box',
    };
  
    const childrenStyle = {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
    };
  
    return (
      <div style={nodeStyle}>
        <div>{node.value.name} - {node.value.quantity}</div>
        <div style={childrenStyle}>
          <Treemap node={node.left} totalQuantity={totalQuantity} />
          <Treemap node={node.right} totalQuantity={totalQuantity} />
        </div>
      </div>
    );
  };
  

const Forms = () => {
  const [food, setFood] = useState({ name: '', quantity: '' });
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const savedFoodList = localStorage.getItem('foodList');
    if (savedFoodList) {
      setFoodList(JSON.parse(savedFoodList));
    }
  }, []);

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFood = { ...food, color: getRandomColor() };

    const updatedFoodList = [...foodList, newFood];
    setFoodList(updatedFoodList);
    localStorage.setItem('foodList', JSON.stringify(updatedFoodList));
    setFood({ name: '', quantity: '' });
  };

  const root = createBinaryTree(foodList);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={food.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Adicionar alimento</button>
      </form>

      <div style={{ height: '80vh', width: '100vw', margin: '0 auto', marginTop: '100px', border: '1px solid black', display: 'flex' }}>
        <div style={{ width: '20%', border: '1px solid black', overflowY: 'auto' }}>
          <ul>
            <p>Legenda:</p>
            {foodList.map((item, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: item.color,
                    width: '20px',
                    height: '20px',
                    marginRight: '10px',
                    border: '1px solid black'
                  }}
                />
                {item.name} - {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1, border: '1px solid black', overflow: 'auto' }}>
          <Treemap node={root} />
        </div>
      </div>
    </div>
  );
};

export default Forms;
