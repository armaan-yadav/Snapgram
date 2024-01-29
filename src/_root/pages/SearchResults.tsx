import GridPostsList from "../../components/shared/GridPostsList";
import { Models } from "appwrite";

const SearchResults = ({
  searchedPosts,
}: {
  searchedPosts: Models.Document[];
  isSearchFetching: boolean;
}) => {
  return searchedPosts ? (
    <>
      {searchedPosts.length !== 0 ? (
        <div className="w-full ">
          {" "}
          <GridPostsList posts={searchedPosts} />
        </div>
      ) : (
        <div className="w-full h-[50vh]  flex-center flex-1">
          No Posts Found
        </div>
      )}
    </>
  ) : (
    <div className="h-full w-full flex-center">
      <img src="/assets/icons/loader.svg" alt="" />
    </div>
  );
};

export default SearchResults;
