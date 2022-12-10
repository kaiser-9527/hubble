import LanguageList from "~/components/languageList";
import Login from "~/components/signIn";
import OverView from "~/components/overview";
import SideBar from "~/components/sideBar";
import TagList from "~/components/tagList";
import UserInfo from "~/components/userInfo";
import useUser from "~/hooks/useUser";
import "~/styles/app.css";
import Toaster from "~/components/toaster";
import RepoList from "~/components/repoList";

const App = () => {
  const { user } = useUser();

  if (!user) return <Login />;

  return (
    <>
      <main className="container  mx-auto h-screen relative flex py-10">
        <SideBar>
          <UserInfo></UserInfo>
          <OverView />
          <LanguageList></LanguageList>
        </SideBar>
        <RepoList />
        <SideBar>
          <TagList></TagList>
        </SideBar>
      </main>
      <Toaster />
    </>
  );
};

export default App;
