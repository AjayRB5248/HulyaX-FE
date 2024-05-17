import { EventStatusEnum } from 'src/sections/tour/utils';
import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required'),
  eventCategory: Yup.string().required('Event Category is required'),
  status: Yup.string()
    .required('Event Status is Required')
    .oneOf(Object.values(EventStatusEnum), 'Invalid event status'),
  posterImage: Yup.mixed()
    .nullable()
    .required('Poster image is required')
    .test('validImageOrUrl', 'Invalid image or URL', (value) => {
      if (!value) return true;
      if (typeof value === 'string' && Yup.string().url().isValidSync(value)) {
        return true;
      }
      if (value instanceof File) {
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return false;
    }),
  artists: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Artist name is required'),
    })
  ),
  videoUrl: Yup.string().optional(),
  states: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('State name is required'),
    })
  ),

  images: Yup.array().optional(),
  tags: Yup.array().of(Yup.string()).required('At least one tag is required'),
});
