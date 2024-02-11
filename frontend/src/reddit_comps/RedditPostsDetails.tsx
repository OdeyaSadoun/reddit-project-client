// RedditPostDetails.tsx
import axios from "axios";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Subreddit } from "src/interfaces/Subreddit.interface";
import RedditItem from "./RedditItem";

const RedditPostDetails: React.FC = () => {

  const [posts, setPosts] = useState<Subreddit[]>([]);

  const { reddit_id } = useParams<{ reddit_id: string }>();

  const API_URL: string = "http://localhost:8000";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("User token is not available");
        }
        const response = await axios.get(
          `${API_URL}/reddits/history/${reddit_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [reddit_id]);

  return (
    <div className="container my-5">
      <h2>Posts Related to Search {reddit_id}</h2>
      <div>
        {posts.map((item, index) => (
          <RedditItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RedditPostDetails;
