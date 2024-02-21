import React, { useEffect } from "react";

import CategoriesSelector from "./CategoriesSelector";
import Loading from "../static/Loading";
import RedditItem from "./RedditItem";
import SearchBar from "../../logic/static/SearchBar";
import { RedditHomeDisplayProps } from "../../../interfaces/props/RedditHomeDisplayProps.interface";

const RedditHomeDisplay: React.FC<RedditHomeDisplayProps> = ({
  loading,
  setLoading,
  dataNotFound,
  setDataNotFound,
  subreddits,
  selectedCategory,
  setSelectedCategory,
  getSubreddits,
  setSubreddits,
  saveSubredditPostsSearchToDB,
  saveSubredditSearchToDB,
  searchData,
  setSearchData,
}) => {
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setDataNotFound(false);
        const subredditsBySearchAndCategory = await getSubreddits();
        if (subredditsBySearchAndCategory.length > 0) {
          setSubreddits(subredditsBySearchAndCategory);
          let response = await saveSubredditSearchToDB();
          if (response) {
            await saveSubredditPostsSearchToDB(
              response.id,
              subredditsBySearchAndCategory
            );
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subreddits:", error);
      }
    };

    fetchData();
  }, [searchData, selectedCategory]);

  return (
    <div className="container my-5 ">
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <SearchBar setSearchData={setSearchData} />
        </div>
        <div className="col-lg-6 col-md-12 text-center text-lg-end  mt-3 mt-lg-0">
          <CategoriesSelector
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
      <h2 className="my-5 text-center">{searchData}</h2>
      {dataNotFound && (
        <p className="text-danger lead text-center">results not found</p>
      )}
      {loading ? (
        <Loading />
      ) : (
        <div className="margin-buttom-container">
          {subreddits.map((item, index) => (
            <RedditItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RedditHomeDisplay;
