import React, { useState, ChangeEvent } from "react";

import { SearchBarProps } from "../../../interfaces/props/SearchBarProps.interface";
import SearchBarDisplay from "../../display/static/SearchBarDisplay";

const SearchBar: React.FC<SearchBarProps> = ({ setSearchData }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchData(inputValue);
  };

  return (
    <SearchBarDisplay
      handleInputChange={handleInputChange}
      handleSearch={handleSearch}
      inputValue={inputValue}
    />
  );
};

export default SearchBar;
