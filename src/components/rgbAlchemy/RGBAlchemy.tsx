import { FC, useState, useEffect } from "react";
import "./rgbAlchemy.css";

import SquareBlock from "../squareBlock";
import UserInfo from "../userInfo";

import { IUserDetail } from "../../interfaces/IuserDetail";

const RGBAlchemy: FC<{
  userDetails: IUserDetail;
}> = ({ userDetails }) => {
  const [userInfo, setUserInfo] = useState<IUserDetail>({
    target: [0, 0, 0],
    userId: "",
    width: 0,
    height: 0,
    maxMoves: 0,
  });
  const [colorArray, setColorArray] = useState<
    | {
        r: number;
        g: number;
        b: number;
      }[][]
    | []
  >([]);
  const [colors, setColors] = useState<
    | {
        r: number;
        g: number;
        b: number;
      }[][]
    | []
  >([]);
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
  const [closestColor, setClosestColor] = useState<
    { difference: number; color: { r: number; g: number; b: number } }[] | []
  >([]);

  const { target } = userInfo;

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
    setUserInfo(userDetails);
  }, [userDetails]);

  useEffect(() => {
    return setColorArray([...colors]);
  }, [colors]);

  useEffect(() => {
    if (colorArray.length) {
      for (let row = 0; row < userDetails.height + 2; row++) {
        for (let col = 0; col < userDetails.width + 2; col++) {
          let floorElements = document.getElementsByClassName(
            `block_${row}_${col}`
          ) as HTMLCollectionOf<HTMLElement>;

          if (floorElements.length) {
            floorElements[0].style.backgroundColor = `rgb(${colorArray[row][col].r},${colorArray[row][col].g},${colorArray[row][col].b})`;
          }
        }
      }

      let closestColor: {
        difference: number;
        color: { r: number; g: number; b: number };
      }[] = [];
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
              Math.pow(target[0] - r, 2) +
                Math.pow(target[1] - g, 2) +
                Math.pow(target[2] - b, 2)
            ) *
            100;
          closestColor = [
            ...closestColor,
            { difference: result, color: { r: r, g: g, b: b } },
          ];

          if (result < 10) {
            alert("You Won!!!");
            break;
          }
        }
      }

      closestColor.sort((a, b) => {
        return a.difference - b.difference;
      });
      setClosestColor(closestColor);
    }
  }, [colorArray]);

  useEffect(() => {
    if (colorArray.length) {
      let temp = [...colorArray];

      temp[clickedElement.xPos][clickedElement.yPos].r = clickedElement.r;
      temp[clickedElement.xPos][clickedElement.yPos].g = clickedElement.g;
      temp[clickedElement.xPos][clickedElement.yPos].b = clickedElement.b;

      setColorArray(temp);

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

            let temp = [...prevState];
            temp[userDetails.height - i + 1][clickedElement.yPos].r = r * f;
            temp[userDetails.height - i + 1][clickedElement.yPos].g = g * f;
            temp[userDetails.height - i + 1][clickedElement.yPos].b = b * f;

            return [...temp];
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
            let temp2 = [...prevState];
            temp2[i][clickedElement.yPos].r = r * f;
            temp2[i][clickedElement.yPos].g = g * f;
            temp2[i][clickedElement.yPos].b = b * f;
            return [...temp2];
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
            let temp3 = [...prevState];
            temp3[clickedElement.xPos][userDetails.width - j + 1].r = r * f;
            temp3[clickedElement.xPos][userDetails.width - j + 1].g = g * f;
            temp3[clickedElement.xPos][userDetails.width - j + 1].b = b * f;
            return [...temp3];
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
            let temp = [...prevState];
            temp[clickedElement.xPos][j].r = r * f;
            temp[clickedElement.xPos][j].g = g * f;
            temp[clickedElement.xPos][j].b = b * f;
            return [...temp];
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

  const handleClick = (
    e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number
  ) => {
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

  const handleDrag = (
    e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number
  ) => {
    setDraggedElement({
      xPos: x,
      yPos: y,
    });
    if (userInfo.maxMoves === 0) {
      alert("Max moves limit reached!");
    }
  };

  const handleDrop = (
    e: React.MouseEvent<HTMLElement>,
    x: number,
    y: number
  ) => {
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

      setUserInfo((userInfo) => {
        return { ...userInfo, maxMoves: userInfo.maxMoves - 1 };
      });
    }
  };
  return (
    <>
      <UserInfo userDetails={userInfo} closestColor={closestColor[0]} />
      <div className="container">
        {colors.map((row, i) => {
          return (
            <div key={i} className="row">
              {row.map((color, j) => {
                return (
                  <>
                    <SquareBlock
                      color={color}
                      key={j}
                      xPos={i}
                      yPos={j}
                      handleClick={handleClick}
                      handleDrop={handleDrop}
                      handleDrag={handleDrag}
                      closestColor={closestColor[0]}
                    />
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RGBAlchemy;
