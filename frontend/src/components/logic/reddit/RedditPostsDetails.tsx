import axios from "axios";
import React, { useState } from "react";


import { useParams } from "react-router-dom";
import { Subreddit } from "../../../interfaces/reddit/Subreddit.interface";
import { getToken } from "../static/GetToken";
import RedditPostDetailsDisplay from "../../display/reddit/RedditPostsDetailsDisplay";


const RedditPostDetails: React.FC = () => {
  
  const [posts, setPosts] = useState<Subreddit[]>([]);

  const { reddit_id } = useParams<{ reddit_id: string }>();

  const API_URL: string = "http://localhost:8000";

  const getPostsByHistorySearch = async (): Promise<
    Subreddit[] | undefined
  > => {
    try {
      const token: string = getToken();

      const postsByHistorySearch = await axios.get<Subreddit[]>(
        `${API_URL}/reddits/history/${reddit_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return postsByHistorySearch.data;
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };


  return (
    <RedditPostDetailsDisplay
    redditId={reddit_id}
    getPostsByHistorySearch={getPostsByHistorySearch}
    posts={posts}
    setPosts={setPosts}
  />
  );
};

export default RedditPostDetails;
