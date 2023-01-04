import React from 'react'
import '../../style/HomePage.css'
export default function HomePage() {
  return (
    <div className='HomePage'>

      <div className="image-bg">
        <h1>Happily Ever After</h1>
        <p>Welcome to Happily Ever After, the perfect place to plan your dream wedding. We're here to help you every step of the way.
          We know that planning a wedding can be overwhelming, but we're here to take the stress off your shoulders and make it an enjoyable experience.
          So sit back, relax, and let us help you create the wedding of your dreams. We can't wait to be a part of your happily ever after
        </p>

      </div>
      <div className='icons-div'>
        <div className='card'>
          <img src="/images/wedding-date.png" alt="" width="100px" />
          <p>Planning a wedding can be a stressful and time-consuming process, but the website makes it easy to stay organized and on track with a comprehensive todo list.</p>
        </div>
        <div className='card'>
          <img src="/images/camera-change.png" alt="" width="100px" />
          <p>One of the features of the website is the ability for guests to easily share photos from the wedding. This helps to create a shared album that everyone can enjoy.</p>
        </div>
        <div className='card'>
          <img src="/images/wedding-invitation.png" alt="" width="100px" />
          <p>The website provides tools for the bride and groom to send updates and communicate with guests through email. This helps to keep everyone informed.</p>
        </div>
      </div>
    </div>
  )
}
