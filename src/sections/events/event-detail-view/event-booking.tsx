import moment from 'moment';
import React, { useEffect, useState } from 'react';
import SelectField from 'src/components/select-field/select-field';
import withNiceSelect from 'src/layouts/_common/nice-select/withNiceSelect';

import EventTickets from './event-tickets';

const EventBooking: React.FC<any> = ({ eventId, venues, state, states, eventData, eventStatus }) => {
  const [statesOptions, setStatesOptions] = useState<any>([]);
  const [selectedState, setSelectedState] = useState<any>(null);

  const [venuesOptions, setVenuesOptions] = useState<any>([]);
  const [selectedVenue, setSelectedVenue] = useState<string>();

  const [eventDate, setEventDate] = useState<any>(
    moment(venues?.[0]?.eventDate)
      .tz(venues?.[0]?.timeZone)
      ?.format('DD MMM ddd, hh:mm A')
  );
  const [showTickets, setShowTickets] = useState<any>({});

  const handleSelectState = (value: any) => {
    const venuesFound =
      eventData &&
      eventData.length > 0 &&
      eventData.find((event: any) => event?.state?.stateName === value)?.venues;

    if (venuesFound && venuesFound.length > 0) {
      const venueList = venuesFound.map((eachVenue: any) => ({
        id: eachVenue._id,
        value: eachVenue.venueId?.venueName,
        label: eachVenue.venueId?.venueName,
      }));

      setVenuesOptions([
        { id: '', value: '', label: 'Select Venue' },
        ...venueList,
      ]);
    }
  };

  const handleVenueChange = (value: any) => {
    setSelectedVenue(value);
    const selectedEventVenue = venues.find(
      (eachVenue: any) => eachVenue.venueId?.venueName === value
    );

    if (selectedVenue) {
      const selectedEventDate = moment(selectedEventVenue?.eventDate)
        .tz(state?.timeZone)
        .format('DD MMM ddd, hh:mm A');
      setEventDate(selectedEventDate);
    }
  };

  const handleEventDateChange = (value: any) => {
    console.log('Selected Venue Date:', value);
  };

  const handleFindTickets = () => {
    setShowTickets({ eventId, selectedVenue, state });
  };

  useEffect(() => {
    if (states && states.length > 0) {
      const statesList = states.map((eachState: any) => ({
        id: eachState._id,
        value: eachState.stateName,
        label: eachState.stateName,
      }));

      setStatesOptions([
        { id: '', value: '', label: 'Select State' },
        ...statesList,
      ]);
    }
  }, [states]);

  return (
    <div className='booking-summery'>
      <ul>
        {/* Select State */}
        <li>
          <h6 className='subtitle'>Select State:</h6>
          <SelectField
            className='info'
            label='state'
            options={statesOptions}
            onSelectChange={(label: string, value: string) => {
              handleSelectState(value);
            }}
          />
        </li>
        {/* Select Venue */}
        <li>
          <h6 className='subtitle'>Select Venue:</h6>
          <SelectField
            className='info'
            label='venue'
            options={venuesOptions}
            onSelectChange={(label: string, value: string) => {
              handleVenueChange(value);
            }}
          />
        </li>
        {/* Select Date */}
        <li>
          <h6 className='subtitle'>
            <span>Event Date:</span>
          </h6>
          <div className='info'>
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
        <button
          className='theme-button btn-book-ticket mb-4'
          onClick={handleFindTickets}
        >
          Find Tickets
          <i className='fa fa-ticket-alt ml-3'></i>
        </button>

        {/* Tickets Type */}
        {showTickets && showTickets.selectedVenue && showTickets.state ? (
          <EventTickets
            eventId={eventId}
            venueName={showTickets.selectedVenue}
            stateId={state?._id}
            eventStatus={eventStatus}
          />
        ) : null}
      </ul>
    </div>
  );
};

export default withNiceSelect(EventBooking);
