import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className=" flex-start gap-3 items-center  w-full ">
          <img src="/assets/icons/add-post.svg" alt="" />
          <p className="h3-bold md:h2-bold">Create Post</p>
        </div>
        <PostForm action="create" />
      </div>
    </div>
  );
};

export default CreatePost;
