import React from 'react'
import { Subreddit } from 'src/interfaces/Subreddit.interface';
import { User } from 'src/types/UserResponse.type';

const RedditsHistory: React.FC<User> = () => {


  // const getSubredditPostsHistoryBySubredditSearch = async () => {
  //   try {
  //     let redditData: Subreddit[] = [];
  //     if (searchData !== "" && selectedCategory !== "") {
  //       const SubredditPostsResponse = await axios.get<Subreddit[]>(
  //         `${API_URL}/reddits/get_posts_by_subreddit?subreddit=${searchData}&category=${selectedCategory}`
  //       );
  //       redditData = SubredditPostsResponse.data;
  //       console.log({ redditData });
  //     }
  //     return redditData;
  //   } catch (error) {
  //     console.error("Error fetching subreddits:", error);
  //     setLoading(false);
  //     return [];
  //   }
  // };

  return (
    <div>RedditsHistory</div>
  )
}

export default RedditsHistory