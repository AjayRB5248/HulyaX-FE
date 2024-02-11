"use client";
// layouts
import MainLayout from "src/layouts/main";

// components
import Banner from "../home-banner";
import TicketSearch from "../ticket-search";
import { EventsCarousel } from "src/sections/events/view";
import { useFetchEvents } from "src/api/events";
import Artists from "../artists-section";
import NewsLetter from "src/layouts/main/newsletter";
import EventsSlider from "../events-slider";
import PopularCategories from "../popular-categories";
import BannerSlider from "../banner-slider";

export default function HomeView() {
  const { events } = useFetchEvents();

  return (
    <MainLayout>
      <Banner />
      <TicketSearch />
      <EventsCarousel />
      <NewsLetter />
      <EventsSlider />
      <BannerSlider />
      <PopularCategories />
      <Artists />
    </MainLayout>
  );
}
