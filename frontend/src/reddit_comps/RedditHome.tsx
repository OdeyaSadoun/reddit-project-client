import axios from "axios";
import React, { useEffect, useState } from "react";

import { Subreddit } from "../interfaces/Subreddit.interface";
import { subredditSearch } from "src/interfaces/SubredditSearch.interface";

import CategoriesSelector from "./CategoriesSelector";
import Loading from "../static_comps/Loading";
import RedditItem from "./RedditItem";
import RedditSearchHistory from "./RedditsHistory";
import SearchBar from "../static_comps/SearchBar";

import { getToken } from "src/static_comps/GetToken";

const RedditHome: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("python");
  const [selectedCategory, setSelectedCategory] = useState<string>("new");
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);

  const API_URL: string = "http://localhost:8000";

  const getUserIdFromLocalStorage = () : number=> {
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

  const saveSubredditSearchToDB = async () : Promise<subredditSearch | undefined> => {
    try {
      let userId = getUserIdFromLocalStorage();

      const token : string = getToken();

      let subredditSearchToSave = {
        user_id: userId,
        reddit: searchData,
        category: selectedCategory,
        created_date : Date.now()
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

  const saveSubredditPostsSearchToDB = async (redditId: number, subredditsBySearchAndCategory:Subreddit[] ) : Promise<void> => {
    try {
      
      let subredditPostsWithSubredditId : Subreddit[] = subredditsBySearchAndCategory.map((subreddit) => ({
        ...subreddit,
        reddit_id: redditId,
      }));
      
      const token : string = getToken();

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

  const getSubreddits = async () : Promise<Subreddit[]> => {
    try {
      let redditData: Subreddit[] = [];
      if (searchData !== "" && selectedCategory !== "") {
        const SubredditPostsResponse = await axios.get<Subreddit[]>(
          `${API_URL}/reddits/get_posts_by_subreddit?subreddit=${searchData}&category=${selectedCategory}`
        );
        redditData = SubredditPostsResponse.data;
      }

      return redditData;

    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () : Promise<void> => {
      try {
        setLoading(true);
        const subredditsBySearchAndCategory = await getSubreddits();
        setSubreddits(subredditsBySearchAndCategory);
        setLoading(false);
        let response = await saveSubredditSearchToDB();
        if(response){
          await saveSubredditPostsSearchToDB(response.id, subredditsBySearchAndCategory);
        }
      } catch (error) {
        console.error("Error fetching subreddits:", error);
      }
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
      {loading ? (
        <Loading />
      ) : (
        <div>
          {subreddits.map((item, index) => (
            <RedditItem key={index} item={item} />
          ))}
        </div>
      )}

      <RedditSearchHistory />
    </div>
  );
};

export default RedditHome;
