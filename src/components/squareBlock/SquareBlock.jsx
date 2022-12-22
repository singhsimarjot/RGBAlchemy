import "./squareBlock.css";

const SquareBlock = (props) => {
  const { color, xPos, yPos, handleClick, handleDrop, handleDrag } = props;
   return (
    <div
      className="squareBlock"
      data-x-pos={xPos}
      data-y-pos={yPos}
      onDrop={(e) => {
        console.log(e);
        handleDrop(e, xPos, yPos);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragStart={(e) => {
        handleDrag(e, xPos, yPos);
      }}
      draggable={true}
      onClick={(e) => {
        handleClick(e, xPos, yPos);
      }}
      style={{
        backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
      }}
    ></div>
  );
};

export default SquareBlock;
