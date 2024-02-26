import Top_image from '../assets/Top_image.png';
import Banner_1 from '../assets/Banner_1.png'
import checkbox from '../assets/checkbox.svg'
import './LandingBanner.css'

function LandingBanner() {
  return (
    <div className="App">
      <header className="landing-page-header">
        <img className="top-image" src={Top_image} />
      </header>
      <div></div>
      <img className="landing-banner" src={Banner_1}/>
      <div className="landing-banner-container">
        Masters in Computer Science
      </div>
      <div className="list">
        <div className="list-object">
          <img className="checkbox" src={checkbox} />
          <div className='list-text'>No IELTS or GRE* required</div>
        </div>
        <div className="list-object">
          <img className="checkbox" src={checkbox} />
          <div className='list-text'>3 year work Visa</div>
        </div>
        <div className="list-object">
          <img className="checkbox" src={checkbox} />
          <div className='list-text'>92% of Leap’s students get admits</div>
        </div>
      </div>
    </div>
  );
}

export default LandingBanner;