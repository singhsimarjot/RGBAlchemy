import { FC } from "react";
import "./userInfo.css";

import { IUserDetail } from "../../interfaces/IuserDetail";

const UserInfo: FC<{
  userDetails: IUserDetail;
  closestColor: {
    difference: number;
    color: { r: number; g: number; b: number };
  };
}> = ({ userDetails, closestColor }) => {
  if (userDetails) {
    const { target } = userDetails;
    return (
      <div className="user_info">
        <ul>
          <li>User ID {userDetails.userId}</li>
          <li>Moves Left {userDetails.maxMoves}</li>
          {target && (
            <li>
             <span>Target color: </span> 
              <span
                className="squareBlock"
                style={{
                  display: "inline-block",
                  marginBottom:0,
                  backgroundColor: `rgb(${target[0]},${target[1]},${target[2]})`,
                }}
              ></span>{" "}
            </li>
          )}
          {closestColor && (
            <li>
                  <span>Closest Color :  </span> 
              
              <span
                className="squareBlock"
                style={{
                  display: "inline-block",
                  marginBottom:0,
                  backgroundColor: `rgb(${closestColor.color.r},${closestColor.color.g},${closestColor.color.b})`,
                }}
              ></span>{" "}
              <span>{closestColor.difference.toFixed(2)}%</span>{" "}
            </li>
          )}
        </ul>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

export default UserInfo;
