import { signIn } from "~/api/supabase";

export default () => {
  const handleSignIn = () => {
    signIn();
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button onClick={handleSignIn}>login wite github</button>
    </div>
  );
};
