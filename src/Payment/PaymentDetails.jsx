import { useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import Background3D from '../components/Background3D'

const GUIDELINES = [
  'Eligibility for IEEE Xplore: Only registered and presented papers will be considered for IEEE Xplore Digital Library.',
  'Each full registration covers one (1) paper with a maximum of 6 pages.',
  'All fees listed below are exclusive of 18% GST, which will be added at the time of payment.',
  'Registration fees are non-refundable under any circumstances.',
  'Authors must retain a copy of the payment transaction ID or receipt for use during the registration process.',
  'Authors registering under the IEEE Member category must upload a valid IEEE membership card.',
]

const INDIAN_FEES = [
  {
    category: 'Regular Indian Author — Academician (UG, PG, PhD, Faculty Members)',
    member: '₹ 8,000',
    nonMember: '₹ 9,000',
  },
  {
    category: 'Regular Indian Author — From Industry',
    member: '₹ 10,000',
    nonMember: '₹ 11,000',
  },
  {
    category: 'Only Attending Conference / Accompanying Person',
    member: '₹ 4,000',
    nonMember: '₹ 5,000',
  },
]

const FOREIGN_FEES = [
  {
    category: 'Foreign Author — Academician or From Industry',
    member: 'USD 250',
    nonMember: 'USD 300',
  },
]

export default function PaymentDetails() {
  useScrollReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="payment-page">
      <Background3D variant="payment" />
      <div className="payment-page-inner">
        <div className="payment-page-header reveal">
          <div className="payment-page-label">
            <span className="line" /> IEEE COGNIA 2027 <span className="line" />
          </div>
          <h1 className="payment-page-title">Registration Details</h1>
          <p className="payment-page-desc">
            Complete your registration to secure your place at IEEE COGNIA 2027 and ensure your paper is included in the IEEE Xplore Digital Library.
          </p>
        </div>

        {/* Guidelines Box */}
        <div className="payment-guidelines reveal">
          <div className="guidelines-header">
            <span className="iconify" data-icon="lucide:info" style={{ fontSize: 20, color: 'var(--red-600)' }} />
            <span className="guidelines-title">Registration Guidelines</span>
          </div>
          <ul className="guidelines-list">
            {GUIDELINES.map((item, i) => (
              <li key={i}>
                <span className="guidelines-bullet" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FEE STRUCTURE — single unified table, region shown as a row-group badge */}
        <div className="fee-section reveal">
          <div className="fee-section-header">
            <span className="iconify" data-icon="lucide:indian-rupee" style={{ fontSize: 24, color: 'var(--navy-900)' }} />
            <span className="fee-section-title">Registration Fee Structure**</span>
          </div>
          <div className="fee-table-wrap">
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Category</th>
                  <th>IEEE Member</th>
                  <th>Non-IEEE</th>
                </tr>
              </thead>
              <tbody>
                {INDIAN_FEES.map((row, i) => (
                  <tr key={`in-${i}`}>
                    {i === 0 && (
                      <td rowSpan={INDIAN_FEES.length} className="fee-region-cell">
                        <div className="fee-region-inner">
                          <span className="fee-region-icon-circle">
                            <span className="iconify" data-icon="lucide:landmark" />
                          </span>
                          <span className="fee-region-label">Indian</span>
                        </div>
                      </td>
                    )}
                    <td>{row.category}</td>
                    <td className="fee-amount">{row.member}</td>
                    <td className="fee-amount">{row.nonMember}</td>
                  </tr>
                ))}
                {FOREIGN_FEES.map((row, i) => (
                  <tr key={`fg-${i}`} className="fee-row-foreign">
                    {i === 0 && (
                      <td rowSpan={FOREIGN_FEES.length} className="fee-region-cell fee-region-cell--foreign">
                        <div className="fee-region-inner">
                          <span className="fee-region-icon-circle fee-region-icon-circle--foreign">
                            <span className="iconify" data-icon="lucide:globe" />
                          </span>
                          <span className="fee-region-label fee-region-label--foreign">Foreign</span>
                        </div>
                      </td>
                    )}
                    <td>{row.category}</td>
                    <td className="fee-amount">{row.member}</td>
                    <td className="fee-amount">{row.nonMember}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fee Note */}
        <div className="fee-note fee-note--info reveal">
          <span className="fee-note-icon">
            <span className="iconify" data-icon="lucide:info" />
          </span>
          <p className="fee-note-text">
           **  All fees mentioned above are excluded of 18% GST, which will be applicable at the time of payment. Please ensure you select the correct author category and membership status while registering.
          </p>
        </div>

        {/* CTA Button */}
        <div className="payment-cta reveal">
          <a
            href="mailto:cognia@iem.edu.in?subject=Registration Query - IEEE COGNIA 2027"
            className="btn-primary"
            style={{ width: '100%', maxWidth: '400px', justifyContent: 'center', display: 'inline-flex' }}
          >
            <span className="iconify" data-icon="lucide:mail" style={{ fontSize: 18 }} />
            Contact for Queries
          </a>
        </div>
      </div>
    </div>
  )
}
