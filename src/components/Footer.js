import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow me{' '}
      {/* <a href="https://instagram.com/ooooh_h/">@ooooh_h</a> */}
    </h2>
    <br/>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted by{' '}
          {/* <a href="https://thriveweb.com.au/">Thrive</a>. */}
          <a href="#">Hyunjee</a>
        </span>
      </div>
    </footer>
  </div>
)
