"use client";

import { createContext, useContext, useState } from "react";
import { ChipListContextState, User } from "@/types";

const INITIAL_STATE = {
  allUsers: [],
  setAllUsers: () => {},
  chipList: [],
  setChipList: () => {},
  isPressedOnce: false,
  setIsPressedOnce: () => {},
  isPressedTwice: false,
  setIsPressedTwice: () => {},
  isHighlight: false,
  setIsHighlight: () => {},
};

const ChipListContext = createContext<ChipListContextState>(INITIAL_STATE);

const ChipListProvider = ({ children }: { children: React.ReactNode }) => {
  const [chipList, setChipList] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isPressedOnce, setIsPressedOnce] = useState(false);
  const [isPressedTwice, setIsPressedTwice] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);

  return (
    <ChipListContext.Provider
      value={{
        chipList,
        setChipList,
        allUsers,
        setAllUsers,
        isPressedOnce,
        setIsPressedOnce,
        isPressedTwice,
        setIsPressedTwice,
        isHighlight,
        setIsHighlight,
      }}
    >
      {children}
    </ChipListContext.Provider>
  );
};

export default ChipListProvider;

export const useChipList = () => useContext(ChipListContext);
