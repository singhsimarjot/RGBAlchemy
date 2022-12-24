import { FC } from "react";
import "./squareBlock.css";

const SquareBlock: FC<{
  color:{ r: number; g: number; b: number },
  closestColor: {
    difference: number;
    color: { r: number; g: number; b: number };
  },
  xPos:number,
  yPos:number,
  handleClick:( e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number)=> void,
  handleDrop:( e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number)=>void,
  handleDrag:( e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number)=>void
  
}> = ({ color, closestColor,xPos, yPos,handleClick, handleDrop, handleDrag }) => {
   
  let active =
    closestColor?.color.r === 0 &&
    closestColor?.color.b === 0 &&
    closestColor?.color.g === 0
      ? false
      : closestColor?.color.b === color.b &&
        closestColor?.color.r === color.r &&
        closestColor?.color.g === color.g;
  return (
    <div
      className={`block_${xPos}_${yPos} ${
        active ? "squareBlock activeBlock" : "squareBlock"
      } `}
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
      title={`${color.r},${color.g},${color.b}`}
    ></div>
  );
};

export default SquareBlock;
