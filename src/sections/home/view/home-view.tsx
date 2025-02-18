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
import { EventStatusEnum } from "src/sections/tour/utils";
import { SplashScreen } from "src/components/loading-screen";

export default function HomeView() {
  const { events } = useFetchEvents();

  if (!events || events?.length === 0) {
    return <SplashScreen />;
  }

  const EVENTS_MOCK = EVENTS_MOCK_DATA?.subEvents;

  return (
    <MainLayout>
      <Banner events={events} />
      <EventsCarousel events={events} />
      <MobileApp />
      <EventsSlider events={events?.filter((event: any) => event.status !== EventStatusEnum.COMPLETED)} />
      <PopularCategories />
      <Artists />
      <BannerSlider events={events} />
    </MainLayout>
  );
}
