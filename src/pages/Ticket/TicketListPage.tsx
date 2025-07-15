import React, { useEffect, useState } from 'react';
import './TicketListPage.css';

interface Ticket {
  id: string;
  topic: string;
  content: string;
  email?: string;
  status?: string;
  response?: string;
  timeCreated?: string;
  timeUpdatedLast?: string;
  deleted?: boolean;
  staffName?: string;
}

const TicketListPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('https://fpt-admission-system.onrender.com/api/tickets', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then(res => {
        if (!res.ok) throw new Error('Lỗi tải danh sách ticket');
        return res.json();
      })
      .then(data => {
        // Map lại dữ liệu để lấy đúng các trường cần thiết
        setTickets(data.map((item: any) => ({
          id: item.id,
          topic: item.topic,
          content: item.content,
          email: item.email,
          status: item.status,
          response: item.response,
          timeCreated: item.timeCreated || item.createAt,
          timeUpdatedLast: item.timeUpdatedLast,
          deleted: item.deleted,
          staffName: item.staff ? item.staff.username : '',
        })));
      })
      .catch(() => setError('Không thể tải danh sách ticket'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ticket-list-container">
      {loading ? (
        <div>Đang tải...</div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '16px 0' }}>{error}</div>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Chủ đề</th>
              <th>Email</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th>Phản hồi</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
              <th>Staff</th>
              <th>Đã xóa?</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.topic}</td>
                <td>{ticket.email}</td>
                <td>{ticket.content}</td>
                <td>{ticket.status}</td>
                <td>{ticket.response}</td>
                <td>{ticket.timeCreated ? new Date(ticket.timeCreated).toLocaleString() : ''}</td>
                <td>{ticket.timeUpdatedLast ? new Date(ticket.timeUpdatedLast).toLocaleString() : ''}</td>
                <td>{ticket.staffName}</td>
                <td>{ticket.deleted ? '✔️' : ''}</td>
                <td>
                  {replyingId === ticket.id ? (
                    <div style={{ display: 'flex', gap: 4 }}>
                      <input
                        className="ticket-reply-input"
                        value={replyValue}
                        onChange={e => setReplyValue(e.target.value)}
                        placeholder="Nhập phản hồi..."
                        disabled={isSubmitting}
                      />
                      <button
                        className="ticket-action-btn"
                        onClick={async () => {
                          setIsSubmitting(true);
                          try {
                            const token = localStorage.getItem('token');
                            const res = await fetch(`https://fpt-admission-system.onrender.com/api/tickets/response_ticket/${ticket.id}`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                              },
                              body: JSON.stringify(replyValue),
                            });
                            if (!res.ok) throw new Error('Gửi phản hồi thất bại!');
                            // Sau khi phản hồi thành công, fetch lại danh sách ticket
                            try {
                              const token = localStorage.getItem('token');
                              const res = await fetch('https://fpt-admission-system.onrender.com/api/tickets', {
                                headers: token ? { Authorization: `Bearer ${token}` } : {},
                              });
                              if (!res.ok) throw new Error('Lỗi tải lại danh sách ticket');
                              const data = await res.json();
                              setTickets(data.map((item: any) => ({
                                id: item.id,
                                topic: item.topic,
                                content: item.content,
                                email: item.email,
                                status: item.status,
                                response: item.response,
                                timeCreated: item.timeCreated || item.createAt,
                                timeUpdatedLast: item.timeUpdatedLast,
                                deleted: item.deleted,
                                staffName: item.staff ? item.staff.username : '',
                              })));
                            } catch (err) {
                              alert('Phản hồi thành công nhưng không thể tải lại danh sách!');
                            }
                            setReplyingId(null);
                            setReplyValue('');
                            alert('Phản hồi thành công!');
                          } catch (err: any) {
                            alert(err.message || 'Có lỗi xảy ra!');
                          }
                          setIsSubmitting(false);
                        }}
                        disabled={isSubmitting || !replyValue.trim()}
                      >Gửi</button>
                      <button className="ticket-cancel-btn" onClick={() => { setReplyingId(null); setReplyValue(''); }}>Hủy</button>
                    </div>
                  ) : (
                    <button
                      className="ticket-action-btn"
                      onClick={() => { setReplyingId(ticket.id); setReplyValue(ticket.response || ''); }}
                      disabled={ticket.status === 'COMPLETED' || (!!ticket.response && ticket.response !== 'Waiting for response')}
                    >
                      {ticket.status === 'COMPLETED' ? 'Đã hoàn thành' : (ticket.response && ticket.response !== 'Waiting for response' ? 'Đã phản hồi' : 'Phản hồi')}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TicketListPage;
