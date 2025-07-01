import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdmissionSchedule {
  id: number;
  staff: string;
  admissionAt: string;
  status: string;
  user: string;
  meetlink: string;
  createdAt: string;
  response?: string;
}

const mockSchedules: AdmissionSchedule[] = [
  {
    id: 1,
    staff: 'Nguyen Van A',
    admissionAt: '2025-07-01T10:00',
    status: 'Chờ phản hồi',
    user: 'Nguyen Van B',
    meetlink: '',
    createdAt: '2025-06-25T09:00',
    response: '',
  },
  {
    id: 2,
    staff: 'Nguyen Van C',
    admissionAt: '2025-07-02T14:00',
    status: 'Chờ phản hồi',
    user: 'Tran Thi D',
    meetlink: '',
    createdAt: '2025-06-25T10:00',
    response: '',
  },
];

const StaffAdmissionSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<AdmissionSchedule[]>(mockSchedules);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [response, setResponse] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (id: number, currentResponse: string, currentMeetLink: string) => {
    setEditingId(id);
    setResponse(currentResponse || '');
    setMeetLink(currentMeetLink || '');
    setShowModal(true);
  };

  const handleSave = (id: number) => {
    setSchedules(schedules.map(s =>
      s.id === id ? { ...s, response, meetlink: meetLink, status: 'Đã phản hồi' } : s
    ));
    setEditingId(null);
    setResponse('');
    setMeetLink('');
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="back-to-home-btn"
        onClick={() => navigate('/')}
      >
        ← Về trang chủ
      </button>
      <h1 className="admission-schedule-title">Quản lý lịch tư vấn tuyển sinh</h1>
      <div className="admission-schedule-table-container">
        <table className="admission-schedule-table">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Created At</th>
              <th>Admission At</th>
              <th>Status</th>
              <th>User</th>
              <th>Meetlink</th>
              <th>Response</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(s => (
              <tr key={s.id}>
                <td>{s.staff}</td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
                <td>{new Date(s.admissionAt).toLocaleString()}</td>
                <td>{s.status}</td>
                <td>{s.user}</td>
                <td>{s.meetlink}</td>
                <td>{s.response}</td>
                <td>
                  <button className="admission-schedule-btn" onClick={() => handleEdit(s.id, s.response || '', s.meetlink || '')}>Phản hồi</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.18)', zIndex: 1000
        }} onClick={() => setShowModal(false)} />
      )}
      {showModal && (
        <div style={{
          position: 'fixed', right: '50%', top: '50%', transform: 'translate(50%, -50%)', zIndex: 1001, background: '#fffbe7', borderRadius: 14, boxShadow: '0 2px 16px #0002', padding: 32, minWidth: 320
        }}>
          <h2 style={{ color: '#ff9800', textAlign: 'center', marginBottom: 20 }}>Phản hồi lịch tư vấn</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, color: '#333' }}>Link Meeting</label>
            <input
              value={meetLink}
              onChange={e => setMeetLink(e.target.value)}
              placeholder="Meet link"
              style={{ width: '100%', padding: 8, borderRadius: 5, border: '1.2px solid #bdbdbd', marginTop: 6 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontWeight: 500, color: '#333' }}>Phản hồi</label>
            <input
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Phản hồi"
              style={{ width: '100%', padding: 8, borderRadius: 5, border: '1.2px solid #bdbdbd', marginTop: 6 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <button className="admission-schedule-cancel-btn" onClick={() => setShowModal(false)}>Hủy</button>
            <button className="admission-schedule-submit-btn" onClick={() => handleSave(editingId!)}>Lưu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAdmissionSchedulePage;
