import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetAllUsers,
  useGetUserByName,
} from "@/lib/tanstack-query/queriesAndMutations";
import { useEffect, useState } from "react";
import SearchedUser from "@/components/shared/SearchedUser";
import { useInView } from "react-intersection-observer";
import { Loader } from "lucide-react";

const AllUsers = () => {
  const { inView, ref } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: allUsersBySearch, isFetching: isAllUsersBySearchFetching } =
    useGetUserByName(debouncedValue);
  // console.log(allUsersBySearch?.documents);
  const {
    data: allUsers,

    hasNextPage,
    fetchNextPage,
  } = useGetAllUsers();
  // console.log(allUsers?.pages);
  useEffect(() => {
    fetchNextPage();
  }, [inView]);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search People</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="" width={24} height={24} />
          <Input
            className="explore-search"
            placeholder="Search for people"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="w-full">
          {searchValue === "" ? (
            <>
              <div className="w-full  gap-9 max-w-5xl mt-16 mb-7">
                <p className="body-bold md:h3-bold w-full">Recently Joined</p>
              </div>
              {allUsers?.pages.map((page, index) => {
                return <SearchedUser users={page.documents} key={index} />;
              })}
              {hasNextPage && (
                <div ref={ref} className="mt-10 w-full flex-center">
                  <Loader />
                </div>
              )}
            </>
          ) : isAllUsersBySearchFetching ? (
            <div className="w-full h-full flex-center">
              <img src="/assets/icons/loader.svg" alt="" />
            </div>
          ) : (
            <>
              {allUsersBySearch?.pages.map((page, index) => {
                return <SearchedUser users={page?.documents!} key={index} />;
              })}
              {hasNextPage && (
                <div ref={ref} className="mt-10 w-full flex-center">
                  <Loader />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
