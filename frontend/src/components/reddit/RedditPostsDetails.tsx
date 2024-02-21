import axios from "axios";
import React, { useState, useEffect } from "react";

import RedditItem from "./RedditItem";

import { useParams } from "react-router-dom";
import { Subreddit } from "../../interfaces/reddit/Subreddit.interface";
import { getToken } from "../logic/static/GetToken";


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
  }, [reddit_id]);

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

export default RedditPostDetails;
