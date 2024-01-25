import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useUserContext } from "../context/AuthContext";
import { useGetPostById } from "@/lib/tanstack-query/queriesAndMutations";

const LikedPosts = ({ id }: { post?: Models.Document; id: string }) => {
  const { user } = useUserContext();
  const { data: post } = useGetPostById(id);
  return (
    <li key={post?.$id} className="relative min-w-80 h-80  ">
      <Link to={`/post-details/${post?.$id}`} className="grid-post_link">
        <img
          src={post?.imageUrl}
          alt="post-image"
          className="h-full w-full object-cover"
        />
      </Link>
      <div className="w-full  ">
        <div className="grid-post_user flex-between">
          {<PostStats userId={user.id} post={post} />}
        </div>
      </div>
    </li>
  );
};

export default LikedPosts;
