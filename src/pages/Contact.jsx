import contact from "../assets/contact-us.png";

export default function Contact() {
  return (
    <div className="h-full flex flex-col items-center gap-4">
      <div className="bg-sky-600 w-full h-full p-16 flex justify-center items-center">
        <h1 className="text-7xl font-bold">Contact Us</h1>
      </div>
      <div className="flex my-20">
        <div className="flex-1">
          <form action="" className="space-y-6 my-4 flex flex-col items-center">
            {/* Name */}
            <div className="mx-10 border-1 border-sky-900 p-2 rounded-md w-[70%]">
              <input
                type="text"
                className="outline-none w-full"
                placeholder="Full Name"
              />
            </div>
            {/* Email */}
            <div className="mx-10 border-1 border-sky-900 p-2 rounded-md w-[70%]">
              <input
                type="email"
                className="outline-none w-full"
                placeholder="Email"
              />
            </div>
            {/* Message */}
            <div className="mx-10 border-1 border-sky-900 p-2 rounded-md w-[70%]">
              <textarea
                type="text"
                className="outline-none w-full"
                placeholder="Full Message"
              />
            </div>
            <div className="px-24 w-full">
              <button className="transition delay-150 duration-300 ease-in-out w-full font-bold text-2xl bg-orange-400 p-2 rounded-lg hover:bg-orange-200">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="flex-1">
          <img src={contact} alt="" className="object-cover" />
        </div>
      </div>
    </div>
  );
}
