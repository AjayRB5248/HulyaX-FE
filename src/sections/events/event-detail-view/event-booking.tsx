import moment from "moment";
import React, { useEffect, useState } from "react";
import SelectField from "src/components/select-field/select-field";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";

import EventTickets from "./event-tickets";

const EventBooking: React.FC<any> = ({ eventId, venues, state }) => {
  console.log(eventId, venues, "EVENT BOOKING");
  const [venuesOptions, setVenuesOptions] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>(venues?.[0]?.venueName);
  console.log(selectedVenue, "selectedVenue====");
  const [eventDate, setEventDate] = useState<any>(
    moment(venues?.[0]?.eventDate).tz(venues?.[0]?.timeZone)?.format("DD MMM ddd, hh:mm A")
  );
  const [showTickets, setShowTickets] = useState<any>({});

  // TODO: If there is multiple dates in array to select from
  // const [venueDatesOptions, setVenueDatesOptions] = useState<any>(
  //   venues?.[0]?.eventDate?.map((eachDate: string) => ({
  //     value: eachDate,
  //     label: moment(eachDate).tz(venues?.[0]?.timeZone).format("DD MMM ddd, hh:mm A"),
  //   }))
  // );

  const handleVenueChange = (value: any) => {
    console.log(value, "value ========== event booking");
    setSelectedVenue(value);

    const selectedEventVenue = venues.find((eachVenue: any) => eachVenue.venueId?.venueName === value);
    console.log(selectedEventVenue, "selectedEventVenue ========== event booking");
    if (selectedVenue) {
      const selectedEventDate = moment(selectedEventVenue.eventDate).tz(state?.timeZone).format("DD MMM ddd, hh:mm A");

      console.log(selectedEventDate, "selectedEventDate ========== event booking");

      setEventDate(selectedEventDate);

      // setVenueDatesOptions(
      //   selectedVenue?.eventDate?.map((eachDate: string) => ({
      //     value: eachDate,
      //     label: moment(eachDate).tz(selectedVenue.timeZone).format("DD MMM ddd, hh:mm A"),
      //   }))
      // );
    }
  };

  const handleEventDateChange = (value: any) => {
    console.log("Selected Venue Date:", value);
  };

  const handleFindTickets = () => {
    setShowTickets({ eventId, selectedVenue, state });
  };

  useEffect(() => {
    if (venues && venues.length > 0) {
      const venueList = venues.map((eachVenue: any) => ({
        id: eachVenue._id,
        value: eachVenue.venueId?.venueName,
        label: eachVenue.venueId?.venueName,
      }));

      setVenuesOptions(venueList);
      setSelectedVenue(venueList[0]?.value);
      setEventDate(moment(venues[0]?.eventDate).tz(venues[0]?.timeZone)?.format("DD MMM ddd, hh:mm A"));
    }
  }, [venues]);

  return (
    <div className="booking-summery">
      <ul>
        {/* Select Venue */}
        <li>
          <h6 className="subtitle">Select Venue:</h6>
          <SelectField
            className="info"
            label="venue"
            options={venuesOptions}
            onSelectChange={(label: string, value: string) => {
              console.log("onSelectChange called with:", label, value);
              handleVenueChange(value);
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
        {showTickets && showTickets.selectedVenue && showTickets.state ? (
          <EventTickets eventId={eventId} venueName={showTickets.selectedVenue} stateId={state?._id} />
        ) : null}
      </ul>
    </div>
  );
};

export default withNiceSelect(EventBooking);
