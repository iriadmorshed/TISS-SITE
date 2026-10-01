import React, { useState } from 'react';
import {
  History,
  Search,
  Trash2,
  Download,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Laptop,
  Globe,
  Filter,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdminRole } from '../../types/cms';

interface AuditLogsTabProps {
  onSaveNotification: (msg: string) => void;
}

export const AuditLogsTab: React.FC<AuditLogsTabProps> = ({ onSaveNotification }) => {
  const { cmsData, clearLoginAudits } = useCMS();
  const audits = cmsData.adminLoginAudits || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const filteredAudits = audits.filter((log) => {
    const matchesQuery =
      log.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.ipAddress && log.ipAddress.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.deviceInfo && log.deviceInfo.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = selectedRole === 'all' || log.role === selectedRole;
    return matchesQuery && matchesRole;
  });

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assistant_admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'seo_editor':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'content_writer':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleClear = () => {
    clearLoginAudits();
    onSaveNotification('Login audit log history cleared');
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(audits, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `tiss_login_audits_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onSaveNotification('Exported audit history JSON');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#0284C7]/10 text-[#0284C7] rounded-lg">
              <History className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-black text-slate-900">
              Admin Login Audit Logs ({audits.length})
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real-time security log recording which administrator authenticated, when, from which device, and their assigned role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
            Total Sessions
          </span>
          <span className="text-2xl font-black text-slate-900">{audits.length}</span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
            Successful Logins
          </span>
          <span className="text-2xl font-black text-emerald-600">
            {audits.filter((a) => a.success).length}
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-purple-600 font-bold block mb-1">
            Super Admin Access
          </span>
          <span className="text-2xl font-black text-purple-700">
            {audits.filter((a) => a.role === 'super_admin').length}
          </span>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
            Editors & Writers
          </span>
          <span className="text-2xl font-black text-blue-700">
            {audits.filter((a) => a.role !== 'super_admin').length}
          </span>
        </div>
      </div>

      {/* Audit Log Table Card */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h4 className="text-base font-black text-slate-900">Historical Access Journal</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Logs are recorded automatically upon every login attempt.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:border-[#0284C7]"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admins</option>
              <option value="assistant_admin">Assistant Admins</option>
              <option value="seo_editor">SEO Editors</option>
              <option value="content_writer">Content Writers</option>
            </select>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit records..."
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#0284C7]"
              />
            </div>
          </div>
        </div>

        {filteredAudits.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <History className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-600">No login audit records found.</p>
            <p className="text-xs text-slate-400">Records will be generated when administrators sign in.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-600 font-mono uppercase text-[10px]">
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Administrator</th>
                  <th className="py-3 px-4">Role Badge</th>
                  <th className="py-3 px-4">Location / IP</th>
                  <th className="py-3 px-4">Device & Browser</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAudits.map((log) => {
                  const logDate = new Date(log.timestamp);
                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {logDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {logDate.toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              })}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div>
                          <span className="font-bold text-slate-900 block">{log.displayName}</span>
                          <span className="text-[10.5px] font-mono text-slate-500 font-semibold">
                            @{log.username}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border inline-block ${getRoleBadge(log.role)}`}>
                          {log.role.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600">
                        {log.ipAddress || '127.0.0.1 (Local)'}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5 font-medium text-[11px]">
                          <Laptop className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate max-w-xs">{log.deviceInfo || 'Standard Web Browser'}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        {log.success ? (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Authorized</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            <span>Failed</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
