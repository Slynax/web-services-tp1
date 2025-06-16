export const AIRLINE_LOGOS = {
  'air france': {
    name: 'Air France',
    logo: 'https://content.r9cdn.net/rimg/provider-logos/airlines/v/AF.png?crop=false&width=108&height=92&fallback=default1.png&_v=48aae6bb98d8c51316f5918500ed39b2',
    fallback: 'AF'
  },
  'lufthansa': {
    name: 'Lufthansa',
    logo: 'https://content.r9cdn.net/rimg/provider-logos/airlines/v/LH.png?crop=false&width=108&height=92&fallback=default2.png&_v=a1e3a69579474969d2b123789717863f',
    fallback: 'LH'
  },
  'ryanair': {
    name: 'Ryanair',
    logo: 'https://content.r9cdn.net/rimg/provider-logos/airlines/v/FR.png?crop=false&width=108&height=92&fallback=default3.png&_v=be703666bbd51cff10e0564857e14808',
    fallback: 'FR'
    },
} as const;

export type AirlineName = keyof typeof AIRLINE_LOGOS;

export const getAirlineInfo = (airlineName: string) => {
  const normalizedName = airlineName.toLowerCase().trim();
  return AIRLINE_LOGOS[normalizedName as AirlineName] || {
    name: airlineName,
    logo: null,
    fallback: airlineName.substring(0, 2).toUpperCase()
  };
};
