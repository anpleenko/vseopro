import faker from 'faker';
import { capitalizeFirstChar, arrGen } from '../../tasks/config';

const data = {
  sidebarVoteAnswers: [
    'Лучший из новостных',
    'Неплохой движок',
    'Устраивает ... но ...',
    'Совсем не понравился',
    'Встречал и получше',
    'Совсем не понравился',
  ],
  sidebarVoteAnswersResult: [
    { text: 'Лучший из новостных', vote: 0, persent: 0 },
    { text: 'Неплохой движок', vote: 0, persent: 0 },
    { text: 'Устраивает ... но ...', vote: 0, persent: 0 },
    { text: 'Совсем не понравился', vote: 5, persent: 50 },
    { text: 'Встречал и получше', vote: 10, persent: 60 },
    { text: 'Совсем не понравился', vote: 154, persent: 100 },
  ],
  newsTab: [
    { name: 'Шаблоны', active: true },
    { name: 'Модули', active: false },
    { name: 'Хаки', active: false },
    { name: 'Форумы', active: false },
    { name: 'Релизы', active: false },
  ],
  navMenu: [],
  footerSocialWidgetData: [
    { title: 'Мы в твиттере' },
    { title: 'Мы в Facebook' },
    { title: 'Мы Вконтакте' },
    { title: 'Мы в Pinterest' },
  ],
};

function generateThreeLevel() {
  let arr = [];

  arrGen(faker.random.number({ min: 3, max: 10 })).map((e, i) => {
    arr.push({
      text: capitalizeFirstChar(faker.random.word()),
      url: '#',
    });
  })

  return arr;
}

function generateTwoLevel() {
  let arr = [];

  arrGen(faker.random.number({ min: 3, max: 10 })).map((e, i) => {
    if (faker.random.boolean()) {
      arr.push({
        text: capitalizeFirstChar(faker.random.word()),
        url: '#',
      });
    } else {
      arr.push({
        text: capitalizeFirstChar(faker.random.word()),
        url: '#',
        submenu: generateThreeLevel(),
      });
    }
  })

  return arr;
}


arrGen(faker.random.number({ min: 4, max: 8 })).map((e, i) => {
  if (faker.random.boolean()) {
    data.navMenu.push({
      text: capitalizeFirstChar(faker.random.word()),
      url: '#',
    });
  } else {
    data.navMenu.push({
      text: capitalizeFirstChar(faker.random.word()),
      url: '#',
      submenu: generateTwoLevel(),
    });
  }
})

export default data;
