import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="px-4 py-2 w-full">
      {/*<p>{JSON.stringify(data)}</p>*/}

      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">
          Hello there, Welcome to the User page.
        </h1>
        <p className="text-xl font-medium">
          Click below to generate your CV/Resume.{" "}
        </p>
        <Link
          to={"/my-resume"}
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-medium p-4 text-white rounded-xl hover:bg-gradient-to-br hover:from-indigo-500 hover:via-purple-400 hover:to-pink-600"
        >
          Generate CV/Resume{" "}
        </Link>

        <p className="text-xl font-medium">
          Press the command (ctrl + p) inorder to save it as PDF file. Thank you.{" "}
        </p>
      </div>
    </div>
  );
};

export default UserPage;
