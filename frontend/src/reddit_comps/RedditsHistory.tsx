import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface RedditSearch {
    id: number;
    user_id: number;
    reddit: string;
    category: string;
}

const RedditSearchHistory: React.FC = () => {
    const [searches, setSearches] = useState<RedditSearch[]>([]);
    const API_URL: string = "http://localhost:8000";

    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
              const token = localStorage.getItem('access_token'); 
              console.log({token});
              
              if (!token) {
                throw new Error('User token is not available');
              }
      
                const response = await axios.get(`${API_URL}/reddits/recent`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  }});
                  console.log("history",response.data);
                  
                setSearches(response.data);
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        fetchSearchHistory();
    }, []);

    return (
        <div>
            <h2>Search History</h2>
            <div>
                {searches.map(search => (
                    <Link to={`/history/${search.id}`} key={search.id}>
                        <li>{search.reddit} - {search.category}</li>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RedditSearchHistory;