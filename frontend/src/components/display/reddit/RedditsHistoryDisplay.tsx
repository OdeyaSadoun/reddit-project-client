import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { format } from "date-fns";

import { isToday } from "../../logic/static/CheckDay";
import { RedditSearchHistoryDisplayProps } from "../../../interfaces/props/RedditSearchHistoryDisplayProps.interface";

const RedditHistoryDisplay: React.FC<RedditSearchHistoryDisplayProps> = ({
  searches,
  setsearches,
  getHistorySearch,
}) => {
  useEffect(() => {
    const fetchSearchHistory = async (): Promise<void> => {
      try {
        const historySearch = await getHistorySearch();
        if (historySearch) {
          setsearches(historySearch);
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

export default RedditHistoryDisplay;