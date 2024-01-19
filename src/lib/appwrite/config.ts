import { Databases, Account, Client, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.APPWRITE_PROJECT_ID,
  url: import.meta.env.APPWRITE_PROJECT_URL,
  databaseId: import.meta.env.APPWRITE_DATABASE_ID,
  storageId: import.meta.env.APPWRITE_STORAGE_ID,
  usersCollectionId: import.meta.env.APPWRITE_USERS_COLLECTION_ID,
  savesCollectionId: import.meta.env.APPWRITE_SAVES_COLLECTION_ID,
  postsCollectionId: import.meta.env.APPWRITE_POSTS_COLLECTION_ID,
};

export const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
