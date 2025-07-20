import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';

interface Application {
  timeCreated: string;
  timeUpdatedLast: string | null;
  deleted: boolean;
  id: string;
  campus: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  major: {
    id: string;
    name: string;
    description: string;
    duration: number;
    fee: number;
  };
  scholarship: string;
  accounts: {
    id: string;
    username: string;
    email: string;
    role: string;
    enable: boolean;
    phoneNumber?: string | null;
    firebaseUid?: string | null;
    verificationCode?: string | null;
  };
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingActions, setProcessingActions] = useState<Set<string>>(new Set());
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setApplications(data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Không thể tải danh sách đơn đăng ký');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptApplication = async (applicationId: string) => {
    if (processingActions.has(applicationId)) return;
    
    try {
      setProcessingActions(prev => new Set(prev).add(applicationId));
      
      const response = await fetch(`http://localhost:8080/api/applications/acceptApplication${applicationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the applications list after successful action
      await fetchApplications();
      alert('Đã duyệt đơn đăng ký thành công!');
    } catch (err) {
      console.error('Error accepting application:', err);
      alert('Có lỗi xảy ra khi duyệt đơn đăng ký');
    } finally {
      setProcessingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(applicationId);
        return newSet;
      });
    }
  };

  const handleRejectApplication = async (applicationId: string) => {
    if (processingActions.has(applicationId)) return;
    
    try {
      setProcessingActions(prev => new Set(prev).add(applicationId));
      
      const response = await fetch(`http://localhost:8080/api/applications/rejectApplication${applicationId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Refresh the applications list after successful action
      await fetchApplications();
      alert('Đã từ chối đơn đăng ký thành công!');
    } catch (err) {
      console.error('Error rejecting application:', err);
      alert('Có lỗi xảy ra khi từ chối đơn đăng ký');
    } finally {
      setProcessingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(applicationId);
        return newSet;
      });
    }
  };

  const handleViewDetail = async (applicationId: string) => {
    try {
      setDetailLoading(true);
      const response = await fetch(`http://localhost:8080/api/applications/${applicationId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSelectedApplication(data);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error fetching application detail:', err);
      alert('Có lỗi xảy ra khi tải chi tiết đơn đăng ký');
    } finally {
      setDetailLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Đã duyệt';
      case 'REJECTED':
        return 'Từ chối';
      case 'PENDING':
        return 'Chờ duyệt';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
        <button
          onClick={fetchApplications}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đơn đăng ký</h1>
        <p className="text-gray-600">Xem và quản lý tất cả đơn đăng ký tuyển sinh</p>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Danh sách đơn đăng ký ({applications.length})
            </h2>
            <button
              onClick={fetchApplications}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Làm mới
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin ứng viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cơ sở & Ngành học
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Học bổng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đăng ký
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <span className="text-orange-600 font-semibold">
                            {application.accounts.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {application.accounts.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.accounts.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {application.accounts.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.campus.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.major.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {application.major.duration} năm - {formatCurrency(application.major.fee)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {application.scholarship === 'null' ? 'Không có' : application.scholarship}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(application.applicationStatus)}`}>
                      {getStatusText(application.applicationStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(application.timeCreated)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetail(application.id)}
                        disabled={detailLoading}
                        className={`${
                          detailLoading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-orange-600 hover:text-orange-900'
                        }`}
                      >
                        {detailLoading ? 'Đang tải...' : 'Xem chi tiết'}
                      </button>
                      {application.applicationStatus === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleAcceptApplication(application.id)}
                            disabled={processingActions.has(application.id)}
                            className={`font-medium ${
                              processingActions.has(application.id)
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {processingActions.has(application.id) ? 'Đang xử lý...' : 'Duyệt'}
                          </button>
                          <button 
                            onClick={() => handleRejectApplication(application.id)}
                            disabled={processingActions.has(application.id)}
                            className={`font-medium ${
                              processingActions.has(application.id)
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-red-600 hover:text-red-900'
                            }`}
                          >
                            {processingActions.has(application.id) ? 'Đang xử lý...' : 'Từ chối'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg">Không có đơn đăng ký nào</div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Chi tiết đơn đăng ký
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Thông tin ứng viên */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin ứng viên</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Họ tên:</label>
                      <p className="text-gray-900">{selectedApplication.accounts.username}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email:</label>
                      <p className="text-gray-900">{selectedApplication.accounts.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Số điện thoại:</label>
                      <p className="text-gray-900">{selectedApplication.accounts.phoneNumber || 'Chưa cập nhật'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Vai trò:</label>
                      <p className="text-gray-900">{selectedApplication.accounts.role}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Trạng thái tài khoản:</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedApplication.accounts.enable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedApplication.accounts.enable ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thông tin cơ sở */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cơ sở</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tên cơ sở:</label>
                      <p className="text-gray-900">{selectedApplication.campus.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Địa chỉ:</label>
                      <p className="text-gray-900">{selectedApplication.campus.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Số điện thoại:</label>
                      <p className="text-gray-900">{selectedApplication.campus.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email:</label>
                      <p className="text-gray-900">{selectedApplication.campus.email}</p>
                    </div>
                  </div>
                </div>

                {/* Thông tin ngành học */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin ngành học</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tên ngành:</label>
                      <p className="text-gray-900">{selectedApplication.major.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mô tả:</label>
                      <p className="text-gray-900">{selectedApplication.major.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Thời gian học:</label>
                      <p className="text-gray-900">{selectedApplication.major.duration} năm</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Học phí:</label>
                      <p className="text-gray-900">{formatCurrency(selectedApplication.major.fee)}</p>
                    </div>
                  </div>
                </div>

                {/* Thông tin đơn đăng ký */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin đơn đăng ký</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Mã đơn:</label>
                      <p className="text-gray-900 font-mono text-sm">{selectedApplication.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ngày đăng ký:</label>
                      <p className="text-gray-900">{formatDate(selectedApplication.timeCreated)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Cập nhật lần cuối:</label>
                      <p className="text-gray-900">
                        {selectedApplication.timeUpdatedLast 
                          ? formatDate(selectedApplication.timeUpdatedLast)
                          : 'Chưa cập nhật'
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Học bổng:</label>
                      <p className="text-gray-900">
                        {selectedApplication.scholarship === 'null' 
                          ? 'Không có' 
                          : selectedApplication.scholarship
                        }
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Trạng thái:</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedApplication.applicationStatus)}`}>
                        {getStatusText(selectedApplication.applicationStatus)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Đóng
                </button>
                {selectedApplication.applicationStatus === 'PENDING' && (
                  <>
                    <button
                      onClick={() => {
                        handleAcceptApplication(selectedApplication.id);
                        setShowDetailModal(false);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Duyệt đơn
                    </button>
                    <button
                      onClick={() => {
                        handleRejectApplication(selectedApplication.id);
                        setShowDetailModal(false);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Từ chối đơn
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications; 