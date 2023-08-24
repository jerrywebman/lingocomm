import Slider from "react-slick";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import heroImage from "/public/assets/images/hero/home.png";
import heroImage1 from "/public/assets/images/food/food-1.png";
import Image from "next/image";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdArrowForwardIos
      size={40}
      className={className}
      style={{ color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdArrowBackIos
      size={40}
      className={className}
      style={{ color: "black" }}
      onClick={onClick}
    />
  );
}

const HeroSlider = () => {
  const images = [heroImage1, heroImage];

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {images.map((i, index) => (
        <div key={index}>
          {" "}
          <Image src={i} alt={`Ujali Foods ${index}`} />
        </div>
      ))}
    </Slider>
  );
};
export default HeroSlider;
