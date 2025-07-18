import React, { useState } from 'react';
import './AdmissionTicket.css';

export interface AdmissionTicketFormProps {
  onSubmit?: (ticket: { topic: string; content: string; email?: string }) => void;
  isLoggedIn: boolean;
  userEmail?: string;
}

const AdmissionTicketForm: React.FC<AdmissionTicketFormProps> = ({
  onSubmit,
  isLoggedIn,
  userEmail,
}) => {
  const [form, setForm] = useState({
    topic: '',
    content: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { topic, content, email } = form;
    const finalEmail = isLoggedIn ? userEmail : email;

    const body = { topic, content, email: finalEmail };

    try {
      await fetch(
        `http://localhost:8080/api/tickets?content=${encodeURIComponent(content)}&response=${topic}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalEmail),
        }
      );
      onSubmit?.({ topic, content, email: finalEmail });
      alert('Gửi yêu cầu thành công!');
      setForm({ topic: '', content: '', email: '' });
    } catch (err) {
      alert('Gửi yêu cầu thất bại!');
      console.error(err);
    }
  };

  return (
    <form className="admission-ticket-form" onSubmit={handleSubmit}>
      <h3 className="admission-ticket-title">Gửi yêu cầu tư vấn tuyển sinh</h3>

      <div className="admission-ticket-group">
        <label>Chủ đề</label>
        <input name="topic" value={form.topic} onChange={handleChange} required />
      </div>

      <div className="admission-ticket-group">
        <label>Nội dung</label>
        <textarea name="content" value={form.content} onChange={handleChange} required rows={3} />
      </div>

      {!isLoggedIn && (
        <div className="admission-ticket-group">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
      )}

      <button type="submit" className="admission-ticket-submit">
        Gửi yêu cầu
      </button>
    </form>
  );
};

export default AdmissionTicketForm;
