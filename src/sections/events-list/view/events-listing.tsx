import WidgetBanner from "./widget-banner";
import FeaturedAd1 from "src/assets/frontend/images/axisEvent.png";
import WidgetCheckbox from "./widget-checkbox";
import FilterMain from "./filter-main";
import EventGridItem from "./event-grid";
import EventPagination from "./event-pagination";
import { useFetchEvents } from "src/api/events";
import { useEventsContext } from "src/context/EventsContextProvider";
import { useEffect, useState } from "react";
import { EventProps } from "src/types/events";
import { EventStatusEnum } from "src/sections/tour/utils";

const EventsListing: React.FC<EventProps> = ({ events }) => {
  const filteredEvents = events?.filter((event: any) => event.status !== EventStatusEnum.COMPLETED);

  return (
    <section className="event-section section-wrapper">
      <div className="container-fluid">
        <div className="row no-gutters flex-wrap-reverse justify-content-center event-listing-row">
          <div className="col-sm-0 col-md-8 col-lg-3 widget-wrapper">
            <WidgetCheckbox />
            <WidgetBanner imgUrl={FeaturedAd1} imgAlt="Featured" />
          </div>
          <div className={`col-sm-12 col-lg-9 mb-50 mb-lg-0 event-list-wrapper`}>
            <FilterMain isSticky />
            <div className={`row mb-10 event-list-row`}>
              {filteredEvents && filteredEvents.length > 0 ? (
                filteredEvents?.map((event: any) =>
                  event?.venues?.map((eachEventVenue: any) => (
                    <EventGridItem
                      key={eachEventVenue._id}
                      imageUrl={event.parentEvent?.images.find((eventImg: any) => eventImg.isPrimary)?.imageurl}
                      date={eachEventVenue.eventDate}
                      title={event.parentEvent?.eventName}
                      venue={eachEventVenue.venueId?.venueName}
                      city={event?.state?.stateName}
                      timeZone={event?.state?.timeZone}
                      eventId={event._id}
                      slug={event.parentEvent?.slug}
                      artists={event.parentEvent?.artists}
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

      {/* Bottom Menu */}
      <div className="bottom-menu d-none d-md-none">
        <div className="row no-gutters h-100 align-items-center">
          <div className="col-6">
            <div className="filterby">
              <i className="fa fa-filter"></i>
              Show Filter
            </div>
          </div>
          <div className="col-6">
            <div className="sortby">
              <i className="fa fa-sort"></i>
              Sort By
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsListing;
