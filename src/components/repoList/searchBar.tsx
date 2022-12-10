import { useState, KeyboardEvent, useContext } from "react";
import "~/styles/search-bar.css";
import { RepoContext } from ".";

const SearchBar = () => {
  const [value, setValue] = useState("");
  const { search } = useContext(RepoContext);

  // do search
  const handleInputKeydow = (e: KeyboardEvent<HTMLElement>) => {
    const key = e.key;
    if (key === "Enter") {
      // TODO search
      search(value);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-label">
        <span>TAG:ui</span>
        <span>Comment:89</span>
      </div>
      <div>
        <input
          type="text"
          value={value}
          onKeyDown={handleInputKeydow}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div>
        <ul>
          <li>{value}</li>
          <li>---</li>
          <li>Tag: {value}</li>
          <li>Comment: {value}</li>
          <li>Pure: {value}</li>
          <li>Language: {value}</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
