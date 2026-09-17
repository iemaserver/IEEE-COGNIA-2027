// components/guidlines.jsx
import { useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import Background3D from './Background3D'

/* Turns any raw URL inside a string into a clickable <a> tag. */
function linkify(text) {
  const re = /https?:\/\/[^\s]+/g
  const nodes = []
  let lastIndex = 0
  let match

  while ((match = re.exec(text)) !== null) {
    let url = match[0]
    let trailing = ''
    while (/[.,)]$/.test(url)) {
      trailing = url.slice(-1) + trailing
      url = url.slice(0, -1)
    }
    nodes.push(text.slice(lastIndex, match.index))
    nodes.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="guideline-link"
      >
        {url}
      </a>
    )
    if (trailing) nodes.push(trailing)
    lastIndex = match.index + match[0].length
  }
  nodes.push(text.slice(lastIndex))
  return nodes
}

const PAPER_GUIDELINES = [
  {
    icon: 'lucide:shield-check',
    title: 'Submission Originality',
    items: [
      'All submitted manuscripts must feature entirely original, previously unpublished research.',
      'Papers cannot be under concurrent review or consideration at any other conference, journal, or publishing platform.',
      'Submissions are strictly governed by IEEE’s anti-plagiarism regulations.',
      'Authors carry the ultimate responsibility for guaranteeing the authenticity and originality of their content.',
      'Any violation of publication ethics will result in immediate rejection without entering the review phase.',
    ],
  },
  {
    icon: 'lucide:file-text',
    title: 'General Submission Requirements',
    items: [
      'Manuscripts must strictly adhere to the standard two-column IEEE conference layout and be written entirely in English.',
      'The total length, incorporating all figures, tables, and references, must fall between four and six pages.',
      'Submissions consisting exclusively of literature reviews will not be considered.',
      'Any manuscript stretching beyond the six-page limit is subject to immediate rejection.',
      'For precise formatting specifications, refer to the official IEEE conference templates online.',
    ],
  },
  {
    icon: 'lucide:type',
    title: 'Manuscript Preparation Guidelines',
    wide: true,
    items: [
      'Submitted manuscripts must be structured as technical papers. They must represent original, unpublished research that is NOT currently under review for any other conference or journal.',
      'Manuscripts must be a maximum of six pages; single-spaced, double-column, using 10-point font on 8.5×11-inch pages (IEEE conference style), including figures, tables, and references.',
      'The IEEE conference style templates for MS Word and LaTeX, provided by IEEE eXpress Conference Publishing, are available for download. Papers not following the style guidelines may be rejected without review.',
      'Electronic submissions must be a readable PDF file.',
      'Submitted manuscripts undergo mandatory plagiarism screening per IEEE guidelines. Papers violating ethics will be desk-rejected and the authors’ parent organizations informed.',
      'All submitted manuscripts are reviewed by the Program Committee.',
      'Submissions are judged on correctness, originality, technical strength, significance, potential impact, quality of presentation, and relevance to the conference scope.',
      'The author list and order at the time of submission is considered final — no co-authors may be added, removed, or re-ordered after the submission deadline or upon acceptance (no exceptions).',
      'Manuscripts that DO NOT follow these guidelines (size, formatting, and anonymization requirements) will be rejected without review.',
      'Upon acceptance, at least one author must register for the conference and present the paper. Every accepted paper requires separate individual registration other than the author.',
      'Per IEEE policy, authors of every published paper must sign a copyright transfer agreement. Instructions will be shared with authors after acceptance.',
      'All accepted and presented papers will be submitted for inclusion in IEEE Xplore, subject to meeting IEEE Xplore’s scope and quality requirements.',
    ],
  },
  {
    icon: 'lucide:upload-cloud',
    title: 'Upload Instructions',
    items: [
      'Route all submissions exclusively through the Microsoft Conference Management Toolkit (CMT).',
      'Ensure your abstract provides a concise, clear overview of your work\'s core contributions and significance.',
      'Thoroughly verify all submission metadata for accuracy before finalizing the upload.',
      'The Technical Program Committee (TPC) will conduct a comprehensive peer review of all entries.',
      'During the online submission phase, authors must consent to IEEE copyright terms and sign the corresponding electronic forms.',
    ],
  },
  {
    icon: 'lucide:presentation',
    title: 'Publication Policy',
    items: [
      'Upon paper acceptance, at least one author must register for the conference and present the paper. Every accepted paper must have an individual author registration.',
      'As per IEEE policy, authors of every published paper needs to sign a copyright transfer agreement. The instructions for the copyright agreement will be shared with the author after acceptance of the paper.',
      'All accepted and presented papers will be submitted for inclusion into IEEE Xplore, subject to meeting IEEE Xplore’s scope and quality requirements.',
    ],
  },
  {
    icon: 'lucide:copyright',
    title: 'Camera Ready and Copyright',
    wide: true,
    intro: 'Authors are requested to upload the camera ready. Authors need to complete the following steps:',
    items: [
      'All final paper submissions must be electronic, using IEEE Xplore compliant PDF format (*.pdf). Failure to do so may result in the rejection of the paper. Authors are requested to upload the camera ready in CMT',
      'Type 3 fonts (bitmaps) will not be accepted. Authors can use the IEEE PDF eXpress to generate compliant PDF Files for final submission.',
      'Prepare final manuscript STRICTLY according to IEEE template. Failing which, we will not submit your manuscript to Xplore. Template can be found here. Preferably, use US Letter. Manuscript Templates for Conference Proceedings: https://www.ieee.org/conferences/publishing/templates.html.',
      'Length of manuscript should be maximum 6 pages',
      'Format and verify your manuscript using IEEE PDF eXpress™ to generate IEEE Xplore®-compliant PDF. RESOURCES IEEE PDF eXpress: A freely available online tool designed to assist conference organizers and authors in complying with the IEEE PDF requirements https://www.ieee.org/conferences/publishing/pdfexpress.html (In case, you need conference id to use PDFXpress, please use this – #####)',
      'Get and upload your IEEE Electronic Copyright Form (eCF) to CMT.',
      'Upload your camera-ready paper (IEEE Xplore®-compliant PDF or Microsoft Word Document) to CMT, your respective track.',
      'Register for the conference with payment. Registration should be done before camera ready upload.',
    ],
  },
]

