import { useChipList } from "@/context/chiplistContext";
import { User } from "@/types";

interface ChipProps {
  user: User;
}

export const Chip = ({ user }: ChipProps) => {
  const {
    allUsers,
    setAllUsers,
    setChipList,
    chipList,
    isHighlight,
    isPressedTwice,
  } = useChipList();

  const handleRemove = () => {
    setAllUsers([...allUsers, user]);
    const newChiplist = chipList.filter((u) => u != user);
    setChipList(newChiplist);
  };

  if (isPressedTwice) {
    const lastUser = chipList[chipList.length - 1];
    setAllUsers([...allUsers, lastUser]);
    const newChiplist = chipList.filter((u) => u.id !== lastUser.id);
    setChipList(newChiplist);
  }

  return (
    <div
      className={`flex items-center gap-x-2 border rounded-full w-fit px-2 py-1 bg-gray-200 ${
        isHighlight && user.id === chipList[chipList.length - 1].id
          ? "border-2 border-blue-700"
          : ""
      }`}
    >
      <div className="w-6 h-6 rounded-full bg-blue-200" />
      <span>{user.name}</span>
      <button
        onClick={handleRemove}
        className="flex items-center justify-centerw-5 h-5 rounded-full"
      >
        X
      </button>
    </div>
  );
};
