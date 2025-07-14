import React, { useState, useEffect } from 'react';
import './AdmissionSchedule.css';
import AdmissionScheduleForm from '../../components/admission/AdmissionSchedule/AdmissionScheduleForm';
import AdmissionScheduleTable from '../../components/admission/AdmissionSchedule/AdmissionScheduleTable';
import { useNavigate } from 'react-router-dom';

export interface ScheduleDTO {
  id: string;
  staff: string;
  admissionAt: string;
  status: string;
  user: string;
  meetlink: string;
  createdAt: string;
}

const AdmissionSchedulePage: React.FC = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    admissionAt: '',
    staff: '',
    meetlink: '',
    status: '',
  });

  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- FETCH ONCE ---------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/api/schedules', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((res) => res.json())
      .then((data) => {
        const mapped: ScheduleDTO[] = data.map((item: any) => ({
          id: item.id || item.createAt + item.admissionAt,
          staff: item.staff?.username ?? '-',
          admissionAt: item.admissionAt,
          status: item.status,
          user: item.user?.username ?? '-',
          meetlink: item.meetLink,
          createdAt: item.createAt,
        }));
        setSchedules(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError('Không thể tải dữ liệu');
        setLoading(false);
      });
  }, []);

  /* ------------- FORM HANDLERS (nếu cần) ------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST lên API và sau khi thành công => refetch / push vào state
    setSchedules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        admissionAt: form.admissionAt,
        staff: form.staff,
        meetlink: form.meetlink,
        status: form.status,
        createdAt: new Date().toISOString(),
        user: '-',
      },
    ]);
    setForm({ admissionAt: '', staff: '', meetlink: '', status: '' });
    setShowForm(false);
  };

  return (
    <div className="admission-schedule-container">
      <button className="back-to-home-btn" onClick={() => navigate('/')}>
        ← Về trang chủ
      </button>

      <h1 className="admission-schedule-title">Admission Schedule</h1>

      <div className="admission-schedule-header">
        <button className="admission-schedule-btn" onClick={() => setShowForm(true)}>
          Đăng ký tư vấn tuyển sinh
        </button>
      </div>

      {showForm && (
        <AdmissionScheduleForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* 👉 Truyền data + trạng thái xuống bảng */}
      <AdmissionScheduleTable schedules={schedules} loading={loading} error={error} />
    </div>
  );
};

export default AdmissionSchedulePage;
