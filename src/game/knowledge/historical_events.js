import TimeIcon from '../../../public/time_event.png';
import { current_tick } from '../../App';

export const historical_events = {
  // year :: month :: day :: hour
  '1991 8 17 1': {
    name: 'Linux OS released',
    description: 'Linux operation system kernel was released.',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '1993 3 22 1': {
    name: 'Mosaic web-browser released',
    description: 'Mosaic web-browser released',
    picture: TimeIcon,
    updateGameData: data => {
      data.projects_unlocked_platforms.push('browser');
    }
  },
  '1995 4 23 1': {
    name: 'JAVA released',
    description: 'Java programming language released.',
    picture: TimeIcon,
    updateGameData: data => {
      data.projects_unlocked_platforms.push('crossplatform');
    }
  },
  '1995 9 10 1': {
    name: 'Dotcoms boom',
    description: 'Dotcoms boom',
    picture: TimeIcon,
    updateGameData: data => {
      data.exchange_unlocked_shares.push('share0');
      data.exchange_unlocked_shares.push('share1');
      data.exchange_unlocked_shares.push('share2');
      data.share0_unlock = true;
      data.share1_unlock = true;
      data.share2_unlock = true;
    }
  },
  '1999 2 31 1': {
    name: 'Matrix moovie',
    description: 'Matrix moovie released',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2000 2 10 1': {
    name: 'Dotcoms bubble burst',
    description: 'Dotcoms bubble burst',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2001 8 11 1': {
    name: '9/11 terroristic act',
    description: '9/11 terroristic act',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2003 9 7 1': {
    name: 'Nokia N-Gage released',
    description: 'Nokia N-Gage gaming phone released.',
    picture: TimeIcon,
    updateGameData: data => {
      data.projects_unlocked_platforms.push('mobile');
    }
  },
  '2007 3 11 1': {
    name: 'iPhone released',
    description: 'iPhone released',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2008 8 23 1': {
    name: 'Android released',
    description: 'Android released',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2007 9 9 1': {
    name: 'Shares chart greatest point',
    description: 'Shares chart greatest point',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2008 0 1 1': {
    name: 'World economic crisis',
    description: 'World economic crisis',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2009 0 3 1': {
    name: 'BTC started',
    description: 'BTC cryptocurrency started.',
    picture: TimeIcon,
    updateGameData: data => {
      data.exchange_unlocked_shares.push('btc');
      data.btc_unlock = true;
    }
  },
  '2011 1 1 1': {
    name: 'Silkroad started',
    description: 'Silkroad started. BTC course goes increased.',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2012 8 1 1': {
    name: 'Bitcoin Foundation created',
    description: 'Bitcoin Foundation created',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2013 3 15 1': {
    name: 'Google Glass released',
    description: 'AR/VR development era started',
    picture: TimeIcon,
    updateGameData: data => {
      data.projects_unlocked_platforms.push('VR');
    }
  },
  '2017 0 1 1': {
    name: 'Cryptocurrency market boom',
    description: 'Cryptocurrency market boom',
    picture: TimeIcon,
    updateGameData: data => {
      alert(current_tick);
      return data;
    }
  },
  '2018 1 1 1': {
    name: 'Cryptocurrency market low',
    description: 'Cryptocurrency market low',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  },
  '2019 0 1 1': {
    name: 'AR/VR boom',
    description: 'AR/VR boom',
    picture: TimeIcon,
    updateGameData: data => {
      return data;
    }
  }
};
