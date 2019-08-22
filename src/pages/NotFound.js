import React from 'react'
import GoBackButton from '../components/GoBackButton.js';


function NotFound() {
  return (
    <>
    <div className='intro-pos'>
    <GoBackButton className='intro-pos'/>
    </div>
    <section className='error'>
      <div className='message-intro margin-error'>
        <div>
          <h1 className='color-error'>404 - Not found</h1>
          <p className='color-error-text'>It seems we cannot find the page you are looking for...</p>
          <p className='color-error-text'>Have you written the url correctly.</p>
          <h3 className='color-error-text'>Let's try again!</h3>
        </div>
      </div>
    </section>
    </>
  )
}

export default NotFound
