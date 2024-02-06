// RedditHome.tsx
import React, { useEffect, useState } from "react";
import RedditItem from "./RedditItem";
import axios from "axios";
import { Subreddit } from "../interfaces/Subreddit.interface";
import SearchBar from "../static_comps/SearchBar";
import CategoriesSelector from "./CategoriesSelector";

const RedditHome: React.FC = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("python");
  const [selectedCategory, setSelectedCategory] = useState<string>("new");

  const getSubreddits = async () => {
    try {
      setLoading(true);
      let redditData: Subreddit[] = [];
      if (searchData !== "" && selectedCategory !== "") {
        console.log("enter");
        
        const response = await axios.get<Subreddit[]>(
          `http://127.0.0.1:8000/reddits/get_posts_by_subreddit?subreddit=${searchData}&category=${selectedCategory}`
        );
        redditData = response.data;
      }
      setLoading(false);
      return redditData;
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setLoading(false);
      return [];
    }
  };
  

  useEffect(() => {
    console.log({ searchData });
    console.log({ selectedCategory });

    const fetchData = async () => {
      const subredditsBySearchAndCategory = await getSubreddits();
      setSubreddits(subredditsBySearchAndCategory);
    };

    fetchData();
  }, [searchData, selectedCategory]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center">
        <div className="col-md-6">
          <SearchBar setSearchData={setSearchData} />
        </div>
        <div className="col-md-6 text-end pe-2">
          <CategoriesSelector
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <h2 className="my-5 text-center">{searchData}</h2>
      {loading && subreddits.length <= 0 ? (
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
