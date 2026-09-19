// Navbar.jsx
import './navbar.css'
import { useState, useEffect, useRef } from 'react'
import useActiveSection from '../hooks/useActiveSection'

/* ---------------- Data ---------------- */
const LOGOS = [
  { src: `${import.meta.env.BASE_URL}logo2.png`, alt: 'IEM Kolkata' },
  { src: `${import.meta.env.BASE_URL}logo3.png`, alt: 'UEM Kolkata' },
  { src: `${import.meta.env.BASE_URL}logo1.png`, alt: 'IEEE Kolkata Section' },
  { src: `${import.meta.env.BASE_URL}logo4.png`, alt: 'Partner Logo 4' },
  { src: `${import.meta.env.BASE_URL}logo5.png`, alt: 'Partner Logo 5' },
]

const CONTACT = {
  email: 'cognia@iem.edu.in',
  phone: '+91 9051209545',
  phoneHref: 'tel:+91 9051209545',
}

const SOCIALS = [
  { id: 'facebook', label: 'Facebook', href: '#' },
  { id: 'linkedin', label: 'LinkedIn', href: '#' },
]

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  {
    id: 'call-for-papers',
    label: 'Call for Papers',
    dropdown: true,
    children: [
      { id: 'important-dates', label: 'Important Dates', type: 'scroll', target: 'schedule' },
      { id: 'tracks', label: 'Track of the Conference', type: 'scroll', target: 'tracks' },
      { id: 'guidelines', label: 'Guidelines' },
      { id: 'registration-fees', label: 'Registration Fees' },
      { id: 'submit-paper', label: 'Submit Paper' },
    ],
  },
  {
    id: 'organisers',
    label: 'Organisers',
    dropdown: true,
    children: [
      { id: 'conference-committee', label: 'Conference Organisers' },
      { id: 'national-committee', label: 'National Advisors' },
      { id: 'international-committee', label: 'International Advisors' },
    ],
  },
  { id: 'registration', label: 'Registration', subPage: true },
  { id: 'submit-paper', label: 'MICROSOFT CMT', subPage: true },
  { id: 'venue', label: 'Venue' },
  { id: 'contact', label: 'Contact' },
]

const TOP_LEVEL_PAGE_MAP = {
  registration: 'payment',
  'submit-paper': 'submit-paper',
}

const CHILD_PAGE_MAP = {
  'conference-committee': 'conference',
  'national-committee': 'national',
  'international-committee': 'international',
  'registration-fees': 'payment-fees',
  'submit-paper': 'submit-paper',
  guidelines: 'guidelines',
}

/* ---------------- Inline SVG icons ---------------- */
const ICON_PATHS = {
  email:
    'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z',
  phone:
    'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
  facebook:
    'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z',
  linkedin:
    'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
  chevron: 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
}

