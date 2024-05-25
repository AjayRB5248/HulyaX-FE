import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Hooks
import { usePathname } from "src/routes/hook";

import VideoPlayButton from "src/assets/frontend/images/movie/video-button.png";

// Sample Image
import SocialShare from "src/components/social-share";
import { getRemainingTime } from "src/utility";
interface EventDetailBannerProps {
  bannerImg: string;
  eventName: string;
  eventTags?: any;
  videoUrl: string;
  eventImages: any;
  venues: any;
  timeZone: string;
}
const EventBanner: React.FC<EventDetailBannerProps> = ({
  bannerImg,
  eventName,
  eventTags,
  videoUrl,
  eventImages,
  venues,
  timeZone,
}) => {
  const pathname = usePathname();

  const featuredImage = eventImages?.[1]?.imageurl ?? eventImages?.[0]?.imageurl;

  const timeRemaining = getRemainingTime(venues?.[0]?.eventDate, timeZone);

  return (
    <section className="details-banner bg_img" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="container-fluid">
        <div className="details-banner-wrapper">
          <div className="details-banner-thumb">
            <Image src={featuredImage} alt="movie" width={300} height={200} />
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
                  {/* TODO: Earliest date ? */}
                  <span>{moment(venues?.[0]?.eventDate)?.tz(timeZone)?.format("MMM DD, YYYY")}</span>
                </div>
                <div className="item">
                  <i className="far fa-clock"></i>
                  <span>
                    {timeRemaining?.days} days {timeRemaining?.hours} hours
                  </span>
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
