import GridPostsList from "../../components/shared/GridPostsList";
import { Models } from "appwrite";

const SearchResults = ({
  searchedPosts,
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
