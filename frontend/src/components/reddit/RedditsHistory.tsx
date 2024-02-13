import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { getToken } from "../static/GetToken";
import { RedditSearch } from "../../interfaces/RedditSearch.interface";

const RedditSearchHistory: React.FC = () => {

  const [searches, setSearches] = useState<RedditSearch[]>([]);

  const API_URL: string = "http://localhost:8000";

  const getHistorySearch = async (): Promise<RedditSearch[] | undefined> => {
    try {
      const token: string = getToken();

      const historySearch = await axios.get<RedditSearch[]>(
        `${API_URL}/reddits/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return historySearch.data;
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };

  useEffect(() => {
    const fetchSearchHistory = async (): Promise<void> => {
      try {
        const historySearch = await getHistorySearch();
        if (historySearch) {
          setSearches(historySearch);
        }
      } catch (error) {
        console.error("Error fetching search history:", error);
      }
    };

    fetchSearchHistory();
  }, []);

  return (
    <div>
      <h2>Search History</h2>
      <div>
        {searches.map((search) => (
          <Link to={`/user/history/${search.id}`} key={search.id}>
            <li>
              {search.reddit} - {search.category}
            </li>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RedditSearchHistory;
