const Title = ({
  intro,
  title,
  titleColor,
  subtitle,
  introRequired,
  subtitleRequired,
  bgLineRequired,
}) => {
  return (
    <>
      <div>
        {" "}
        {introRequired === true ? (
          <>
            <p className="capitalize leading-6 font-bold md:font-medium text-center text-white text-xs md:text-xl mb-1">
              {intro}
            </p>
          </>
        ) : (
          <></>
        )}
        <h2
          className={`font-bold text-3xl md:text-5xl text-center md:mx-0 md:items-center p-2 ${
            bgLineRequired === true
              ? "bg-title-line bg-no-repeat bg-bottom"
              : "bg-none"
          }`}
        >
          <span className={titleColor}>{title}</span>
        </h2>
        {subtitleRequired === true ? (
          <>
            <p className="leading-5 md:leading-loose font-normal text-center text-gray-400 text-xs md:text-lg mx-8 md:mx-12 mb-8">
              {subtitle}
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Title;
