"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { EventsProvider } from "src/context";
import { queryClient } from "src/lib/queryClient";
import { HomeView } from "src/sections/home/view";

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsProvider>
        <HomeView />
      </EventsProvider>
    </QueryClientProvider>
  );
}
