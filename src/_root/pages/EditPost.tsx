import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/tanstack-query/queriesAndMutations";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id!);
  if (isPending)
    return (
      <div className="w-[100vh] h-full flex-center  ">
        <img src="/assets/icons/loader.svg" alt="" />
      </div>
    );
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className=" flex-start gap-3 items-center  w-full ">
          <img src="/assets/icons/add-post.svg" alt="" />
          <p className="h3-bold md:h2-bold">Create Post</p>
        </div>
        <PostForm action={"update"} post={post} />
      </div>
    </div>
  );
};

export default EditPost;
