import { useState, useEffect } from "react";
import RGBAlchemy from "../components/rgbAlchemy";
import { userData } from "../services/user";
import { IUserDetail } from "../interfaces/IuserDetail";

export const Main = (): JSX.Element => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [userDetails, setUserDetails] = useState<IUserDetail>({
    target: [0,0,0],
    userId:"",
    width:0,
    height:0,
    maxMoves:0

  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userData();
        setUserDetails(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading..</div>;
  }
  return <RGBAlchemy userDetails={userDetails} />;
};
