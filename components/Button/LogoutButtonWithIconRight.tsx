import { BiLogOut, BiLogOutCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const LogoutButtonWithIconRight = (props: { value: string }) => {
  const logoutUser = () => {
    localStorage.removeItem("lingoUser");
    toast.success(`Logout Successfully, Please hold on`);
    window.location.reload();
  };
  return (
    <center className="mt-4 md:mt-8 my-8">
      <button
        className="px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-red hover:shadow-lg backdrop-blur-lg"
        onClick={() => logoutUser()}
      >
        <div className="flex items-center capitalize ">
          {props.value}
          <BiLogOutCircle className="mx-2" />
        </div>
      </button>
    </center>
  );
};

export default LogoutButtonWithIconRight;
