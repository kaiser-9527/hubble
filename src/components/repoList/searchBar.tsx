import {
  useState,
  KeyboardEvent as ReactKeyboardEvent,
  useContext,
  useEffect,
  useRef,
} from "react";
import { SearchContext } from ".";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { search } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // do search
  const handleInputKeydow = (e: ReactKeyboardEvent<HTMLElement>) => {
    const key = e.key;
    if (key === "Enter") {
      search(value);
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
  }, []);

  return (
    <div className="border-4 border-primary-50 transition p-4 rounded-lg focus-within:border-primary-500">
      {/* TODO search icon */}
      <input
        className="w-full bg-transparent  text-txt-1  focus:outline-0"
        type="text"
        ref={inputRef}
        value={value}
        placeholder="CMD K"
        onKeyDown={handleInputKeydow}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
