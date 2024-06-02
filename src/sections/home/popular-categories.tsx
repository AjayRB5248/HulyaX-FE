import Image from "next/image";
import Slider from "react-slick";
import PopularCategory01 from "src/assets/frontend/images/media/NepathyaVideoThumbnail.jpeg";
import PopularCategory001 from "src/assets/frontend/images/media/NepathyaVideoThumbnail1.png";
import PopularCategory02 from "src/assets/frontend/images/event/165919922762e55efbe71f1.webp";
import PopularCategory03 from "src/assets/frontend/images/event/Nepathya.jpg";

import EventPoster from "src/assets/frontend/images/event/Pink.jpg";
import Olivia from "src/assets/frontend/images/artists/Olivia.png";
import Sacar from "src/assets/frontend/images/artists/Sacar.jpeg";
import Neetesh from "src/assets/frontend/images/artists/Neetesh.jpeg";

import VenueIcon from "src/assets/frontend/images/icons/location.png";

import SacarPoster from "src/assets/frontend/images/event/SacarPoster.jpeg";
import NeeteshPoster from "src/assets/frontend/images/event/NeeteshConcert.jpg";
import { PlayButtonSVG } from "src/components/icons";
import Link from "next/link";
import { useState } from "react";
import VideoDialog from "src/components/video-dialog";

const PopularCategories = () => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    // autoplay: true,
    // speed: 3000,
    // autoplaySpeed: 2000,
    // cssEase: "linear",
    // pauseOnHover: true,
  };

  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="section-wrapper section--popular-categories">
      <div className="container-fluid">
        <div className="section-title">
          <h4 className="title text-left">🔥 Popular Past Events</h4>
          <p className="text-left event-sub-title">
            Rewind and Rediscover the Iconic Past Popular Events That Made Waves and Set the Stage on Fire!
          </p>
        </div>

        <div className="row">
          {/* TODO: Disabling for now: very less events - reptitive  */}
          <div className="col-12 col-md-7 d-none">
            <div className="event-item event-item--row">
              <div className="event-top-card">
                <Image src={SacarPoster} alt="Event Poster" />
                <h4 className="event-title">Sacar Australia Tour 2024</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Sacar} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Sacar Adhikari
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
            <div className="event-item event-item--row">
              <div className="event-top-card">
                <Image src={EventPoster} alt="Event Poster" />
                <h4 className="event-title">Pink Summer Carnival</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Olivia} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Olivia Rodrigo
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
            <div className="event-item event-item--row">
              <div className="event-top-card">
                <Image src={NeeteshPoster} alt="Event Poster" />
                <h4 className="event-title">Rebirth Australia Tour</h4>
              </div>

              <div className="event-bottom-card d-flex flex-column p-4">
                <div className="artist d-flex align-items-center">
                  <Image src={Neetesh} alt="Artist Profile" className="artist-profile-img" />
                  <h4 className="artist-name ml-3">
                    Neetesh Jung Kunwar
                    <p className="artist-position">Artist/SongWriter</p>
                  </h4>
                  <button className="theme-button">Buy Ticket</button>
                </div>

                <div className="venue d-flex align-items-center">
                  <Image src={VenueIcon} alt="Venue icon" className="venue-icon" />

                  <div className="venue-name ml-3">128 Street Olympic, Sydney, Australia</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-12">
            <Slider {...settings} className="slider-wrapper">
              <div className="popular-categories-slider" onClick={() => setPlayVideo(true)}>
                <div className="button is-play">
                  <PlayButtonSVG />
                </div>

                <Image src={PopularCategory001} alt="Image" width={1000} height={1000} />
                <div className="overlay"></div>
                <div className="position-absolute details-wrapper">
                  <ul className="tags-wrapper">
                    <li>Musical Concert</li>
                  </ul>

                  <h3 className="event-title">Nepathya Live in Australia</h3>

                  {/* <Link href={`/events`}>
                    <button className="theme-button theme-button--sm">Reserve Seat for Events Now</button>
                  </Link> */}
                </div>
              </div>

              {/* <div className="popular-categories-slider">
                <Image src={PopularCategory02} alt="Image" />
                <div className="overlay"></div>
                <div className="position-absolute details-wrapper">
                  <ul className="tags-wrapper d-flex">
                    <li>Rap</li>
                    <li>Concert</li>
                  </ul>

                  <h3 className="event-title">SACAR Evolution Tour 2024</h3>

                  <button className="theme-button theme-button--sm">Reserve Seat For Events Now</button>
                </div>
              </div>

              <div className="popular-categories-slider">
                <Image src={PopularCategory03} alt="Image" />
                <div className="overlay"></div>
                <div className="position-absolute details-wrapper">
                  <ul className="tags-wrapper d-flex">
                    <li>Musical Night</li>
                    <li>Concert</li>
                  </ul>

                  <h3 className="event-title">Nepathya Live in Sydney</h3>

                  <button className="theme-button theme-button--sm">Reserve Seat Now</button>
                </div>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>

      {playVideo && (
        <VideoDialog
          title="Nepathya Live Sydney"
          videoUrl=""
          open={playVideo}
          handleClose={() => setPlayVideo(false)}
        />
      )}
    </section>
  );
};

export default PopularCategories;
