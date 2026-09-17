// App.jsx
import { useState, useEffect, useRef } from 'react'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Schedule from './components/Schedule'
import Venue from './components/Venue'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ConferenceCommittee from './committee/ConferenceCommittee'
import NationalCommittee from './committee/NationalCommittee'
import InternationalCommittee from './committee/InternationalCommittee'
import PaymentDetails from './Payment/PaymentDetails'
import Guidelines from './components/guidlines'
import SubmitPaper from './components/SubmitPaper'

const SUB_PAGE_MAP = {
  'conference-committee': 'conference',
  'national-committee': 'national',
  'international-committee': 'international',
  'registration': 'payment',
  'registration-fees': 'payment-fees',
  'submit-paper': 'submit-paper',
  'guidelines': 'guidelines',
}

const NAVBAR_HEIGHT = 140

export default function App() {
  const [page, setPage] = useState(null)
  const scrollTarget = useRef(null)

  useEffect(() => {
    if (page === null && scrollTarget.current) {
      const timer = setTimeout(() => {
        const el = document.getElementById(scrollTarget.current)
        if (el) {
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - NAVBAR_HEIGHT
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
        scrollTarget.current = null
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [page])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setPage(null)
    const el = document.getElementById(id)
    if (el) {
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - NAVBAR_HEIGHT
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNavFromSubPage = (e, id) => {
    e.preventDefault()
    scrollTarget.current = id
    setPage(null)
  }

  const handleSubPage = (pageId) => {
    const mappedPage = SUB_PAGE_MAP[pageId]
    if (mappedPage !== undefined) {
      setPage(mappedPage)
    }
  }

  if (page === 'conference') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <ConferenceCommittee />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }
  if (page === 'national') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <NationalCommittee />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }
  if (page === 'international') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <InternationalCommittee />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }
  // key={page} forces full remount so scroll-to-top fires and it feels like a new page
  if (page === 'payment' || page === 'payment-fees') {
    const section = page === 'payment-fees' ? 'fees' : null
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <PaymentDetails key={page} section={section} />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }
  if (page === 'submit-paper') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <SubmitPaper />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }
  if (page === 'guidelines') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} />
        <Guidelines />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <ScrollProgress />
      <Navbar onNavClick={handleNavClick} onSubPage={handleSubPage} activePage={null} />
      <main>
        <Hero onNavClick={handleNavClick} onSubPage={handleSubPage} />
        <About />
        <Tracks />
        <Schedule />
        <Venue />
        <Contact onNavClick={handleNavClick} />
      </main>
      <Footer onNavClick={handleNavClick} />
      <BackToTop />
    </>
  )
}
