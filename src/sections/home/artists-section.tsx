import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { useArtists } from "src/api/artists";

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 6,
  slidesToScroll: 3,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const Artists = () => {
  const { artists, loading } = useArtists();
  const sliderRef: any = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [artists]);

  return (
    <section className="section-wrapper artists-section">
      <div className="section-title">
        <h4 className="title">Meet Popular Artists</h4>
        <p>Discover a world of art and innovation with renowned global artists.</p>
      </div>
      <div className="container-fluid">
        <Slider ref={sliderRef} {...settings}>
          {artists?.artists?.map((artist: any) => {
            const profileImage = artist?.images?.find((img: any) => img.isProfile)?.imageurl;

            return (
              <div key={artist._id} className="d-flex flex-column align-items-center">
                <div className="artist-profile">
                  {profileImage && <Image src={profileImage} alt={artist?.artistName} width={400} height={400} />}
                </div>
                <div className="artist-desc">
                  <h3 className="name">{artist?.artistName}</h3>
                  <span className="title">{artist?.category}</span>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default Artists;
