// RedditPostDetails.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface RedditPost {
  id: number;
  title: string;
  content: string;
}

const RedditPostDetails: React.FC = () => {
  const [posts, setPosts] = useState<RedditPost[]>([]);
  const { reddit_id } = useParams<{ reddit_id: string }>();
  const API_URL: string = "http://localhost:8000";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log({ reddit_id });
        const token = localStorage.getItem('access_token'); 
        console.log({token});
        
        if (!token) {
          throw new Error('User token is not available');
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

        console.log("posts", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [reddit_id]);

  return (
    <div>
      <h2>Posts Related to Search {reddit_id}</h2>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedditPostDetails;
