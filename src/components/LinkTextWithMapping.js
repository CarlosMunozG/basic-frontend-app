import React from 'react'

const LinkTextWithMapping = props => {
  const array = props.array;
  return (
    <article className={`oposite ${props.class}`}>
      <div>
        <h3>{props.title}</h3>
        {array.map(item => {
          return(
            <p className='line-text'>{item} · </p>
          )
        })}
      </div>
    </article>
  )
}

export default LinkTextWithMapping
