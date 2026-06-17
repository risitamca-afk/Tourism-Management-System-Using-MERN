//in the ase of Icon w are using a react component name lucide react
const Input2 = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6 mx-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-black" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2  bg-transparent bg-opacity-50 rounded-lg border  focus:border-blue-600 focus:ring-2 focus:ring-white focus:outline-none text-black placeholder-gray-400 transition duration-200"
      />
    </div>
  );
};
export default Input2;
