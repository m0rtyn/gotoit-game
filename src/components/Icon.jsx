import React from "react";
// import '../assets/svg/svg-sprite.svg'
//TODO: error on deploy "Error in ./src/components/Icon.jsx > Module not found: ../assets/svg/svg-sprite.svg in /app/src/components"

const Icon = props => (
    <svg className={`icon icon-${props.name}`}>
        <use xlinkHref={`#icon_${props.name}`} />
    </svg>
);

export default Icon;
