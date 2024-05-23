"use client";

import { BannerHeader } from "src/components/banner-header";
import MainLayout from "src/layouts/main";
import TicketSearch from "../home/ticket-search";
import EventsListing from "./view/events-listing";
import { useEventsContext } from "src/context/EventsContextProvider";
import { useFetchEvents } from "src/api/events";
import { EVENTS_MOCK_DATA } from "src/_mock/_events";

export default function EventsList() {
  const { events } = useFetchEvents();

  const EVENTS_MOCK = EVENTS_MOCK_DATA?.subEvents;

  return (
    <MainLayout>
      <BannerHeader />
      <TicketSearch />
      <EventsListing events={EVENTS_MOCK} />
    </MainLayout>
  );
}
