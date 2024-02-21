import {  ChangeEvent } from "react";

export interface SearchBarDisplayProps {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  inputValue: string;
}
