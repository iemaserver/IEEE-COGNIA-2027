import useScrollReveal from '../hooks/useScrollReveal'
import Background3D from './Background3D' 

export default function Venue() {
  useScrollReveal()

  return (
    <section id="venue" className="section section-alt">
      <Background3D variant="venue" />
      <div className="container">
        <div className="section-header center reveal">
          <div className="section-label"><span className="line" /> Conference Venue <span className="line" /></div>
          <h2 className="section-title">University of Engineering & Management (UEM), <span className="red">Kolkata</span></h2>
        </div>
        
        {/* Side-by-side image links */}
        <div className="venue-gallery reveal">
          <a 
            href="https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5618401,88.4861732,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5618401!4d88.4887481!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDgxNi4wIKXMDSoASAFQAw%3D3D" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="venue-image-wrapper"
          >
            <img src={`${import.meta.env.BASE_URL}uem_college.jpg`} alt="University of Engineering & Management campus in Kolkata" />
          </a>
          <a 
            href="https://iem.edu.in/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="venue-image-wrapper"
          >
            <img src={`${import.meta.env.BASE_URL}iem.jpg`} alt="Institute of Engineering and Management campus" />
          </a>
        </div>

        {/* Centered buttons */}
        <div className="venue-actions reveal reveal-delay-2">
            <a
            href="https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5618401,88.4861732,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5618401!4d88.4887481!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDgxNi4wIKXMDSoASAFQAw%3D3D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-venue btn-venue-primary"
            >
            <span className="iconify" data-icon="lucide:navigation" />
            View Location
            </a>
            <a
            href="https://iem.edu.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-venue btn-venue-secondary"
            >
            <span className="iconify" data-icon="lucide:external-link" />
            Explore Campus
            </a>
        </div>
      </div>
    </section>
  )
}