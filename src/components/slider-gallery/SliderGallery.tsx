import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

import Lightbox, { useLightBox } from "../lightbox";

interface EventImage {
  isPrimary: boolean;
  _id: string;
  imageurl: string;
}

interface GalleryComponentProps {
  eventImages: EventImage[];
}

const SliderGallery: React.FC<GalleryComponentProps> = ({ eventImages }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slides = eventImages.map((slide) => ({
    src: slide.imageurl,
  }));

  const lightbox = useLightBox(slides);

  return (
    <div>
      <Slider {...settings} className="details-photos">
        {eventImages.map((image, index) => (
          <div className="thumb" key={image._id}>
            <div className="img-pop" onClick={() => lightbox.onOpen(image.imageurl)}>
              <Image src={image.imageurl} alt="event" width={200} height={200} />
            </div>
          </div>
        ))}
      </Slider>

      <Lightbox index={lightbox.selected} slides={slides} open={lightbox.open} close={lightbox.onClose} />
    </div>
  );
};

export default SliderGallery;
