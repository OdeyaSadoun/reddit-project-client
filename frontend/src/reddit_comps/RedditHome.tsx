import React, { useEffect, useState } from "react";
import RedditItem from "./RedditItem";
import axios from "axios";

const RedditHome = () => {
  const [reddit, setReddit] = useState<string>("");
  const [subreddits, setSubreddits] = useState<[]>([]);


  interface Subreddit {
    title: string,
    selftext: string,
    upvote_ratio: number,
    ups: number,
    downs: number,
    score: number,
    sentiment: string,
  }


  const getSubreddirs = async (reddit: string) => {
    console.log("getsubreddit");
    try {
      let subreddits = await axios.get<Subreddit>(`http://127.0.0.1:8000/reddits/get_posts_by_subreddit?subreddit=${reddit}`);
      console.log(subreddits.data);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    }
  };

  useEffect(()=>{
    getSubreddirs("python");
  },[])

  return (
    <div>
      <h2>{reddit}</h2>
      {subreddits && (
        <div>
          {subreddits.map((item, index) => {
            return <RedditItem key={index} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default RedditHome;
