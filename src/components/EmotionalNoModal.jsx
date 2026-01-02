import { Button } from '@mui/material'

const messageText = 'Ok entiendo, I know your time is limited.'

export default function EmotionalNoModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="emotional-modal-overlay" role="dialog" aria-modal="true">
      <div className="emotional-modal popup-enter">
        <h2 className="emotional-title">Te quiero decir</h2>
        <p className="emotional-intro">{messageText}</p>
        <div className="emotional-actions">
          <Button
            variant="contained"
            className="unique-btn emotional-action emotional-action-yes"
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
