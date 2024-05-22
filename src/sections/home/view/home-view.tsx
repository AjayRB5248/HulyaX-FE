"use client";
// layouts
import MainLayout from "src/layouts/main";

// components
import Banner from "../home-banner";
import TicketSearch from "../ticket-search";
import { EventsCarousel } from "src/sections/events/view";
import { useFetchEvents } from "src/api/events";
import Artists from "../artists-section";
import MobileApp from "src/layouts/main/MobileApp";
import EventsSlider from "../events-slider";
import PopularCategories from "../popular-categories";
import BannerSlider from "../banner-slider";
import { EVENTS_MOCK_DATA } from "src/_mock/_events";

export default function HomeView() {
  const { events } = useFetchEvents();

  const EVENTS_MOCK = EVENTS_MOCK_DATA?.subEvents;

  return (
    <MainLayout>
      <Banner
        // events={events}
        events={EVENTS_MOCK}
      />
      {/* <TicketSearch /> */}
      <EventsCarousel events={EVENTS_MOCK} />
      <MobileApp />
      {/* <EventsSlider />
      <BannerSlider />
      <PopularCategories />
      <Artists /> */}
    </MainLayout>
  );
}
