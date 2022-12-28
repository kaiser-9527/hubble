import { KeyboardEvent as ReactKeyboardEvent, useContext, useRef } from "react";
import { RepoContext } from "../context/repo";
import { useHotkeys } from "react-hotkeys-hook";
import { isMac } from "~/utils/helpers";

const SearchBar = () => {
  const { search, searchValue, setSearchValue } = useContext(RepoContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const hotKeyHint = isMac() ? "⌘ k" : "ctrl k";

  // focus to the input
  useHotkeys("meta+k,ctrl+k", () => {
    inputRef.current?.focus();
  });

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

  return (
    <div className="border-2 border-bd-2 transition p-4 rounded-lg relative focus-within:border-primary-500">
      <input
        className="w-full bg-transparent  text-txt-1  focus:outline-0"
        type="text"
        ref={inputRef}
        placeholder="search"
        value={searchValue}
        onKeyDown={handleInputKeydow}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <kbd className="absolute  rounded-lg text-txt-3 right-1 top-0 bottom-0 m-auto px-1 h-7 leading-7 pointer-events-none">
        {hotKeyHint}
      </kbd>
    </div>
  );
};

export default SearchBar;
