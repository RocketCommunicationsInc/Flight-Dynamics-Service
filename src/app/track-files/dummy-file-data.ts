import { Files } from '../types/Files';

const randomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

export const dummyFileData: Files[] = [
  {
    fileName: 'trackfile_01',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 565,
    selected: false,
    index: 0,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
  },
  {
    fileName: 'trackfile_02',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 18,
    selected: false,
    index: 1,
    content:
      'Ad dolore dignissimos asperiores dicta facere optio quod commodi nam tempore recusandae. Rerum sed nulla eum vero expedita ex delectus voluptates rem at neque quos facere sequi unde optio aliquam!',
  },
  {
    fileName: 'trackfile_03',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 743,
    selected: false,
    index: 2,
    content:
      'Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!',
  },
  {
    fileName: 'trackfile_04',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 1245,
    selected: false,
    index: 3,
    content:
      'Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?',
  },
  {
    fileName: 'trackfile_05',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 458,
    selected: false,
    index: 4,
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  },
  {
    fileName: 'trackfile_06',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 790,
    selected: false,
    index: 5,
    content:
      'Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?',
  },
  {
    fileName: 'trackfile_07',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 499,
    selected: false,
    index: 6,
    content:
      'Temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
  },
  {
    fileName: 'trackfile_08',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 72,
    selected: false,
    index: 7,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam vero',
  },
  {
    fileName: 'trackfile_09',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 1343,
    selected: false,
    index: 8,
    content:
      'Tenetur quod quidem in voluptatem corporis dolorum dicta sit pariatur porro quaerat autem ipsam odit quam beatae tempora quibusdam illum! Modi velit odio nam nulla unde amet odit pariatur at!',
  },
  {
    fileName: 'trackfile_10',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 800,
    selected: false,
    index: 9,
    content:
      'Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus necessitatibus reiciendis optio tempora unde earum doloremque commodi laudantium ad nulla vel odio?',
  },
  {
    fileName: 'trackfile_11',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 459,
    selected: false,
    index: 10,
    content: 'Deleniti eos cupiditate dolore doloribus!',
  },
  {
    fileName: 'trackfile_12',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 195,
    selected: false,
    index: 11,
    content: 'Consequatur rerum amet fuga expedita sunt et tempora saepe? ',
  },
  {
    fileName: 'trackfile_13',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 195,
    selected: false,
    index: 12,
    content:
      'Consequatur rerum amet fuga expedita sunt et tempora saepe? Iusto nihil explicabo perferendis quos provident delectus ducimus.',
  },
  {
    fileName: 'trackfile_14',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 1245,
    selected: false,
    index: 13,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
  },
  {
    fileName: 'trackfile_15',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 458,
    selected: false,
    index: 14,
    content: 'Lorem ipsum dolor sit amet!',
  },
  {
    fileName: 'trackfile_16',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 80,
    selected: false,
    index: 15,
    content:
      'Laboriosam quaerat sapiente minima nam minus similique illum architecto et!',
  },
  {
    fileName: 'trackfile_17',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 27,
    selected: false,
    index: 16,
    content:
      'Incidunt vitae quae facere ducimus nostrum aliquid dolorum veritatis dicta!',
  },
  {
    fileName: 'trackfile_18',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 257,
    selected: false,
    index: 17,
    content:
      'Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!',
  },
  {
    fileName: 'trackfile_19',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 54,
    selected: false,
    index: 18,
    content:
      'Tenetur laborum quod cum excepturi recusandae porro sint quas soluta!',
  },
  {
    fileName: 'trackfile_20',
    date: randomDate(new Date(2023, 0, 1), new Date()),
    size: 1008,
    selected: false,
    index: 19,
    content: 'Officia quibusdam deleniti eos cupiditate dolore doloribus!',
  },
];
