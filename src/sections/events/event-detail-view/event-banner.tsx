import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";

// Hooks
import { usePathname } from "src/routes/hook";

import VideoPlayButton from "src/assets/frontend/images/movie/video-button.png";

// Sample Image
import SocialShare from "src/components/social-share";
import { getRemainingTime } from "src/utils/format-date";
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

  const nearestDate = useMemo(() => {
    const now = moment();
    const upcomingDates =
      venues?.map((venue: any) => moment(venue.eventDate)).filter((date: any) => date.isSameOrAfter(now)) || [];
    return upcomingDates.length > 0 ? moment.min(upcomingDates) : null;
  }, [venues]);

  const timeRemaining = nearestDate ? getRemainingTime(nearestDate.toISOString(), timeZone) : null;

  return (
    <section className="details-banner bg_img" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="container-fluid">
        <div className="details-banner-wrapper">
          <div className="details-banner-thumb d-none">
            <Image src={featuredImage} alt="movie" width={300} height={200} />
            {videoUrl && (
              <Link href={videoUrl} className="video-popup">
                <Image src={VideoPlayButton} alt="movie" />
              </Link>
            )}
          </div>
          <div className="details-banner-content">
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
                  {nearestDate ? (
                    <span>{moment(nearestDate)?.tz(timeZone)?.format("MMM DD, YYYY")}</span>
                  ) : (
                    <span>To be Announced</span>
                  )}
                </div>
                {timeRemaining && (
                  <div className="item">
                    <i className="far fa-clock"></i>

                    <span>
                      {timeRemaining?.days && timeRemaining?.days + `days`}{" "}
                      {timeRemaining?.hours && timeRemaining?.hours + "hours"}
                    </span>
                  </div>
                )}
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
