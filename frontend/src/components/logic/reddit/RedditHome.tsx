import axios from "axios";
import React, { useEffect, useState } from "react";

import { Subreddit } from "../../../interfaces/reddit/Subreddit.interface";
import { subredditSearch } from "../../../interfaces/reddit/SubredditSearch.interface";

import CategoriesSelector from "../../display/reddit/CategoriesSelector";
import Loading from "../../display/static/Loading";
import RedditItem from "../../display/reddit/RedditItem";
import SearchBar from "../static/SearchBar";

import { getToken } from "../static/GetToken";
import RedditHomeDisplay from "../../display/reddit/RedditHomeDisplay";
import { RedditSearch } from "../../../interfaces/reddit/RedditSearch.interface";
import { getUserIdFromLocalStorage } from "../static/GetUserIdFromLocalStorage";

const RedditHome: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const API_URL: string = "http://localhost:8000";

  const saveSubredditSearchToDB = async (): Promise<RedditSearch> => {
    try {
      let userId = getUserIdFromLocalStorage();

      const token: string = getToken();

      let subredditSearchToSave = {
        user_id: userId,
        reddit: searchData,
        category: selectedCategory,
        created_date: Date.now(),
      };

      const reddirSearchResponse = await axios.post<subredditSearch>(
        `${API_URL}/reddits/redditsearches/`,
        subredditSearchToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return reddirSearchResponse.data;
    } catch (error) {
      console.error("Error saving search data:", error);
      throw error; // Ensure the function always returns a rejected Promise in case of error
    }
  };

  const saveSubredditPostsSearchToDB = async (
    redditId: number,
    subredditsBySearchAndCategory: Subreddit[]
  ): Promise<void> => {
    try {
      let subredditPostsWithSubredditId: Subreddit[] =
        subredditsBySearchAndCategory.map((subreddit) => ({
          ...subreddit,
          reddit_id: redditId,
        }));

      const token: string = getToken();

      await axios.post<Subreddit[]>(
        `${API_URL}/reddits/subredditsearches`,
        subredditPostsWithSubredditId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error sending subreddits to server:", error);
    }
  };

  const getSubreddits = async (): Promise<Subreddit[]> => {
    try {
      let redditData: Subreddit[] = [];
      if (searchData !== "" && selectedCategory !== "") {
        const SubredditPostsResponse = await axios.get<Subreddit[]>(
          `${API_URL}/reddits/postsbysubreddit?subreddit=${searchData}&category=${selectedCategory}`
        );
        redditData = SubredditPostsResponse.data;
      }
      return redditData;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setDataNotFound(true);
        setSubreddits([]);
      } else {
        console.error("Error fetching subreddits:", error);
      }
      setLoading(false); // Set loading state to false in case of error
      return [];
    }
  };

  return (
    <RedditHomeDisplay
      loading={loading}
      setLoading={setLoading}
      dataNotFound={dataNotFound}
      setDataNotFound={setDataNotFound}
      subreddits={subreddits}
      setSubreddits={setSubreddits}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      getSubreddits={getSubreddits}
      saveSubredditPostsSearchToDB={saveSubredditPostsSearchToDB}
      saveSubredditSearchToDB={saveSubredditSearchToDB}
      searchData={searchData}
      setSearchData={setSearchData}
    />
  );
};

export default RedditHome;
