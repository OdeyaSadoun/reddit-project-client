// RedditHome.tsx
import React, { useEffect, useState } from "react";
import RedditItem from "./RedditItem";
import axios from "axios";
import { Subreddit } from "../interfaces/Subreddit.interface";
import SearchBar from "../static_comps/SearchBar";
import CategoriesSelector from "./CategoriesSelector";

const RedditHome = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const getSubreddits = async (reddit: string, category: string) => {
    try {
      setLoading(true);
      let redditData = await axios.get<Subreddit[]>(
        `http://127.0.0.1:8000/reddits/get_posts_by_subreddit?subreddit=${reddit}&category=${category}`
      );
      setLoading(false);

      setSubreddits(redditData.data);
    } catch (error) {
      console.error("Error fetching subreddits:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log({searchData});
    console.log({selectedCategory});
    
    getSubreddits(searchData, selectedCategory);
  }, [searchData, selectedCategory]);

  return (
    <div className="container">
      <SearchBar setSearchData={setSearchData} />
      <CategoriesSelector
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryChange}
      />
      <h2 className="my-5 text-center">{searchData}</h2>
      <h2 className="my-5 text-center">{selectedCategory}</h2>
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