const REVIEW_STEPS = [
  {
    icon: 'lucide:shield-alert',
    label: 'Plagiarism and Format Screening',
    desc: 'Initial check for plagiarism and format compliance.',
  },
  {
    icon: 'lucide:search-check',
    label: 'Technical Evaluation',
    desc: 'Manuscript is evaluated by expert reviewers for technical merit.',
  },
  {
    icon: 'lucide:badge-check',
    label: 'Acceptance Decision',
    desc: 'Based on reviews, a decision is made by the Program Committee.',
  },
  {
    icon: 'lucide:camera',
    label: 'Camera Ready',
    desc: 'Authors submit the final camera-ready paper as per guidelines.',
  },
  {
    icon: 'lucide:mic',
    label: 'Conference Presentation',
    desc: 'Present your research and engage with the academic community.',
  },
]

const REVIEW_CRITERIA = [
  'Submitted manuscripts undergo mandatory plagiarism screening per IEEE guidelines. Papers violating ethics will be desk-rejected and the authors’ parent organizations informed.',
  'All submitted manuscripts will be reviewed by the Program Committee.',
  'Submissions will be judged on correctness, originality, technical strength, significance, potential impact, quality of presentation, and interest and relevance to the conference scope.',
  'The author list and order at the time of submission is considered final – no co-authors can be added or removed or re-ordered after the submission deadline or upon acceptance (no exceptions).',
  'Submitted manuscripts that DO NOT follow these guidelines (i.e., do not meet the size, formatting, and anonymization requirements) will be rejected without review.',
]

const IMPORTANT_DATES = [
  { milestone: 'Submission Start Date', date: '01 January 2027' },
  { milestone: 'Submission Deadline', date: '31 March 2027' },
  { milestone: 'Acceptance Notification', date: '30 May 2027' },
  { milestone: 'Registration Deadline', date: '15 June 2027' },
  { milestone: 'Camera Ready Submission', date: '30 June 2027' },
  { milestone: 'Conference Dates', date: '28 – 29 August 2027' },
]

