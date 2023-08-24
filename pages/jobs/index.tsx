import { useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";
import Title from "@/components/Typography/Title";
import DivideX from "@/components/Divider/DivideX";
import JobCard from "@/components/Cards/JobCard";
import Loading from "@/components/loading/Loading";

// types
type JobType = {
  _id: string;
  title: string;
  state: string;
  description: string;
  requirements: string[];
  location: string;
  type: string;
  jobApplications?: any[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

type JobResponseType = {
  status: number;
  data?: [];
  message: string;
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_UR}/jobs/all`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [allJobs, setAllJobs] = useState<JobType[]>();
  const getInfo = async () => {
    const data: JobResponseType = await getData();
    const jobs: JobType[] | undefined = data.data;
    setAllJobs(jobs);
  };
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="mt-8">
        <Title
          intro={""}
          titleColor={"text-primary-blue px-4 "}
          title={"Your career at Lingo Communications"}
          subtitle={""}
          introRequired={false}
          subtitleRequired={false}
          bgLineRequired={false}
        />
      </div>
      <DivideX>
        {allJobs === undefined ? (
          <>
            <>
              <Loading />
            </>
          </>
        ) : (
          <div className="grid grid-col-1 md:grid-cols-3 gap-8 py-8 md:py-16">
            {allJobs?.map((item) => (
              <JobCard key={item._id} {...item} />
            ))}
          </div>
        )}
      </DivideX>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  };
}
