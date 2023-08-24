const RoundedButton = ({ text, color }) => {
  return (
    <>
      <button
        type="submit"
        className={`px-4 py-2 rounded-lg ${color} text-md md:text-base font-medium text-white w-full hover:shadow-lg hover:bg-primary-purple hover:text-black`}
      >
        {text}
      </button>
    </>
  );
};

export default RoundedButton;
