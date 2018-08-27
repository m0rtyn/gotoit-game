import { colors } from './colors';

export const project_platforms = {
  crossplatform: {
    name: 'Cross-platform',
    description: 'Cross-platform applications should be balanced.'
  },
  mobile: {
    name: 'Mobile',
    description: 'For Mobile applications, design is important.'
  },
  desktop: {
    name: 'Desktop',
    description: 'For Desktop applications, programming is important.'
  },
  browser: {
    name: 'Browser',
    description: 'For Browser applications, management is important.'
  },
  VR: {
    name: 'VR',
    description: 'Virtual Reality applications should be balanced.'
  }
};

export const project_kinds = {
  application: {
    name: 'Application',
    description: 'General Applications should be balanced.'
  },
  game: {
    name: 'Game',
    description:
      'For Games, design is important, but do not forget about programming.'
  },
  site: {
    name: 'Site',
    description:
      'For Sites, design is important, but do not forget about management.'
  },
  editor: {
    name: 'Editor',
    description:
      'For Editors, programming is important, but do not forget about design.'
  },
  magazine: {
    name: 'Magazine',
    description:
      'For Magazines, management is important, but do not forget about design.'
  },
  service: {
    name: 'Service',
    description:
      'For Services, management is important, but do not forget about programming.'
  },
  database: {
    name: 'Database',
    description:
      'For Databases, programming is important, but do not forget about management.'
  }
};

export const project_sizes = {
  0: { name: 'Training', alone_name: 'Training', agency_min: 0, agency_max: 0 },
  1: { name: 'Parts for', alone_name: 'Part', agency_min: 0, agency_max: 500 },
  2: {
    name: 'Module for',
    alone_name: 'Module',
    agency_min: 50,
    agency_max: 1000
  },
  3: {
    name: 'The',
    alone_name: 'Application',
    agency_min: 100,
    agency_max: 2500
  },
  4: {
    name: 'Big',
    alone_name: 'Big Deal',
    agency_min: 1000,
    agency_max: 10000
  },
  5: { name: 'Custom', alone_name: 'Custom', agency_min: 0, agency_max: 0 },
  6: {
    name: 'Hackathon',
    alone_name: 'Hackathon',
    agency_min: 0,
    agency_max: 0
  }
};

export const project_bars = {
  design_tasks: {
    id: 'design_tasks',
    color: colors.design.tasks
  },
  design_bugs: {
    id: 'design_bugs',
    color: colors.design.colorBug
  },
  design_completed: {
    id: 'design_completed',
    color: colors.design.colorCompleted
  },
  program_tasks: {
    id: 'program_tasks',
    color: colors.program.tasks
  },
  program_bugs: {
    id: 'program_bugs',
    color: colors.program.colorBug
  },
  program_completed: {
    id: 'program_completed',
    color: colors.program.colorCompleted
  },
  manage_tasks: {
    id: 'manage_tasks',
    color: colors.manage.tasks
  },
  manage_bugs: {
    id: 'manage_bugs',
    color: colors.manage.colorBug
  },
  manage_completed: {
    id: 'manage_completed',
    color: colors.manage.colorCompleted
  }
};

export const project_offer_will_expire_after = 24 * 7 * 4;
