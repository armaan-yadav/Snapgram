import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPostsByCaption,
  useSearchPostsByLocation,
  useSearchPostsByTags,
} from "@/lib/tanstack-query/queriesAndMutations";
import { useEffect, useState } from "react";
import GridPostsList from "../../components/shared/GridPostsList";
import SearchResults from "./SearchResults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue, 500);
  const {
    data: searchedPostsByCaption,
    isFetching: isSearchByCaptionFetching,
  } = useSearchPostsByCaption(debouncedValue);
  const { data: searchedPostsByTags, isFetching: isSearchByTagsFetching } =
    useSearchPostsByTags(debouncedValue);
  const {
    data: searchedPostsByLocation,
    isFetching: isSearchByLocationFetching,
  } = useSearchPostsByLocation(debouncedValue);
  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts) {
    return (
      <div className="flex-center h-full w-full">
        <img src="/assets/icons/loader.svg" alt="" />
      </div>
    );
  }
  const shouldShowSearchResults = searchValue != "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => {
      item?.documents.length === 0;
    });
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="" width={24} height={24} />
          <Input
            className="explore-search"
            placeholder="Search for people,tags..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full max-w-5xl flex flex-wrap gap-9">
        {shouldShowSearchResults ? (
          <>
            <Tabs defaultValue="caption" className="w-full ">
              <TabsList className="flex-between my-4 text-light-1">
                <TabsTrigger value="caption">Caption</TabsTrigger>
                <TabsTrigger value="tags">Tags</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              <TabsContent value="caption">
                <SearchResults
                  searchedPosts={searchedPostsByCaption?.documents!}
                  isSearchFetching={isSearchByCaptionFetching}
                />
              </TabsContent>
              <TabsContent value="tags">
                <SearchResults
                  searchedPosts={searchedPostsByTags?.documents!}
                  isSearchFetching={isSearchByTagsFetching}
                />
              </TabsContent>
              <TabsContent value="location">
                <SearchResults
                  searchedPosts={searchedPostsByLocation?.documents!}
                  isSearchFetching={isSearchByLocationFetching}
                />
              </TabsContent>
            </Tabs>
          </>
        ) : shouldShowPosts ? (
          <p>End of posts</p>
        ) : (
          <>
            <div className="flex w-full  gap-9 max-w-5xl mt-16 mb-7">
              <h2 className="body-bold md:h3-bold w-full">Popular Today</h2>
              <div className="flex items-center justify-center gap-4 cursor-pointer bg-dark-3 px-4 py-2 rounded-md">
                <p className="small-medium base-medium">All</p>
                <img
                  src="/assets/icons/filter.svg"
                  alt="filter"
                  width={20}
                  height={20}
                />
              </div>
            </div>
            {posts.pages.map((item, index) => (
              <GridPostsList key={`post-${index}`} posts={item?.documents!} />
            ))}
          </>
        )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
