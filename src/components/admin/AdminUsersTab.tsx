import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Shield,
  Edit,
  Trash2,
  Lock,
  Mail,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
  Search,
  Key,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdminUser, AdminRole } from '../../types/cms';

interface AdminUsersTabProps {
  onSaveNotification: (msg: string) => void;
}

export const AdminUsersTab: React.FC<AdminUsersTabProps> = ({ onSaveNotification }) => {
  const { cmsData, addAdminUser, updateAdminUser, deleteAdminUser, publishChanges, currentAdminUser } = useCMS();
  const users = cmsData.adminUsers || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [isNewUserModal, setIsNewUserModal] = useState(false);
  const [modalError, setModalError] = useState('');

  const roleDefinitions: { role: AdminRole; title: string; color: string; desc: string }[] = [
    {
      role: 'super_admin',
      title: 'Super Administrator',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      desc: 'Full administrative access across all sections, themes, security credentials, audits, and site reset.',
    },
    {
      role: 'assistant_admin',
      title: 'Assistant Admin',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      desc: 'Manages operational content, ticker, homepage sections, custom pages, and general business directories.',
    },
    {
      role: 'seo_editor',
      title: 'SEO & SERP Editor',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      desc: 'Specialized access to search engine meta tags, SERP previews, keywords, OpenGraph cards, and page narratives.',
    },
    {
      role: 'content_writer',
      title: 'Content Writer',
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      desc: 'Dedicated editorial privileges for Single Page Editor, Custom Pages Studio, and corporate narrative storytelling.',
    },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setModalError('');

    if (!editingUser.username.trim() || !editingUser.passwordHash.trim()) {
      setModalError('Username and password are required.');
      return;
    }

    // Check duplicate username if new
    if (isNewUserModal) {
      const exists = users.some(
        (u) => u.username.toLowerCase() === editingUser.username.trim().toLowerCase()
      );
      if (exists) {
        setModalError('An administrator with this username already exists.');
        return;
      }
      addAdminUser({
        ...editingUser,
        username: editingUser.username.trim(),
        displayName: editingUser.displayName.trim() || editingUser.username.trim(),
        createdAt: new Date().toISOString(),
      });
      onSaveNotification(`Created admin account: ${editingUser.displayName}`);
    } else {
      updateAdminUser(editingUser);
      onSaveNotification(`Updated admin account: ${editingUser.displayName}`);
    }

    setEditingUser(null);
  };

  const handleDelete = (id: string, name: string) => {
    // Prevent deleting last super admin
    const superAdmins = users.filter((u) => u.role === 'super_admin' && u.active);
    const targetUser = users.find((u) => u.id === id);
    if (targetUser?.role === 'super_admin' && superAdmins.length <= 1) {
      onSaveNotification('Cannot delete the sole active Super Administrator.');
      return;
    }

    deleteAdminUser(id);
    onSaveNotification(`Deleted administrator: ${name}`);
  };

  const handleSave = () => {
    publishChanges();
    onSaveNotification('✓ Administrator accounts and permissions published');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <UserCheck className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Admin Users & Team Permissions
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create and manage role-based administrative accounts for SEO Editors, Content Writers, Assistant Admins, and Super Administrators.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setEditingUser({
                id: `usr-${Date.now()}`,
                username: '',
                displayName: '',
                role: 'content_writer',
                passwordHash: '',
                email: '',
                active: true,
                createdAt: new Date().toISOString(),
              });
              setIsNewUserModal(true);
              setModalError('');
            }}
            className="px-4 py-2.5 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Admin / Editor</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Roles</span>
          </button>
        </div>
      </div>

      {/* Role Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {roleDefinitions.map((r) => (
          <div key={r.role} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className={`text-[10.5px] font-mono uppercase font-bold px-2 py-0.5 rounded border inline-block ${r.color}`}>
              {r.title}
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{r.desc}</p>
          </div>
        ))}
      </div>

      {/* Admin Users Table Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-base font-black text-slate-900">
              Active Administrative Accounts ({users.length})
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Administrators authenticate at /admin to manage assigned parts of the CMS.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search admins..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#0284C7]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-mono uppercase text-[10px]">
                <th className="py-3 px-4">Administrator</th>
                <th className="py-3 px-4">Username</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => {
                const roleDef = roleDefinitions.find((r) => r.role === u.role);
                const isCurrentUser = currentAdminUser?.id === u.id || currentAdminUser?.username === u.username;

                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {u.displayName[0] || 'A'}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{u.displayName}</span>
                          {isCurrentUser && (
                            <span className="text-[9.5px] font-mono text-[#0284C7] font-bold">
                              (You · Active)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {u.username}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border inline-block ${
                        roleDef?.color || 'bg-slate-100 text-slate-700'
                      }`}>
                        {roleDef?.title || u.role}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-mono">
                      {u.email || '—'}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        u.active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {u.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {u.lastLogin
                        ? new Date(u.lastLogin).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Never'}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUser(u);
                            setIsNewUserModal(false);
                            setModalError('');
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.displayName)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Admin User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#38BDF8]" />
                <h4 className="text-base font-black">
                  {isNewUserModal ? 'Add New Administrator' : 'Edit Administrator Account'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalError && (
              <div className="m-6 mb-0 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSaveModal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editingUser.displayName}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, displayName: e.target.value })
                  }
                  placeholder="e.g. Sarah Ahmed"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username (Login ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.username}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, username: e.target.value })
                    }
                    placeholder="e.g. sarah_seo"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.passwordHash}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, passwordHash: e.target.value })
                    }
                    placeholder="Enter password"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assigned Administrative Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value as AdminRole })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0284C7]"
                >
                  <option value="super_admin">Super Administrator (Full System Access)</option>
                  <option value="assistant_admin">Assistant Admin (Operations & Custom Pages)</option>
                  <option value="seo_editor">SEO & SERP Editor (Meta Tags & SERP Studio)</option>
                  <option value="content_writer">Content Writer (Single Page Editor & Narratives)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  placeholder="name@tiss.com.bd"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0284C7]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="userActive"
                  checked={editingUser.active}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, active: e.target.checked })
                  }
                  className="w-4 h-4 text-[#0284C7] rounded border-slate-300 focus:ring-[#0284C7]"
                />
                <label htmlFor="userActive" className="text-xs font-bold text-slate-700">
                  Account Active (Can log in to CMS)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                >
                  {isNewUserModal ? 'Create Account' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
