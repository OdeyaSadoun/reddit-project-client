import React from "react";

interface RedditItemProps {
  item: string;
}

const RedditItem: React.FC<RedditItemProps> = ({ item }) => {
  return (
    <div>
      {/* Use the 'item' prop in your component */}
      {item}
    </div>
  );
};

export default RedditItem;