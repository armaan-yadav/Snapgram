import { Link } from "react-router-dom";

const SearchedUser = ({
  id,
  imageUrl,
  username,
}: {
  id: string;
  imageUrl: string;
  username: string;
}) => {
  return (
    <li
      key={id}
      className="w-full rounded-md bg-dark-3 hover:bg-dark-4 transition-all duration-300 active:bg-dark-4"
    >
      <Link to={`/profile/${id}`} className="w-full flex-between">
        <div className="flex gap-3 items-center">
          <img src={imageUrl} alt="" className="h-12 w-12 rounded-full" />
          <p className="body-medium">{username}</p>
        </div>
      </Link>
    </li>
  );
};

export default SearchedUser;
