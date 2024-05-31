import moment from "moment";
import React, { useEffect, useState } from "react";
import EventTickets from "./event-tickets";
import { enqueueSnackbar } from "notistack";
import { EXTERNAL_EVENTS } from "../eventsLinkData";
import EventsLink from "./events-link";
import { CustomSelect } from "src/components/custom-select";
import useIsMobile from "src/hooks/use-isMobile";

const EventBooking: React.FC<any> = ({ eventId, venues, states, eventData, eventStatus }) => {
  const isMobile = useIsMobile();

  const [statesOptions, setStatesOptions] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [venuesOptions, setVenuesOptions] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  const [eventDate, setEventDate] = useState<string>("");
  const [showTickets, setShowTickets] = useState<any>(null);

  const [selectedEvent, setSelectedEvent] = useState<any>({
    state: "",
    venue: "",
  });
  const [showEventExternalLink, setShowEventExternalLink] = useState<any>(null);

  const [showBookingPopup, setShowBookingPopup] = useState(false);

  const handleSelectState = (label: string, value: any) => {
    setSelectedEvent({ state: label });

    const venuesFound =
      eventData && eventData?.length > 0 && eventData?.find((event: any) => event?.state?._id === value)?.venues;

    if (venuesFound && venuesFound?.length > 0) {
      const venueList = venuesFound?.map((eachVenue: any) => ({
        id: eachVenue?._id,
        value: eachVenue.venueId?.venueName,
        label: eachVenue.venueId?.venueName,
      }));

      setVenuesOptions([...venueList]);

      setSelectedState(value);
      setSelectedVenue(null);
      setShowTickets(null);
      setShowEventExternalLink(null);
      setEventDate("");
    }
  };

  const handleVenueChange = (label: string, value: any) => {
    setSelectedVenue(value);
    const selectedEventVenue = venues?.find((eachVenue: any) => eachVenue?.venueId?.venueName === value);
    const selectedEventState = states?.find((eachState: any) => eachState?._id === selectedState);

    if (selectedEventVenue) {
      const selectedEventDate = moment(selectedEventVenue?.eventDate)
        .tz(selectedEventState?.timeZone)
        .format("DD MMM ddd, hh:mm A");
      setEventDate(selectedEventDate);
    } else {
      setEventDate("");
    }

    setSelectedEvent((prev: any) => ({
      ...prev,
      venue: label,
    }));
  };

  const handleEventDateChange = (value: any) => {};

  const handleFindTickets = () => {
    if (!selectedState || !selectedVenue) {
      enqueueSnackbar("Please Choose State and Venue First!", {
        variant: "error",
      });
      return;
    }

    if (EXTERNAL_EVENTS?.includes(selectedEvent?.state)) {
      setShowEventExternalLink(selectedEvent);
      return;
    }

    setShowTickets({ eventId, selectedVenue, selectedState });
  };

  useEffect(() => {
    if (states && states?.length > 0) {
      const statesList = states?.map((eachState: any) => ({
        id: eachState?._id,
        value: eachState?._id,
        label: eachState?.stateName,
      }));

      setStatesOptions([...statesList]);
    }
  }, [states]);

  return (
    <>
      <div className={`booking-summery ${showBookingPopup ? "show" : ""}`}>
        <ul>
          {/* Select State */}
          <li>
            <h6 className="subtitle">Select State:</h6>
            <CustomSelect
              aria-label="Select State"
              defaultValue={selectedState}
              options={statesOptions}
              onSelectChange={(label: string, value: string) => {
                handleSelectState(label, value);
              }}
            />
          </li>
          {/* Select Venue */}
          <li>
            <h6 className="subtitle">Select Venue:</h6>
            <CustomSelect
              key={selectedState}
              aria-label="Select Venue"
              defaultValue={selectedVenue}
              options={venuesOptions}
              onSelectChange={(label: string, value: string) => {
                handleVenueChange(label, value);
              }}
            />
          </li>
          {/* Select Date */}
          <li>
            <h6 className="subtitle">
              <span>Event Date:</span>
            </h6>
            <div className="info">
              {/* <SelectField
              className="info"
              label="eventDate"
              options={venueDatesOptions}
              onSelectChange={(value: string) => handleEventDateChange(value)}
            /> */}
              <span>{eventDate}</span>
            </div>
          </li>
          {/* Find Tickets */}
          <button className="theme-button btn-book-ticket mb-4" onClick={handleFindTickets}>
            Find Tickets
            <i className="fa fa-ticket-alt ml-3"></i>
          </button>

          {/* Tickets Type */}
          {showTickets && showTickets?.selectedVenue && showTickets?.selectedState ? (
            <EventTickets
              eventId={eventId}
              venueName={showTickets?.selectedVenue}
              stateId={selectedState}
              eventStatus={eventStatus}
            />
          ) : null}

          {showEventExternalLink && showEventExternalLink?.state && showEventExternalLink?.venue && (
            <EventsLink
              state={showEventExternalLink?.state}
              venue={showEventExternalLink?.venue}
              eventName={eventData?.[0]?.parentEvent?.eventName}
              eventImage={eventData?.[0]?.parentEvent?.images?.[1]?.imageurl}
              eventDate={eventDate}
            />
          )}
        </ul>
      </div>

      {isMobile && (
        <div className="mobile-booking-btn fixed">
          <button className="theme-button btn-book-ticket" onClick={() => setShowBookingPopup(!showBookingPopup)}>
            Reserve Seat Now
            <i className={`fa ${showBookingPopup ? "fa-angle-down" : "fa-angle-up"}`}></i>
          </button>
        </div>
      )}
    </>
  );
};

export default EventBooking;
