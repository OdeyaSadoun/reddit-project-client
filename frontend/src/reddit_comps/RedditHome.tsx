import React, { useEffect, useState } from "react";
import RedditItem from "./RedditItem";
import axios from "axios";
import { Subreddit } from "../interfaces/Subreddit.interface";

const RedditHome = () => {
  const [reddit, setReddit] = useState<string>("");
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getSubreddits = async (reddit: string) => {
    console.log("getsubreddit");
    try {
      let redditData = await axios.get<Subreddit[]>(`http://127.0.0.1:8000/reddits/get_posts_by_subreddit?subreddit=${reddit}`);
      setSubreddits(redditData.data);
      console.log(redditData.data);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubreddits("python");
  }, []);

  return (
    <div>
      <h2>{reddit}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {subreddits.map((item, index) => (
            <RedditItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RedditHome;
