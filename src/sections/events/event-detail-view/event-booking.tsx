import moment from "moment-timezone";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectField from "src/components/select-field/select-field";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";

import { useTicketsView } from "src/api/tickets";
import EventTickets from "./event-tickets";

const EventBooking: React.FC<any> = ({ eventId, venues }) => {
  const [venuesOptions, setVenuesOptions] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>(venues?.[0]?.venueName);
  const [eventDate, setEventDate] = useState<any>(
    moment(venues?.[0]?.eventDate).tz(venues?.[0]?.timeZone).format("DD MMM ddd, hh:mm A")
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
    setSelectedVenue(value);

    const selectedEventVenue = venues.find((eachVenue: any) => eachVenue.venueName === value);

    if (selectedVenue) {
      const selectedEventDate = moment(selectedEventVenue.eventDate)
        .tz(selectedEventVenue.timeZone)
        .format("DD MMM ddd, hh:mm A");

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
    setShowTickets({ eventId, selectedVenue });
  };

  useEffect(() => {
    if (venues && venues.length > 0) {
      const venueList = venues.map((eachVenue: any) => ({
        id: eachVenue._id,
        value: eachVenue.venueName,
        label: eachVenue.venueName,
      }));
      setVenuesOptions(venueList);
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
            onSelectChange={(label: string, value: string) => handleVenueChange(value)}
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
        {showTickets && showTickets.selectedVenue ? (
          <EventTickets eventId={eventId} venueName={showTickets.selectedVenue} />
        ) : null}
      </ul>
    </div>
  );
};

export default withNiceSelect(EventBooking);
