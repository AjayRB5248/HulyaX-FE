import WidgetBanner from "./widget-banner";
import FeaturedAd1 from "src/assets/frontend/images/featuredAds/SacarEvent.png";
import WidgetCheckbox from "./widget-checkbox";
import FilterMain from "./filter-main";
import EventGridItem from "./event-grid";
import EventPagination from "./event-pagination";
import { useFetchEvents } from "src/api/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import { useEffect, useRef, useState } from "react";

const EventsListing = () => {
  const { events } = useEventsContext();

  return (
    <section className="event-section section-wrapper">
      <div className="row flex-wrap-reverse justify-content-center event-listing-row">
        <div className="col-sm-10 col-md-8 col-lg-3 widget-wrapper">
          <WidgetCheckbox />
          <WidgetBanner imgUrl={FeaturedAd1} imgAlt="Featured" />
        </div>
        <div className={`col-lg-9 mb-50 mb-lg-0 event-list-wrapper`}>
          <div className="filter-tab">
            <FilterMain />

            <div className={`row mb-10 event-list-row scrollable`}>
              {events && events.length > 0 ? (
                events?.map((event: any) =>
                  event.venues.map((eachEventVenue: any) => (
                    <EventGridItem
                      key={eachEventVenue._id}
                      imageUrl={event.eventImages.find((eventImg: any) => eventImg.isPrimary)?.imageurl}
                      date={eachEventVenue.eventDate}
                      title={event.eventName}
                      venue={eachEventVenue.venueName}
                      city={eachEventVenue.city}
                      timeZone={eachEventVenue.timeZone}
                      slug={event.slug}
                      artists={event.artists}
                    />
                  ))
                )
              ) : (
                <p>No Data Found</p>
              )}
            </div>
            {/* {events && events.length > 0 && <EventPagination />} */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsListing;
