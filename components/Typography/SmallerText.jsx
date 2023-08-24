const SmallerText = ({ intro }) => {
  return (
    <p className="text-black text-xs md:text-sm leading-loose font-medium md:leading-relaxed mb-4">
      {intro}
    </p>
  );
};

export default SmallerText;
