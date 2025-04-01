export interface Fortune {
  id: string;
  text: string;
  category: 'humor' | 'wisdom' | 'motivation' | 'love' | 'career';
}

export const fortunes: Fortune[] = [
  {
    id: '1',
    text: 'Завтра ты встретишь человека в костюме жирафа. Скажи ему «Привет, Миша!»',
    category: 'humor'
  },
  {
    id: '2',
    text: 'Не ешь суп в темноте. Это опасно для твоих штанов.',
    category: 'humor'
  },
  {
    id: '3',
    text: 'Твоя следующая идея изменит мир. Главное - не забыть её записать.',
    category: 'motivation'
  },
  {
    id: '4',
    text: 'Лучше быть счастливым, чем правым. Но если можно быть и тем, и другим - почему бы и нет?',
    category: 'wisdom'
  },
  {
    id: '5',
    text: 'Твоя любовь к кофе обретет новый смысл, когда ты встретишь человека, который пьет его так же, как ты.',
    category: 'love'
  },
  {
    id: '6',
    text: 'Твоя карьера сделает неожиданный поворот, когда ты научишься говорить "нет" без чувства вины.',
    category: 'career'
  }
];

export const getRandomFortune = (): Fortune => {
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  return fortunes[randomIndex];
};

export const getFortuneByCategory = (category: Fortune['category']): Fortune[] => {
  return fortunes.filter(fortune => fortune.category === category);
}; 