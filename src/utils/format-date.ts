import moment from "moment";

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

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
