import SmallerText from "../Typography/SmallerText";
import RoundedButton from "../Button/RoundedButton";
import { FaRegHandshake } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

const JoinUsCard = ({ text, btnText, IconName }) => {
  return (
    <>
      <div className="p-4 rounded-lg bg-white drop-shadow-xl text-center">
        {" "}
        <IconName className="mx-auto text-5xl my-2 hover:text-primary-orange" />
        <h2
          className={`font-bold text-xl md:text-2xl mb-2 text-center md:mx-0 leading-normal md:items-center p-2 `}
        >
          {text}
        </h2>
        <SmallerText
          intro={
            "I was blown away by the ease of use of this  of options available is amazing, and the food arrived fresh and hot within minutes of ordering."
          }
        />
        <div className="px-16 md:px-24">
          <RoundedButton text={btnText} />
        </div>
      </div>
    </>
  );
};
export default JoinUsCard;
