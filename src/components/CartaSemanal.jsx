import { useEffect, useRef } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import './CartaSemanal.css'

export default function CartaSemanal({ open, onClose, children, title, subtitle, icon, signature }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (open && cardRef.current) {
      requestAnimationFrame(() => cardRef.current.classList.add('popup-open'))
    }
  }, [open])

  if (!open) return null

  return (
    <div className="weekly-modal-overlay">
      <div ref={cardRef} className="popup-card weekly-modal">
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
        {icon && <div className="weekly-icon">{icon}</div>}
        {subtitle && <p className="weekly-subtitle">{subtitle}</p>}
        {title && <h3 className="weekly-title">{title}</h3>}
        <div className="weekly-body">
          {children}
        </div>
        {signature && (
          <div className="weekly-sign">
            <p className="weekly-sign-label">Forever yours,</p>
            <p className="weekly-sign-name">{signature}</p>
          </div>
        )}
      </div>
    </div>
  )
}
