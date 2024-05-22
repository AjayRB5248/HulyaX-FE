import AXIS_POSTER_IMG from "../assets/frontend/images/media/AXIXPOSTER.png";
import SACAR_POSTER_IMG from "../assets/frontend/images/media/SACARPOSTER.jpg";

import AXIS_IMG from "../assets/frontend/images/media/AXIX.jpeg";
import SACAR_IMG from "../assets/frontend/images/media/SACARAustraliaTour.jpeg";
import MAJJALE_HASSCHHA_IMG from "../assets/frontend/images/media/MajjaleHasschha.jpeg";
import NEPATHYA from "../assets/frontend/images/media/Nepathya.jpeg";
import Anuprastha from "../assets/frontend/images/media/Anuprastha.jpeg";

export const EVENTS_MOCK_DATA = {
  total: 6,
  subEvents: [
    {
      status: "PLANNED",
      ticketTypes: [
        {
          eventOwners: ["65b6330e57b8f91495bb610f"],
          soldSeats: 0,
          isDeleted: false,
          _id: "6648538f2e9ca02c73fdd9c9",
          eventId: "66484f542e9ca02c73fdd9bc",
          venueInfo: "66484f852e9ca02c73fdd9c5",
          type: "PREMIUM",
          price: 5000,
          totalSeats: 980,
          availableSeats: 980,
          createdAt: "2024-05-18T07:06:55.367Z",
          updatedAt: "2024-05-18T07:06:55.367Z",
          __v: 0,
        },
        {
          eventOwners: ["65b6330e57b8f91495bb610f"],
          soldSeats: 0,
          isDeleted: false,
          _id: "66486fd2c78e674dd729573d",
          eventId: "66484f542e9ca02c73fdd9bc",
          venueInfo: "66484f852e9ca02c73fdd9c5",
          type: "BASIC",
          price: 5000,
          totalSeats: 980,
          availableSeats: 980,
          createdAt: "2024-05-18T09:07:30.987Z",
          updatedAt: "2024-05-18T09:07:30.987Z",
          __v: 0,
        },
      ],
      companies: ["65b6330e57b8f91495bb610f"],
      _id: "66484f542e9ca02c73fdd9bc",
      parentEvent: {
        status: "ONGOING",
        secondaryStatus: [],
        states: ["6644c3a8c74b021a17ca9c26"],
        artists: [
          {
            _id: "6647a8cdacd32f2fef3efad0",
            artistName: "Sacar Adhikari",
          },
        ],
        tags: ["FEATURED"],
        isDeleted: false,
        eventName: "SACAR Ft. CAREY",
        eventDescription: "Australia Tour July X August",
        images: [
          {
            isPrimary: true,
            _id: "6647b52cd63e9c40804d8923",
            imageurl: SACAR_POSTER_IMG,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed3f",
            imageurl: `http://localhost:8081${SACAR_IMG.src}`,
          },
        ],
        eventCategory: "arts_culture",
        videoUrl: "",
        slug: "sixth-1715975468885",
        assignedCompany: [
          {
            _id: "66484f542e9ca02c73fdd9be",
            state: "6644c3a8c74b021a17ca9c26",
            companyId: "65b6330e57b8f91495bb610f",
            subEventId: "66484f542e9ca02c73fdd9bc",
          },
        ],
        id: "6647b52cd63e9c40804d8922",
      },
      state: {
        isDeleted: false,
        _id: "6644c3a8c74b021a17ca9c26",
        stateName: "Brisbane",
        timeZone: "Australia/Brisbane",
        __v: 0,
        createdAt: "2024-05-15T14:16:08.700Z",
        updatedAt: "2024-05-15T14:16:08.700Z",
      },
      venues: [
        {
          _id: "66484f852e9ca02c73fdd9c5",
          venueId: {
            isDeleted: false,
            _id: "6644cf4289622f3898a385c8",
            venueName: "Yak and Yeti1",
            state: "6644c3a8c74b021a17ca9c26",
            __v: 0,
            createdAt: "2024-05-15T15:05:38.902Z",
            updatedAt: "2024-05-17T18:41:44.758Z",
          },
          eventDate: "2024-06-19T23:25:15.673Z",
        },
      ],
      __v: 0,
      createdAt: "2024-05-18T06:48:52.736Z",
      updatedAt: "2024-05-18T09:07:31.069Z",
    },
    {
      status: "PLANNED",
      ticketTypes: [
        {
          eventOwners: ["65b6330e57b8f91495bb610f"],
          soldSeats: 0,
          isDeleted: false,
          _id: "6648538f2e9ca02c73fdd9c9",
          eventId: "66484f542e9ca02c73fdd9bc",
          venueInfo: "66484f852e9ca02c73fdd9c5",
          type: "PREMIUM",
          price: 5000,
          totalSeats: 980,
          availableSeats: 980,
          createdAt: "2024-05-18T07:06:55.367Z",
          updatedAt: "2024-05-18T07:06:55.367Z",
          __v: 0,
        },
        {
          eventOwners: ["65b6330e57b8f91495bb610f"],
          soldSeats: 0,
          isDeleted: false,
          _id: "66486fd2c78e674dd729573d",
          eventId: "66484f542e9ca02c73fdd9bc",
          venueInfo: "66484f852e9ca02c73fdd9c5",
          type: "BASIC",
          price: 5000,
          totalSeats: 980,
          availableSeats: 980,
          createdAt: "2024-05-18T09:07:30.987Z",
          updatedAt: "2024-05-18T09:07:30.987Z",
          __v: 0,
        },
      ],
      companies: ["65b6330e57b8f91495bb610f"],
      _id: "66484f542e9ca02c73fdd9bc",
      parentEvent: {
        status: "ONGOING",
        secondaryStatus: [],
        states: ["6644c3a8c74b021a17ca9c26"],
        artists: [
          {
            _id: "6647a8cdacd32f2fef3efad0",
            artistName: "Bharatmani Paudel",
          },
        ],
        tags: ["FEATURED"],
        isDeleted: false,
        eventName: "Majjale Hasschha Australia with comedy champion",
        eventDescription: "Majjale Hasschha Australia with comedy champion",
        images: [
          {
            isPrimary: true,
            _id: "6647b52cd63e9c40804d8923",
            imageurl: MAJJALE_HASSCHHA_IMG,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed3f",
            imageurl: `http://localhost:8081${MAJJALE_HASSCHHA_IMG.src}`,
          },
        ],
        eventCategory: "arts_culture",
        videoUrl: "",
        slug: "sixth-1715975468885",
        assignedCompany: [
          {
            _id: "66484f542e9ca02c73fdd9be",
            state: "6644c3a8c74b021a17ca9c26",
            companyId: "65b6330e57b8f91495bb610f",
            subEventId: "66484f542e9ca02c73fdd9bc",
          },
        ],
        id: "6647b52cd63e9c40804d8922",
      },
      state: {
        isDeleted: false,
        _id: "6644c3a8c74b021a17ca9c26",
        stateName: "Brisbane",
        timeZone: "Australia/Brisbane",
        __v: 0,
        createdAt: "2024-05-15T14:16:08.700Z",
        updatedAt: "2024-05-15T14:16:08.700Z",
      },
      venues: [
        {
          _id: "66484f852e9ca02c73fdd9c5",
          venueId: {
            isDeleted: false,
            _id: "6644cf4289622f3898a385c8",
            venueName: "Yak and Yeti1",
            state: "6644c3a8c74b021a17ca9c26",
            __v: 0,
            createdAt: "2024-05-15T15:05:38.902Z",
            updatedAt: "2024-05-17T18:41:44.758Z",
          },
          eventDate: "2024-06-19T23:25:15.673Z",
        },
      ],
      __v: 0,
      createdAt: "2024-05-18T06:48:52.736Z",
      updatedAt: "2024-05-18T09:07:31.069Z",
    },
    {
      status: "PLANNED",
      ticketTypes: [],
      companies: ["6637a6c7a37b365ce0f083d6"],
      _id: "6648d99ae1d58725c0d2d36a",
      parentEvent: {
        status: "ONGOING",
        secondaryStatus: [],
        states: ["6644c3a8c74b021a17ca9c25"],
        artists: [
          {
            _id: "6647a860acd32f2fef3efabf",
            artistName: "AXIS Band",
          },
        ],
        tags: ["FEATURED"],
        isDeleted: false,
        eventName: "Road to 24 (Axis Australia Tour 2024)",
        eventDescription:
          "<p>Road to '24 🎸🇳🇵🇦🇺 🎶🌏 The countdown is on! **Axix**, our cherished band, is gearing up to take on Australia with their 'Road to '24' tour this July. An epic musical journey that will ignite your soul. It’s not just a concert; it’s a gathering of our shared tales and tunes that evoke memories of home. Let's unite for a night of unforgettable moments and melodies that touch the heart. #AxixAustraliaTour #RoadTo24 🎸🎉</p><p><br></p>",
        images: [
          {
            isPrimary: true,
            _id: "6648c4124428768043ebed3e",
            // imageurl:
            //   "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/eventImages/payload.eventName/1716044806953",
            imageurl: AXIS_POSTER_IMG,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed3f",
            imageurl: `http://localhost:8081${AXIS_IMG.src}`,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed40",
            imageurl:
              "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/eventImages/payload.eventName/1716044816298",
          },
        ],
        eventCategory: "music_concerts",
        videoUrl: "https://www.youtube.com/embed/wyKeeYKI358?si=j4UHnqg6nMYHQQT1",
        assignedCompany: [
          {
            _id: "6648d99ae1d58725c0d2d36c",
            state: "6644c3a8c74b021a17ca9c25",
            companyId: "6637a6c7a37b365ce0f083d6",
            subEventId: "6648d99ae1d58725c0d2d36a",
          },
        ],
        slug: "road-to-24-axis-australia-tour-2024-1716044818354",
        id: "6648c4124428768043ebed3d",
      },
      state: {
        isDeleted: false,
        _id: "6644c3a8c74b021a17ca9c25",
        stateName: "Sydney",
        timeZone: "Australia/Sydney",
        __v: 0,
        createdAt: "2024-05-15T14:16:08.699Z",
        updatedAt: "2024-05-15T14:16:08.699Z",
      },
      venues: [
        {
          _id: "66484f852e9ca02c73fdd9c5",
          venueId: {
            isDeleted: false,
            _id: "6644cf4289622f3898a385c8",
            venueName: "Yak and Yeti1",
            state: "6644c3a8c74b021a17ca9c26",
            __v: 0,
            createdAt: "2024-05-15T15:05:38.902Z",
            updatedAt: "2024-05-17T18:41:44.758Z",
          },
          eventDate: "2024-06-01T23:25:15.673Z",
        },
      ],
      __v: 0,
      createdAt: "2024-05-18T16:38:50.437Z",
      updatedAt: "2024-05-18T16:38:50.902Z",
    },

    {
      status: "COMPLETED",
      ticketTypes: [],
      companies: ["6637a6c7a37b365ce0f083d6"],
      _id: "6648d99ae1d58725c0d2d36a",
      parentEvent: {
        status: "ONGOING",
        secondaryStatus: [],
        states: ["6644c3a8c74b021a17ca9c25"],
        artists: [
          {
            _id: "6647a860acd32f2fef3efabf",
            artistName: "NEPATHYA",
          },
        ],
        tags: ["FEATURED"],
        isDeleted: false,
        eventName: "NEPATHYA LIVE IN SYDNEY",
        eventDescription: "Nepathya Live in Sydney",
        images: [
          {
            isPrimary: true,
            _id: "6648c4124428768043ebed3e",
            // imageurl:
            //   "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/eventImages/payload.eventName/1716044806953",
            imageurl: NEPATHYA,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed3f",
            imageurl: `http://localhost:8081${NEPATHYA.src}`,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed40",
            imageurl:
              "https://ticketing-app-au.s3.ap-southeast-2.amazonaws.com/eventImages/payload.eventName/1716044816298",
          },
        ],
        eventCategory: "music_concerts",
        videoUrl: "https://www.youtube.com/embed/wyKeeYKI358?si=j4UHnqg6nMYHQQT1",
        assignedCompany: [
          {
            _id: "6648d99ae1d58725c0d2d36c",
            state: "6644c3a8c74b021a17ca9c25",
            companyId: "6637a6c7a37b365ce0f083d6",
            subEventId: "6648d99ae1d58725c0d2d36a",
          },
        ],
        slug: "road-to-24-axis-australia-tour-2024-1716044818354",
        id: "6648c4124428768043ebed3d",
      },
      state: {
        isDeleted: false,
        _id: "6644c3a8c74b021a17ca9c25",
        stateName: "Sydney",
        timeZone: "Australia/Sydney",
        __v: 0,
        createdAt: "2024-05-15T14:16:08.699Z",
        updatedAt: "2024-05-15T14:16:08.699Z",
      },
      venues: [
        {
          _id: "66484f852e9ca02c73fdd9c5",
          venueId: {
            isDeleted: false,
            _id: "6644cf4289622f3898a385c8",
            venueName: "Yak and Yeti1",
            state: "6644c3a8c74b021a17ca9c26",
            __v: 0,
            createdAt: "2024-05-15T15:05:38.902Z",
            updatedAt: "2024-05-17T18:41:44.758Z",
          },
          eventDate: "2024-06-01T23:25:15.673Z",
        },
      ],
      __v: 0,
      createdAt: "2024-05-18T16:38:50.437Z",
      updatedAt: "2024-05-18T16:38:50.902Z",
    },
    {
      status: "COMPLETED",
      ticketTypes: [],
      companies: ["6637a6c7a37b365ce0f083d6"],
      _id: "6648d99ae1d58725c0d2d36a",
      parentEvent: {
        status: "ONGOING",
        secondaryStatus: [],
        states: ["6644c3a8c74b021a17ca9c25"],
        artists: [
          {
            _id: "6647a860acd32f2fef3efabf",
            artistName: "NEPATHYA",
          },
        ],
        tags: ["FEATURED"],
        isDeleted: false,
        eventName: "Global Fund Raiser with Anuprastha",
        eventDescription: "Global Fund Raiser with Anuprastha Tour to Australia",
        images: [
          {
            isPrimary: true,
            _id: "6648c4124428768043ebed3e",
            imageurl: Anuprastha,
          },
          {
            isPrimary: false,
            _id: "6648c4124428768043ebed3f",
            imageurl: `http://localhost:8081${Anuprastha.src}`,
          },
        ],
        eventCategory: "music_concerts",
        videoUrl: "https://www.youtube.com/embed/wyKeeYKI358?si=j4UHnqg6nMYHQQT1",
        assignedCompany: [
          {
            _id: "6648d99ae1d58725c0d2d36c",
            state: "6644c3a8c74b021a17ca9c25",
            companyId: "6637a6c7a37b365ce0f083d6",
            subEventId: "6648d99ae1d58725c0d2d36a",
          },
        ],
        slug: "road-to-24-axis-australia-tour-2024-1716044818354",
        id: "6648c4124428768043ebed3d",
      },
      state: {
        isDeleted: false,
        _id: "6644c3a8c74b021a17ca9c25",
        stateName: "Sydney",
        timeZone: "Australia/Sydney",
        __v: 0,
        createdAt: "2024-05-15T14:16:08.699Z",
        updatedAt: "2024-05-15T14:16:08.699Z",
      },
      venues: [
        {
          _id: "66484f852e9ca02c73fdd9c5",
          venueId: {
            isDeleted: false,
            _id: "6644cf4289622f3898a385c8",
            venueName: "Yak and Yeti1",
            state: "6644c3a8c74b021a17ca9c26",
            __v: 0,
            createdAt: "2024-05-15T15:05:38.902Z",
            updatedAt: "2024-05-17T18:41:44.758Z",
          },
          eventDate: "2024-06-01T23:25:15.673Z",
        },
      ],
      __v: 0,
      createdAt: "2024-05-18T16:38:50.437Z",
      updatedAt: "2024-05-18T16:38:50.902Z",
    },
  ],
};
