import { Models } from "appwrite";
import { Link } from "react-router-dom";

const SearchedUser = ({ users }: { users: Models.Document[] }) => {
  return (
    <ul>
      {users?.map((user) => {
        return (
          <li
            key={user.$id}
            className="w-full rounded-md bg-dark-3 hover:bg-dark-4 transition-all duration-300 active:bg-dark-4 py-8"
          >
            <Link to={`/profile/${user.$id}`} className="w-full flex-between">
              <div className="flex gap-3 items-center">
                <img
                  src={user.imageUrl}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
                <p className="body-medium">{user.username}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchedUser;
