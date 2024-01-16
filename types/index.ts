export type User = {
  id: number;
  name: string;
  email: string;
};

export type ChipListContextState = {
  chipList: User[];
  setChipList: React.Dispatch<React.SetStateAction<User[]>>;
  allUsers: User[];
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isPressedOnce: boolean;
  setIsPressedOnce: React.Dispatch<React.SetStateAction<boolean>>;
  isPressedTwice: boolean;
  setIsPressedTwice: React.Dispatch<React.SetStateAction<boolean>>;
  isHighlight: boolean;
  setIsHighlight: React.Dispatch<React.SetStateAction<boolean>>;
};
