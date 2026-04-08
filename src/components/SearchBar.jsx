import { useState } from "react";

function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      onSearch("");
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={handleChange}
        aria-label="Search movies"
      />
      <button type="submit" aria-label="Search">
        🔍
      </button>
    </form>
  );
}

export default SearchBar;
