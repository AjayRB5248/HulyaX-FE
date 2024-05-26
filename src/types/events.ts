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

interface ChildEventProps {
  venues: Venue[];
}

export interface EachEventProps {
  id: string;
  slug: string;
  venues?: Venue[];
  status: string;
  state: any;
  eventName: string;
  eventDescription: string;
  images: EventImage[];
  tags: string[];
  childEvents: ChildEventProps[];
  states: any;
}

export interface EventProps {
  events: EachEventProps[];
}
