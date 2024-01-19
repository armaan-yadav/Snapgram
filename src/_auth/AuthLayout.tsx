import { Outlet, Navigate } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex items-center justify-center flex-1  py-10  overflow-hidden">
            <Outlet />
          </section>
          <img
            src="../../assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block w-1/2 object-cover bg-no-repeat "
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
