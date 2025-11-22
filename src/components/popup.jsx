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
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: 'rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <Box
        ref={cardRef}
        className="popup-card"
        sx={{
          width: { xs: '90%', sm: 420 },
          bgcolor: '#fff',
          borderRadius: 4,
          boxShadow: 8,
          p: { xs: 3, sm: 4 },
          position: 'relative',
          textAlign: 'center',
          transition: 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s',
          opacity: 0,
          transform: 'scale(0.8)',
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, color: '#b56d87' }}>
          <CloseIcon />
        </IconButton>
        {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
        {subtitle && <Typography variant="overline" sx={{ color: '#b56d87', letterSpacing: 2 }}>{subtitle}</Typography>}
        {title && <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: '#333', mb: 2 }}>{title}</Typography>}
        <Box sx={{ mb: 2 }}>{children}</Box>
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
      `}</style>
    </Box>
  );
}
