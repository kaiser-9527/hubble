import { useContext } from "react";
import { UserContext } from "../context/user";

const UserInfo = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="box flex gap-2 items-center flex-col">
      <img
        className="rounded-full"
        alt="kaiser"
        width={66}
        height={66}
        src={user?.user_metadata.avatar_url}
      />
      <h3>{user?.user_metadata.name || user?.email}</h3>
    </div>
  );
};

export default UserInfo;
