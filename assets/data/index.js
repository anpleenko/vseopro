import Chance from 'chance';
const chance = new Chance();
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

  for(let i = 0; i < chance.integer({ min: 3, max: 10 }); i++) {
    arr.push({
      text: capitalizeFirstChar(chance.word({ syllables: 4 })),
      url: '#',
    });
  }

  return arr;
}

function generateTwoLevel() {
  let arr = [];

  for(let i = 0; i < chance.integer({ min: 3, max: 10 }); i++) {
    if (chance.bool()) {
      arr.push({
        text: capitalizeFirstChar(chance.word({ syllables: 4 })),
        url: '#',
      });
    } else {
      arr.push({
        text: capitalizeFirstChar(chance.word({ syllables: 4 })),
        url: '#',
        submenu: generateThreeLevel(),
      });
    }
  }

  return arr;
}


for(var i = 0; i < chance.integer({ min: 2, max: 8 }); i++) {
  if (chance.bool()) {
    data.navMenu.push({
      text: capitalizeFirstChar(chance.word({ syllables: 4 })),
      url: '#',
    });
  } else {
    data.navMenu.push({
      text: capitalizeFirstChar(chance.word({ syllables: 4 })),
      url: '#',
      submenu: generateTwoLevel(),
    });
  }
}

export default data;
