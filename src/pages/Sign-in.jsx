import { Button, Input } from "@nextui-org/react";
import { useContext, useState } from "react";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { MailIcon } from "../assets/Mailicon";
import { RiLockPasswordLine } from "@react-icons/all-files/ri/RiLockPasswordLine";
import { GoSignIn } from "@react-icons/all-files/go/GoSignIn";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPass, setErrorPass] = useState(null);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);

  const navigate = useNavigate();
  const { SignIn } = useContext(AuthContext);
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@!#$%^&*]{8,}$/;

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Validate email using regex
    const isValidEmail = emailRegex.test(newEmail);
    setIsInvalidEmail(!isValidEmail); // Set isInvalid based on validation

    // Update error message if necessary
    if (!isValidEmail) {
      setErrorEmail("Please enter a valid email address");
    } else {
      setErrorEmail(null); // Clear error if email is valid
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Validate password using regex
    const isValidPassword = passwordRegex.test(newPassword);
    setIsInvalidPass(!isValidPassword); // Set isInvalid based on validation

    // Update error message if necessary
    if (!isValidPassword) {
      setErrorPass("Must be strong password");
    } else {
      setErrorPass(null); // Clear error if password is valid
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (await SignIn(email, password)) {
        navigate("/");
      }
    } catch (error) {
      console.log("There is an error", error);
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="lg:h-full flex bg-black">
      <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-8 md:px-32 md:py-16 w-full">
        <div className="flex-[6] flex flex-col space-y-8 lg:space-y-12 justify-center px-12 py-6">
          <h2 className="text-white font-bold text-3xl lg:text-5xl text-balance">
            Welcome to International Recruitment Search
          </h2>
          <h5 className="text-white font-semiBold text-lg md:text-xl text-balance">
            One of the best Resume Builder Web Application where you can create
            resume based on international criteria..
          </h5>
          <p className="text-white font-semibold text-base lg:text-lg">
            You are just few steps away to create a better resume to shine in
            your job search.
          </p>
        </div>
        <div className="flex-1 lg:flex-[4] flex flex-col gap-10 bg-slate-900 px-6 py-3 lg:px-10 lg:py-5 rounded-2xl">
          <h2 className="text-xl md:text-3xl font-bold underline mb-5 text-white flex flex-col justify-center items-center gap-2">
            <GoSignIn className="text-lg text-center lg:text-3xl md:text-6xl text-default-400 pointer-events-none flex-shrink-0" />
            Sign-in into your account
          </h2>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="outside"
            startContent={
              <MailIcon className="text-lg lg:text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            value={email}
            onChange={handleEmailChange}
            errorMessage={errorEmail}
            isInvalid={isInvalidEmail}
            classNames={{
              label: "!text-white",
            }}
          />

          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            labelPlacement="outside"
            errorMessage={errorPass}
            isInvalid={isInvalidPass}
            startContent={
              <RiLockPasswordLine className="text-lg lg:text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-lg lg:text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-lg lg:text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            classNames={{
              label: "!text-white",
            }}
          />

          <Button
            type="submit"
            color="success"
            variant="flat"
            className="text-base p-4"
            onClick={handleSubmit}
          >
            <GoSignIn className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
            Sign In
          </Button>

          <p className="text-white text-balance">
            Don&apos;t you have an account? Click here{"  "}
            <Link to={"/sign-up"} className="text-blue-400 underline">
              Sign-Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

// errorMessage="Please enter a valid email"
// isInvalid={true}
