import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface EventImage {
  isPrimary: boolean;
  _id: string;
  imageurl: string;
}

interface GalleryComponentProps {
  eventImages: EventImage[];
}

const SliderGallery: React.FC<GalleryComponentProps> = ({ eventImages }) => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const openLightbox = (index: number) => {
    console.log(index, "index!!!!");
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 4,
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

  console.log(eventImages[selectedImageIndex].imageurl, "issue here???");

  const lightboxImages = eventImages.map((image) => ({
    src: image.imageurl,
    alt: "event",
  }));

  return (
    <div>
      <Slider {...settings} className="details-photos">
        {eventImages.map((image, index) => (
          <div className="thumb" key={image._id}>
            <div className="img-pop" onClick={() => openLightbox(index)}>
              <Image src={image.imageurl} alt="event" width={200} height={200} />
            </div>
          </div>
        ))}
      </Slider>
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxImages}
          index={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default SliderGallery;
