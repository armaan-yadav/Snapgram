import { useUserContext } from "@/components/context/AuthContext";
import PostStats from "@/components/shared/PostStats";
import { useGetPostById } from "@/lib/tanstack-query/queriesAndMutations";
import { timeAgo } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const { user } = useUserContext();
  const handleDeletePost = () => {};
  return (
    <div className="post_details-container">
      {isPending ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <img src={post?.imageUrl} alt="" className="post_details-img mb-2" />
          <div className="post_details-info">
            <div className="flex items-center gap-3 text-light-1 justify-between w-full">
              <div>
                <Link
                  to={`/profile/${post?.creator.$id}`}
                  className="flex gap-3 items-center w-full"
                >
                  <img
                    src={post?.creator.imageUrl}
                    alt=""
                    className="lg:h-12 lg:w-12 h-8 w-8  rounded-full"
                  />
                  <div>
                    <p className="base-medium lg:body-bold">
                      {post?.creator.username}
                    </p>
                    <div className="flex-center gap-2 text-light-3">
                      <p className="subtle-semibold lg:small-regular">
                        {timeAgo(post?.$createdAt!)}
                      </p>
                      <p className="subtle-semibold lg:small-regular ">
                        {post?.location}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div
                className={`${
                  user.id !== post?.creator.$id && `hidden`
                } flex gap-3`}
              >
                <Link to={`/edit-post/${post?.$id}`}>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    className="w-6 h-6"
                  />
                </Link>
                <button
                  onClick={() => {
                    handleDeletePost();
                  }}
                >
                  {" "}
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    className="h-6 w-6"
                  />
                </button>
              </div>
            </div>
            <hr />
            <div className="small-medium lg:base-regular py-5">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => {
                  return (
                    <li key={tag} className="text-light-3">
                      {`#` + tag}
                    </li>
                  );
                })}
              </ul>
            </div>
            <PostStats post={post} userId={user.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
