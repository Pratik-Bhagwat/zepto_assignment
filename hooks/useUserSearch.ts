import { User } from "@/types";
import { useState, useEffect } from "react";

export const useUserSearch = (usersList: User[], debouncedValue: string) => {
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (debouncedValue) {
      const results = usersList.filter((user) =>
        user.name.toLowerCase().includes(debouncedValue.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults(usersList);
    }
  }, [debouncedValue, usersList]);

  return searchResults;
};
