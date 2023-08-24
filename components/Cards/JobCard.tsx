import RoundedButton from "../../components/Button/RoundedButton";
import Link from "next/link";
//icons
import { FaMapMarkerAlt, FaSuitcase } from "react-icons/fa";

//types
type JobType = {
  _id: string;
  title: string;
  state: string;
  description: string;
  requirements?: string[];
  location: string;
  type: string;
  jobApplications?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

const JobCard = (props: JobType) => {
  return (
    <>
      <div className="rounded-md shadow-lg p-4 text-center" key={props._id}>
        <h4 className="font-bold text-primary-blue text-lg md:text-2xl">
          {props.title}
        </h4>
        <p className="text-sm my-4 text-gray-500">{props.description}</p>
        <div className="flex justify-between px-4 text-gray-500">
          <>
            <span>
              <FaMapMarkerAlt className="inline text-xl" /> {props.location}
            </span>
          </>
          <>
            <span>
              <FaSuitcase className=" text-xl inline" /> {props.type}
            </span>
          </>
        </div>
        {/* <hr className="my-4"></hr>
        <div className=" px-4 text-gray-500">
          <>
            <span className="mx-auto">
              <BsCalendarDateFill className="inline text-lg" />{" "}
              {moment(props.createdAt).fromNow()}
            </span>
          </>
        </div> */}
        <hr className="my-4"></hr>
        <div className="px-8">
          <Link
            href={`/jobs/${encodeURIComponent(props._id)}`}
            as={"/jobs/" + props._id}
          >
            <RoundedButton text={"Apply"} color={"bg-primary-blue"} />
          </Link>
        </div>
      </div>
    </>
  );
};
export default JobCard;
