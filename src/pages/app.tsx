import LanguageList from "~/components/languageList";
import OverView from "~/components/overview";
import SideBar from "~/components/sideBar";
import TagList from "~/components/tagList";
import UserInfo from "~/components/userInfo";
import Toaster from "~/components/toaster";
import RepoList from "~/components/repoList";
import RepoProvider from "~/components/context/repo";
import LoadingProvider from "~/components/context/loading";

const App = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-lg">
      During the system upgrade, it may take one to two hours. We apologize for any inconvenience this may cause to your use of the system. Thank you for your patience and understanding.
    </div>
  );
};

export default App;
