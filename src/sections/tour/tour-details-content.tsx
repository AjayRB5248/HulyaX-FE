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
import { Button, Card, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from "@mui/material";
import { SplashScreen } from "src/components/loading-screen";
import CarouselThumbnail from "../_examples/extra/carousel-view/carousel-thumbnail";
import { useEffect, useState } from "react";
import { useAllUsersByRole } from "src/api/users";
import { useStates } from "src/api/superAdmin";

type Props = {
  event: any;
  isLoading: boolean;
};

export default function TourDetailsContent({ event, isLoading }: Props) {
  const {
    _id,
    eventName,
    eventCategory,
    eventDescription,
    status,
    ticketTypes,
    artists,
    tags,
    venues,
    images:eventImages,
    slug,
    assignedCompany,
    createdAt,
    available,
    videoUrl,
  } = event;

  const {states}= useStates();
  const { users} = useAllUsersByRole("companyAdmin")
  const [mappedData, setMappedData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stateMap :any= {};
    states?.states?.forEach((state:any) => {
        stateMap[state._id] = state.stateName;
    });

    const companyMap :any= {};
    users.forEach((company:any) => {
        companyMap[company._id] = company.name;
    });

    const result = assignedCompany?.map((ac:any) => ({
        stateName: stateMap[ac.state],
        companyName: companyMap[ac.companyId]
    }));

    setMappedData(result);
}, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          Australia
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

{  artists?.length > 0 &&  <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Featured Artists
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
          {artists?.map((artist:any) => {
            const profileImage = artist?.images?.find((img:any) => img.isProfile)?.imageurl;

            return (
              <div key={artist._id} className="d-flex flex-column align-items-center">
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

  const renderStatewithCompany = (data:any) => {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Assigned Companies
        </Typography>
        <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
          {data?.map((item:any, index:any) => (
            <Card key={index} sx={{ minWidth: 275 }}>
              <CardHeader
                avatar={<Iconify icon="ic:baseline-business" />}
                title={item.companyName}
              />
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon="mingcute:location-fill" />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.stateName}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    );
  };


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
          Event Venues and Tickets
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={3}
        >
          {combinedDetails?.map((venue: any, index: any) => (
            <Paper key={index} elevation={3} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {venue.icon}
                  <Typography variant="subtitle1">
                    {venue?.venueName}
                  </Typography>
                </Stack>
                <Typography variant="body1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                  <Iconify icon="mingcute:location-fill" sx={{ color: 'error.main', }} />  {venue.city}
                </Typography>
                <Typography variant="body2" color="text.secondary" alignItems={'center'}  sx={{ display: 'flex', alignItems: 'center' }}>
                  <Iconify icon="solar:clock-circle-bold" sx={{ color: 'info.main',marginRight: '8px' }} />  {venue.date} | {venue.time} Onwards
                </Typography>
                <Box>
                  {ticketTypes?.filter((ticket:any) => ticket?.venueId === venue?.venueId).map((ticket: any, idx: any) => (
                    <Box
                      key={idx}
                      p={1}
                      mt={1}
                      border={1}
                      borderColor="grey.300"
                      borderRadius={1}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Iconify icon="ant-design:ticket-outlined" />
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap:'4' }}>
                          <Iconify icon="emojione:admission-tickets" sx={{ color: 'info.main',marginRight: '8px' }}/>  {ticket.type} - Price: ${ticket.price}, Seats: {ticket.availableSeats}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Stack>
            </Paper>
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
        {mappedData?.length ? renderStatewithCompany(mappedData) : null}

        <Divider sx={{ borderStyle: "dashed", my: 5 }} />

        {videoUrl && (
          <>
            <Button variant="contained" startIcon={<Iconify icon="mdi:youtube" />} onClick={handleClickOpen}>
              Watch Video
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="video-dialog-title"
              maxWidth="md"
              fullWidth
            >
              <DialogTitle id="video-dialog-title">Event Video</DialogTitle>
              <DialogContent>
                <iframe
                  width="100%"
                  height="400"
                  src={videoUrl}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}

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
