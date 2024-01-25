import { useUserContext } from "@/components/context/AuthContext";
import {
  useGetCurrentUser,
  useGetUserById,
  useGetUserSavedPosts,
} from "@/lib/tanstack-query/queriesAndMutations";
import { Models } from "appwrite";
import GridPostsList from "@/components/shared/GridPostsList";
import LikedPosts from "@/components/shared/LikedPosts";

const Saved = () => {
  const { data } = useGetCurrentUser();

  return data ? (
    <div className="saved-container">
      <h2 className="h3-bold md:h2-bold w-full text-left">Saved Posts</h2>
      <ul className="grid-container">
        {data?.save.map((e: Models.Document) => {
          console.log(e);
          return <LikedPosts key={e.post.$id} id={e.post.$id!} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="h-full w-full">
      {" "}
      <img src="/assets/icons/loader.sgv" alt="" />
    </div>
  );
};

export default Saved;
