"use client";

import { usersList } from "@/constant";
import useDebounce from "@/hooks/useDebounce";
import { useUserSearch } from "@/hooks/useUserSearch";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserListItem } from "./userListItem";
import { useChipList } from "@/context/chiplistContext";

export const Search = () => {
  const {
    allUsers,
    setAllUsers,
    isHighlight,
    isPressedOnce,
    isPressedTwice,
    setIsHighlight,
    setIsPressedOnce,
    setIsPressedTwice,
  } = useChipList();

  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const searchResults = useUserSearch(allUsers, debouncedValue);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const wrapperRef = useRef(null);

  const [cursor, setCursor] = useState(0);
  const listElementsRef = useRef<HTMLLIElement[] | null>([]);

  const [isFirstFocus, setIsFirstFocus] = useState(true);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsInputFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleFocus = () => {
    if (isFirstFocus) {
      setAllUsers(usersList);
      setIsFirstFocus(false);
    }
    setIsInputFocused(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && cursor > 0) {
      setCursor(cursor - 1);
    } else if (e.key === "ArrowDown" && cursor < allUsers.length - 1) {
      setCursor(cursor + 1);
    } else if (e.key === "Backspace") {
      if (isPressedOnce && searchValue === "") {
        setIsPressedTwice(true);
      } else if (searchValue === "") {
        setIsPressedOnce(true);
        setIsHighlight(true);
      }
    }
  };

  if (isPressedTwice) {
    setIsHighlight(false);
    setIsPressedTwice(false);
    setIsPressedOnce(false);
  }

  useEffect(() => {
    if (listElementsRef.current[cursor]) {
      listElementsRef.current[cursor].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [cursor]);

  return (
    <div ref={wrapperRef}>
      <input
        type="text"
        onFocus={handleFocus}
        value={searchValue}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        className="relative focus:outline-none focus:border-none"
        placeholder="Search.."
      />
      {isInputFocused && allUsers.length > 0 && !debouncedValue && (
        <ul className="flex flex-col absolute rounded-md shadow-md w-fit h-60 overflow-auto bg-white">
          {allUsers.map((user, index) => (
            <UserListItem
              key={user.id}
              user={user}
              index={index}
              cursor={cursor}
              listElementsRef={listElementsRef}
              setSearchValue={setSearchValue}
            />
          ))}
        </ul>
      )}
      {isInputFocused && debouncedValue && searchResults.length > 0 && (
        <ul className="flex flex-col absolute rounded-md shadow-md w-fit h-auto bg-white">
          {searchResults.map((user, index) => (
            <UserListItem
              key={user.id}
              user={user}
              index={index}
              cursor={cursor}
              listElementsRef={listElementsRef}
              setSearchValue={setSearchValue}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
