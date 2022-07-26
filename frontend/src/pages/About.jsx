import React from 'react'
import './css/About.css';

function About() {
  return (
    <> 
      <h1>About</h1>
        <h2>About this site</h2>
        <p>This site was orginally created as a testing ground for my react and backend skills.
          It is still fully intended to continue to be worked on however, and there should be more updates in the future, although it will be 
          sporadic. 
        </p> 
        
        <p>
          [Side note, I've done my best for the backend support, but I'm not quite a security expert, so I would avoid using extremely sensitive information on the site (or anywhere on the net, really).]
          I personally promise I will not share your data, and I really don't care about looking myself, but it's not fort knox here.
        </p>
        <h2>Contact Me</h2>
        <p>If you find any issues on the site, or have business inquiries please fill out the form below. If you would like a response please provide an email to the form.</p>
        <section className='commentForm'>
        <form action='mailto:gibmac@outlook.com'
          method="POST"
          enctype="multipart/form-data"
          name="EmailForm">
          <label>Name:</label>
          <input type="text" />
          <label>Email: (Optional)</label>
          <input type="email" />
          <label>Message:</label>
          <textarea name='message' />
          <input type='submit' value='submit' />
        </form>
      </section>
    </>
  )
}

export default About