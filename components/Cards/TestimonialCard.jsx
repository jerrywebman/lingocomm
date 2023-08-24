import { AiFillStar } from "react-icons/ai";
import Testimonial1 from "/public/assets/images/testimonial/testimonial-1.png";
import Testimonial2 from "/public/assets/images/testimonial/testimonial-2.png";
import Testimonial3 from "/public/assets/images/testimonial/testimonial-3.png";
import Image from "next/image";
import SmallerText from "../Typography/SmallerText";

const TestimonialCard = () => {
  return (
    <>
      <div className="p-4 rounded-lg bg-white drop-shadow-xl">
        {" "}
        <blockquote className="flex-1">
          {" "}
          <SmallerText
            intro={
              "I was blown away by the ease of use of this food order and delivery website. The variety of options available is amazing, and the food arrived fresh and hot within minutes of ordering."
            }
          />
        </blockquote>
        <div className="flex mt-4  justify-between ">
          <div className="flex">
            {" "}
            <Image
              src={Testimonial1}
              alt="Ujali Foods"
              className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
            />
            <div className="ml-4">
              <p className="text-xs md:text-base font-bold">Peterson Wilson</p>
              <p className="mt-0.5 text-xs md:text-sm text-gray-500">
                Ceo Hive haven
              </p>
            </div>
          </div>

          <div className="flex ml-10 my-auto text-yellow-300">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
      </div>
    </>
  );
};
export default TestimonialCard;
