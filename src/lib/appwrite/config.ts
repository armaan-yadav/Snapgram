import { Databases, Account, Client, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
  usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
};
export const client = new Client();
export const account = new Account(client);
client
  .setEndpoint(appwriteConfig.url) // Your API Endpoint
  .setProject(appwriteConfig.projectId); // Your project ID
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
