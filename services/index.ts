import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./../context/user.context";

type dataType = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
  size: number;
};

//GET DATA METHOD
export const getData = async (url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/${url}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

// POST METHOD:
export const postData = async (url: string, data: {}) => {
  const userExist: any = localStorage.getItem("lingoUser");
  const user: any = JSON.parse(userExist);
  let xid = user?._id;
  const link = `${process.env.NEXT_PUBLIC_API_UR}/${url}?xid=${xid}`;
  const response = await axios.post(link, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data; // parses JSON response into native JavaScript objects
};
// PUT METHOD:
export const putData = async (url: string, data: {}) => {
  const userExist: any = localStorage.getItem("lingoUser");
  const user: any = JSON.parse(userExist);
  let xid = user?._id;
  const link = `${process.env.NEXT_PUBLIC_API_UR}${url}?xid=${xid}`;
  const response = await fetch(link, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc...
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};

//POST METHOD WITH FILE
export const postDataWithFile = async (url: string, data: Object) => {
  const userExist: any = localStorage.getItem("lingoUser");
  const user: any = JSON.parse(userExist);
  let xid = user?._id;
  const link = `${process.env.NEXT_PUBLIC_API_UR}/${url}?xid=${xid}`;
  try {
    const res = await axios.post(link, data, {
      headers: {
        "Content-Type": "multipart/form-data,application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Network error occurred",
    };
  }
};
