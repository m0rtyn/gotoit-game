import React from 'react'
import '../assets/svg/svg-sprite.svg'

const Icon = (props) => (
  <svg className={`icon icon-${props.name}`}>
    <use xlinkHref={`#icon_${props.name}`} />
  </svg>
)

export default Icon