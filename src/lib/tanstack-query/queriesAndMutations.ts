import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { createUserAccount, signInAccount, signOutAccount } from "../appwrite/api";
import { INewUser } from "@/types";

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
  return useMutation({
    mutationFn: () => {
      return signOutAccount();
    },
  });
};
