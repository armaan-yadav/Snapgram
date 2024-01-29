import z from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/tanstack-query/queriesAndMutations";
import { useUserContext } from "@/components/context/AuthContext";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const {
    mutateAsync: createUserAccount,
    isPending: isCreating,
    isSuccess: isCreated,
  } = useCreateUserAccount();
  const {
    mutateAsync: signInAccount,
    isPending: isSigningIn,
    isSuccess: isSigningDone,
  } = useSignInAccount();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    const newUser = await createUserAccount(values);
    console.log(isCreated, isCreating);
    console.log(newUser);
    if (!newUser)
      return toast({ description: "Sign Up failed. Please try again." });
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({ description: "Sign In Failed. Please try again." });
    }
    console.log(session);
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ description: "Sign Up failed. Please try again." });
    }
  }
  return (
    <Form {...form}>
      <div className="flex  flex-col ">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular my-2">
          To use SnapBook enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to={"/sign-in"}>
            <p className=" small-medium md:base-regular my-2">
              Already have an account ?{" "}
              <span className="text-light-3"> Sign In</span>
            </p>
          </Link>
          <Button type="submit" className="w-full shad-button_primary">
            {isCreating ? <Loader /> : <div>Sign Up</div>}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
