import { BiArrowBack, BiLogInCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";

const ButtonWithIconLeft = (props: { value: string }) => {
  const router = useRouter();
  return (
    <center className="mt-4 md:mt-8 my-8">
      <button
        className="px-4 md:px-8 py-4 rounded-lg text-lg md:text-xl font-medium bg-gray-100 text-primary-red hover:text-white hover:bg-primary-blue hover:shadow-lg backdrop-blur-lg "
        onClick={() => router.back()}
      >
        <div className="flex items-center capitalize ">
          <BiArrowBack className="mx-2" />
          {props.value}
        </div>
      </button>
    </center>
  );
};

export default ButtonWithIconLeft;
