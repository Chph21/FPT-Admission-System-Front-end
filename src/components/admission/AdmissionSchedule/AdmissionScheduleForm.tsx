import React from 'react';

export interface AdmissionScheduleFormProps {
  form: {
    admissionDate: string; // yyyy-mm-dd
    admissionAt: string;   // hh:mm
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const AdmissionScheduleForm: React.FC<AdmissionScheduleFormProps> = ({ form, onChange, onSubmit, onCancel }) => {
  // Tạo mảng 7 ngày liên tiếp bắt đầu từ hôm nay
  const today = new Date();
  // Bỏ ngày hôm nay, chỉ cho chọn từ ngày mai trở đi
  const days = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return {
      value: `${yyyy}-${mm}-${dd}`,
      label: `${dd}/${mm}/${yyyy}`
    };
  });

  // Tạo mảng giờ dạng HH:00 và HH:30 từ 08:00 đến 16:30
  const hours = [];
  for (let h = 8; h <= 16; h++) {
    hours.push(`${String(h).padStart(2, '0')}:00`);
    if (h !== 16) hours.push(`${String(h).padStart(2, '0')}:30`);
  }

  return (
    <div className="admission-schedule-form-modal">
      <h2 className="admission-schedule-form-title">Create Admission Schedule</h2>
      <form onSubmit={onSubmit}>
        <div className="admission-schedule-form-group">
          <label className="admission-schedule-form-label">Ngày</label>
          <select
            name="admissionDate"
            value={form.admissionDate || ''}
            onChange={onChange}
            required
            className="admission-schedule-form-input"
          >
            <option value="">-- Chọn ngày --</option>
            {days.map(day => (
              <option key={day.value} value={day.value}>{day.label}</option>
            ))}
          </select>
        </div>
        <div className="admission-schedule-form-group">
          <label className="admission-schedule-form-label">Giờ</label>
          <select
            name="admissionAt"
            value={form.admissionAt}
            onChange={onChange}
            required
            className="admission-schedule-form-input"
          >
            <option value="">-- Chọn giờ --</option>
            {hours.map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
        <div className="admission-schedule-form-actions">
          <button type="button" className="admission-schedule-cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="admission-schedule-submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};


export default AdmissionScheduleForm;
