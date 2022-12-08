import { Link } from "react-router-dom";
import useUser from "~/hooks/useUser";

export default function Home() {
  const { user } = useUser();
  console.log(user);

  return (
    <>
      <main>home page</main>
      <Link to="/app">APP</Link>
    </>
  );
}
