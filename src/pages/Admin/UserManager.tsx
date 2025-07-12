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
          <h1 className="text-3xl font-bold text-white">Account Manager</h1>
          <p className="text-slate-400 mt-2">Manage accounts, roles, and permissions across the platform.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            onClick={() => setIsOpenAddModal(true)}>
            <Plus className="h-4 w-4" />
            <span>Add Account</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search accounts by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex items-center space-x-2 gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
                <option value="USER">User</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-slate-800 border-b border-slate-700 columns-5">
              <tr>
                <th className="text-left py-4 px-19 text-sm">
                  <p className="font-medium text-white">Name</p>
                  <p className="text-sm text-slate-400">Email</p>
                </th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white">Role</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white">Phone</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white">Status</th>
                <th className="text-center py-4 px-6 text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {/* Spinner */}
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
                      </div>
                      {/* Loading text */}
                      <div className="text-center">
                        <p className="text-white font-medium">Loading accounts...</p>
                        <p className="text-slate-400 text-sm">Please wait while we fetch the data</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-slate-800 transition-colors duration-200">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {account.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{account.name}</p>
                          <p className="text-sm text-slate-400">{account.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 flex items-center justify-center text-center">
                      <div className={`w-20 px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(account.role as keyof Account['role'])}`}>
                        {account.role}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className='px-3 py-1 text-xs font-medium'>
                        {account.phone ? account.phone : 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 justify-center text-center">
                        <div className={`w-20 px-3 py-1 rounded-full text-xs font-medium border ${getEnableColor(account.enable)}`}>
                          {account.enable ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center space-x-2">
                        <button className={`${account.role === 'USER' ? 'text-orange-400 hover:text-orange-300 cursor-pointer' : 'text-gray-400 hover:text-gray-300'} p-2  hover:bg-slate-800 rounded-lg transition-colors duration-200`}
                          onClick={() => handleUpgradeAccount(account.id)}
                          disabled={account.role !== 'USER'}>
                          <CircleArrowUp className="h-4 w-4" />
                        </button>
                        <button className="cursor-pointer p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-800 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            setSelectedAccount(account)
                            setIsOpenEditModal(true)
                          }}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className={`cursor-pointer p-2 ${account.enable ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} hover:bg-slate-800 rounded-lg transition-colors duration-200`}
                          onClick={() => handleDelete(account.id)}>
                          {account.enable ? <CircleSlash2 className="h-4 w-4" /> : <CheckLine className="h-4 w-4" />}
                        </button>
                        {/* <button className="p-2 text-slate-400 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors duration-200">
                        <MoreVertical className="h-4 w-4" />
                      </button> */}
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
            <div className="text-slate-400 text-lg mb-2">No accounts found</div>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredAccounts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </p>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200">
              Previous
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
            <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200">
              2
            </button>
            <button className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors duration-200">
              Next
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