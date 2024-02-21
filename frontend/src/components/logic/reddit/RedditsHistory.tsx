import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { format } from "date-fns";

import { getToken } from "../static/GetToken";
import { RedditSearch } from "../../../interfaces/reddit/RedditSearch.interface";
import { isToday } from "../static/CheckDay";

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
    <div className="history-container container mx-auto margin-buttom-container">
      <h2 className="text-center display-6 py-3">Search History</h2>
      <div>
        {searches.reverse().map((search) => (
          <Link
            to={`/user/history/${search.id}`}
            key={search.id}
            className="link-decoration-none"
          >
            <div className="search-box ps-3 pt-4">
              <div className="search-info d-flex">
                <p className="search-text px-2">{search.reddit}</p>
                <p className="category-text px-2">{search.category}</p>
              </div>
              <div className="date-info pe-3">
                <p className="date-text">
                  {isToday(new Date(search.created_date))
                    ? format(new Date(search.created_date), "HH:mm")
                    : format(new Date(search.created_date), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RedditSearchHistory;
