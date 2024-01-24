import "./globals.css";
import { Routes, Route } from "react-router-dom";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import {
  Home,
  Explore,
  CreatePost,
  People,
  Saved,
  EditPost,
  UpdateProfile,
  AllUsers,
  Profile,
  LikedPosts,
  PostDetails,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RouteLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";
type Props = {};

const App = (props: Props) => {
  return (
    <main className="flex h-screen ">
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />
        </Route>

        {/* Private Routes */}
        <Route element={<RouteLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="saved" element={<Saved />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="edit-post/:id" element={<EditPost />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="all-users" element={<AllUsers />} />
          <Route path="profile" element={<Profile />} />
          <Route path="liked-posts" element={<LikedPosts />} />
          <Route path="post-details/:id" element={<PostDetails />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
