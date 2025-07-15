import React, { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Edit,
  CircleArrowUp,
  CheckLine,
  CircleSlash2,
  Download
} from 'lucide-react';

import { getEnableColor, getRoleColor } from '../../components/DataConfig/DataLoader';
import { AddModal } from '../../components/Admin/modal/AddModal';
import { EditModal } from '../../components/Admin/modal/EditModal';
import { api } from '../../components/DataConfig/Api';
import type { Account, EditFormData, RegisterRequest, Response } from '../../components/DataConfig/Interface';

const AccountManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [isLoading, setIsLoading] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  useEffect(() => {

    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    setIsLoading(true);
    api.get<Response<Account[]>>('/authen/get-all')
      .then(response => {
        if (response.data && response.data.data) {
          setAccounts(response.data.data);
        } else {
          console.error('No data found in response');
        }
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || account.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || account.enable == (selectedStatus === 'active');

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = async (accountId: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/authen/delete/${accountId}`)
        .then(response => {
          if (response.status === 200 || response.status === 204) {

            fetchAccounts(); // Refresh accounts after deletion
          } else {

          }
        })
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  const handleUpgradeAccount = async (accountId: string) => {
    setIsLoading(true);
    try {
      await api.post(`/authen/staff?id=${accountId}`)
        .then(response => {
          if (response.status === 200 || response.status === 201) {

            fetchAccounts(); // Refresh accounts after upgrade
          } else {

          }
        })
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAccount = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await api.post('/authen/register', data)
        .then(response => {
          if (response.status === 200 || response.status === 201) {

            fetchAccounts(); // Refresh accounts after adding
          } else {

          }
        })
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  const handleEditAccount = async (data: EditFormData) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/authen/edit/${data.id}/${data.type}?content=${data.content}`);
      if (response.status === 200 || response.status === 204) {
        setIsOpenEditModal(false);
        fetchAccounts(); // Refresh accounts after editing
      } else {
        console.error('Failed to edit account');
      }
    } catch (error) {
      console.error('Error editing account:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản lý tài khoản</h1>
          <p className="text-gray-600 mt-2">Quản lý tài khoản, vai trò và quyền hạn trên nền tảng.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 border border-gray-300 hover:border-gray-400 shadow-sm">
            <Download className="h-4 w-4" />
            <span>Xuất dữ liệu</span>
          </button>
          <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => setIsOpenAddModal(true)}>
            <Plus className="h-4 w-4" />
            <span>Thêm tài khoản</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-orange-200 rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản theo tên hoặc email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-orange-200 rounded-lg text-gray-700 placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex items-center space-x-2 gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="USER">User</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-50 border border-orange-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="inactive">Không hoạt động</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white border border-orange-200 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-orange-50 border-b border-orange-200 columns-5">
              <tr>
                <th className="text-left py-4 px-19 text-sm">
                  <p className="font-medium text-gray-800">Tên</p>
                  <p className="text-sm text-gray-600">Email</p>
                </th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-800">Vai trò</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-800">Số điện thoại</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-800">Trạng thái</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-gray-800">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {/* Spinner */}
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                      </div>
                      {/* Loading text */}
                      <div className="text-center">
                        <p className="text-gray-800 font-medium">Đang tải tài khoản...</p>
                        <p className="text-gray-600 text-sm">Vui lòng chờ trong khi chúng tôi tải dữ liệu</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-orange-50 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                          <span className="text-white font-medium text-sm">
                            {account.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{account.name}</p>
                          <p className="text-sm text-gray-600">{account.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 flex items-center justify-center text-center">
                      <div className={`w-20 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(account.role as keyof Account['role'])}`}>
                        {account.role}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className='px-3 py-1 text-xs font-medium text-gray-600'>
                        {account.phone ? account.phone : 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 justify-center text-center">
                        <div className={`w-20 px-3 py-1 rounded-full text-xs font-medium border ${getEnableColor(account.enable)}`}>
                          {account.enable ? 'Hoạt động' : 'Tạm khóa'}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button className={`${account.role === 'USER' ? 'text-orange-600 hover:text-orange-700 cursor-pointer' : 'text-gray-400 hover:text-gray-500'} p-2 hover:bg-orange-100 rounded-lg transition-all duration-200`}
                          onClick={() => handleUpgradeAccount(account.id)}
                          disabled={account.role !== 'USER'}>
                          <CircleArrowUp className="h-4 w-4" />
                        </button>
                        <button className="cursor-pointer p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={() => {
                            setSelectedAccount(account)
                            setIsOpenEditModal(true)
                          }}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className={`cursor-pointer p-2 ${account.enable ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'} rounded-lg transition-all duration-200`}
                          onClick={() => handleDelete(account.id)}>
                          {account.enable ? <CircleSlash2 className="h-4 w-4" /> : <CheckLine className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))

              )}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {(filteredAccounts.length === 0 && isLoading == false) && (
          <div className="text-center py-12">
            <div className="text-gray-600 text-lg mb-2">Không tìm thấy tài khoản</div>
            <p className="text-gray-500">Thử điều chỉnh tìm kiếm hoặc tiêu chí lọc</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAccounts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị {filteredAccounts.length} trong tổng số {accounts.length} tài khoản
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all duration-200">
              Trước
            </button>
            <button className="px-3 py-2 bg-orange-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all duration-200">
              2
            </button>
            <button className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-all duration-200">
              Tiếp
            </button>
          </div>
        </div>
      )}

      {/* Add Account Modal */}
      <AddModal
        isOpen={isOpenAddModal}
        onClose={() => setIsOpenAddModal(false)}
        onSave={handleAddAccount}
      />

      {/* Edit Account Modal */}
      <EditModal
        isOpen={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        initialData={{ id: selectedAccount?.id, type: 'Phone', content: '' } as EditFormData}
        onSave={(data) => { handleEditAccount(data), setSelectedAccount(null) }}
      />
    </div>
  );
};

export default AccountManager;