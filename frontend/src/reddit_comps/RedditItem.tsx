import React from "react";
import { Subreddit } from "../interfaces/Subreddit.interface";

interface RedditItemProps {
  item: Subreddit;
}

const RedditItem: React.FC<RedditItemProps> = ({ item }) => {
  console.log("Rendering RedditItem:", item.title); // Log the title
  return <div>{item.title}</div>;
};

export default RedditItem;
