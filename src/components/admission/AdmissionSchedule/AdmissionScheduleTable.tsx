import React from 'react';

export interface AdmissionSchedule {
  id: number;
  staff: string;
  admissionAt: string;
  status: string;
  user: string;
  meetlink: string;
  createdAt: string;
}

export interface AdmissionScheduleTableProps {
  schedules: AdmissionSchedule[];
}

const AdmissionScheduleTable: React.FC<AdmissionScheduleTableProps> = ({ schedules }) => (
  <div className="admission-schedule-table-container">
    <table className="admission-schedule-table">
      <thead>
        <tr>
          <th>Thời gian tư vấn</th>
          <th>Ngày đăng ký</th>
          <th>Staff</th>
          <th>Trạng thái</th>
          <th>Meet Link</th>
        </tr>
      </thead>
      <tbody>
        {schedules.length === 0 ? (
          <tr>
            <td colSpan={5} className="admission-schedule-empty">Chưa có lịch tư vấn nào.</td>
          </tr>
        ) : (
          schedules.map((s) => (
            <tr key={s.createdAt + s.admissionAt}>
              <td>{new Date(s.admissionAt).toLocaleString()}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
              <td>{s.staff}</td>
              <td>{s.status}</td>
              <td>{s.meetlink}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default AdmissionScheduleTable;
