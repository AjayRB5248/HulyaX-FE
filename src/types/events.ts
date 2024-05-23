interface EventImage {
  isPrimary: boolean;
  imageurl: string;
}

export interface Venue {
  eventDate: string;
}

interface ParentEvent {
  eventName: string;
  eventDescription: string;
  images: EventImage[];
  tags: string[];
  slug: string;
}

export interface SubEventProps {
  id: string;
  slug: string;
  parentEvent: ParentEvent;
  venues?: Venue[];
  status: string;
  state: any;
}

export interface EventProps {
  events: SubEventProps[];
}
