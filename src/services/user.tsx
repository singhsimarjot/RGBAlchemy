 
 import axios from "axios";

export  const userData = async () => {
    const res =  await  axios.get("http://localhost:9876/init");
 return res.data
         
  }

  