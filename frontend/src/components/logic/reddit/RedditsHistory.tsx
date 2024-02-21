import axios from "axios";
import React, { useState } from "react";

import { getToken } from "../static/GetToken";
import { RedditSearch } from "../../../interfaces/reddit/RedditSearch.interface";
import RedditHistoryDisplay from "../../display/reddit/RedditsHistoryDisplay";

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

  return (
    <RedditHistoryDisplay
    searches={searches}
    setsearches={setSearches}
    getHistorySearch={getHistorySearch}
  />
  );
};

export default RedditSearchHistory;
