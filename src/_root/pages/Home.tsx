import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/tanstack-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();
  return (
    <div className="flex flex-1">
      <div className="home-container ">
        <h2 className="h3-bold md:h2-bold w-full text-left">
          Home Feed
          {isPostsLoading && !posts ? (
            <img src="/assets/icons/loader.svg" alt="loader" />
          ) : (
            <ul className="flex flex-col w-full flexn-1 gap-9">
              {posts?.documents.map((e: Models.Document) => {
                return <PostCard post={e} key={e.$id} />;
              })}
            </ul>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Home;
