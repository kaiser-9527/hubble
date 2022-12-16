import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "~/components/context/user";

export default () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user && <span>{user.email}</span>}
      <Link to="/app">app</Link>
    </div>
  );
};
