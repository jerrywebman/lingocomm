const SmallText = ({ intro }) => {
  return (
    <p className="text-black text-sm md:text-base leading-loose font-medium md:leading-relaxed mb-4">
      {intro}
    </p>
  );
};

export default SmallText;
