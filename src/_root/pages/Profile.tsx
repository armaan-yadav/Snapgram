import { useUserContext } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  useGetUserById,
} from "@/lib/tanstack-query/queriesAndMutations";
import {  useParams } from "react-router-dom";
import GridPostsList from "../../components/shared/GridPostsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LikedPosts from "@/components/shared/LikedPosts";
import { Models } from "appwrite";

const Profile = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserById(id!);
  const { user: currentUser } = useUserContext();
  // console.log(user);

  return isPending ? (
    <div className="w-full h-full flex-center">
      <img src="/assets/icons/loader.svg" alt="" />
    </div>
  ) : (
    <div className="profile-container max-w-3xl">
      <div className="profile-inner_container sm:flex-col ">
        <div className=" w-full flex items-center gap-4">
          <img src={user?.imageUrl} alt="" className="rounded-full h-[6rem]" />
          <div className="flex justify-between w-full">
            <div>
              {" "}
              <p className="h2-bold">{user?.name}</p>
              <p className="base-medium  text-light-3">@{user?.username}</p>
            </div>
            {user?.$id === currentUser.id && (
              <Button className="flex gap-2 self-center">
                <img
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  className="h-5 w-5"
                />
                <p>Edit Profile</p>
              </Button>
            )}
          </div>
        </div>
        <div className=" body-bold flex-between  w-full">
          <p>
            <span className="text-primary-500">{user?.posts.length} </span>{" "}
            Posts
          </p>
          <p>
            <span className="text-primary-500">20 </span> Followers
          </p>
          <p>
            <span className="text-primary-500">20</span> Following
          </p>
        </div>
        <div className="text-left body-medium w-full">
          {user?.bio || `Hello I am Snapgram user.`}
        </div>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {user?.$id === currentUser.id && (
            <TabsTrigger value="liked-posts">Liked Posts</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="posts">
          <GridPostsList posts={user?.posts} showUser={false} />
        </TabsContent>
        {user?.$id === currentUser.id && (
          <TabsContent value="liked-posts">
            <ul className="grid-container">
              {user?.liked.map((post: Models.Document) => (
                <LikedPosts post={post} key={post.$id} id={post.$id} />
              ))}
            </ul>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
