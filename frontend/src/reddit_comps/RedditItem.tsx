import React from "react";
import { Subreddit } from "../interfaces/Subreddit.interface";

interface RedditItemProps {
  item: Subreddit;
}

const RedditItem: React.FC<RedditItemProps> = ({ item }) => {
  return (
    <div className="border border-danger my-2">
      {item.title}
    </div>
  );
};

export default RedditItem;
