import moment from "moment";

export const formatDate = (dateString: string, timeZone: string = "UTC") => {
  const momentDate = moment.utc(dateString).tz(timeZone);
  const day = momentDate.format("D");
  const month = momentDate.format("MMM");

  return { day, month };
};

export const getRemainingTime = (eventDate: string, timeZone: string) => {
  const now = moment().tz(timeZone);
  const eventMoment = moment(eventDate).tz(timeZone);
  const duration = moment.duration(eventMoment?.diff(now));

  const days = Math.floor(duration.asDays());
  const hours = duration.hours();

  return { days, hours };
};

export const getClosestEvent = (venues: any) => {
  const now = new Date();
  let closestEvent: any = null;
  let closestDifference = Infinity;

  venues?.forEach((event: any) => {
    const eventDate = new Date(event.eventDate);
    const timeDifference = Math.abs(now.getTime() - eventDate.getTime());

    if (timeDifference < closestDifference) {
      closestDifference = timeDifference;
      closestEvent = event;
    }
  });

  return closestEvent ? closestEvent : null;
};
