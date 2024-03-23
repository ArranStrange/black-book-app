import React, { useState } from "react";

interface Props {
  onSearch: (searchQuery: string) => void;
}

export default function Search({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search by name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
