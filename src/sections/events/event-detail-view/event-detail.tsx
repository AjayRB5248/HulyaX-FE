import { useEffect, useState } from "react";
import { useFetchEvents } from "src/api/events";
import { usePathname } from "src/routes/hook/use-pathname";
import EventsService from "src/services/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import EventAbout from "./event-about";

import EventVenues from "./event-venues";
import EventBanner from "./event-banner";

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
  eventDescription:
    '<h2>What Is An Event Description?</h2><p>An event description is a piece of text or copy, outlining the details of your event. These details come together to create a compelling statement which will help to draw in your target audience and even gain new guests! Your event description should be able to answer the 5 W’s (who, what, when, where and why) and also give your audience a reason to attend your event.&nbsp;</p><h2>Examples Of Effective Event Descriptions</h2><p>To better help you understand how to write an effective event description, take a look at these examples:&nbsp;</p><p><strong>Example 1:</strong></p><p><strong>Springfield Firefighters Car Wash Fundraiser</strong></p><p>Saturday July 22, 2023</p><p>9:00 AM to 2:00 PM</p><p>Springfield High School (Directly across from the Fluff ‘N Fold Laundromat)</p><p>The Springfield Fire Department needs your help in raising money for new water and diving equipment. Stop by, have your car washed, make a donation to the fire department and receive a coupon to Barry’s Pizza, Subway or Chipotle!</p><p><strong>ALL PROCEEDS GO DIRECTLY TOWARDS NEW WATER AND DIVE EQUIPMENT FOR THE FIRE DEPARTMENT</strong></p><p>Hosted by: Springfield Police And Fire Departments and The Panther Booster Club</p><p>For More Information, contact Officer Bob Smith at 731-555-9208 or visit&nbsp;<a href="http://www.pantherbooster.com/" rel="noopener noreferrer" target="_blank" style="color: var(--dark-salmon); background-color: transparent;">www.pantherbooster.com</a>&nbsp;to make a donation.</p><p><strong>Example 2:</strong></p><p><strong>Fighting For A Cure: Virtual Webinar Series</strong></p><p>Dr. John Brown is hosting a virtual webinar series dedicated to educating his audience on the breakthroughs in cancer research and potentially life saving drugs. Dr. Brown will also be presenting research from oncologists all over the world.&nbsp;</p><p><strong>Date: March 9, March 16, March 23, 2023</strong></p><p><strong>Time: 4:00 PM (EST)</strong></p><p><br></p><p><br></p>',
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
      eventDate: "2024-02-03T04:16:50.471Z",
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a05",
      venueName: "Rangasala",
      city: "Melbourne",
      timeZone: "Australia/Canberra",
      eventDate: "2024-02-03T04:17:36.605Z",
    },
    {
      _id: "65bdbed4b7dd4b1bfeae1a06",
      venueName: "TU Ground",
      city: "Perth",
      timeZone: "Australia/Yancowinna",
      eventDate: "2024-02-03T04:17:42.576Z",
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

const EventDetail = () => {
  const pathname = usePathname();

  const [slug, setSlug] = useState<string | null>(null);

  const [eventDetail, setEventDetail] = useState<any>();

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/").filter((part: string) => !!part);
      const slugPart = parts[parts.length - 1];

      setSlug(slugPart);
    }
  }, [pathname]);

  useEffect(() => {
    if (slug) {
      // const fetchEventData = async () => {
      //   try {
      //     const eventData = await EventsService.list().then((res) => res.data?.events);

      //     const foundEventDetail = eventData?.find((eachEvent: any) => eachEvent.slug === slug);
      //     console.log(foundEventDetail, "foundEventDetail");

      //     if (foundEventDetail) setEventDetail(foundEventDetail);
      //   } catch (error) {
      //     console.error("Error fetching event data:", error);
      //   }
      // };

      // fetchEventData();

      setEventDetail(mockDetail);
    }
  }, [slug]);

  const posterImage = eventDetail?.eventImages?.find((eachEventImg: any) => eachEventImg.isPrimary).imageurl;

  return (
    eventDetail && (
      <>
        <EventBanner
          bannerImg={posterImage}
          eventName={eventDetail?.eventName}
          eventTags={eventDetail?.tags}
          videoUrl={eventDetail?.videoUrl}
          eventImages={eventDetail?.eventImages}
          venues={eventDetail?.venues}
        />
        
        <EventVenues venues={eventDetail?.venues} />

        <EventAbout  eventImages={eventDetail?.eventImages} />

        <div style={{ height: "100rem" }}></div>
        {/* <EventAbout
        eventName={eventDetail?.eventName}
        eventDescription={eventDetail?.eventDescription}
        eventPrimaryImg={primaryBannerImg}
      /> */}
      </>
    )
  );
};

export default EventDetail;
