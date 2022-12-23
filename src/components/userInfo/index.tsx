import { useContext, useState } from "react";
import { RepoContext } from "../context/repo";
import { UserContext } from "../context/user";

const UserInfo = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { forceSyncAll } = useContext(RepoContext);

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

      <button
        onClick={handleSyncAllData}
        title="force sync all data."
        className="absolute text-txt-3 top-0 right-0 hover:bg-primary-500 hover:text-txt-1 flex items-center justify-center rounded-lg h-6 w-6 "
      >
        <i className={`i-tabler-refresh ${loading ? "animate-spin" : ""}`}></i>
      </button>
    </div>
  );
};

export default UserInfo;
