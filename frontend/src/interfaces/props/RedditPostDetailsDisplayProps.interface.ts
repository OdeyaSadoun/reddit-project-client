import { Subreddit } from "../reddit/Subreddit.interface";

export interface RedditPostDetailsDisplayProps {
  redditId: string | undefined;
  getPostsByHistorySearch: () => Promise<Subreddit[] | undefined>;
  posts: Subreddit[];
  setPosts: React.Dispatch<React.SetStateAction<Subreddit[]>>;
}
