import { getColorForFood } from "../utils/Color";
import { squarify } from "./Squarify";
const Treemap = ({ node, totalQuantity }) => {
  const width = 800;
  const height = 600;
  const rectangles = squarify(node, 0, 0, width, height);

  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        border: "1px solid #000"
      }}
    >
      {rectangles.map((rect, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: `${rect.x}px`,
            top: `${rect.y}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
            backgroundColor: getColorForFood(rect.value, totalQuantity),
            border: "1px solid #000",
            boxSizing: "border-box",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px"
          }}
          title={`${rect.name}: ${rect.value}`}
        >
          {rect.name}
        </div>
      ))}
    </div>
  );
};
export default Treemap