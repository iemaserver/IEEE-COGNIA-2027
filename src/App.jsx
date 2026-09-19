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

const PAGE_PATHS = {
  conference: '/conference-committee',
  national: '/national-committee',
  international: '/international-committee',
  payment: '/registration',
  'payment-fees': '/registration-fees',
  'submit-paper': '/submit-paper',
  guidelines: '/guidelines',
}

const PATH_PAGE_MAP = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([pageName, path]) => [path, pageName])
)

const SITE_URL = 'https://cognia.uem.edu.in'

const NAVBAR_HEIGHT = 140
const SUBMIT_PAPER_PAGE = 'submit-paper'
const SUBMIT_PAPER_NAV_SOURCES = new Set(['call-for-papers', 'submit-paper'])

function getInitialNavigationState() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  const params = new URLSearchParams(window.location.search)

  // Preserve previously shared submit-paper links while moving them to the
  // permanent URL used by the current routing scheme.
  if (path === '/' && params.get('page') === SUBMIT_PAPER_PAGE) {
    const navSource = params.get('nav')
    const nextNavSource = SUBMIT_PAPER_NAV_SOURCES.has(navSource) ? navSource : null
    window.history.replaceState({ cogniaNavSource: nextNavSource }, '', PAGE_PATHS[SUBMIT_PAPER_PAGE])
    return { page: SUBMIT_PAPER_PAGE, activeNavSource: nextNavSource }
  }

  const page = PATH_PAGE_MAP[path] ?? null
  const navSource = window.history.state?.cogniaNavSource ?? null

  return {
    page,
    activeNavSource: page === SUBMIT_PAPER_PAGE && SUBMIT_PAPER_NAV_SOURCES.has(navSource)
      ? navSource
      : null,
  }
}

const PAGE_SEO = {
  home: {
    title: 'IEEE COGNIA 2027 | International Conference on Cognitive AI, Data Science & Intelligent Computing',
    description: 'IEEE COGNIA 2027 is an international conference on Cognitive AI, Data Science, Embedded Systems, Electronics and Intelligent Computing, held on 28–29 August 2027 at UEM, Kolkata.',
  },
  conference: { title: 'IEEE COGNIA 2027 | Conference Organisers', description: 'Meet the conference organisers for IEEE COGNIA 2027.' },
  national: { title: 'IEEE COGNIA 2027 | National Advisors', description: 'Meet the national advisors for IEEE COGNIA 2027.' },
  international: { title: 'IEEE COGNIA 2027 | International Advisors', description: 'Meet the international advisors for IEEE COGNIA 2027.' },
  payment: { title: 'IEEE COGNIA 2027 | Registration Details', description: 'Registration details and fees for IEEE COGNIA 2027.' },
  'payment-fees': { title: 'IEEE COGNIA 2027 | Registration Fees', description: 'Registration fee structure for IEEE COGNIA 2027.' },
  'submit-paper': { title: 'IEEE COGNIA 2027 | Paper Submission', description: 'Paper submission information for IEEE COGNIA 2027.' },
  guidelines: { title: 'IEEE COGNIA 2027 | Paper Submission Guidelines', description: 'Paper submission guidelines and important dates for IEEE COGNIA 2027.' },
}

export default function App() {
  const [initialNavigationState] = useState(getInitialNavigationState)
  const [page, setPage] = useState(initialNavigationState.page)
  const [activeNavSource, setActiveNavSource] = useState(initialNavigationState.activeNavSource)
  const scrollTarget = useRef(null)

  useEffect(() => {
    const seo = PAGE_SEO[page || 'home']
    const canonicalUrl = `${SITE_URL}${PAGE_PATHS[page] || '/'}`
    document.title = seo.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', seo.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', seo.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', seo.description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', seo.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', seo.description)
  }, [page])

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/'
      const nextPage = PATH_PAGE_MAP[path] ?? null
      const navSource = window.history.state?.cogniaNavSource ?? null
      setPage(nextPage)
      setActiveNavSource(
        nextPage === SUBMIT_PAPER_PAGE && SUBMIT_PAPER_NAV_SOURCES.has(navSource)
          ? navSource
          : null
      )
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

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
    setActiveNavSource(null)
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
    window.history.pushState({ cogniaNavSource: null }, '', '/')
    setActiveNavSource(null)
    scrollTarget.current = id
    setPage(null)
  }

  const handleSubPage = (pageId, navSource = null) => {
    const mappedPage = SUB_PAGE_MAP[pageId]
    if (mappedPage !== undefined) {
      const nextNavSource = mappedPage === SUBMIT_PAPER_PAGE && SUBMIT_PAPER_NAV_SOURCES.has(navSource)
        ? navSource
        : null
      window.history.pushState(
        { cogniaNavSource: nextNavSource },
        '',
        PAGE_PATHS[mappedPage]
      )
      setActiveNavSource(nextNavSource)
      setPage(mappedPage)
    }
  }

  if (page === 'conference') {
    return (
      <>
        <ScrollProgress />
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
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
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
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
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
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
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
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
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
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
        <Navbar onNavClick={handleNavFromSubPage} onSubPage={handleSubPage} activePage={page} activeNavSource={activeNavSource} />
        <Guidelines />
        <Footer onNavClick={handleNavFromSubPage} />
        <BackToTop />
      </>
    )
  }

  return (
    <>
      <ScrollProgress />
      <Navbar onNavClick={handleNavClick} onSubPage={handleSubPage} activePage={null} activeNavSource={activeNavSource} />
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
