// CategoriesSelector.tsx
import React from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

interface CategoriesSelectorProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["hot", "rising", "new", "top"];

  return (
    <ButtonGroup>
      {categories.map((category) => (
        <ToggleButton
          key={category}
          type="radio"
          variant="outline-primary"
          value={category}
          checked={selectedCategory === category}
          onChange={() => setSelectedCategory(category)}
          id={`category-${category}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default CategoriesSelector;
