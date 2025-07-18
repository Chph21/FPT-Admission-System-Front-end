import React from 'react';
import type  { ScheduleDTO } from '../../../pages/AdmissionSchedule/AdmissionSchedulePage';

interface Props {
  schedules: ScheduleDTO[];
  loading: boolean;
  error: string | null;
}

const AdmissionScheduleTable: React.FC<Props> = ({ schedules, loading, error }) => (
  <div className="admission-schedule-table-container">
    <table className="admission-schedule-table">
      <thead>
        <tr>
          <th>Thời gian tư vấn</th>
          <th>Ngày đăng ký</th>
          <th>Nhân viên</th>
          <th>Trạng thái</th>
          <th>Meet Link</th>
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={5}>Đang tải...</td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={5} style={{ color: 'red' }}>
              {error}
            </td>
          </tr>
        ) : schedules.length === 0 ? (
          <tr>
            <td colSpan={5} className="admission-schedule-empty">
              Chưa có lịch tư vấn nào.
            </td>
          </tr>
        ) : (
          schedules.map((s) => (
            <tr key={s.id}>
              <td>{s.admissionAt ? new Date(s.admissionAt).toLocaleString() : '-'}</td>
              <td>{s.createdAt ? new Date(s.createdAt).toLocaleString() : '-'}</td>
              <td>{s.staff}</td>
              <td>{s.status}</td>
              <td>
                {s.meetlink ? (
                  <a
                    href={s.meetlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#ff6600', textDecoration: 'underline' }}
                  >
                    {s.meetlink}
                  </a>
                ) : (
                  <span style={{ color: '#aaa' }}>Chưa có</span>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default AdmissionScheduleTable;
