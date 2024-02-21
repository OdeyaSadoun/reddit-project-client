import axios from "axios";
import React, { useEffect, useState } from "react";

import { Subreddit } from "../../interfaces/Subreddit.interface";
import { subredditSearch } from "../../interfaces/SubredditSearch.interface";

import CategoriesSelector from "./CategoriesSelector";
import Loading from "../static/Loading";
import RedditItem from "./RedditItem";
import SearchBar from "../static/SearchBar";

import { getToken } from "../static/GetToken";

const RedditHome: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const API_URL: string = "http://localhost:8000";

  const getUserIdFromLocalStorage = (): number => {
    const user: any = JSON.parse(localStorage.getItem("user") || "");
    if (!user) {
      throw new Error("User ID is not available in local storage");
    }

    const userId = Number(user.id);
    if (isNaN(userId)) {
      throw new Error("User ID is not a valid number");
    }

    return userId;
  };

  const saveSubredditSearchToDB = async (): Promise<
    subredditSearch | undefined
  > => {
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
          `${API_URL}/reddits/get_posts_by_subreddit?subreddit=${searchData}&category=${selectedCategory}`
        );
        redditData = SubredditPostsResponse.data;
      }
      return redditData;
    } catch (error: any) {      
      if (error.response.status == 404) {
        setDataNotFound(true);
        setSubreddits([]);
      } else {
        console.error("Error fetching subreddits:", error);
      }
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setDataNotFound(false);
        const subredditsBySearchAndCategory = await getSubreddits();
        if (subredditsBySearchAndCategory.length > 0) {
          setSubreddits(subredditsBySearchAndCategory);
          let response = await saveSubredditSearchToDB();
          if (response) {
            await saveSubredditPostsSearchToDB(
              response.id,
              subredditsBySearchAndCategory
            );
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subreddits:", error);
      }
    };

    fetchData();
  }, [searchData, selectedCategory]);

  return (
<div className="container my-5 ">
  <div className="row">
    <div className="col-lg-6 col-md-12"> 
      <SearchBar setSearchData={setSearchData} />
    </div>
    <div className="col-lg-6 col-md-12 text-center text-lg-end  mt-3 mt-lg-0"> 
      <CategoriesSelector
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
    </div>
  </div>
  <h2 className="my-5 text-center">{searchData}</h2>
  {dataNotFound && <p className="text-danger lead text-center">results not found</p>}
  {loading ? (
    <Loading />
  ) : (
    <div className="margin-buttom-container">
      {subreddits.map((item, index) => (
        <RedditItem key={index} item={item} />
      ))}
    </div>
  )}
</div>

  );
};

export default RedditHome;
