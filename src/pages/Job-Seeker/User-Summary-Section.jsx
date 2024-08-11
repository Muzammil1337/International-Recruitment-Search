import { useContext, useState } from "react";
import { UserFormContext } from "../../context/FormContext";
import { toast } from "react-toastify";

export default function UserSummaryForm() {
  const { data, updateUserInformation } = useContext(UserFormContext);

  const [words, setWords] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;

    const length = value.length;

    setWords(length);

    if (length > 350) {
      toast.error("You have exceeded the limit of 350 characters");
      return;
    }

    updateUserInformation({
      ...data,
      summary: value,
    });
  };

  return (
    <form className="lg:w-1/2 w-[80%] my-4">
      <label htmlFor="name" className="relative block w-full">
        <textarea
          type="text"
          rows={4}
          id="name"
          name="name"
          value={data.summary}
          onChange={handleChange}
          className="px-2 peer w-full rounded border border-neutral-400 p-4 text-base transition-shadow focus:ring-1 focus:ring-offset-0 focus:border-indigo-400 focus:outline-none text-black"
        />
        <span
          className="absolute left-2 top-0 -translate-y-1/2
    scale-100 bg-violet-500 rounded px-1 py-2 text-sm text-white font-medium transition-transform
    peer-focus:scale-0
    "
        >
          Your Profile Summary:
        </span>
      </label>

      <div>
        <p>{words} / 350</p>
      </div>
    </form>
  );
}
