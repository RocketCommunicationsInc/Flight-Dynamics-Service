export const dummyOptions = [
  {
    cb: 'Catalog ID',
    checked: true,
    disabled: false,
  },
  {
    cb: 'Eccentricity',
    checked: true,
    disabled: false,
  },
  {
    cb: 'Mass',
    checked: true,
    disabled: false,
  },
  {
    cb: 'Raan',
    checked: false,
    disabled: true,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'Mean Motion',
    checked: false,
    disabled: true,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'Perigee',
    checked: true,
    disabled: false,

    options: [
      { value: 'deg', label: 'Meters' },
      { value: 'rad', label: 'Kilometers' },
      { value: 'rev', label: 'Miles' },
    ],
  },

  {
    cb: 'Longitude of Periapsis ',
    checked: false,
    disabled: true,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'True Anomaly',
    checked: false,
    disabled: true,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'Mean Anomaly',
    checked: false,
    disabled: true,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'Inclination',
    checked: true,
    disabled: false,

    options: [
      { value: 'deg', label: 'Degree' },
      { value: 'rad', label: 'Radian' },
      { value: 'rev', label: 'Revolution' },
    ],
  },
  {
    cb: 'Semi-Major Axis',
    checked: true,
    disabled: false,

    options: [
      { value: 'deg', label: 'Meters' },
      { value: 'rad', label: 'Kilometers' },
      { value: 'rev', label: 'Miles' },
    ],
  },
];
