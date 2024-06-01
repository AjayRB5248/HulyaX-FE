import moment from "moment-timezone";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";

// Hooks
import { usePathname } from "src/routes/hook";

import VideoPlayButton from "src/assets/frontend/images/movie/video-button.png";

// Sample Image
import SocialShare from "src/components/social-share";
import { getClosestEvent, getRemainingTime } from "src/utils/format-date";
import { EventStatusEnum } from "src/sections/tour/utils";
import { getStateDetails } from "src/utils/helper";

interface EventDetailBannerProps {
  bannerImg: string;
  eventName: string;
  eventTags?: any;
  videoUrl: string;
  eventImages: any;
  venues: any;
  eventStatus: string;
  states: any;
}
const EventBanner: React.FC<EventDetailBannerProps> = ({
  bannerImg,
  eventName,
  eventTags,
  videoUrl,
  eventImages,
  venues,
  eventStatus,
  states,
}) => {
  const pathname = usePathname();

  const featuredImage = eventImages?.[1]?.imageurl ?? eventImages?.[0]?.imageurl;

  const closestEvent = getClosestEvent(venues);
  const stateDetail = getStateDetails(states, closestEvent?.venueId?.state);

  const nearestDate = useMemo(() => {
    return closestEvent ? moment(closestEvent?.eventDate)?.tz(stateDetail?.timeZone) : null;
  }, [venues]);

  const timeRemaining = nearestDate ? getRemainingTime(nearestDate.toISOString(), stateDetail?.timeZone) : null;

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
                    <span>{moment(nearestDate)?.tz(stateDetail?.timeZone)?.format("MMM DD, YYYY")}</span>
                  ) : (
                    <span>To be Announced</span>
                  )}
                </div>
                {timeRemaining && (
                  <div className="item">
                    <i className="far fa-clock"></i>
                    {eventStatus === EventStatusEnum.COMPLETED ? (
                      <span>COMPLETED</span>
                    ) : (
                      <span>
                        {timeRemaining?.days && timeRemaining?.days + ` days`}{" "}
                        {timeRemaining?.hours && timeRemaining?.hours + " hours"}
                      </span>
                    )}
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
