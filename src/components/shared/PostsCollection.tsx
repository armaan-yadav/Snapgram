import { Models } from "appwrite";
import PostCard from "./PostCard";

const PostsCollection = ({ posts }: { posts: Models.Document[] }) => {
  return (
    <ul className="flex flex-col flex-wrap px-3 w-full ">
      {posts.map((item) => {
        return <PostCard post={item} key={item.$id} />;
      })}
    </ul>
  );
};

export default PostsCollection;
