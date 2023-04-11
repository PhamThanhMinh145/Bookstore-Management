import { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Slider.css";
import { linkImg } from "./sliderData";

const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    initialSlide: 0,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: false,
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 10000,
                pauseOnHover: false,
                initialSlide: 0,
                arrows: false,
            },
        },
        {
            breakpoint: 600,
            settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                initialSlide: 0,
                arrows: false,
            },
        },
        {
            breakpoint: 480,
            settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                pauseOnHover: false,
                initialSlide: 0,
                arrows: false,
            },
        },
    ],
};

export default class Sliders extends Component {
    render() {
        return (
            <div className="slider">
                <Slider {...settings}>
                    {linkImg.map((item) => (
                        <div className="slider__item" key={item}>
                            <img src={item.link} alt="" className="slider__img" />
                        </div>
                    ))}
                </Slider>
            </div>
        );
    }
}
