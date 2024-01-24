import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createPost,
  createUserAccount,
  deletePost,
  deleteSavedPost,
  getAllUsers,
  getCurrentUser,
  getInfinitePost,
  getPostById,
  getRecentPosts,
  getUserByName,
  likePost,
  savePost,
  searchPostsByCaption,
  searchPostsByLocation,
  searchPostsByTags,
  searchPostsByUsername,
  signInAccount,
  signOutAccount,
  updatePost,
} from "../appwrite/api";
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return signInAccount({ email, password });
    },
  });
};

export const useSignOutAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return signOutAccount();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: INewPost) => {
      return createPost(post);
    },
  });
};

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useLikedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      likesArray,
    }: {
      postId: string;
      likesArray: string[];
    }) => {
      return likePost(postId, likesArray);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => {
      return savePost(postId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ savedPostId }: { savedPostId: string }) => {
      return deleteSavedPost(savedPostId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getCurrentUser(),
  });
};

export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IUpdatePost) => updatePost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, imageId }: { postId: string; imageId: string }) =>
      deletePost(postId, imageId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePost,
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.documents.length === 0) return null;
      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;
      return lastId;
    },
  });
};

export const useSearchPostsByCaption = (searchValue: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS_BY_CAPTION, searchValue],
    queryFn: () => searchPostsByCaption(searchValue),
    enabled: !!searchValue,
  });
};
export const useSearchPostsByTags = (searchValue: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS_BY_TAGS, searchValue],
    queryFn: () => searchPostsByTags(searchValue),
    enabled: !!searchValue,
  });
};
export const useSearchPostsByLocation = (searchValue: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS_BY_Location, searchValue],
    queryFn: () => searchPostsByLocation(searchValue),
    enabled: !!searchValue,
  });
};
export const useSearchPostsByUsername = (searchValue: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS_BY_USERNAME, searchValue],
    queryFn: () => searchPostsByUsername(searchValue),
    enabled: !!searchValue,
  });
};
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS],
    queryFn: () => getAllUsers(),
  });
};
export const useGetUserByName = (name: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_NAME],
    queryFn: () => getUserByName(name),
    enabled: !!name,
  });
};
