import Header from "~/components/header";
import Intro from "~/components/Intro";
import "~/styles/home.css";

export default function Home() {
  return (
    <div className="home min-h-screen">
      <Header />
      <Intro />
    </div>
  );
}
