import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function LetterAnimation({ letter, onClose }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <Box 
        sx={{ 
          width: 300, height: 200, bgcolor: '#fff', borderRadius: 4, position: 'relative', 
          animation: isOpen ? 'openEnvelope 1s forwards' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {!isOpen ? (
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: '#ffdddd', clipPath: 'polygon(0 0, 100% 0, 50% 50%)' }} />
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '1.5rem', mb: 2 }}>{letter.title}</Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{letter.text}</Typography>
          </Box>
        )}
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}