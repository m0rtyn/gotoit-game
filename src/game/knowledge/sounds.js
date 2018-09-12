import default_click from "../../assets/sounds/button_click.mp3";
import fast_flat_click from "../../assets/sounds/fast-flat-click.wav";
import click2 from "../../assets/sounds/click2.wav";
import bell from "../../assets/sounds/bell.wav";
import pop from "../../assets/sounds/pop.wav";
import alarm1 from "../../assets/sounds/alarm1.mp3";
import fx_coins from "../../assets/sounds/fx-coins.wav";
import coins_slide from "../../assets/sounds/coins_slide.wav";
import success from "../../assets/sounds/success2.wav";
import fail from "../../assets/sounds/fail.wav";
import steps_and_door from "../../assets/sounds/steps-and-door.wav";

export const sounds = {
    default_click: default_click, //кнопки
    icon_click: fast_flat_click, //Клик по иконке (изменение скорости, закрытия, навыка и пр.)
    tab_click: click2,
    new_message: bell,
    bubble_appear: null,
    bubble_burst: pop,
    new_day_alarm: alarm1,
    charge_money: fx_coins,
    earn_money: coins_slide,
    finish_project: success,
    fail_project: fail,
    dismissal: steps_and_door
};
