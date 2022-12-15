import LanguageList from "~/components/languageList";
import OverView from "~/components/overview";
import SideBar from "~/components/sideBar";
import TagList from "~/components/tagList";
import UserInfo from "~/components/userInfo";
import "~/styles/app.css";
import Toaster from "~/components/toaster";
import RepoList from "~/components/repoList";
import RepoProvider from "~/components/context/repo";

const App = () => {
  return (
    <RepoProvider>
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
    </RepoProvider>
  );
};

export default App;
