import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikedPost,
  useSavePost,
} from "@/lib/tanstack-query/queriesAndMutations";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutateAsync: likePost } = useLikedPost();
  const { mutateAsync: savePost, isPending: isSavingPost } = useSavePost();
  const { mutateAsync: deletePost, isPending: isDeletingPost } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id == post?.$id
  );
  useEffect(() => {
    setIsSaved(savedPostRecord ? true : false);
    // setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(true);
      deletePost({ savedPostId: savedPostRecord.$id });
      return;
    }
    savePost({ postId: post?.$id || "", userId: userId });
    setIsSaved(false);
  };
  return (
    <div className="flex justify-between items-center z-20 ">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt=""
          width={20}
          height={20}
          onClick={(e) => {
            handleLikePost(e);
          }}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
            alt=""
            width={20}
            height={20}
            onClick={(e) => {
              handleSavePost(e);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
