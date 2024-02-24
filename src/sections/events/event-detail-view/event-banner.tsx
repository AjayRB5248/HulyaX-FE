import React from "react";
import moment from "moment";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

// Hooks
import { usePathname } from "src/routes/hook";

import VideoPlayButton from "src/assets/frontend/images/movie/video-button.png";

// Sample Image
import PosterSampleImg from "src/assets/frontend/images/banner/banner12.jpg";
import MainImg from "src/assets/frontend/images/event/pexels-jonathan-borba-3563171.jpg";
import SocialShare from "src/components/social-share";
interface EventDetailBannerProps {
  bannerImg: string;
  eventName: string;
  eventTags?: any;
  videoUrl: string;
  eventImages: any;
  venues: any;
}
const EventBanner: React.FC<EventDetailBannerProps> = ({
  bannerImg,
  eventName,
  eventTags,
  videoUrl,
  eventImages,
  venues,
}) => {
  const pathname = usePathname();

  return (
    <section className="details-banner bg_img" style={{ backgroundImage: `url(${PosterSampleImg.src})` }}>
      <div className="container-fluid">
        <div className="details-banner-wrapper">
          <div className="details-banner-thumb">
            {/* TODO: Show First !isPrimary Image */}
            <Image src={MainImg} alt="movie" width={300} height={200} />
            {videoUrl && (
              <Link href={videoUrl} className="video-popup">
                <Image src={VideoPlayButton} alt="movie" />
              </Link>
            )}
          </div>
          <div className="details-banner-content offset-lg-3">
            <h2 className="title">{eventName}</h2>
            <div className="event-tags">
              {eventTags?.map((eventTag: any, index: number) => (
                <span className="button mr-2" key={index}>
                  {eventTag}
                </span>
              ))}
            </div>
            <div className="social-and-duration">
              <div className="duration-area">
                <div className="item">
                  <span className="mr-4">Starts From:</span>
                  <i className="fas fa-calendar-alt"></i>
                  <span>{moment(venues[0].eventDate).format("MMM DD, YYYY")}</span>
                </div>
                <div className="item">
                  <i className="far fa-clock"></i>
                  {/* TODO: Event Duration Approximately */}
                  <span>2 hrs 50 mins</span>
                </div>
              </div>
              {/* TODO: Add DOMAIN_NAME in ENV */}
              <SocialShare url={`${process.env.DOMAIN_NAME}/${pathname}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBanner;
