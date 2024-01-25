import { useUserContext } from "@/components/context/AuthContext";
import PostStats from "@/components/shared/PostStats";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
const GridPostsList = ({
  posts,
  showUser = true,
  showStats = true,
}: {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
}) => {
  const { user } = useUserContext();
  return !posts ? (
    <div className="w-full h-full flex-center">
      <Loader />
    </div>
  ) : (
    <ul className="grid-container">
      {posts?.map((post) => {
        return (
          <li key={post.$id} className="relative min-w-80 h-80  ">
            <Link to={`/post-details/${post.$id}`} className="grid-post_link">
              <img
                src={post?.imageUrl}
                alt="post-image"
                className="h-full w-full object-cover"
              />
            </Link>
            <div className="w-full  ">
              <div className="grid-post_user flex-between">
                {showUser && (
                  <div className="flex-start gap-3 flex-1">
                    <img
                      src={post?.creator?.imageUrl}
                      className="h-8 w-8 rounded-full"
                    />
                    <p>{post?.creator?.username}</p>
                  </div>
                )}
                {showStats && <PostStats userId={user.id} post={post} />}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default GridPostsList;