export default function Guidelines() {
  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="guidelines-page">
      <Background3D variant="payment" />
      <div className="guidelines-page-inner">

        <div className="guidelines-page-header reveal">
          <div className="guidelines-page-label">
            <span className="line" /> IEEE COGNIA 2027 <span className="line" />
          </div>
          <h1 className="guidelines-page-title">Paper Submission Guidelines</h1>
          <p className="guidelines-page-desc">
            Please carefully read and follow the guidelines below before submitting your manuscript.
            Non-compliant submissions may be rejected without review.
          </p>
        </div>

        {/* ===== GUIDELINE CARDS ===== */}
        <div className="guidelines-grid">
          {PAPER_GUIDELINES.map((section, index) => (
            <div
              key={index}
              className={`guidelines-card reveal reveal-delay-${(index % 4) + 1}${section.wide ? ' guidelines-card--wide' : ''}`}
            >
              <div className="guidelines-card-header">
                <div className="guidelines-card-icon">
                  <span className="iconify" data-icon={section.icon} style={{ fontSize: 24 }} />
                </div>
                <h3 className="guidelines-card-title">{section.title}</h3>
              </div>

              {section.intro && (
                <p className="guidelines-card-intro">{section.intro}</p>
              )}

              <ul className={`guidelines-card-list${section.wide ? ' guidelines-card-list--columns' : ''}`}>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <span className="guidelines-card-bullet" />
                    <span>{linkify(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ===== REVIEW PROCESS ===== */}
        <div className="review-process-section reveal">
          <div className="review-process-header">
            <div className="review-workflow-label">
              <span className="line" /> Our Workflow <span className="line" />
            </div>
            <h2 className="review-process-title">
              Review <span className="red">Process</span>
            </h2>
            <p className="review-process-subtitle">
              Every submission follows a structured, transparent path from initial screening
              through to final presentation at the conference.
            </p>
          </div>

          <div className="review-steps-track">
            {REVIEW_STEPS.map((step, i) => (
              <div className="review-step-card" key={i}>
                <div className="review-step-number">{i + 1}</div>
                <div className="review-step-icon-circle">
                  <span className="iconify" data-icon={step.icon} style={{ fontSize: 22 }} />
                </div>
                <h4 className="review-step-title">{step.label}</h4>
                <p className="review-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="review-criteria-panel">
            <div className="review-criteria-header">
              <span className="iconify" data-icon="lucide:file-check-2" style={{ fontSize: 20 }} />
              <h4>Evaluation &amp; Screening Details</h4>
            </div>
            <ul className="review-criteria-list">
              {REVIEW_CRITERIA.map((item, i) => (
                <li key={i}>
                  <span className="review-criteria-check">
                    <span className="iconify" data-icon="lucide:check" style={{ fontSize: 12 }} />
                  </span>
                  <span>{linkify(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== IMPORTANT DATES ===== */}
        <div className="important-dates-section reveal">
          <div className="important-dates-header">
            <div className="important-dates-icon-wrap">
              <span className="iconify" data-icon="lucide:calendar-check" style={{ fontSize: 28 }} />
            </div>
            <div>
              <h3 className="important-dates-title">Important Dates</h3>
              <p className="important-dates-subtitle">Mark your calendar for key events and deadlines</p>
            </div>
          </div>

          <div className="dates-timeline">
            <div className="dates-track-line">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="dates-track-dot" />
              ))}
            </div>

            {IMPORTANT_DATES.map((row, i) => {
              const icons = [
                'lucide:file-up',
                'lucide:file-clock',
                'lucide:bell',
                'lucide:clipboard-check',
                'lucide:camera',
                'lucide:users',
              ]
              const colors = [
                'dates-icon--red',
                'dates-icon--rose',
                'dates-icon--amber',
                'dates-icon--green',
                'dates-icon--teal',
                'dates-icon--violet',
              ]
              return (
                <div className="dates-node" key={i}>
                  <div className={`dates-icon ${colors[i]}`}>
                    <span className="iconify" data-icon={icons[i]} style={{ fontSize: 26 }} />
                  </div>
                  <div className="dates-card">
                    <span className="dates-num">0{i + 1}</span>
                    <h4 className="dates-milestone">{row.milestone}</h4>
                    <span className="dates-separator" />
                    <span className="dates-date">{row.date}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="conference-banner">
            <div className="banner-main">
              <div className="banner-icon-sm">
                <span className="iconify" data-icon="lucide:calendar" style={{ fontSize: 20 }} />
              </div>
              <div className="banner-text-group">
                <h4 className="banner-title">Conference Dates</h4>
                <span className="banner-vline" />
                <div className="banner-meta">
                  <div className="banner-date-row">
                    <span className="iconify" data-icon="lucide:calendar-days" style={{ fontSize: 14 }} />
                    <span>28 – 29 August 2027</span>
                  </div>
                  <p className="banner-sub">Join us for an engaging and insightful conference experience.</p>
                </div>
              </div>
            </div>

            <div className="desk-calendar-mini">
              <div className="dcm-rings"><span /><span /><span /></div>
              <div className="dcm-top">AUG</div>
              <div className="dcm-body">
                <div className="dcm-grid">
                  {Array.from({ length: 31 }, (_, d) => (
                    <span
                      key={d}
                      className={d === 27 || d === 28 ? 'dcm-day dcm-day--active' : 'dcm-day'}
                    >
                      {d + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className="dcm-stand" />
              <div className="dcm-shadow" />
            </div>
          </div>
        </div>

        <div className="guidelines-cta reveal">
          <a
            href="mailto:cognia@iem.edu.in?subject=Guidelines Query - IEEE COGNIA 2027"
            className="btn-primary"
            style={{ width: '100%', maxWidth: '400px', justifyContent: 'center', display: 'inline-flex' }}
          >
            <span className="iconify" data-icon="lucide:mail" style={{ fontSize: 18 }} />
            Contact for Clarifications
          </a>
        </div>
      </div>
    </div>
  )
}