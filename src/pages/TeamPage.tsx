import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Award,
  Briefcase,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
  Layers,
  Cpu,
  Headphones,
  ShoppingBag,
  Truck,
  Tv,
  Calculator,
  Search,
  Filter,
  X,
  Network,
  Scale,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { departmentFilters, additionalOperationalTeams } from '../data/team';
import { TeamMember } from '../types';
import { TeamSpotlightModal } from '../components/team/TeamSpotlightModal';
import { useCMS } from '../context/CMSContext';

export const TeamPage: React.FC = () => {
  const { cmsData } = useCMS();
  const teamMembers = cmsData.teamMembers;
  const bdChapterStats = cmsData.bdChapter;
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenSpotlight = (member: TeamMember) => {
    setSelectedMember(member);
    setIsSpotlightOpen(true);
  };

  const handleCloseSpotlight = () => {
    setIsSpotlightOpen(false);
  };

  // Filtered members calculation
  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesDept =
        activeDepartment === 'all' || member.departmentCategory === activeDepartment;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        member.divisionCode.toLowerCase().includes(q) ||
        member.focusAreas.some((fa) => fa.toLowerCase().includes(q));

      return matchesDept && matchesSearch;
    });
  }, [activeDepartment, searchQuery]);

  // Dynamic counts per department
  const getDepartmentCount = (cat: string) => {
    if (cat === 'all') return teamMembers.length;
    return teamMembers.filter((m) => m.departmentCategory === cat).length;
  };

  const getTeamIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-5 h-5 text-sky-600" />;
      case 1:
        return <Headphones className="w-5 h-5 text-indigo-600" />;
      case 2:
        return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 3:
        return <Truck className="w-5 h-5 text-amber-600" />;
      case 4:
        return <Tv className="w-5 h-5 text-purple-600" />;
      default:
        return <Calculator className="w-5 h-5 text-slate-600" />;
    }
  };

  const governancePillars = [
    {
      number: '01',
      title: 'Corporate Stewardship & Integrity',
      description:
        'Every portfolio business and operational team adheres to rigorous statutory compliance, ethical reporting, and transparent governance.',
    },
    {
      number: '02',
      title: 'Autonomous Sector Agility',
      description:
        'Operational squads maintain domain specialization and decision-making independence to serve client requirements with rapid execution.',
    },
    {
      number: '03',
      title: 'Enduring Partnerships',
      description:
        'We value long-term institutional relationships with clients, suppliers, and regulatory bodies over short-term transactional models.',
    },
  ];

  return (
    <>
      <SEO
        title="Bangladesh Chapter Leadership & Team — TISS Corporation"
        description="Meet the core executive leaders and strategic inter-entity bridge directors guiding TISS Corporation's 150+ workforce across 3 offices and 10 operating businesses in Bangladesh."
        canonicalPath="/team"
      />

      <div className="bg-[#F8FAFC] text-slate-900 min-h-screen">
        {/* Breadcrumb Bar */}
        <div className="border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Leadership & Team' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                <Shield className="w-4 h-4 text-[#0284C7]" />
                <span>{cmsData.narratives.teamBadge || 'Bangladesh Chapter Directorate & Inter-Entity Bridges'}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {cmsData.narratives.teamHeadline || 'Executive Leadership & Operational Bridge Network'}
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                {cmsData.narratives.teamSubheadline || (
                  <>
                    The Bangladesh Chapter is steered by a core executive council paired with specialized{' '}
                    <strong>Inter-Entity Bridge Directors</strong> — ensuring unified financial governance, legal compliance,
                    supply chain synergy, and service standards across <strong>{bdChapterStats.totalEmployees} professionals</strong> in{' '}
                    <strong>{bdChapterStats.totalOffices} offices in Dhaka</strong>.
                  </>
                )}
              </p>

              {/* Operational Footprint Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800">
                  <Users className="w-4 h-4 text-[#0284C7]" />
                  <span>Total Employees: {bdChapterStats.totalEmployees} in Bangladesh</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800">
                  <Building2 className="w-4 h-4 text-[#0284C7]" />
                  <span>{bdChapterStats.totalOffices} Operating Hubs in Dhaka</span>
                </span>
                <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-mono font-bold text-emerald-800">
                  <Network className="w-4 h-4 text-emerald-600" />
                  <span>Inter-Entity Bridge Directorate Active</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEPARTMENT FILTERS & TEAM SECTION */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                  Operational Departments
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                  Browse Leadership & Bridge Directors
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl font-medium">
                  Use the department filter buttons below to explore executive management, operational heads,
                  and strategic bridge directors connecting all 10 companies. Click any card to open the interactive Team Spotlight.
                </p>
              </div>

              {/* Live Search Input */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, role, division..."
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Department Filter Buttons Bar */}
            <div className="mb-10 pb-4 border-b border-slate-200 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 mr-2 uppercase tracking-wider">
                  <Filter className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Filter:</span>
                </div>

                {departmentFilters.map((dept) => {
                  const isActive = activeDepartment === dept.category;
                  const count = getDepartmentCount(dept.category);

                  return (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setActiveDepartment(dept.category)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#0284C7] text-white shadow-sm'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span>{dept.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Results Status Strip */}
            <div className="flex items-center justify-between text-xs text-slate-600 mb-6 font-medium">
              <div>
                Showing <strong className="text-slate-900">{filteredMembers.length}</strong> of{' '}
                <strong className="text-slate-900">{teamMembers.length}</strong> Key Leaders & Bridge Executives
                {activeDepartment !== 'all' && (
                  <span className="ml-2 font-mono text-[11px] text-[#0284C7]">
                    (Filtered by {departmentFilters.find((d) => d.category === activeDepartment)?.label})
                  </span>
                )}
              </div>

              {(activeDepartment !== 'all' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveDepartment('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Leadership Cards Grid */}
            {filteredMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMembers.map((member) => {
                  const initials = member.name
                    .split(' ')
                    .map((n) => n[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join('');

                  return (
                    <div
                      key={member.id}
                      onClick={() => handleOpenSpotlight(member)}
                      className="group bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-[#0284C7] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                    >
                      {/* Top Accent Gradient Ribbon */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#0284C7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Avatar Header Row */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-16 h-16 rounded-2xl object-cover shadow-md shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div
                              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.avatarColor} shadow-md flex items-center justify-center font-black text-xl tracking-wider shrink-0 border border-white/20 group-hover:scale-105 transition-transform`}
                            >
                              {initials}
                            </div>
                          )}

                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] font-mono uppercase font-bold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                              {member.divisionCode}
                            </span>
                            {member.isBridgeRole && (
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Inter-Company Bridge
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Name & Title */}
                        <div className="space-y-1 mb-4">
                          <h3 className="text-xl font-black text-slate-900 group-hover:text-[#0284C7] transition-colors">
                            {member.name}
                          </h3>
                          <div className="inline-block font-mono text-xs font-bold text-[#0284C7] uppercase tracking-wider">
                            {member.role}
                          </div>
                          <p className="text-xs text-slate-500 font-medium">
                            {member.department}
                          </p>
                        </div>

                        {/* Brief Bio Teaser */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium line-clamp-3 mb-5">
                          {member.bio}
                        </p>

                        {/* Focus Area Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {member.focusAreas.slice(0, 3).map((area, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                            >
                              {area}
                            </span>
                          ))}
                        </div>

                        {/* Social Links Row if present */}
                        {member.socialLinks && (member.socialLinks.linkedin || member.socialLinks.twitter || member.socialLinks.website || member.socialLinks.email) && (
                          <div className="flex items-center gap-1.5 mb-4" onClick={(e) => e.stopPropagation()}>
                            {member.socialLinks.linkedin && (
                              <a
                                href={member.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-slate-100 hover:bg-[#0284C7] text-slate-500 hover:text-white rounded-lg transition-colors"
                                title="LinkedIn"
                                aria-label={`${member.name} LinkedIn`}
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.twitter && (
                              <a
                                href={member.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-slate-100 hover:bg-[#0284C7] text-slate-500 hover:text-white rounded-lg transition-colors"
                                title="Twitter / X"
                                aria-label={`${member.name} Twitter`}
                              >
                                <Twitter className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.website && (
                              <a
                                href={member.socialLinks.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-slate-100 hover:bg-[#0284C7] text-slate-500 hover:text-white rounded-lg transition-colors"
                                title="Personal Website"
                                aria-label={`${member.name} Website`}
                              >
                                <Globe className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.socialLinks.email && (
                              <a
                                href={`mailto:${member.socialLinks.email}`}
                                className="p-1.5 bg-slate-100 hover:bg-[#0284C7] text-slate-500 hover:text-white rounded-lg transition-colors"
                                title="Direct Email"
                                aria-label={`Email ${member.name}`}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom Action Strip */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700 group-hover:text-[#0284C7] transition-colors flex items-center gap-1.5">
                          <span>View Spotlight & Bio</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                          {member.achievements.length} Milestones
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
                <Search className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">No leaders found</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No team members matched your active department filter or search query. Try resetting the filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDepartment('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-[#0284C7] text-white text-xs font-bold rounded-lg hover:bg-[#0369A1] transition-colors"
                >
                  Show All Members
                </button>
              </div>
            )}
          </div>
        </section>

        {/* STRATEGIC INTER-COMPANY BRIDGE ROLES FRAMEWORK */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Conglomerate Synergy Architecture
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Why Inter-Entity Bridge Directors Are Essential
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                In an enterprise group operating 10 specialized businesses with 150+ professionals, these 5 strategic bridge roles
                act as organizational connective tissue — maintaining uniform financial control, legal defensibility, group procurement scale,
                brand cohesion, and service level excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg w-fit">
                  <Calculator className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Financial Control & Treasury Bridge</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Ensures unified cash flow visibility, consolidated ledger accounting, tax compliance, and working capital discipline across all subsidiaries.
                </p>
                <div className="text-[11px] font-mono text-emerald-700 font-bold">Led by Tariqul Islam</div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-blue-100 text-blue-800 rounded-lg w-fit">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Legal & Regulatory Affairs Bridge</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Safeguards corporate licensing, sovereign compliance filings, IP trademarks, and Master Service Agreements across retail, tech, and logistics.
                </p>
                <div className="text-[11px] font-mono text-blue-700 font-bold">Led by Farhana Yasmin</div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-amber-100 text-amber-800 rounded-lg w-fit">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Supply Chain & Procurement Bridge</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Unifies vendor negotiations, centralized bulk purchasing, farm-to-shelf pipelines, and warehouse dispatch across operating units.
                </p>
                <div className="text-[11px] font-mono text-amber-700 font-bold">Led by Kamrul Hasan</div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-rose-100 text-rose-800 rounded-lg w-fit">
                  <Tv className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Brand Strategy & Media Relations Bridge</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Coordinates group brand prestige, public relations, omnichannel campaign rollouts, and elevator advertising network integration.
                </p>
                <div className="text-[11px] font-mono text-rose-700 font-bold">Led by Nusrat Jahan</div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-cyan-100 text-cyan-800 rounded-lg w-fit">
                  <Headphones className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Service Quality & SLA Assurance Bridge</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Tracks customer satisfaction scorecards, software uptime SLAs, customer care auditing, and defect reduction protocols across all entities.
                </p>
                <div className="text-[11px] font-mono text-cyan-700 font-bold">Led by Asif Mahmud</div>
              </div>

              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="p-2.5 bg-sky-100 text-[#0284C7] rounded-lg w-fit">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Cross-Entity Coordination & Logistics</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Centralizes daily operational synchronization, multi-office logistics, and regulatory submissions connecting the 3 facilities in Dhaka.
                </p>
                <div className="text-[11px] font-mono text-[#0284C7] font-bold">Led by Abdullah Al Mamun</div>
              </div>
            </div>
          </div>
        </section>

        {/* EXTENDED OPERATIONAL SQUADS & DIVISIONS */}
        <section className="py-20 lg:py-24 border-b border-slate-200 bg-slate-50/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Operational Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Extended Operational Units & Squads
              </h2>
              <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                Beyond the core executive and bridge leaders, TISS Corporation operates multiple specialized divisions,
                technical engineering squads, customer care floors, and retail teams powering 150+ professionals across 3 offices in Bangladesh.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalOperationalTeams.map((team, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white border border-slate-200 rounded-xl hover:border-[#0284C7] hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
                        {getTeamIcon(idx)}
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {team.teamsCount}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#0284C7] font-bold block">
                        {team.entity}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {team.name}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {team.focus}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active in Bangladesh Chapter</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Infrastructure: 3 Offices & 150+ Team */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl shadow-xs space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-bold block">
                  Workforce Scale
                </span>
                <div className="text-4xl font-black text-slate-900">150+ Personnel</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Full-time professionals spanning software engineers, customer experience representatives, retail managers, logistics coordinators, and administrative officers.
                </p>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl shadow-xs space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-bold block">
                  Physical Footprint
                </span>
                <div className="text-4xl font-black text-slate-900">3 Offices in Dhaka</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Corporate Office in Sector-13, Registered Office in Sec-15D, and specialized delivery hubs equipped with modern technological and operational amenities.
                </p>
              </div>

              <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl shadow-xs space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[#0284C7] font-bold block">
                  Portfolio Integration
                </span>
                <div className="text-4xl font-black text-slate-900">10 Operating Entities</div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Unified cross-portfolio support providing shared administrative, technical, financial, and regulatory governance under the BD Chapter leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Principles */}
        <section className="py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#0284C7]">
                Operating Foundations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Executive Governance Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {governancePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white border border-slate-200 rounded-xl shadow-xs hover:border-[#0284C7] transition-all space-y-3"
                >
                  <span className="text-xs font-mono text-[#0284C7] font-bold">
                    {pillar.number}.
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Direct Executive Engagement Contact Box */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 bg-slate-50 border border-slate-200 rounded-2xl shadow-md space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0284C7] font-bold">
                  Executive Dialogue
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Connect with the Bangladesh Chapter Leadership
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  For institutional partnerships, strategic joint ventures, executive coordination, or corporate inquiries, our leadership team welcomes direct correspondence.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-xs sm:text-sm">
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                    Corporate Office
                  </span>
                  <p className="text-slate-900 font-semibold">
                    House-59, 6th Floor, Road-13, Sector-13, Uttara, Dhaka-1230
                  </p>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                    Executive Inquiries
                  </span>
                  <div className="flex flex-col gap-0.5 font-mono text-xs">
                    <a href="mailto:info@tisscoltd.com" className="text-[#0284C7] font-bold hover:underline">
                      info@tisscoltd.com
                    </a>
                    <a href="mailto:tisscorporation@gmail.com" className="text-[#0284C7] font-bold hover:underline">
                      tisscorporation@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-[#0284C7] rounded-xl transition-colors shadow-sm"
                >
                  <span>Submit Corporate Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* TEAM SPOTLIGHT MODAL */}
      <TeamSpotlightModal
        member={selectedMember}
        isOpen={isSpotlightOpen}
        onClose={handleCloseSpotlight}
        onSelectMember={(m) => setSelectedMember(m)}
        allMembers={teamMembers}
      />
    </>
  );
};
