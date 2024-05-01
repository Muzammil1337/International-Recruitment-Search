import { useContext } from "react";
import { UserFormContext } from "../../context/FormContext";

const PersonalInfoForm = () => {
  const { data, updateUserInformation } = useContext(UserFormContext);

  const handleChange = (e) => {
    const { id, value } = e.target;
    updateUserInformation({
      ...data,
      PersonalInfo: { ...data.PersonalInfo, [id]: value },
    });
  };

  return (
    <form className="lg:w-1/2 w-[80%] my-4">
      <label htmlFor="name" className="relative block w-full">
        <input
          type="text"
          id="name"
          name="name"
          value={data.PersonalInfo.name}
          onChange={handleChange}
          className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
        />
        <span
          className="absolute left-2 top-0 -translate-y-1/2
        scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
        peer-focus:scale-0
        "
        >
          Name:
        </span>
      </label>

      <br />
      <label htmlFor="email" className="relative block w-full">
        <input
          type="email"
          id="email"
          name="email"
          value={data.PersonalInfo.email}
          onChange={handleChange}
          className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
        />
        <span
          className="absolute left-2 top-0 -translate-y-1/2
        scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
        peer-focus:scale-0
        "
        >
          Email:
        </span>
      </label>

      <br />
      <label htmlFor="phone" className="relative block w-full">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.PersonalInfo.phone}
          onChange={handleChange}
          className="px-2 peer w-full rounded border border-neutral-400 p-4 text-sm transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
        />
        <span
          className="absolute left-2 top-0 -translate-y-1/2
      scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
      peer-focus:scale-0
      "
        >
          Phone Number:
        </span>
      </label>

      <br />
      <label htmlFor="address" className="relative block w-full">
        <input
          type="tel"
          id="address"
          name="address"
          value={data.PersonalInfo.address}
          onChange={handleChange}
          className="px-2 peer w-full rounded border border-neutral-400 p-4 text-sm transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
        />
        <span
          className="absolute left-2 top-0 -translate-y-1/2
        scale-100 bg-violet-500 rounded px-0.5 text-sm text-white font-medium transition-transform
        peer-focus:scale-0
        "
        >
          Address:
        </span>
      </label>
      <br />
    </form>
  );
};

export default PersonalInfoForm;
