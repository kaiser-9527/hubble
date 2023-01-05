import { useContext, useState } from "react";
import { RepoContext } from "../context/repo";
import { UserContext } from "../context/user";
import { GUIDKEY } from "~/constants";


const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { forceSyncAll } = useContext(RepoContext);
  const [isTipsHide, setTipsHide] = useState(
    !!localStorage.getItem(GUIDKEY.SyncData)
  );

  const handleHideTips = () => {
    localStorage.setItem(GUIDKEY.SyncData, '1')
    setTipsHide(true)
  };

  const handleSyncAllData = async () => {
    setLoading(true);
    await forceSyncAll();
    setLoading(false);
  };
  return (
    <div className="box flex gap-2 items-center flex-col relative">
      <img
        className="rounded-full"
        alt="kaiser"
        width={66}
        height={66}
        src={user?.user_metadata.avatar_url}
      />
      <h3>{user?.user_metadata.name || user?.email}</h3>

      <div className="absolute top-0 right-0 h-6 w-6">
        <button
          onClick={handleSyncAllData}
          title="force synchronize all data"
          className=" text-txt-3  hover:bg-primary-500 hover:text-txt-1 flex items-center justify-center rounded-lg h-full w-full "
        >
          <i
            className={`i-tabler-refresh ${loading ? "animate-spin" : ""}`}
          ></i>
        </button>
        {!isTipsHide && (
          <div className="absolute -top-8 -right-4 h-8 leading-8 text-center w-70 rounded-lg bg-primary-700 text-sm text-primary-50">
            Click to force synchronize all data
            <span className="ml-2 text-xl hover:text-primary-300 cursor-pointer i-tabler-playstation-x" onClick={handleHideTips}></span>
            <div className="absolute -bottom-1 right-5 h-0 w-0 border-x-8 border-x-transparent border-t-4 border-primary-700"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
