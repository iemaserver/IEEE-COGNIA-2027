import useScrollReveal from '../hooks/useScrollReveal'
import Background3D from './Background3D'

const QUICK_LINKS = [
  { id: 'home', icon: 'lucide:home', label: 'Home' },
  { id: 'about', icon: 'lucide:info', label: 'About' },
  { id: 'tracks', icon: 'lucide:layers', label: 'Tracks' },
  { id: 'venue', icon: 'lucide:map-pin', label: 'Venue' },
  { id: 'contact', icon: 'lucide:phone', label: 'Contact' },
]

export default function Contact({ onNavClick }) {
  useScrollReveal()

  return (
    <section id="contact" className="section">
      <Background3D variant="contact" />
      <div className="container">
        <div className="section-header center reveal">
          <div className="section-label"><span className="line" /> Need Assistance <span className="line" /></div>
          <h2 className="section-title">Contact <span className="red">Us</span></h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <h3>IEEE COGNIA 2027</h3>
            <p className="contact-subtitle">University of Engineering & Management (UEM), Kolkata, West Bengal, India</p>

            <div className="contact-item">
              <div className="contact-icon"><span className="iconify" data-icon="lucide:mail" /></div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value"><a href="mailto:cognia@iem.edu.in">cognia@iem.edu.in</a></div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><span className="iconify" data-icon="lucide:phone" /></div>
              <div>
                <div className="contact-label">Phone Support</div>
                <div className="contact-value">
                  <a href="tel:+919051209545">+91 9051209545</a>
                </div>
              </div>
            </div>

            <div className="contact-note">
              For conference-related queries, registration assistance, paper submission support and general information, kindly contact us via Phone or Email.
            </div>
          </div>

          <div className="contact-card-3d reveal reveal-delay-2">
            <h4>IEEE COGNIA 2027</h4>
            <p>IEEE COGNIA 2027 is the flagship conference of the IEEE India Council, bringing together researchers, academicians, industry experts and innovators from across the globe.</p>
            <div className="quick-links">
              {QUICK_LINKS.map((link) => (
                <a key={link.id} href={`#${link.id}`} className="quick-link" onClick={(e) => onNavClick(e, link.id)}>
                  <span className="iconify" data-icon={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}