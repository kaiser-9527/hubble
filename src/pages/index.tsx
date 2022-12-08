import { Link } from "react-router-dom";
import useUser from "~/hooks/useUser";

export default function Home() {
  const { user } = useUser();
  return (
    <>
      {user?.email}
      <main>home page</main>
      <Link to="/app">APP</Link>
    </>
  );
}
