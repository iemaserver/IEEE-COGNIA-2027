import { useEffect } from 'react'
import Background3D from './Background3D'

export default function SubmitPaper() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="payment-page">
      <Background3D variant="payment" />
      <div className="payment-page-inner">
        <div className="payment-page-header">
          <div className="payment-page-label">
            <span className="line" /> IEEE COGNIA 2027 <span className="line" />
          </div>
        </div>

        <div className="submit-paper-section">
          <h1 className="submit-paper-title">ACKNOWLEDGMENT</h1>
          <p className="submit-paper-acknowledgment">
            The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.
          </p>
          <a href="#" className="btn-primary">
            Submit Paper
          </a>
        </div>
      </div>
    </div>
  )
}
