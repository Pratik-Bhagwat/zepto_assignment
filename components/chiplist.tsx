"use client";

import { useChipList } from "@/context/chiplistContext";
import { Chip } from "./chip";

export const Chiplist = () => {
  const { chipList } = useChipList();

  return (
    <>
      {chipList.length > 0 &&
        chipList.map((user) => <Chip key={user.id} user={user} />)}
    </>
  );
};
