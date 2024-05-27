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

  const [eventDetail, setEventDetail] = useState(event?.[0]);

  useEffect(() => {
    setEventDetail(event?.[0]);
  }, [event]);

  const posterImage = eventDetail?.images?.find((eachEventImg: any) => eachEventImg.isPrimary).imageurl;

  return Object.keys(event).length === 0 && isLoading ? (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", margin: "50px" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <EventBanner
        bannerImg={posterImage}
        eventName={eventDetail?.eventName}
        eventTags={eventDetail?.tags}
        videoUrl={eventDetail?.videoUrl}
        eventImages={eventDetail?.images}
        venues={eventDetail?.venues}
        timeZone={eventDetail?.state?.timeZone}
      />

      <EventVenues eventData={event} states={eventDetail?.parentEvent?.states} />

      <EventAbout
        eventImages={eventDetail?.images}
        eventDescription={eventDetail?.eventDescription}
        sponsors={sponsors}
        venues={eventDetail?.venues}
        eventId={eventDetail?.parentEvent?._id}
        states={eventDetail?.parentEvent?.states}
        eventData={event}
        state={eventDetail?.state}
        artists={eventDetail?.parentEvent?.artists}
        eventStatus={eventDetail?.parentEvent?.status}
      />
    </>
  );
};

export default EventDetail;
