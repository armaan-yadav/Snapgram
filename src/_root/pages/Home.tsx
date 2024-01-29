import GridPostsList from "@/components/shared/GridPostsList";
import PostCard from "@/components/shared/PostCard";
import PostsCollection from "@/components/shared/PostsCollection";
import {
  useGetPosts,
  useGetPostsHome,
  useGetRecentPosts,
} from "@/lib/tanstack-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { ref, inView } = useInView();
  const {
    data: posts,
    isPending: isPostsLoading,
    hasNextPage,
    fetchNextPage,
  } = useGetPostsHome();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Home</h2>
      </div>
      {isPostsLoading ? (
        <div className="h-full w-full flex-center">
          <img src="/assets/icons/loader.svg" alt="" />
        </div>
      ) : (
        <>
          {posts?.pages.map((item, index) => (
            // <GridPostsList key={`post-${index}`} posts={item?.documents!} />
            <PostsCollection posts={item.documents} key={index} />
          ))}
        </>
      )}

      {hasNextPage && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
