import React, { useEffect, useState } from 'react';
import './TicketListPage.css';
import { User, Mail, CheckCircle, XCircle, Loader, MessageCircle } from 'lucide-react';

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

const statusColor = (status?: string) => {
  switch (status) {
    case 'COMPLETED': return 'bg-green-100 text-green-700 border-green-300';
    case 'PENDING': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

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
      <div className="ticket-list-title">Quản lý Ticket Hỗ trợ</div>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader className="animate-spin w-10 h-10 text-orange-500 mb-4" />
          <span className="text-orange-600 font-semibold text-lg">Đang tải...</span>
        </div>
      ) : error ? (
        <div style={{ color: 'red', textAlign: 'center', margin: '16px 0' }}>{error}</div>
      ) : tickets.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg">Không có ticket nào.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow-xl bg-white">
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
                <tr key={ticket.id} className="hover:bg-orange-50 transition-all duration-150">
                  <td className="font-mono text-xs text-gray-500">{ticket.id.slice(0, 8)}</td>
                  <td className="font-semibold text-orange-700 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-orange-400" />
                    {ticket.topic}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-700">{ticket.email}</span>
                    </div>
                  </td>
                  <td className="max-w-xs truncate" title={ticket.content}>{ticket.content}</td>
                  <td>
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold ${statusColor(ticket.status)}`}>
                      {ticket.status === 'COMPLETED' ? 'Đã hoàn thành' : ticket.status === 'PENDING' ? 'Đang xử lý' : ticket.status || 'Chờ xử lý'}
                    </span>
                  </td>
                  <td className="max-w-xs truncate" title={ticket.response}>{ticket.response}</td>
                  <td className="text-xs text-gray-500">{ticket.timeCreated ? new Date(ticket.timeCreated).toLocaleString() : ''}</td>
                  <td className="text-xs text-gray-500">{ticket.timeUpdatedLast ? new Date(ticket.timeUpdatedLast).toLocaleString() : ''}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-gray-700">{ticket.staffName || '---'}</span>
                    </div>
                  </td>
                  <td className="text-center">{ticket.deleted ? <CheckCircle className="w-5 h-5 text-green-400 mx-auto" /> : ''}</td>
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
        </div>
      )}
    </div>
  );
};

export default TicketListPage;
