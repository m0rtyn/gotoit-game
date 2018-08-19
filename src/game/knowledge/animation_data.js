import { colors } from './colors';

export const genAnimationData = (name, from, to, count, isBug) => {
  let data = colors[name];
  let color = isBug ? data.colorBug : data.colorCompleted;
  return { size: '20px', color: color, from: from, to: to, count: count };
};
