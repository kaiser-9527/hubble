import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "~/components/context/user";

export default () => {
  const { user } = useContext(UserContext);
  return (
    <header>
      <div className="container flex items-center justify-between mx-auto py-2 h-15">
        <img src="/images/logo.svg" alt="hubble" className="h-full" />

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/kaiser-9527/hubble"
            target="_blank"
            className="flex items-center h-8 w-8 justify-center bg-fill-3 hover:bg-fill-2 rounded-full"
          >
            <i className="i-tabler-brand-github"></i>
          </a>
          {user && (
            <Link to="/app">
              <img
                className="h-8 w-8 rounded-full"
                src={user.user_metadata.avatar_url}
                alt={user.email}
              />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