function Icon({ name, size = 15, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

/* ================= Navbar ================= */
export default function Navbar({ onNavClick, onSubPage, activePage, activeNavSource }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null)
  const dropdownTimeout = useRef(null)

  const sectionIds = ['home', 'about', 'tracks', 'schedule', 'venue', 'contact']
  const active = useActiveSection(sectionIds)
  const isSubPage = !!activePage

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setMobileDropdownOpen(null)
  }, [activePage])

  const close = () => {
    setMenuOpen(false)
    setMobileDropdownOpen(null)
    setDropdownOpen(null)
  }

  const handleDropdownEnter = (id) => {
    clearTimeout(dropdownTimeout.current)
    setDropdownOpen(id)
  }

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(null), 200)
  }

  const handleChildClick = (child, parentId) => {
    close()
    if (child.type === 'scroll') {
      onNavClick({ preventDefault: () => {} }, child.target)
    } else {
      onSubPage(child.id, parentId)
    }
  }

  const handleItemClick = (e, item) => {
    e.preventDefault()
    if (item.subPage) {
      close()
      onSubPage(item.id, item.id)
    } else {
      onNavClick(e, item.id)
      close()
    }
  }

  const isChildActive = (child) => {
    if (child.type === 'scroll') {
      return active === child.target && !isSubPage
    }
    if (child.id === 'submit-paper') {
      return activePage === 'submit-paper' && activeNavSource === 'call-for-papers'
    }
    return CHILD_PAGE_MAP[child.id] === activePage
  }

  const isItemActive = (item) => {
    if (item.dropdown && item.children) {
      if (item.id === 'call-for-papers' && activePage === 'submit-paper') {
        return activeNavSource === item.id
      }
      return item.children.some((c) => isChildActive(c))
    }
    if (item.subPage) {
      if (TOP_LEVEL_PAGE_MAP[item.id] !== activePage) {
        return false
      }
      return activePage !== 'submit-paper' || activeNavSource === item.id
    }
    return active === item.id && !isSubPage
  }

  return (
    <>
      {/* ================= HEADER (3 layers) ================= */}
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>

        {/* ---- LAYER 1: top info strip ---- */}
        <div className="top-info-bar">
          <div className="top-info-inner">
            <div className="top-info-left">
              <a className="top-info-item" href={`mailto:${CONTACT.email}`}>
                <Icon name="email" size={15} />
                <span>{CONTACT.email}</span>
              </a>
              <a className="top-info-item" href={CONTACT.phoneHref}>
                <Icon name="phone" size={15} />
                <span>{CONTACT.phone}</span>
              </a>
            </div>

            <div className="top-info-socials">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  className="top-social-link"
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={s.id} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---- LAYER 2: white logo bar ---- */}
        <div className="logo-bar">
          <div className="logo-bar-inner">

            <a
              href="#home"
              className="site-brand"
              onClick={(e) => handleItemClick(e, { id: 'home' })}
            >
              <span className="brand-text">
                <span className="brand-title">
                  IEEE <span className="brand-accent">COGNIA 2027</span>
                </span>
                <span className="brand-subtitle">
                  <span className="subtitle-line-1">International Conference on Cognitive AI, Data Science,</span>
                  <span className="subtitle-line-2">Embedded Systems, Electronics & Intelligent Computing</span>
                </span>
              </span>
            </a>

            <div className="cmt-acknowledgment">
              <h2 className="cmt-acknowledgment-heading">
                THE MICROSOFT CMT ACKNOWLEDGMENT
              </h2>
              <p>
                The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
              </p>
            </div>

            <div className="partner-logos">
              {LOGOS.map((logo, i) => (
                <div key={i} className="partner-logo">
                  <img src={logo.src} alt={logo.alt} />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ---- LAYER 3: red nav bar ---- */}
        <nav className="main-nav" role="navigation" aria-label="Main navigation">
          <div className="main-nav-inner">

            <div className="nav-links">
              {NAV_ITEMS.map((item) => {
                if (item.dropdown) {
                  const open = dropdownOpen === item.id
                  return (
                    <div
                      key={item.id}
                      className="nav-dropdown"
                      onMouseEnter={() => handleDropdownEnter(item.id)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <a
                        href="#"
                        className={`main-nav-link${isItemActive(item) ? ' active' : ''}`}
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.label}
                        <Icon
                          name="chevron"
                          size={14}
                          className={`nav-arrow${open ? ' rotated' : ''}`}
                        />
                      </a>

                      <div className={`nav-dropdown-menu${open ? ' open' : ''}`}>
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            className={`nav-dropdown-item${isChildActive(child) ? ' active' : ''}`}
                            onClick={() => handleChildClick(child, item.id)}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                }

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`main-nav-link${isItemActive(item) ? ' active' : ''}`}
                    onClick={(e) => handleItemClick(e, item)}
                  >
                    {item.label}
                  </a>
                )
              })}
            </div>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </nav>

      </header>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`mobile-menu-backdrop${menuOpen ? ' open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => {
          if (item.dropdown) {
            const open = mobileDropdownOpen === item.id
            return (
              <div key={item.id} className="mobile-dropdown">
                <button
                  className={`mobile-dropdown-trigger${isItemActive(item) ? ' active' : ''}${open ? ' open' : ''}`}
                  aria-expanded={open}
                  onClick={() =>
                    setMobileDropdownOpen(
                      mobileDropdownOpen === item.id ? null : item.id
                    )
                  }
                >
                  {item.label}
                  <Icon
                    name="chevron"
                    size={18}
                    className={`nav-arrow${open ? ' rotated' : ''}`}
                  />
                </button>

                <div className={`mobile-dropdown-menu${open ? ' open' : ''}`}>
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      className={`mobile-dropdown-item${isChildActive(child) ? ' active' : ''}`}
                      onClick={() => handleChildClick(child, item.id)}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={isItemActive(item) ? 'active' : ''}
              onClick={(e) => handleItemClick(e, item)}
            >
              {item.label}
            </a>
          )
        })}

        <div className="mobile-logos">
          {LOGOS.map((logo, i) => (
            <img key={i} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </>
  )
}
