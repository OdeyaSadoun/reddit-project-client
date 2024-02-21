import React, { useEffect } from "react";

import RedditItem from "./RedditItem";
import { RedditPostDetailsDisplayProps } from "../../../interfaces/props/RedditPostDetailsDisplayProps.interface";

const RedditPostDetailsDisplay: React.FC<RedditPostDetailsDisplayProps> = ({
  redditId,
  getPostsByHistorySearch,
  posts,
  setPosts,
}) => {
  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      try {
        const postsByHistorySearch = await getPostsByHistorySearch();
        if (postsByHistorySearch) {
          setPosts(postsByHistorySearch);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [redditId]);

  return (
    <div className="container my-5">
      <h2 className="text-center display-6 py-3">Posts Related </h2>
      <div className="margin-buttom-container">
        {posts.map((item, index) => (
          <RedditItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RedditPostDetailsDisplay;
