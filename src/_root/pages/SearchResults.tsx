import React from "react";
import GridPostsList from "./GridPostsList";
import { Loader } from "lucide-react";
import { Models } from "appwrite";

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
}) => {
  return searchedPosts ? (
    <GridPostsList posts={searchedPosts} />
  ) : (
    <div className="h-full w-full flex-center">
      <img src="/assets/icons/loader.svg" alt="" />
    </div>
  );
};

export default SearchResults;
