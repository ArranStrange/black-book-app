import React, { useState } from "react";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";

interface Props {
  onSearch: (searchQuery: string) => void;
}

export default function Search({ onSearch }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

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
    <>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search"
        />
        <div className="dropdown-buttons" onClick={handleDropdown}>
          {dropdown ? <RxCross2 size={35} /> : <RxHamburgerMenu size={35} />}
        </div>

        {dropdown && (
          <div className="dropdown-search-options">
            <input type="radio" />
          </div>
        )}
      </form>
    </>
  );
}
