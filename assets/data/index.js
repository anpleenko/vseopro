import faker from 'faker';
const capitalizeFirstChar = string => string.charAt(0).toUpperCase() + string.substring(1);

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
    { name: 'Шаблоны', active: true, blob: 'tab-teplate' },
    { name: 'Модули', active: false, blob: 'tab-modules' },
    { name: 'Хаки', active: false, blob: 'tab-hacks' },
    { name: 'Форумы', active: false, blob: 'tab-forums' },
    { name: 'Релизы', active: false, blob: 'tab-relize' },
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

  for(let i = 0; i < faker.random.number({ min: 3, max: 10 }); i++) {
    arr.push({
      text: capitalizeFirstChar(faker.random.word()),
      url: '#',
    });
  }

  return arr;
}

function generateTwoLevel() {
  let arr = [];

  for(let i = 0; i < faker.random.number({ min: 3, max: 10 }); i++) {
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
  }

  return arr;
}


for(var i = 0; i < faker.random.number({ min: 2, max: 8 }); i++) {
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
}

export default data;