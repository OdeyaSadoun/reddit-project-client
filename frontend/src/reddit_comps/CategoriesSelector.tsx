import React from "react";

import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { CategoriesSelectorProps } from "src/interfaces/CategoriesSelectorProps.interface";


const CategoriesSelector: React.FC<CategoriesSelectorProps> = ({ selectedCategory, setSelectedCategory }) => {

  const categories: string[] = ["hot", "rising", "new", "top"];

  return (
    <ButtonGroup>
      {categories.map((category: string) => (
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
