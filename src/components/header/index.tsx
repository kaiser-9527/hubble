import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "~/components/context/user";

export default () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      {user && (
        <Link to="/app">
          <img
            className="h-10 w-10 rounded-full"
            src={user.user_metadata.avatar_url}
            alt={user.email}
          />
        </Link>
      )}
    </header>
  );
};
