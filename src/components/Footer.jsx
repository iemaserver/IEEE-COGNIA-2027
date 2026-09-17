const CONTACT_INFO = [
  { icon: 'lucide:map-pin', text: 'University of Engineering & Management (UEM), Kolkata' },
  { icon: 'lucide:mail', text: 'cognia@iem.edu.in' },
  { icon: 'lucide:phone', text: '+91 9051209545' },
]

export default function Footer({ onNavClick }) {
  return (
    <footer className="footer">
      <div className="footer-3d-grid" />
      <div className="footer-grid">
        <div className="footer-brand footer-brand-full">
          <h3>IEEE COGNIA 2027</h3>
          <p>IEEE COGNIA 2027 is the flagship international conference of the Department of Computer Science and Engineering (Data Science), Institute of Engineering &amp; Management (IEM), Kolkata, organized in association with the IEEE Kolkata Section. The conference serves as a premier platform for researchers, academicians, industry leaders, and innovators from across the globe to exchange groundbreaking ideas, present cutting-edge research, foster meaningful collaborations, and shape the future of emerging technologies.</p>
        </div>
        <div className="footer-col">
          <h4>Contact Information</h4>
          {CONTACT_INFO.map((item, i) => (
            <a 
              key={i} 
              href={
                item.icon === 'lucide:map-pin' 
                  ? 'https://www.google.com/maps/place/University+of+Engineering+%26+Management,+Kolkata+(UEM)/@22.5618401,88.4861732,17z/data=!3m1!4b1!4m6!3m5!1s0x3a020b267a3cdc13:0xb3b21d652126f40!8m2!3d22.5618401!4d88.4887481!16s%2Fg%2F11c4pg5gwf?entry=ttu&g_ep=EgoyMDI2MDgxNi4wIKXMDSoASAFQAw%3D3D'
                  : item.icon === 'lucide:mail' 
                  ? `mailto:${item.text}`
                  : item.icon === 'lucide:phone'
                  ? 'tel:+919051209545'
                  : '#'
              } 
              target={item.icon === 'lucide:map-pin' ? '_blank' : undefined} 
              rel="noopener noreferrer"
            >
              <span className="iconify" data-icon={item.icon} style={{ fontSize: 14, verticalAlign: 'middle', marginRight: 4, color: '#FB7185' }} />
              {item.text}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">&copy; 2027 IEEE COGNIA. All Rights Reserved. Hosted by Institute of Engineering &amp; Management (IEM), Kolkata, School of the University of Engineering &amp; Management (UEM), Kolkata.</p>
        <p className="footer-credits">
          Website Designed &amp; Maintained by{' '}
          <a href="https://www.linkedin.com/in/saikat-mohis-764a0a321/" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
            Saikat Mohis
          </a>
          {' & '}
          <a href="https://www.linkedin.com/in/srinjoy-patra-454a41328/" target="_blank" rel="noopener noreferrer" className="footer-credit-link">
            Srinjoy Patra
          </a>
        </p>
      </div>
    </footer>
  )
}