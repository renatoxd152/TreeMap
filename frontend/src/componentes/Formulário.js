import React, { useEffect, useState } from 'react';
import { getRandomColor } from '../utils/Color.js';
import { createAVLTree } from './Squarify.js';
import Treemap from './Treemap.js';
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

  const root = createAVLTree(foodList);
  const totalQuantity = foodList.reduce((total, item) => total + parseInt(item.quantity, 10), 0);

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
          <Treemap node={root} totalQuantity={totalQuantity} />
        </div>
      </div>
    </div>
  );
};

export default Forms;
