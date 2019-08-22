import React from 'react'

const LinkText2 = props => {
  return (
    <article className={`oposite ${props.class}`}>
      <div>
        <h3>{props.title}</h3>
        <p>{props.info}</p>
      </div>
    </article>
  )
}

export default LinkText2
