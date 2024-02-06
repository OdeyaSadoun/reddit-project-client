// CategoriesSelector.tsx
import React from "react";
import { ButtonGroup, ToggleButton, ToggleButtonProps } from "react-bootstrap";

interface CategoriesSelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({ selectedCategory, onSelectCategory }) => {
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
          onChange={() => onSelectCategory(category)}
          id={`category-${category}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default CategoriesSelector;
