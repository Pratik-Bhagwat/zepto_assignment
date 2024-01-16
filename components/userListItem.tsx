import { MutableRefObject } from "react";
import { User } from "@/types";
import { useChipList } from "@/context/chiplistContext";
import { usersList } from "@/constant";

interface UserListItemProps {
  user: User;
  index: number;
  cursor: number;
  listElementsRef: MutableRefObject<HTMLLIElement[] | null>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export const UserListItem = ({
  user,
  index,
  cursor,
  listElementsRef,
  setSearchValue,
}: UserListItemProps) => {
  const { chipList, setChipList } = useChipList();
  const { allUsers, setAllUsers } = useChipList();

  const handleClick = () => {
    setChipList([...chipList, user]);
    const updatedUsers = allUsers.filter((u) => u !== user);
    setAllUsers(updatedUsers);
    setSearchValue("");
  };

  return (
    <li
      onClick={handleClick}
      ref={(el) => (listElementsRef.current[index] = el)}
      className={`flex items-center p-2 hover:cursor-pointer hover:bg-slate-200/45 ${
        cursor === index ? "bg-slate-200/45" : ""
      }`}
    >
      <div className="grid grid-cols-2 w-full">
        <div className="flex items-center justify-center gap-x-3 place-self-start">
          <div className="w-7 h-7 rounded-full bg-blue-300" />
          <span className="font-bold">{user.name}</span>
        </div>
        <span className="text-gray-500">{user.email}</span>
      </div>
    </li>
  );
};
