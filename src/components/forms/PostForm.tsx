import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PostFormValidation } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Models } from "appwrite";
import { useUserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/tanstack-query/queriesAndMutations";
import { toast } from "../ui/use-toast";

const PostForm = ({
  post,
  action,
}: {
  post?: Models.Document;
  action: "update" | "create";
}) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { mutateAsync: createPost, isPending: isPosting } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
  // const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      caption: post ? post.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostFormValidation>) {
    // console.log(values.tags.replace(/ /g, "").spl);
    if (action == "create") {
      const temp = { ...values, userId: user.id };
      const newPost = await createPost(temp);
      if (newPost) {
        navigate("/");
      }
    }
    if (post && action == "update") {
      const updatedPost = await updatePost({
        ...values,
        imageId: post.imageId,
        imageUrl: post.imageUrl,
        postId: post.$id,
      });

      if (!updatedPost) {
        return toast({ description: "Please try  again" });
      }

      return navigate(`/post-details/${post.$id}`);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-9"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Say something about your post.."
                  {...field}
                  className="shad-textarea custom-scrollbar"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Posts</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input {...field} className="shad-input custom-scrollbar" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (sepatated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="shad-input custom-scrollbar"
                  placeholder="Art, Expression, Love"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end items-center gap-6">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => {
              form.reset();
              action === "update" && navigate(`/post-details/${post?.$id}`);
              action === "create" && navigate(`/`);
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary"
            disabled={isPosting || isUpdating}
          >
            {isPosting || isUpdating ? (
              <img src="assets/icons/loader.svg" height={17} width={17} />
            ) : action == "update" ? (
              "Update"
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
