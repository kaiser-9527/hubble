import useUser from "~/hooks/useUser";

const UserInfo = () => {
  const { user } = useUser();

  return (
    <div className="box flex gap-2 items-center flex-col">
      <img
        className="rounded-full"
        alt="kaiser"
        width={66}
        height={66}
        src={user?.avatar_url}
      />
      <h3>{user?.name || user?.email}</h3>
    </div>
  );
};

export default UserInfo;
