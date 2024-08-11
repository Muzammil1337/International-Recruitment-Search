import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Fragment, useContext, useEffect, useState } from "react";

const UserPage = () => {
  const { data } = useContext(AuthContext);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (typeof data === "undefined") {
      setDisable(true);
    }
  });

  console.log("data", data, "disable", disable);

  return (
    <div className="px-4 py-2 w-full">
      {/*<p>{JSON.stringify(data)}</p>*/}

      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">
          Hello there, Welcome to the User page.
        </h1>
        <p className="text-xl font-base">
          Click below to generate your CV/Resume.{" "}
        </p>
        {!disable && (
          <Fragment>
            <Link
              to={"/my-resume"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-medium p-4 text-white rounded-xl hover:bg-gradient-to-br hover:from-indigo-500 hover:via-purple-400 hover:to-pink-600 transition duration-300 ease-in-out"
            >
              Generate USA CV/Resume{" "}
            </Link>

            <Link
              to={"/my-resume"}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "transition duration-300 ease-in-out bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-medium text-medium p-4 text-white rounded-xl hover:bg-gradient-to-br hover:from-indigo-500 hover:via-purple-400 hover:to-pink-600"
              }
            >
              Generate Euro CV/Resume{" "}
            </Link>
          </Fragment>
        )}

        {disable && (
          <p className="flex items-center justify-center text-xl font-medium bg-zinc-100 w-[40%] h-20 rounded-lg hover:bg-zinc-300 cursor-pointer">
            You have no Data for your resume. Go to
            <Link
              to={"/resume-builder"}
              className="text-blue-500 underline text-lg ml-2 cursor-pointer"
            >
              Builder
            </Link>
          </p>
        )}

        {!disable && (
          <p className="text-lg font-base">
            Press the command (ctrl + p), In-order to save it as PDF file. Thank
            you.{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
