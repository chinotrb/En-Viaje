import { Button } from '@mui/material'

const storyLines = [
  "Just a small piece of what you make me feel,"
]

const mediaItems = [
  // Add { src: '/path/to/image-or-gif.gif', alt: 'Description' } when ready.
]

export default function EmotionalStoryModal({ open, onClose }) {
  if (!open) return null

  const audioSrc = `${import.meta.env.BASE_URL}music/carta1.mp4`

  return (
    <div className="emotional-modal-overlay" role="dialog" aria-modal="true">
      <div className="emotional-modal emotional-story popup-enter">
        <div className="emotional-story-header">
          <h2 className="emotional-title">What you are to me</h2>
          <Button variant="outlined" className="unique-btn emotional-trigger" onClick={onClose}>Close</Button>
        </div>
        <div className="emotional-story-body">
          <div className="emotional-audio">
            <audio controls preload="metadata" src={audioSrc}>
              Your browser does not support the audio element.
            </audio>
            <div className="emotional-audio-line" aria-hidden="true" />
          </div>
          {storyLines.map((line, index) => (
            <p
              key={`${index}-${line}`}
              className="emotional-line"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {line}
            </p>
          ))}
          {mediaItems.length > 0 && (
            <div className="emotional-media">
              {mediaItems.map((item) => (
                <img key={item.src} src={item.src} alt={item.alt} />
              ))}
            </div>
          )}
          <div className="emotional-transcription">
            <p className="emotional-line" style={{ animationDelay: `${storyLines.length * 0.12}s` }}>
tu chino 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
