import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Popup({ open, onClose, children, title, subtitle, icon, signature }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (open && cardRef.current) {
      cardRef.current.classList.add('popup-open');
    }
  }, [open]);

  if (!open) return null;

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <Box
        ref={cardRef}
        className="popup-card"
        sx={{
          width: { xs: '98vw', sm: 420 },
          maxWidth: '98vw',
          maxHeight: { xs: '90vh', sm: '80vh' },
          bgcolor: '#fff',
          borderRadius: { xs: 3, sm: 4 },
          boxShadow: 10,
          p: { xs: 2, sm: 4 },
          position: 'relative',
          textAlign: 'center',
          transition: 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s',
          opacity: 0,
          transform: 'scale(0.8)',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10, color: '#b56d87', zIndex: 2 }}>
          <CloseIcon fontSize="large" />
        </IconButton>
        {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
        {subtitle && <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>{subtitle}</Typography>}
        {title && (
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Times, cursive',
              fontSize: '24px',
              fontWeight: 'normal',
              color: '#c57a8a',
              mb: 2,
              mt: 1,
              textAlign: 'center',
            }}
          >
            {title}
          </Typography>
        )}
        <Box
          sx={{
            mb: 2,
            textAlign: 'left',
            fontSize: '18px',
            color: '#444',
            fontFamily: 'Times, cursive',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            wordBreak: 'break-word',
            px: { xs: 0, sm: 1 },
          }}
        >
          {children}
        </Box>
        {signature && (
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography sx={{ fontStyle: 'italic', color: '#b56d87', mb: 1 }}>Forever yours,</Typography>
            <Typography sx={{ fontWeight: 700, color: '#333' }}>{signature}</Typography>
          </Box>
        )}
      </Box>
      <style>{`
        .popup-card.popup-open {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
        @media (max-width: 600px) {
          .popup-card {
            width: 98vw !important;
            max-width: 98vw !important;
            max-height: 90vh !important;
            padding: 10px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </Box>
  );
}
