import _ from "lodash";

const bodySVG_man = require.context("../../assets/images/man_asset/00_body/", true, /^\.\/.*\.svg$/);
const eyesSVG_man = require.context("../../assets/images/man_asset/01_eyes/", true, /^\.\/.*\.svg$/);
const eyebrowsSVG_man = require.context("../../assets/images/man_asset/02_eyebrows/", true, /^\.\/.*\.svg$/);
const nosesSVG_man = require.context("../../assets/images/man_asset/03_nose/", true, /^\.\/.*\.svg$/);
const mouthesSVG_man = require.context("../../assets/images/man_asset/04_mouth/", true, /^\.\/.*\.svg$/);
const beardsSVG_man = require.context("../../assets/images/man_asset/05_beard/", true, /^\.\/.*\.svg$/);
const accessoriesSVG_man = require.context("../../assets/images/man_asset/06_accessories/", true, /^\.\/.*\.svg$/);
const clothesSVG_man = require.context("../../assets/images/man_asset/07_clothes/", true, /^\.\/.*\.svg$/);
const hairSVG_man = require.context("../../assets/images/man_asset/08_hair/", true, /^\.\/.*\.svg$/);

const bodySVG_female = require.context("../../assets/images/female_asset/00_body/", true, /^\.\/.*\.svg$/);
const eyesSVG_female = require.context("../../assets/images/female_asset/01_eyes/", true, /^\.\/.*\.svg$/);
const eyebrowsSVG_female = require.context("../../assets/images/female_asset/02_eyebrows/", true, /^\.\/.*\.svg$/);
const nosesSVG_female = require.context("../../assets/images/female_asset/03_nose/", true, /^\.\/.*\.svg$/);
const mouthesSVG_female = require.context("../../assets/images/female_asset/04_mouth/", true, /^\.\/.*\.svg$/);
const accessoriesSVG_female = require.context("../../assets/images/female_asset/05_accessories/", true, /^\.\/.*\.svg$/);
const clothesSVG_female = require.context("../../assets/images/female_asset/07_clothes/", true, /^\.\/.*\.svg$/);
const hairSVG_female = require.context("../../assets/images/female_asset/06_hair/", true, /^\.\/.*\.svg$/);

export const man_asset = {
    body: ["body_dark_skin", "body_light_skin", "body_medium_skin"],
    eyes: ["eyes_01", "eyes_02", "eyes_03"],
    eyebrows: {
        black: ["eyebrows_01_black", "eyebrows_02_black", "eyebrows_03_black"],
        brown: ["eyebrows_01_brown", "eyebrows_02_brown", "eyebrows_03_brown"],
        red: ["eyebrows_01_red", "eyebrows_02_red", "eyebrows_03_red"],
        blonde: ["eyebrows_01_blonde", "eyebrows_02_blonde", "eyebrows_03_blonde"]
    },
    nose: ["nose_01", "nose_02", "nose_03"],
    mouth: ["mouth_01", "mouth_02", "mouth_03"],
    beard: {
        black: ["beard_01_black", "beard_02_black", "beard_03_black"],
        brown: ["beard_01_brown", "beard_02_brown", "beard_03_brown"],
        red: ["beard_01_red", "beard_02_red", "beard_03_red"],
        blonde: ["beard_01_blonde", "beard_02_blonde", "beard_03_blonde"]
    },
    accessories: ["access_01", "access_02"],
    hair: {
        black: ["hair_01_black", "hair_02_black", "hair_03_black", "hair_04_black"],
        brown: ["hair_01_brown", "hair_02_brown", "hair_03_brown", "hair_04_brown"],
        red: ["hair_01_red", "hair_02_red", "hair_03_red", "hair_04_red"],
        blonde: ["hair_01_blonde", "hair_02_blonde", "hair_03_blonde", "hair_04_blonde"]
    },
    clothes: ["clothes_01", "clothes_02", "clothes_03"]
};

export const female_asset = {
    body: ["body_dark_skin", "body_light_skin", "body_medium_skin"],
    eyes: ["eyes04", "eyes05", "eyes06", "eyes07"],
    eyebrows: {
        black: ["eyebrows04_black", "eyebrows05_black", "eyebrows06_black", "eyebrows07_black"],
        brown: ["eyebrows04_brown", "eyebrows05_brown", "eyebrows06_brown", "eyebrows07_brown"],
        red: ["eyebrows04_red", "eyebrows05_red", "eyebrows06_red", "eyebrows07_red"],
        blonde: ["eyebrows04_blonde", "eyebrows05_blonde", "eyebrows06_blonde", "eyebrows07_blonde"]
    },
    nose: ["nose04", "nose05", "nose06", "nose07"],
    mouth: ["mouth04", "mouth05", "mouth06", "mouth07"],
    accessories: ["accessories03", "accessories04", "accessories05", "accessories06", "accessories07", "tattoo01"],
    hair: {
        black: ["hair05_black", "hair06_black", "hair07_black", "hair08_black"],
        brown: ["hair05_brown", "hair06_brown", "hair07_brown", "hair08_brown"],
        red: ["hair05_red", "hair06_red", "hair07_red", "hair08_red"],
        blonde: ["hair05_blonde", "hair06_blonde", "hair07_blonde", "hair08_blonde"]
    },
    clothes: ["clothes04", "clothes05", "clothes06", "clothes07"]
};

export const generateMaleAvatar = () => {
    let hair_color = _.sample(["black", "red", "brown", "blonde"]);
    let have_beard = Boolean(Math.round(Math.random()));
    let have_accessories = Boolean(Math.round(Math.random()));

    return {
        body: bodySVG_man(`./${_.sample(man_asset.body)}.svg`),
        eyes: eyesSVG_man(`./${_.sample(man_asset.eyes)}.svg`),
        eyebrows: eyebrowsSVG_man(`./${_.sample(man_asset.eyebrows[hair_color])}.svg`),
        nose: nosesSVG_man(`./${_.sample(man_asset.nose)}.svg`),
        mouth: mouthesSVG_man(`./${_.sample(man_asset.mouth)}.svg`),
        beard: have_beard ? beardsSVG_man(`./${_.sample(man_asset.beard[hair_color])}.svg`) : null,
        accessories: have_accessories ? accessoriesSVG_man(`./${_.sample(man_asset.accessories)}.svg`) : null,
        hair: hairSVG_man(`./${_.sample(man_asset.hair[hair_color])}.svg`),
        clothes: clothesSVG_man(`./${_.sample(man_asset.clothes)}.svg`)
    };
};

export const generateFemaleAvatar = () => {
    let hair_color = _.sample(["black", "red", "brown", "blonde"]);

    let have_accessories = Boolean(Math.round(Math.random()));

    return {
        body: bodySVG_female(`./${_.sample(female_asset.body)}.svg`),
        eyes: eyesSVG_female(`./${_.sample(female_asset.eyes)}.svg`),
        eyebrows: eyebrowsSVG_female(`./${_.sample(female_asset.eyebrows[hair_color])}.svg`),
        nose: nosesSVG_female(`./${_.sample(female_asset.nose)}.svg`),
        mouth: mouthesSVG_female(`./${_.sample(female_asset.mouth)}.svg`),
        accessories: have_accessories ? accessoriesSVG_female(`./${_.sample(female_asset.accessories)}.svg`) : null,
        hair: hairSVG_female(`./${_.sample(female_asset.hair[hair_color])}.svg`),
        clothes: clothesSVG_female(`./${_.sample(female_asset.clothes)}.svg`)
    };
};
