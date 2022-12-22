import React, { FC } from "react";
import { IUserDetail } from "../../interfaces/IuserDetail";

const UserInfo: FC<{ userDetails: IUserDetail  }> = ({ userDetails }) => {
    if(userDetails){
        return <div>
            <ul>
                <li>User ID{userDetails.userId}</li>
                <li>Moves Left {userDetails.maxMoves}</li>
                <li>Target color: {userDetails.target}</li>
                <li>Closest color: {userDetails.target}</li>
            </ul>
               </div>
    }
   
    else {
        return <div> </div> 
    }
};

export default UserInfo;
