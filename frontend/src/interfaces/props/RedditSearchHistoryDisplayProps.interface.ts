import { RedditSearch } from "../reddit/RedditSearch.interface";

export interface RedditSearchHistoryDisplayProps {
    searches: RedditSearch[];
    setsearches: React.Dispatch<React.SetStateAction<RedditSearch[]>>;
    getHistorySearch: () => Promise<RedditSearch[] | undefined>;
  }