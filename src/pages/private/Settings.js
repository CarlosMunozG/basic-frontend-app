import React from 'react';
import withAuth from '../../components/withAuth.js';
import GoBackButton from '../../components/GoBackButton.js';
import LinkText from '../../components/LinkText.js';


function Settings(props) {
  return (
    <section className='settings'>
      <header>
        <GoBackButton />
        <h1>Settings</h1>
      </header>
      <section>
        <LinkText
          addRoute='/settings/profile'
          title='Profile'
          info='View your personal info'
        />
        <LinkText
          addRoute='/settings/my-places'
          title='My Places'
          info='Places you created'
        />
        <LinkText
          addRoute=''
          title='My opinions'
          info='Opinions you gave'
        />
        <button className='button-mini logout icon-shadow' onClick={props.logout}>Logout</button>
      </section>
    </section>
  )
}

export default withAuth(Settings);
