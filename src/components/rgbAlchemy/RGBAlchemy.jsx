import { useState, useEffect } from "react";
import SquareBlock from "../squareBlock";
import "./rgbAlchemy.css";
import UserInfo from "../userInfo";
const RGBAlchemy = ({ userDetails }) => {
  const [colorArray, setColorArray] = useState([]);
  const [colors, setColors] = useState([]);
  const [clickedElement, setClickedElement] = useState({
    r: 0,
    g: 0,
    b: 0,
    xPos: 0,
    yPos: 0,
  });
  const [draggedElement, setDraggedElement] = useState({
    xPos: 0,
    yPos: 0,
  });
  const [dropElement, setDropElement] = useState({
    xPos: 0,
    yPos: 0,
  });
  const [clickFlag, setClickFlag] = useState(3);

  const grid = [];
  const targetColor = {
    r: 255,
    g: 204,
    b: 46,
  };

  useEffect(() => {
    setColorArray([...colors]);
  }, [colors]);

  useEffect(() => {
    if (colorArray.length) {
      // for (let row = 0; row < userDetails.height + 2; row++) {
      //   for (let col = 0; col < userDetails.width + 2; col++) {
      //     document.querySelectorAll(
      //       `[data-x-pos="${row}"][data-y-pos="${col}"]`
      //     )[0].style.backgroundColor = `rgb(${colorArray[row][col].r},${colorArray[row][col].g},${colorArray[row][col].b})`;
      //   }
      // }
      for (let row = 1; row < userDetails.height + 1; row++) {
        for (let col = 1; col < userDetails.width + 1; col++) {
          let r, g, b, result;
          r = colorArray[row][col].r;
          g = colorArray[row][col].g;
          b = colorArray[row][col].b;
          result =
            (1 / 255) *
            (1 / Math.sqrt(3)) *
            Math.sqrt(
              Math.pow(targetColor.r - r, 2) +
                Math.pow(targetColor.g - g, 2) +
                Math.pow(targetColor.b - b, 2)
            ) *
            100;
          console.log(result);
          if (result < 10) {
            console.warn("You Won!!!");
          }
        }
      }
    }
  }, [colorArray]);

  useEffect(() => {
    if (colorArray.length) {
      setColorArray([
        ...colorArray,
        (colorArray[clickedElement.xPos][clickedElement.yPos].r =
          clickedElement.r),
        (colorArray[clickedElement.xPos][clickedElement.yPos].g =
          clickedElement.g),
        (colorArray[clickedElement.xPos][clickedElement.yPos].b =
          clickedElement.b),
      ]);

      if (clickedElement.xPos === 0) {
        for (let i = 1; i <= userDetails.height; i++) {
          setColorArray((prevState) => {
            let r, g, b;
            if (
              !prevState[userDetails.height - i + 1][clickedElement.yPos].r &&
              !prevState[userDetails.height - i + 1][clickedElement.yPos].g &&
              !prevState[userDetails.height - i + 1][clickedElement.yPos].b
            ) {
              r = (clickedElement.r * i) / (userDetails.height + 1);
              g = (clickedElement.g * i) / (userDetails.height + 1);
              b = (clickedElement.b * i) / (userDetails.height + 1);
            } else {
              r =
                prevState[userDetails.height - i + 1][clickedElement.yPos].r +
                (clickedElement.r * i) / (userDetails.height + 1);
              g =
                prevState[userDetails.height - i + 1][clickedElement.yPos].g +
                (clickedElement.g * i) / (userDetails.height + 1);
              b =
                prevState[userDetails.height - i + 1][clickedElement.yPos].b +
                (clickedElement.b * i) / (userDetails.height + 1);
            }
            let f = 255 / Math.max(r, g, b, 255);
            return [
              ...prevState,
              (colorArray[userDetails.height - i + 1][clickedElement.yPos].r =
                r * f),
              (colorArray[userDetails.height - i + 1][clickedElement.yPos].g =
                g * f),
              (colorArray[userDetails.height - i + 1][clickedElement.yPos].b =
                b * f),
            ];
          });
        }
      }
      if (clickedElement.xPos === userDetails.height + 1) {
        for (let i = 1; i <= userDetails.height; i++) {
          setColorArray((prevState) => {
            let r, g, b;
            if (
              !prevState[i][clickedElement.yPos].r &&
              !prevState[i][clickedElement.yPos].g &&
              !prevState[i][clickedElement.yPos].b
            ) {
              r = (clickedElement.r * i) / (userDetails.height + 1);
              g = (clickedElement.g * i) / (userDetails.height + 1);
              b = (clickedElement.b * i) / (userDetails.height + 1);
            } else {
              r =
                prevState[i][clickedElement.yPos].r +
                (clickedElement.r * i) / (userDetails.height + 1);
              g =
                prevState[i][clickedElement.yPos].g +
                (clickedElement.g * i) / (userDetails.height + 1);
              b =
                prevState[i][clickedElement.yPos].b +
                (clickedElement.b * i) / (userDetails.height + 1);
            }
            let f = 255 / Math.max(r, g, b, 255);
            return [
              ...prevState,
              (colorArray[i][clickedElement.yPos].r = r * f),
              (colorArray[i][clickedElement.yPos].g = g * f),
              (colorArray[i][clickedElement.yPos].b = b * f),
            ];
          });
        }
      }

      if (clickedElement.yPos === 0) {
        for (let j = 1; j <= userDetails.width; j++) {
          setColorArray((prevState) => {
            let r, g, b;
            if (
              !prevState[clickedElement.xPos][userDetails.width - j + 1].r &&
              !prevState[clickedElement.xPos][userDetails.width - j + 1].g &&
              !prevState[clickedElement.xPos][userDetails.width - j + 1].b
            ) {
              r = (clickedElement.r * j) / (userDetails.width + 1);
              g = (clickedElement.g * j) / (userDetails.width + 1);
              b = (clickedElement.b * j) / (userDetails.width + 1);
            } else {
              r =
                prevState[clickedElement.xPos][userDetails.width - j + 1].r +
                (clickedElement.r * j) / (userDetails.width + 1);
              g =
                prevState[clickedElement.xPos][userDetails.width - j + 1].g +
                (clickedElement.g * j) / (userDetails.width + 1);
              b =
                prevState[clickedElement.xPos][userDetails.width - j + 1].b +
                (clickedElement.b * j) / (userDetails.width + 1);
            }
            let f = 255 / Math.max(r, g, b, 255);
            return [
              ...prevState,
              (colorArray[clickedElement.xPos][userDetails.width - j + 1].r =
                r * f),
              (colorArray[clickedElement.xPos][userDetails.width - j + 1].g =
                g * f),
              (colorArray[clickedElement.xPos][userDetails.width - j + 1].b =
                b * f),
            ];
          });
        }
      }
      if (clickedElement.yPos === userDetails.width + 1) {
        for (let j = 1; j <= userDetails.width; j++) {
          setColorArray((prevState) => {
            let r, g, b;
            if (
              !prevState[clickedElement.xPos][j].r &&
              !prevState[clickedElement.xPos][j].g &&
              !prevState[clickedElement.xPos][j].b
            ) {
              r = (clickedElement.r * j) / (userDetails.width + 1);
              g = (clickedElement.g * j) / (userDetails.width + 1);
              b = (clickedElement.b * j) / (userDetails.width + 1);
            } else {
              r =
                prevState[clickedElement.xPos][j].r +
                (clickedElement.r * j) / (userDetails.width + 1);
              g =
                prevState[clickedElement.xPos][j].g +
                (clickedElement.g * j) / (userDetails.width + 1);
              b =
                prevState[clickedElement.xPos][j].b +
                (clickedElement.b * j) / (userDetails.width + 1);
            }
            let f = 255 / Math.max(r, g, b, 255);
            return [
              ...prevState,
              (colorArray[clickedElement.xPos][j].r = r * f),
              (colorArray[clickedElement.xPos][j].g = g * f),
              (colorArray[clickedElement.xPos][j].b = b * f),
            ];
          });
        }
      }
    }
  }, [clickedElement]);

  useEffect(() => {
    if (colorArray.length) {
      setClickedElement({
        r: colorArray[draggedElement.xPos][draggedElement.yPos].r,
        g: colorArray[draggedElement.xPos][draggedElement.yPos].g,
        b: colorArray[draggedElement.xPos][draggedElement.yPos].b,
        xPos: dropElement.xPos,
        yPos: dropElement.yPos,
      });
    }
  }, [dropElement]);

  useEffect(() => {
    let colors = [];
    for (let row = 0; row < userDetails.height + 2; row++) {
      const arrayY = [];
      for (let col = 0; col < userDetails.width + 2; col++) {
        arrayY.push({ r: 0, g: 0, b: 0 });
      }
      colors.push(arrayY);
    }
    setColors(colors);
  }, [userDetails]);

  const handleClick = (e, x, y) => {
    if (
      clickFlag > 0 &&
      ((x === 0 && y <= userDetails.width) ||
        (y === 0 && x <= userDetails.height) ||
        (y === userDetails.width + 1 && x <= userDetails.height) ||
        (x === userDetails.height + 1 && y <= userDetails.width))
    ) {
      setClickFlag((clickFlag) => clickFlag - 1);
      if (clickFlag === 3) {
        setClickedElement({
          r: 255,
          g: 0,
          b: 0,
          xPos: x,
          yPos: y,
        });
      }
      if (clickFlag === 2) {
        setClickedElement({
          r: 0,
          g: 255,
          b: 0,
          xPos: x,
          yPos: y,
        });
      }
      if (clickFlag === 1) {
        setClickedElement({
          r: 0,
          g: 0,
          b: 255,
          xPos: x,
          yPos: y,
        });
      }
    }
  };

  const handleDrag = (e, x, y) => {
    setDraggedElement({
      xPos: x,
      yPos: y,
    });
  };

  const handleDrop = (e, x, y) => {
    if (
      (x === 0 && y <= userDetails.width) ||
      (y === 0 && x <= userDetails.height) ||
      (y === userDetails.width + 1 && x <= userDetails.height) ||
      (x === userDetails.height + 1 && y <= userDetails.width)
    ) {
      setDropElement({
        xPos: x,
        yPos: y,
      });
    }
  };

  return (
    <div className="container">
        <UserInfo userDetails={userDetails} /> 
     
      {colors.map((row, i) => {
        return (
          <div key={i} className="row">
            {row.map((color, j) => {
              return (
                <SquareBlock
                color ={color}
                  key={j}
                  xPos={i}
                  yPos={j}
                  handleClick={handleClick}
                  handleDrop={handleDrop}
                  handleDrag={handleDrag}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default RGBAlchemy;
