import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "~/components/context/user";

export default () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <div className="container flex items-center justify-between mx-auto py-2 h-15">
        <img src="/logo.svg" alt="hubble" className="h-full" />
        {user && (
          <Link to="/app">
            <img
              className="h-10 w-10 rounded-full"
              src={user.user_metadata.avatar_url}
              alt={user.email}
            />
          </Link>
        )}
      </div>
    </header>
  );
};
