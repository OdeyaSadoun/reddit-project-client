import { RedditSearch } from "../reddit/RedditSearch.interface";
import { Subreddit } from "../reddit/Subreddit.interface";

export interface RedditHomeDisplayProps {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    dataNotFound: boolean;
    setDataNotFound: React.Dispatch<React.SetStateAction<boolean>>;
    subreddits: Subreddit[]; 
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    getSubreddits: () => Promise<Subreddit[]>; 
    setSubreddits: React.Dispatch<React.SetStateAction<Subreddit[]>>;
    saveSubredditPostsSearchToDB: (id: number, subreddits: Subreddit[]) => Promise<void>;
    saveSubredditSearchToDB: () => Promise<RedditSearch>; 
    searchData: string;
    setSearchData: React.Dispatch<React.SetStateAction<string>>;
  }