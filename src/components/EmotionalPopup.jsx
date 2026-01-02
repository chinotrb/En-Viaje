import { Button } from '@mui/material'

const introText = `These days have felt a little strange for me. Not bad, just different.
Because of the empty dates and moments.
It made me think about many things:
why I do what I do,
why I am the way I am,
why I think the way I think,
and even why I love you the way I do.
About what you are to me, and what you have been.

If you want to know more, I'll write it without any problem.
I know your time is limited.`

const questionText = 'Would you like to know what you are to me?'

export default function EmotionalPopup({ open, onClose, onYes, onNo }) {
  if (!open) return null

  return (
    <div className="emotional-modal-overlay" role="dialog" aria-modal="true">
      <div className="emotional-modal popup-enter">
        <h2 className="emotional-title">I wanted to tell you</h2>
        <p className="emotional-intro">{introText}</p>
        <p className="emotional-question">{questionText}</p>
        <div className="emotional-actions">
          <Button
            variant="contained"
            className="unique-btn emotional-action emotional-action-no"
            onClick={onNo || onClose}
          >
            No
          </Button>
          <Button
            variant="contained"
            className="unique-btn emotional-action emotional-action-yes"
            onClick={onYes || onClose}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  )
}
