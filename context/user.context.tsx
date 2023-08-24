"use client";

import { useState, useEffect, createContext, useReducer } from "react";

type UserType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: string;
  photo: string;
  phone: number;
  country: string;
  city: string;
  job: string;
  password: string;
  token?: string;
};

export const UserContext = createContext<{
  user: UserType | null | undefined;
}>({ user: null });

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [users, setUsers] = useState<UserType | null>();

  useEffect(() => {
    const storage: string | null = localStorage.getItem("lingoUser");
    if (storage === null || storage === undefined) {
      setUsers(null);
    } else {
      setUsers(JSON.parse(storage));
    }
  }, []);
  return (
    <UserContext.Provider value={{ user: users }}>
      {children}
    </UserContext.Provider>
  );
};
