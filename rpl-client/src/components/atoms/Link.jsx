import React from 'react'

const Link = (props) => {
  return (
    <a className="font-bold text-[18px]" href={props.link}>{props.name}</a>
  )
}

export default Link