import { useEffect, useState } from "react";
import { useEventDetailsBySlug, useFetchEvents } from "src/api/events";
import { usePathname } from "src/routes/hook/use-pathname";
import EventsService from "src/services/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import EventAbout from "./event-about";

import EventVenues from "./event-venues";
import EventBanner from "./event-banner";

import { useRouter } from "src/routes/hook/use-router";
import { useParams } from "src/routes/hook/use-params";
import { CircularProgress } from "@mui/material";
import { SplashScreen } from "src/components/loading-screen";

const sponsors = [
  {
    _id: "65bdbed4b7dd4b1bfeae1a03",
    imageUrl: "",
  },
];

const EventDetail = () => {
  const params = useParams();
  let slug = params.slug as string;
  const { event, isLoading } = useEventDetailsBySlug(slug);
  const [allVenues, setAllVenues] = useState([]);
  const [eventDetail, setEventDetail] = useState(event?.[0]);

  useEffect(() => {
    if (!isLoading && event) {
      const venues = event.reduce((acc: any, currentEvent: any) => {
        if (Array.isArray(currentEvent?.venues) && currentEvent?.venues?.length > 0) {
          return acc.concat(currentEvent?.venues);
        }
        return acc;
      }, []);
      setAllVenues(venues);
    }
  }, [isLoading, event]);

  useEffect(() => {
    setEventDetail(event?.[0]);
  }, [event]);

  const posterImage = eventDetail?.images?.find((eachEventImg: any) => eachEventImg.isPrimary).imageurl;

  return Object.keys(event).length === 0 && isLoading ? (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", margin: "50px" }}>
      <SplashScreen />
    </div>
  ) : (
    <>
      <EventBanner
        bannerImg={posterImage}
        eventName={eventDetail?.eventName}
        eventTags={eventDetail?.tags}
        videoUrl={eventDetail?.videoUrl}
        eventImages={eventDetail?.images}
        venues={allVenues}
        timeZone={eventDetail?.state?.timeZone}
      />

      <EventVenues eventData={event} states={eventDetail?.parentEvent?.states} />

      <EventAbout
        eventImages={eventDetail?.images}
        eventVideo={eventDetail?.videoUrl}
        eventDescription={eventDetail?.eventDescription}
        sponsors={sponsors}
        venues={allVenues}
        eventId={eventDetail?.parentEvent?._id}
        states={eventDetail?.parentEvent?.states}
        eventData={event}
        artists={eventDetail?.parentEvent?.artists}
        eventStatus={eventDetail?.parentEvent?.status}
      />
    </>
  );
};

export default EventDetail;
