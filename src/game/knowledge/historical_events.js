import TimeIcon from '../../../public/time_event.svg'

export const historical_events = {
  // year :: month :: day :: hour
  '1991 8 17 1': {
    title: 'Linux OS released',
    description: 'Linux operation system kernel was released.',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '1993 3 22 1': {
    title: 'Mosaic web-browser released',
    description: 'Mosaic web-browser released',
    picture: TimeIcon,
    updateGameData: (data) => {data.unlocked_platforms.push('browser')}
  },
  '1995 4 23 1': {
    title: 'JAVA released',
    description: 'Java programming language released.',
    picture: TimeIcon,
    updateGameData: (data) => {data.unlocked_platforms.push('crossplatform')}
  },
  '1995 9 10 1': {
    title: 'Dotcoms boom',
    description: 'Dotcoms boom',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '1999 2 31 1': {
    title: 'Matrix moovie',
    description: 'Matrix moovie released',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2000 2 10 1': {
    title: 'Dotcoms bubble burst',
    description: 'Dotcoms bubble burst',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2001 8 11 1': {
    title: '9/11 terroristic act',
    description: '9/11 terroristic act',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2003 9 7 1': {
    title: 'Nokia N-Gage released',
    description: 'Nokia N-Gage gaming phone released.',
    picture: TimeIcon,
    updateGameData: (data) => {data.unlocked_platforms.push('mobile')}
  },
  '2007 3 11 1': {
    title: 'iPhone released',
    description: 'iPhone released',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2008 8 23 1': {
    title: 'Android released',
    description: 'Android released',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2007 9 9 1': {
    title: 'Shares chart greatest point',
    description: 'Shares chart greatest point',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2008 0 1 1': {
    title: 'World economic crisis',
    description: 'World economic crisis',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2009 0 3 1': {
    title: 'BTC started',
    description: 'BTC cryptocurrency started.',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2011 1 1 1': {
    title: 'Silkroad started',
    description: 'Silkroad started. BTC course goes increased.',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2012 8 1 1': {
    title: 'Bitcoin Foundation created',
    description: 'Bitcoin Foundation created',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2013 3 15 1': {
    title: 'Google Glass released',
    description: 'AR/VR development era started',
    picture: TimeIcon,
    updateGameData: (data) => {data.unlocked_platforms.push('VR')}
  },
  '2017 0 1 1': {
    title: 'Cryptocurrency market boom',
    description: 'Cryptocurrency market boom',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2018 0 1 1': {
    title: 'Cryptocurrency market low',
    description: 'Cryptocurrency market low',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  },
  '2019 0 1 1': {
    title: 'AR/VR boom',
    description: 'AR/VR boom',
    picture: TimeIcon,
    updateGameData: (data) => {return data}
  }
};
