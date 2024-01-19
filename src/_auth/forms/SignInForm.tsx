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
import { SignInValidation, SignUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { signInAccount } from "@/lib/appwrite/api";
type Props = {};

const SignUpForm = (props: Props) => {
  const isLoading = false;
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    try {
      const session = await signInAccount(values);
      return session;
    } catch (error) {
      console.log(error);
    }
    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="flex  flex-col ">
        <img src="/assets/images/logo.svg" alt="" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Good to see you again :)
        </h2>
        <p className="text-light-3 small-medium md:base-regular my-2">
          To use SnapBook enter your details
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          <Link to={"/sign-up"}>
            <p className=" small-medium md:base-regular my-2">
              Don't have an account?{" "}
              <span className="text-light-3"> Sign Up</span>
            </p>
          </Link>
          <Button type="submit" className="w-full shad-button_primary">
            {isLoading ? <Loader /> : <div>Sign In</div>}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
