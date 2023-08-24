import { BiLogInCircle } from "react-icons/bi";
const ButtonWithIconRight = (props: { value: string; type: string }) => {
  return (
    <center className="mt-4 md:mt-8 my-8">
      <button className="px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-blue hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg ">
        <div className="flex items-center capitalize ">
          {props.value}
          <BiLogInCircle className="mx-2" />
        </div>
      </button>
    </center>
  );
};

export default ButtonWithIconRight;
