import { m } from "framer-motion";
// @mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
// utils
import { fDate } from "src/utils/format-time";
// _mock
// types
// components
import Image from "src/components/image";
import Iconify from "src/components/iconify";
import Markdown from "src/components/markdown";
import Lightbox, { useLightBox } from "src/components/lightbox";
import { Chip, Paper } from "@mui/material";
import { SplashScreen } from "src/components/loading-screen";
import CarouselThumbnail from "../_examples/extra/carousel-view/carousel-thumbnail";

type Props = {
  event: any;
  isLoading: boolean;
};

export default function CompanyEventDetailsContent({ event, isLoading }: Props) {
  if (!event || event.length === 0) {
    return <SplashScreen />;
  }
  const {
    eventName,
    eventCategory,
    eventDescription,
    status,
    state,
    ticketTypes,
    artists,
    tags,
    venues,
    images:eventImages,
    slug,
    ticketConfig,
    createdAt,
    available,
  } = event[0];

  const carouselData = eventImages?.map((image:any) => ({
    id: image._id,
    title: "",
    coverUrl: image.imageurl,
  }));

  const renderGallery = (
    <>
      {isLoading ? <SplashScreen /> : <CarouselThumbnail data={carouselData} />}
    </>
  );

  const renderHead = (
    <>
      <Stack direction="row" sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {eventName}
        </Typography>
      </Stack>

      <Stack spacing={3} direction="row" flexWrap="wrap" alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify icon="mingcute:location-fill" sx={{ color: "error.main" }} />
          {state?.stateName}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify
            icon={
              status === "PLANNED"
                ? "ic:baseline-event-available"
                : status === "ONGOING"
                ? "ic:baseline-event-available"
                : "ic:baseline-event-busy"
            }
            sx={{
              color:
                status === "ONGOING"
                  ? "yellow"
                  : status === "PLANNED"
                  ? "green"
                  : "red",
            }}
          />
          {status}
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{ typography: "body2" }}
        >
          <Iconify icon={"tabler:category"} />
          {eventCategory ? eventCategory : "Event"}
        </Stack>
      </Stack>

    { artists?.length > 0 &&  <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Featured Artists
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
        {artists?.map((artist:any) => {
            const profileImage = artist?.images?.find((img:any) => img?.isProfile)?.imageurl;

            return (
              <div key={artist?._id} className="d-flex flex-column align-items-center">
                <div className="artist-profile">
                  {profileImage && (
                    <Image src={profileImage} alt={artist?.artistName} width={150} height={150} />
                  )}
                </div>
                <div className="artist-desc">
                  <h3 className="name">{artist?.artistName}</h3>
                  <span className="title">{artist?.category}</span>
                </div>
              </div>
            );
          })}
        </Stack>
      </Box>}
    </>
  );

  function renderEventVenueDetails() {
    const combinedDetails = venues?.map((venue: any) => {
      const eventDateTime = new Date(venue?.eventDate);
      const ticketsForVenue = ticketTypes?.filter(
        (ticket: any) => ticket.venueName === venue.venueName
      );

      return {
        venueId:venue?._id,
        venueName: venue.venueName,
        city: venue.city,
        date: fDate(eventDateTime),
        time: eventDateTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        tickets: ticketsForVenue,
        icon: <Iconify icon="solar:calendar-date-bold" />,
      };
    });

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tickets
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={3}
        >
                  {ticketConfig?.length> 0 && ticketConfig?.map((ticket: any, idx: any) => (
                    <Box
                      key={idx}
                      p={1}
                      mt={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius={1}
                    >
                      
                      <Stack direction="column" spacing={2} alignItems="center">
                        <Iconify icon="ant-design:ticket-outlined" />
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                          <Iconify icon="emojione:admission-tickets" sx={{ color: 'info.main',marginRight: '8px' }}/>  {ticket.type} - ${ticket.price}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                         Available Seats: {ticket.availableSeats}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                         Sold Seats: {ticket.soldSeats}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                         Total Seats: {ticket.totalSeats}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
      </Box>
    );
  }

  return (
    <>
      {renderGallery}

      <Stack sx={{ maxWidth: 720, mx: "auto" }}>
        {renderHead}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        {renderEventVenueDetails()}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        <Markdown children={eventDescription} />
        {tags?.length > 0 &&  <Box sx={{ mt: 4 }}>
         <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
           <Stack direction="row" spacing={1} sx={{ overflowX: "auto" }}>
            {tags?.map((tag:any, index:any) => (
              <Chip key={index} label={tag} />
            ))}
          </Stack> 
        </Box>}
      </Stack>
    </>
  );
}
