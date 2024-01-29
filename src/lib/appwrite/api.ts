import { INewPost, INewUser, IUpdatePost } from "@/types";
import { account, appwriteConfig, avatars, database, storage } from "./config";
import { Query, ID } from "appwrite";

//-------------- Authentication
export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(user.name);

    const newUser = saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl,
      username: user.username,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function saveUserToDB(user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
}) {
  console.log(appwriteConfig.databaseId);
  try {
    const newUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
export const signInAccount = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
  }
};
export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

//-------------- File Upload
export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreview = async (fileId: string) => {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};
export const createPost = async (post: INewPost) => {
  try {
    //uploading file on appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadFile) throw Error;
    // getting the file preview (getting the url)
    const fileUrl = await getFilePreview(uploadedFile?.$id!);
    if (!fileUrl) {
      storage.deleteFile(appwriteConfig.storageId, uploadedFile?.$id!);
      throw Error;
    }
    //converting tags string into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //creating a new post (creating a document in databse)

    const newPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile?.$id,
        location: post.location,
        tags: tags,
      }
    );
    if (!newPost) {
      await storage.deleteFile(appwriteConfig.storageId, uploadedFile?.$id!);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(Error);
  }
};

//-------------- Post
export const likePost = async (postId: string, likesArray: string[]) => {
  try {
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (postId: string, userId: string) => {
  try {
    const savedPost = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (!savedPost) throw Error;
    return savedPost;
  } catch (error) {
    console.log(error);
  }
};
export const deleteSavedPost = async (savedPostId: string) => {
  try {
    const statusCode = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedPostId
    );
    if (!statusCode) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = async (post: IUpdatePost) => {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageId: post.imageId,
      imageUrl: post.imageUrl,
    };

    if (hasFileToUpdate) {
      //uploading the new file
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      //getting the url of the new uploaded file
      const fileUrl = await getFilePreview(uploadedFile.$id);
      //deleting the uploaded file if we don't get the file preview
      if (!fileUrl) {
        storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageId: uploadedFile?.$id!, imageUrl: fileUrl! };
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];
    const updatedPost = await database.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      post.postId,
      {
        caption: post.caption,
        location: post.location,
        tags: tags,
        imageId: image.imageId,
        imageUrl: image.imageUrl,
      }
    );
    if (!updatedPost) {
      await storage.deleteFile(appwriteConfig.storageId, post.imageId);
    }
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (postid: string, imageId: string) => {
  if (!postid || !imageId) return;
  try {
    const deletedPost = await database.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postid
    );
    if (!deletedPost) throw Error;
    await storage.deleteFile(appwriteConfig.storageId, imageId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

//-------------- Searching
export const searchPostsByCaption = async (searchValue: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("caption", searchValue)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};
export const searchPostsByTags = async (searchValue: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("tags", searchValue)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};
export const searchPostsByUsername = async (searchValue: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.search("username", searchValue)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};
export const searchPostsByLocation = async (searchValue: string) => {
  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      [Query.search("location", searchValue)]
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};

//-------------- Get Data
export const getAllUsers = async () => {
  try {
    const allUsers = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId
      // [Query.orderAsc("$createdAt"), Query.limit(4)]
    );
    if (!allUsers) throw Error;
    return allUsers;
  } catch (error) {
    console.log(error);
  }
};
export const getUserByName = async (name: string) => {
  try {
    const allUsersByUsername = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.search("username", name)]
    );
    if (!allUsersByUsername) throw Error;
    return allUsersByUsername;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      id
    );
    if (!user) throw Error;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSavedPosts = async (id: string) => {
  try {
    const saved = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.equal("user", id)]
    );
    if (!saved) throw Error;
    return saved;
  } catch (error) {
    console.log(error);
  }
};
export const getPostById = async (postId: string) => {
  try {
    const postDetails = await database.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    );
    if (!postDetails) throw Error;
    return postDetails;
  } catch (error) {
    console.log(error);
  }
};
export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(5)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}
export const getRecentPosts = async ({ pageparam }: { pageparam: number }) => {
  const queries: any[] = [Query.orderAsc("$updatedAt"), Query.limit(5)];

  if (pageparam) {
    queries.push(Query.cursorAfter(pageparam.toString()));
  }

  try {
    const posts = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      // [Query.orderDesc("$createdAt"), Query.limit(4)]
      queries
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
};
