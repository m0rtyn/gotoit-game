import _ from 'lodash';

const bodySVG = require.context(
  '../../assets/images/man_asset/00_body/',
  true,
  /^\.\/.*\.svg$/
);
const eyesSVG = require.context(
  '../../assets/images/man_asset/01_eyes/',
  true,
  /^\.\/.*\.svg$/
);
const eyebrowsSVG = require.context(
  '../../assets/images/man_asset/02_eyebrows/',
  true,
  /^\.\/.*\.svg$/
);
const nosesSVG = require.context(
  '../../assets/images/man_asset/03_nose/',
  true,
  /^\.\/.*\.svg$/
);
const mouthesSVG = require.context(
  '../../assets/images/man_asset/04_mouth/',
  true,
  /^\.\/.*\.svg$/
);
const beardsSVG = require.context(
  '../../assets/images/man_asset/05_beard/',
  true,
  /^\.\/.*\.svg$/
);
const accessoriesSVG = require.context(
  '../../assets/images/man_asset/06_accessories/',
  true,
  /^\.\/.*\.svg$/
);
const clothesSVG = require.context(
  '../../assets/images/man_asset/07_clothes/',
  true,
  /^\.\/.*\.svg$/
);
const hairSVG = require.context(
  '../../assets/images/man_asset/08_hair/',
  true,
  /^\.\/.*\.svg$/
);
export const male_avatar = {
  body: ['body_dark_skin', 'body_light_skin', 'body_medium_skin'],
  eyes: ['eyes_01', 'eyes_02', 'eyes_03'],
  eyebrows: {
    black: ['eyebrows_01_black', 'eyebrows_02_black', 'eyebrows_03_black'],
    brown: ['eyebrows_01_brown', 'eyebrows_02_brown', 'eyebrows_03_brown'],
    red: ['eyebrows_01_red', 'eyebrows_02_red', 'eyebrows_03_red'],
    blonde: ['eyebrows_01_blonde', 'eyebrows_02_blonde', 'eyebrows_03_blonde']
  },
  nose: ['nose_01', 'nose_02', 'nose_03'],
  mouth: ['mouth_01', 'mouth_02', 'mouth_03'],
  beard: {
    black: ['beard_01_black', 'beard_02_black', 'beard_03_black'],
    brown: ['beard_01_brown', 'beard_02_brown', 'beard_03_brown'],
    red: ['beard_01_red', 'beard_02_red', 'beard_03_red'],
    blonde: ['beard_01_blonde', 'beard_02_blonde', 'beard_03_blonde']
  },
  accessories: ['access_01', 'access_02'],
  clothes: ['clothes_01', 'clothes_02', 'clothes_03'],
  hair: {
    black: ['hair_01_black', 'hair_02_black', 'hair_03_black, hair_04_black'],
    brown: ['hair_01_brown', 'hair_02_brown', 'hair_03_brown, hair_04_brown'],
    red: ['hair_01_red', 'hair_02_red', 'hair_03_red, hair_04_red'],
    blonde: [
      'hair_01_blonde',
      'hair_02_blonde',
      'hair_03_blonde',
      'hair_04_blonde'
    ]
  }
};

export const generateMaleAvatar = () => {
  let hair_color = _.sample(['black', 'red', 'brown']);
  let have_beard = Boolean(Math.round(Math.random()));
  let have_accessories = Boolean(Math.round(Math.random()));

  return {
    body: bodySVG(`./${_.sample(male_avatar.body)}.svg`),
    eyes: eyesSVG(`./${_.sample(male_avatar.eyes)}.svg`),
    eyebrows: eyebrowsSVG(
      `./${_.sample(male_avatar.eyebrows[hair_color])}.svg`
    ),
    nose: nosesSVG(`./${_.sample(male_avatar.nose)}.svg`),
    mouth: mouthesSVG(`./${_.sample(male_avatar.mouth)}.svg`),
    beard: have_beard
      ? beardsSVG(`./${_.sample(male_avatar.beard[hair_color])}.svg`)
      : null,
    accessories: have_accessories
      ? accessoriesSVG(`./${_.sample(male_avatar.accessories)}.svg`)
      : null,
    clothes: clothesSVG(`./${_.sample(male_avatar.clothes)}.svg`),
    hair: hairSVG(`./${_.sample(male_avatar.hair[hair_color])}.svg`)
  };
};
