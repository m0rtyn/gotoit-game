export const roles = {
  design: {
    name: 'Design',
    profession_name: 'Designer',
    description: 'Design'
  },
  program: {
    name: 'Programming',
    profession_name: 'Programmer',
    description: 'Programming'
  },
  manage: {
    name: 'Management',
    profession_name: 'Manager',
    description: 'Management'
  }
};

export const workers_bonus_items = {
  design: {
    exp: {
      name: 'Sketchbook',
      money: 500,
      bonus: 10,
      description: 'add 10% EXP'
    },
    flat: {
      name: 'Tablet',
      money: 2500,
      bonus: 1,
      description: 'add 10 to skill'
    },
    percent: {
      name: '4K Monitor',
      money: 10000,
      bonus: 10,
      description: 'add 10% to skill'
    }
  },
  program: {
    exp: { name: 'IDE', money: 500, bonus: 10, description: 'add 10% EXP' },
    flat: {
      name: 'Laptop',
      money: 2500,
      bonus: 1,
      description: 'add 10 to skill'
    },
    percent: {
      name: 'CI Server',
      money: 10000,
      bonus: 10,
      description: 'add 10% to skill'
    }
  },
  manage: {
    exp: { name: 'Phone', money: 500, bonus: 10, description: 'add 10% EXP' },
    flat: {
      name: 'Bug tracker',
      money: 2500,
      bonus: 1,
      description: 'add 10 to skill'
    },
    percent: {
      name: 'ERP System',
      money: 10000,
      bonus: 10,
      description: 'add 10% to skill'
    }
  }
};

export const worker_character_types = [
  {
    name: 'Normal',
    description: 'Balanced character without pronounced abilities'
  },
  {
    name: 'Modest',
    description: 'Rarely requires a pay raise, but is slower to learn'
  },
  {
    name: 'Workaholic',
    description:
      'Spends more time on work, but more often requires an increase in earnings'
  },
  {
    name: 'Wonk',
    description:
      'Likes to learn, but is more often distracted by extraneous things'
  },
  {
    name: 'Gifted',
    description: 'High learning rate, but does not like to study'
  }
];

export const resume_will_expire_after = 24 * 7 * 2;
