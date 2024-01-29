import {
  useGetCurrentUser,
} from "@/lib/tanstack-query/queriesAndMutations";
import { Models } from "appwrite";
import LikedPosts from "@/components/shared/LikedPosts";
import NotFound from "@/components/shared/NotFound";

const Saved = () => {
  const { data } = useGetCurrentUser();

  return data ? (
    <div className="saved-container">
      <h2 className="h3-bold md:h2-bold w-full text-left">Saved Posts</h2>
      {data.save.length === 0 ? (
        <NotFound text="No Posts" image="posts" />
      ) : (
        <ul className="grid-container">
          {data?.save.map((e: Models.Document) => {
            return <LikedPosts key={e.post.$id} id={e.post.$id!} />;
          })}
        </ul>
      )}
    </div>
  ) : (
    <div className="h-full w-full">
      {" "}
      <img src="/assets/icons/loader.sgv" alt="" />
    </div>
  );
};

export default Saved;
