import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";
import PostStats from "./PostStats";

const PostCard = ({ post }: { post: Models.Document }) => {
  const { user } = useUserContext();
  const [postCreatorId, setPostCreatorId] = useState("");
  useEffect(() => {
    setPostCreatorId(post.creator.$id);
  }, [post]);
  return (
    <div className="post-card">
      <div className="flex-between ">
        <div className="flex items-center gap-3 text-light-1 ">
          <Link to={`/profile/${post?.creator.$id}`} className="flex gap-3">
            <img
              src={post?.creator.imageUrl}
              alt=""
              className="lg:h-12 w-12  rounded-full"
            />
            <div>
              <p className="base-medium lg:body-bold">
                {post.creator.username}
              </p>
              <div className="flex-center gap-2 text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {timeAgo(post?.$createdAt)}
                </p>
                <p className="subtle-semibold lg:small-regular ">
                  {post?.location}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className={`${user.id === postCreatorId ? `block` : `hidden`} `}>
          <Link to={`edit-post/${post.$id}`}>
            <img
              src="/assets/icons/edit.svg"
              alt="edit-icon"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
      <Link to={`post-details/${post.$id}`}>
        <img
          src={post.imageUrl || `/assets/icons/profile-placeholder.svg`}
          alt=""
          className="post-card_img mt-2"
        />
      </Link>
      <PostStats post={post} userId={user.id} />
      <div className="small-medium lg:base-medium py-5">
        <p>{post?.caption}</p>
        <div className="w-full mt-2 text-wrap">
          {post?.tags.map((tag: string) => {
            return (
              <span key={tag} className="text-light-3 ">
                {`#` + tag + ` `}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
