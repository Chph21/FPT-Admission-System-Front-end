import React, { useState } from 'react';
import AdmissionTicketForm from './AdmissionTicketForm';
import './AdmissionTicketSticker.css';
import { useAppSelector } from '../../../store/hooks';

const AdmissionTicketSticker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

const handleSubmit = (ticket: { topic: string; content: string; email?: string }) => {
  console.log("🎫 Ticket đã gửi:", ticket);
  setSent(true);
  setTimeout(() => {
    setOpen(false);
    setSent(false);
  }, 2000);
};


  return (
    <>
      <div className="admission-ticket-sticker" onClick={() => setOpen(true)}>
        <span role="img" aria-label="ticket">🎫</span> Gửi yêu cầu tư vấn
      </div>

      {open && <div className="admission-ticket-modal-bg" onClick={() => setOpen(false)} />}
      {open && (
        <div className="admission-ticket-modal">
          {sent ? (
            <div className="admission-ticket-sent">Đã gửi yêu cầu!</div>
          ) : (
            <AdmissionTicketForm
              onSubmit={handleSubmit}
              isLoggedIn={isAuthenticated}
              userEmail={user?.email}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AdmissionTicketSticker;
