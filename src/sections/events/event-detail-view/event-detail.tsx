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

const mockDetail = {
  _id: "65bdbed4b7dd4b1bfeae1a02",
  status: "PLANNED",
  ticketTypes: [
    {
      _id: "65bdbed4b7dd4b1bfeae1a0e",
      purchasedCount: 0,
      eventId: "65bdbed4b7dd4b1bfeae1a02",
      venueId: "65bdbed4b7dd4b1bfeae1a04",
      eventOwner: "65bd3a9a2df35039deafb516",
      type: "Vip",
      price: 250,
      totalSeats: 47,
      availableSeats: 47,
      __v: 0,
      createdAt: "2024-02-03T04:19:32.636Z",
      updatedAt: "2024-02-03T04:19:32.636Z",
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a0f",
      purchasedCount: 0,
      eventId: "65bdbed4b7dd4b1bfeae1a02",
      venueId: "65bdbed4b7dd4b1bfeae1a05",
      eventOwner: "65bd3a9a2df35039deafb516",
      type: "Standard",
      price: 200,
      totalSeats: 98,
      availableSeats: 98,
      __v: 0,
      createdAt: "2024-02-03T04:19:32.637Z",
      updatedAt: "2024-02-03T04:19:32.637Z",
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a10",
      purchasedCount: 0,
      eventId: "65bdbed4b7dd4b1bfeae1a02",
      venueId: "65bdbed4b7dd4b1bfeae1a06",
      eventOwner: "65bd3a9a2df35039deafb516",
      type: "Vip",
      price: 300,
      totalSeats: 98,
      availableSeats: 98,
      __v: 0,
      createdAt: "2024-02-03T04:19:32.637Z",
      updatedAt: "2024-02-03T04:19:32.637Z",
    },
  ],
  tags: ["Music", "Concerts"],
  isDeleted: false,
  eventName: "SACAR Evolution Tour 2024",
  eventDescription: `<h3><b> Title: Waves of Harmony: A Musical Extravaganza in Australia</b> </h4>
    <br />
    <p>
    Australia, renowned for its vibrant cultural scene and love for music, is set to host an electrifying concert event that promises to captivate hearts and minds alike. Titled "Waves of Harmony," this musical extravaganza is slated to be an unforgettable experience for music enthusiasts from all walks of life.
    
    Taking place against the backdrop of Australia's stunning landscapes, the concert venue itself becomes an integral part of the experience. Whether nestled amidst lush greenery, overlooking serene waters, or set against the majestic backdrop of the Outback, each location adds its unique charm to the event, enhancing the overall ambiance and creating an immersive musical journey.
    
    The lineup features an eclectic mix of local talents and internationally acclaimed artists, representing a diverse range of musical genres. From soul-stirring symphonies to foot-stomping beats, the performances promise to showcase the rich tapestry of musical expression. Audiences can expect to be swept away by the melodic melodies, intricate harmonies, and infectious rhythms that reverberate through the air, creating an atmosphere of pure magic and joy.
    
    Moreover, "Waves of Harmony" goes beyond mere entertainment, aiming to foster a sense of community and connection among attendees. With interactive workshops, collaborative jam sessions, and opportunities for audience participation, the event encourages individuals to actively engage with music, fostering a deeper appreciation for its power to unite and inspire.
    
    But the magic of "Waves of Harmony" extends beyond the confines of the concert venue. Embracing principles of sustainability and environmental stewardship, the event strives to minimize its ecological footprint, implementing eco-friendly practices and promoting awareness of environmental issues. Through initiatives such as carbon offset programs, recycling efforts, and support for local conservation projects, "Waves of Harmony" aims to leave a positive impact on both the musical landscape and the planet.
    
    As the sun sets and the stars emerge overhead, "Waves of Harmony" reaches its crescendo, culminating in a grand finale that leaves audiences spellbound and uplifted. Amidst the applause and cheers, there lingers a sense of gratitude—for the music that unites us, the beauty that surrounds us, and the shared moments that enrich our lives.
    
    In the heart of Australia, amidst the rhythm of the land and the melody of the skies, "Waves of Harmony" invites you to join in a celebration of music, unity, and the boundless possibilities of the human spirit. So, mark your calendars, and prepare to embark on a musical journey like no other. </p>`,
  eventOwner: "65bd3a9a2df35039deafb516",
  artists: [
    {
      _id: "65bdbed4b7dd4b1bfeae1a03",
      artistName: "Sacar KANDEL",
    },
  ],
  venues: [
    {
      _id: "65bdbed4b7dd4b1bfeae1a04",
      venueName: "Opera House",
      city: "Sydney",
      timeZone: "Australia/Broken_Hill",
      eventDate: ["2024-02-05T04:16:50.471Z", "2024-02-08T08:16:50.471Z"],
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a05",
      venueName: "Rangasala",
      city: "Melbourne",
      timeZone: "Australia/Canberra",
      eventDate: ["2024-04-05T04:16:50.471Z", "2024-04-08T08:16:50.471Z"],
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a06",
      venueName: "TU Ground",
      city: "Perth",
      timeZone: "Australia/Yancowinna",
      eventDate: ["2024-02-10T09:16:50.471Z", "2024-06-09T08:16:50.471Z"],
    },
  ],
  eventImages: [
    {
      isPrimary: false,
      _id: "65bdbed4b7dd4b1bfeae1a07",
      imageurl:
        "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/images/351452865_1746118722572867_4607818441604902177_n.jpg1706933969737",
    },
    {
      isPrimary: false,
      _id: "65bdbed4b7dd4b1bfeae1a08",
      imageurl: "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/images/laure.jpg1706933969749",
    },
    {
      isPrimary: false,
      _id: "65bdbed4b7dd4b1bfeae1a09",
      imageurl: "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/images/sacar.jpeg1706933969749",
    },
    {
      isPrimary: false,
      _id: "65bdbed4b7dd4b1bfeae1a0a",
      imageurl: "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/images/sacar.jpg1706933969756",
    },
    {
      isPrimary: false,
      _id: "65bdbed4b7dd4b1bfeae1a0b",
      imageurl: "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/images/u-poet.jpg1706933969759",
    },
    {
      isPrimary: true,
      _id: "65bdbed4b7dd4b1bfeae1a0c",
      imageurl:
        "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/posterImage/pexels-wolfgang-2747449.jpg1706933969731",
    },
  ],
  createdAt: "2024-02-03T04:19:32.571Z",
  updatedAt: "2024-02-03T04:19:32.685Z",
  slug: "austalia-main-event-1706933972571",
  __v: 0,
};

// TODO: Add Sponsors/Organizers in API
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

  console.log(event, "event By slug====");

  const posterImage = event?.images?.find((eachEventImg: any) => eachEventImg.isPrimary).imageurl;

  return Object.keys(event).length === 0 && isLoading ? (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", margin: "50px" }}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <EventBanner
        bannerImg={posterImage}
        eventName={event?.eventName}
        eventTags={event?.tags}
        videoUrl={event?.videoUrl}
        eventImages={event?.images}
        venues={event?.venues}
        state={event?.state}
      />

      <EventVenues venues={event?.venues} />

      <EventAbout
        eventImages={event?.images}
        eventDescription={event?.eventDescription}
        sponsors={sponsors}
        venues={event?.venues}
        eventId={event?._id}
      />
    </>
  );
};

export default EventDetail;
