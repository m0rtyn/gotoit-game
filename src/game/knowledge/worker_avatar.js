import _ from 'lodash';

import body_dark_skin from '../../assets/images/man_asset/00_body/body_dark_skin.svg';
import body_light_skin from '../../assets/images/man_asset/00_body/body_light_skin.svg';
import body_medium_skin from '../../assets/images/man_asset/00_body/body_medium_skin.svg';

import eyes_01 from '../../assets/images/man_asset/01_eyes/eyes_01.svg';
import eyes_02 from '../../assets/images/man_asset/01_eyes/eyes_02.svg';
import eyes_03 from '../../assets/images/man_asset/01_eyes/eyes_03.svg';

import eyebrows_01_black from '../../assets/images/man_asset/02_eyebrows/eyebrows_01_black.svg';
import eyebrows_01_brown from '../../assets/images/man_asset/02_eyebrows/eyebrows_01_brown.svg';
import eyebrows_01_red from '../../assets/images/man_asset/02_eyebrows/eyebrows_01_red.svg';

import eyebrows_02_black from '../../assets/images/man_asset/02_eyebrows/eyebrows_02_black.svg';
import eyebrows_02_brown from '../../assets/images/man_asset/02_eyebrows/eyebrows_02_brown.svg';
import eyebrows_02_red from '../../assets/images/man_asset/02_eyebrows/eyebrows_02_red.svg';

import eyebrows_03_black from '../../assets/images/man_asset/02_eyebrows/eyebrows_03_black.svg';
import eyebrows_03_brown from '../../assets/images/man_asset/02_eyebrows/eyebrows_03_brown.svg';
import eyebrows_03_red from '../../assets/images/man_asset/02_eyebrows/eyebrows_03_red.svg';

import nose_01 from '../../assets/images/man_asset/03_nose/nose_01.svg';
import nose_02 from '../../assets/images/man_asset/03_nose/nose_02.svg';
import nose_03 from '../../assets/images/man_asset/03_nose/nose_03.svg';

import mouth_01 from '../../assets/images/man_asset/04_mouth/mouth_01.svg';
import mouth_02 from '../../assets/images/man_asset/04_mouth/mouth_02.svg';
import mouth_03 from '../../assets/images/man_asset/04_mouth/mouth_03.svg';

import beard_01_black from '../../assets/images/man_asset/05_beard/beard_01_black.svg';
import beard_01_brown from '../../assets/images/man_asset/05_beard/beard_01_brown.svg';
import beard_01_red from '../../assets/images/man_asset/05_beard/beard_01_red.svg';

import beard_02_black from '../../assets/images/man_asset/05_beard/beard_02_black.svg';
import beard_02_brown from '../../assets/images/man_asset/05_beard/beard_02_brown.svg';
import beard_02_red from '../../assets/images/man_asset/05_beard/beard_02_red.svg';

import beard_03_black from '../../assets/images/man_asset/05_beard/beard_03_black.svg';
import beard_03_brown from '../../assets/images/man_asset/05_beard/beard_03_brown.svg';
import beard_03_red from '../../assets/images/man_asset/05_beard/beard_03_red.svg';

import access_01 from '../../assets/images/man_asset/06_accessories/access_01.svg';
import access_02 from '../../assets/images/man_asset/06_accessories/access_02.svg';

import clothes_01 from '../../assets/images/man_asset/07_clothes/clothes_01.svg';
import clothes_02 from '../../assets/images/man_asset/07_clothes/clothes_02.svg';
import clothes_03 from '../../assets/images/man_asset/07_clothes/clothes_03.svg';

import hair_01_black from '../../assets/images/man_asset/08_hair/hair_01_black.svg';
import hair_01_brown from '../../assets/images/man_asset/08_hair/hair_01_brown.svg';
import hair_01_red from '../../assets/images/man_asset/08_hair/hair_01_red.svg';

import hair_02_black from '../../assets/images/man_asset/08_hair/hair_02_black.svg';
import hair_02_brown from '../../assets/images/man_asset/08_hair/hair_02_brown.svg';
import hair_02_red from '../../assets/images/man_asset/08_hair/hair_02_red.svg';

import hair_03_black from '../../assets/images/man_asset/08_hair/hair_03_black.svg';
import hair_03_brown from '../../assets/images/man_asset/08_hair/hair_03_brown.svg';
import hair_03_red from '../../assets/images/man_asset/08_hair/hair_03_red.svg';

export const male_avatar = {
  body: [body_dark_skin, body_light_skin, body_medium_skin],
  eyes: [eyes_01, eyes_02, eyes_03],
  eyebrows: {
    black: [eyebrows_01_black, eyebrows_02_black, eyebrows_03_black],
    brown: [eyebrows_01_brown, eyebrows_02_brown, eyebrows_03_brown],
    red: [eyebrows_01_red, eyebrows_02_red, eyebrows_03_red]
  },
  nose: [nose_01, nose_02, nose_03],
  mouth: [mouth_01, mouth_02, mouth_03],
  beard: {
    black: [beard_01_black, beard_02_black, beard_03_black],
    brown: [beard_01_brown, beard_02_brown, beard_03_brown],
    red: [beard_01_red, beard_02_red, beard_03_red]
  },
  accessories: [access_01, access_02],
  clothes: [clothes_01, clothes_02, clothes_03],
  hair: {
    black: [hair_01_black, hair_02_black, hair_03_black],
    brown: [hair_01_brown, hair_02_brown, hair_03_brown],
    red: [hair_01_red, hair_02_red, hair_03_red]
  }
};

export const generateMaleAvatar = () => {
  let hair_color = _.sample(['black', 'red', 'brown']);
  let have_beard = Boolean(Math.round(Math.random()));
  let have_accessories = Boolean(Math.round(Math.random()));
  return {
    body: _.sample(male_avatar.body),
    eyes: _.sample(male_avatar.eyes),
    eyebrows: _.sample(male_avatar.eyebrows[hair_color]),
    nose: _.sample(male_avatar.nose),
    mouth: _.sample(male_avatar.mouth),
    beard: have_beard ? _.sample(male_avatar.beard[hair_color]) : null,
    accessories: have_accessories ? _.sample(male_avatar.accessories) : null,
    clothes: _.sample(male_avatar.clothes),
    hair: _.sample(male_avatar.hair[hair_color])
  };
};
