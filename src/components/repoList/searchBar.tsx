import {
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import { RepoContext } from "../context/repo";

const SearchBar = () => {
  const { search, searchValue, setSearchValue } = useContext(RepoContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // do search
  const handleInputKeydow = (e: ReactKeyboardEvent<HTMLElement>) => {
    const key = e.key;

    if (key === "Enter") {
      search(searchValue);
    }

    if (key === "Escape") {
      inputRef.current?.blur();
    }
  };

  // keyboard event
  const handleCK = (e: KeyboardEvent) => {
    if (e.key === "k" && e.ctrlKey) {
      inputRef.current?.focus();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleCK);
    return () => {
      document.removeEventListener("keydown", handleCK);
    };
  }, []);

  return (
    <div className="border-2 border-bd-2 transition p-4 rounded-lg focus-within:border-primary-500">
      <input
        className="w-full bg-transparent  text-txt-1  focus:outline-0"
        type="text"
        ref={inputRef}
        value={searchValue}
        placeholder="CMD K"
        onKeyDown={handleInputKeydow}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
