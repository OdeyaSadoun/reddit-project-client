// RedditHome.tsx
import React, { useEffect, useState } from "react";
import RedditItem from "./RedditItem";
import axios from "axios";
import { Subreddit } from "../interfaces/Subreddit.interface";
import SearchBar from "../static_comps/SearchBar";
import CategoriesSelector from "./CategoriesSelector";
import Loading from "../static_comps/Loading";
import RedditSearchHistory from "./RedditsHistory";

const RedditHome: React.FC = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>("python");
  const [selectedCategory, setSelectedCategory] = useState<string>("new");

  const API_URL: string = "http://localhost:8000";

  const getUserFromLocalStorage = () => {
    const user: any = JSON.parse(localStorage.getItem("user") || "");
    if (!user) {
      throw new Error("User ID is not available in local storage");
    }

    const userId = Number(user.id); // Convert user ID to number
    if (isNaN(userId)) {
      throw new Error("User ID is not a valid number");
    }

    return userId;
  };

  const saveSubredditSearchToDB = async () => {
    try {
      let userId = getUserFromLocalStorage();

      const token = localStorage.getItem("access_token");
      console.log({ token });

      if (!token) {
        throw new Error("User token is not available");
      }

      let subredditSearchToSave = {
        user_id: userId,
        reddit: searchData,
        category: selectedCategory,
        created_date : Date.now()
      };

      console.log({subredditSearchToSave});
      

      const reddirSearchResponse = await axios.post(
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

  const saveSubredditPostsSearchToDB = async (redditId: number) => {
    try {
      console.log({subreddits});
      
      let subredditPostsWithSubredditId = subreddits.map((subreddit) => ({
        ...subreddit,
        reddit_id: redditId,
      }));
      console.log({subredditPostsWithSubredditId});
      
      const token = localStorage.getItem('access_token'); 
      console.log({token});
      
      if (!token) {
        throw new Error('User token is not available');
      }
      const subredditPostsResponse = await axios.post(
        `${API_URL}/reddits/subredditsearches`,
        subredditPostsWithSubredditId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Subreddits sent to server:", subredditPostsResponse.data);
    } catch (error) {
      console.error("Error sending subreddits to server:", error);
    }
  };

  const getSubreddits = async () => {
    try {
      let redditData: Subreddit[] = [];
      if (searchData !== "" && selectedCategory !== "") {
        const SubredditPostsResponse = await axios.get<Subreddit[]>(
          `${API_URL}/reddits/get_posts_by_subreddit?subreddit=${searchData}&category=${selectedCategory}`
        );
        redditData = SubredditPostsResponse.data;
        console.log({ redditData });
      }
      return redditData;
    } catch (error) {
      console.error("Error fetching subreddits:", error);
      setLoading(false);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("true - loading");
        const subredditsBySearchAndCategory = await getSubreddits();
        setSubreddits(subredditsBySearchAndCategory);
        setLoading(false);
        console.log("false - loading");
        let response = await saveSubredditSearchToDB();
        // console.log({subredditsBySearchAndCategory.id});

        await saveSubredditPostsSearchToDB(response.id);
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
