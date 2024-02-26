import moment from "moment-timezone";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SelectField from "src/components/select-field/select-field";
import withNiceSelect from "src/layouts/_common/nice-select/withNiceSelect";

import Ticket01 from "src/assets/frontend/images/event/ticket/ticket01.png";
import Ticket02 from "src/assets/frontend/images/event/ticket/ticket02.png";
import Ticket03 from "src/assets/frontend/images/event/ticket/ticket03.png";

const EventBooking: React.FC<any> = ({ venues }) => {
  console.log(venues, "venues");

  const [venuesOptions, setVenuesOptions] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>();
  const [eventDate, setEventDate] = useState<any>(
    moment(venues?.[0]?.eventDate).tz(venues?.[0]?.timeZone).format("DD MMM ddd, hh:mm A")
  );

  // TODO: If there is multiple dates in array to select from
  // const [venueDatesOptions, setVenueDatesOptions] = useState<any>(
  //   venues?.[0]?.eventDate?.map((eachDate: string) => ({
  //     value: eachDate,
  //     label: moment(eachDate).tz(venues?.[0]?.timeZone).format("DD MMM ddd, hh:mm A"),
  //   }))
  // );

  const handleVenueChange = (value: any) => {
    setSelectedVenue(value);

    const selectedVenue = venues.find((eachVenue: any) => eachVenue.venueName === value);

    if (selectedVenue) {
      setVenueDatesOptions(
        selectedVenue?.eventDate?.map((eachDate: string) => ({
          value: eachDate,
          label: moment(eachDate).tz(selectedVenue.timeZone).format("DD MMM ddd, hh:mm A"),
        }))
      );
    }
  };

  const handleEventDateChange = (value: any) => {
    console.log("Selected Venue Date:", value);
  };

  const handleFindTickets = () => {};

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
        <div className="book-ticket--area row justify-content-center">
          <div className="col-12">
            <div className="ticket-item">
              <div className="ticket-thumb">
                <Image src={Ticket01} alt="event" />
              </div>
              <div className="ticket-content">
                <span className="ticket-title">Standard Ticket</span>
                <h2 className="amount">
                  <sup>$</sup>49
                </h2>
                <a href="#0" className="t-button">
                  <i className="fas fa-plus"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="ticket-item two">
              <div className="hot">
                <span>hot</span>
              </div>
              <div className="ticket-thumb">
                <Image src={Ticket02} alt="event" />
              </div>
              <div className="ticket-content">
                <span className="ticket-title">Premium Ticket</span>
                <h2 className="amount">
                  <sup>$</sup>79
                </h2>
                <a href="#0" className="t-button">
                  <i className="fas fa-check"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="ticket-item three">
              <div className="ticket-thumb">
                <Image src={Ticket03} alt="event" />
              </div>
              <div className="ticket-content">
                <span className="ticket-title">VIP Ticket</span>
                <h2 className="amount">
                  <sup>$</sup>99
                </h2>
                <a href="#0" className="t-button">
                  <i className="fas fa-plus"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tickets Price */}
        <li>
          <h6 className="subtitle mb-0">
            <span>Tickets Price</span>
            <span>$150</span>
          </h6>
        </li>
      </ul>
      <ul className="side-shape">
        <li>
          <h6 className="subtitle">
            <span>combos</span>
            <span>$57</span>
          </h6>
          <span className="info">
            <span>2 Nachos Combo</span>
          </span>
        </li>
        <li>
          <h6 className="subtitle">
            <span>food & bevarage</span>
          </h6>
        </li>
      </ul>
      <ul>
        <li>
          <span className="info">
            <span>price</span>
            <span>$207</span>
          </span>
          <span className="info">
            <span>vat</span>
            <span>$15</span>
          </span>
        </li>
      </ul>

      <button className="theme-button btn-book-ticket mb-10">
        book tickets
        <i className="fa fa-ticket-alt ml-2"></i>
      </button>
    </div>
  );
};

export default withNiceSelect(EventBooking);
