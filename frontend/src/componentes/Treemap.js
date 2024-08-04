import React from 'react';

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

export default Treemap;
