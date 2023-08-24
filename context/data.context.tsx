"use client";

import { useState, useEffect, createContext, useReducer } from "react";

type GhostwritingInputs = {
   writingType: string;
  title: string;
  subtitle?: string;
  authorName: string;
  preferences?: string;
  type: string;
  count: number;
  genre: string;
  summary: string;
  description?: string;
  noOfChapters: number;
  wordCountPerChapter: number;
  wordCount: number;
  audience: string;
  bookSize: string;
  outline: string;
  resource: string;
  file?: {}[];
};

export const DataContext = createContext<{
  data: GhostwritingInputs | null | undefined;
}>({ data: null });

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<GhostwritingInputs | null>();

  useEffect(() => {
    const storage: string | null = localStorage.getItem(
      "lingoGhostwritingServiceDataExist"
    );
    if (storage === null || storage === undefined) {
      setData(null);
    } else {
      setData(JSON.parse(storage));
    }
  }, []);
  return (
    <DataContext.Provider value={{ data: data }}>
      {children}
    </DataContext.Provider>
  );
};
