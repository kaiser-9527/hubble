import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "~/components/context/user";

export default () => {
  const { user } = useContext(UserContext);
  if (!user) return <header>sign in</header>;
  return <div>{user && <Link to="/app">app</Link>}</div>;
};
