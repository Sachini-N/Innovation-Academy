import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { workshopService } from '../services/api';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

const FALLBACK_WORKSHOPS = [
  {
    _id: 'w1',
    title: 'Design Thinking & Grand Challenges',
    slug: 'design-thinking-and-grand-challenges',
    programSlug: 'program-01',
    programTitle: 'Innovation & Design Thinking Masterclass',
    description:
      'Learn the full user interview framework to identify underserved engagement trends in emerging market and deep-tech sectors. Real-world case studies from Sri Lankan healthcare and agricultural automation.',
    date: 'Saturday, May 24, 2025',
    startTime: '09:30 AM',
    endTime: '12:30 PM',
    venue: 'TRACE Auditorium A, Bay 05, Maradana',
    isOnline: false,
    speakerName: 'Eng. Dimuthu Perera',
    speakerDescription: 'Senior Innovation Architect at TRACE Studio',
    status: 'Upcoming',
    badgeExtra: '3 WEEKS',
    topicsCovered: [
      'User Empathy Field Techniques',
      'Root Cause Discovery & 5 Whys',
      'Stakeholder Ecosystem Mapping',
      'Human-Centered Problem Definition',
    ],
  },
  {
    _id: 'w2',
    title: 'User Empathy & Problem Validation Sprint',
    slug: 'user-empathy-and-problem-validation',
    programSlug: 'program-01',
    programTitle: 'Innovation & Design Thinking Masterclass',
    description:
      'Hands-on field synthesis workshop. Translate live feedback from industry partners into structured customer journey maps and validation matrices.',
    date: 'Saturday, May 31, 2025',
    startTime: '10:00 AM',
    endTime: '01:00 PM',
    venue: 'Maker Space Studio 2, TRACE Expert City',
    isOnline: false,
    speakerName: 'Tharushi Perera',
    speakerDescription: 'Lead UX Researcher & Product Strategist',
    status: 'Upcoming',
    badgeExtra: 'Sprint 2',
    topicsCovered: [
      'Customer Journey Architecture',
      'Quantitative vs Qualitative Synthesis',
      'Value Proposition Testing Matrices',
    ],
  },
  {
    _id: 'w3',
    title: 'Idea Pitching & Storytelling Masterclass',
    slug: 'idea-pitching-and-storytelling',
    programSlug: 'program-01',
    programTitle: 'Innovation & Design Thinking Masterclass',
    description:
      'Interactive pitching clinic. Master narrative arcs, concise 3-minute executive summaries, and slide composition for national innovation showcases.',
    date: 'Saturday, June 07, 2025',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    venue: 'Online Virtual Studio (Google Meet)',
    isOnline: true,
    speakerName: 'Dilshan Perera',
    speakerDescription: 'Head of Programs & Incubation at TRACE',
    status: 'Upcoming',
    badgeExtra: 'Online',
    topicsCovered: [
      'The 3-Minute Elevator Pitch Formula',
      'Hook, Problem, Solution, Traction Sequence',
      'Handling tough Q&A from executive judges',
    ],
  },
  {
    _id: 'w4',
    title: 'Rapid Prototyping & Proof of Concept (PoC)',
    slug: 'rapid-prototyping-and-proof-of-concept',
    programSlug: 'program-02',
    programTitle: 'Pre-Incubation Program on Startup Innovation',
    description:
      'Move from wireframe or schematic to physical functional prototype with early debugging tools, SLA 3D printing, and bench testing in TRACE Hardware Labs.',
    date: 'Wednesday, May 28, 2025',
    startTime: '10:00 AM',
    endTime: '01:30 PM',
    venue: 'Robotics & Sensor Lab, Bay 05, Maradana',
    isOnline: false,
    speakerName: 'Dr. Anura Fernando',
    speakerDescription: 'Director of Hardware Engineering at TRACE Labs',
    status: 'Ongoing',
    badgeExtra: 'Ongoing',
    topicsCovered: [
      'Microcontroller & Sensor Integration',
      'Rapid SLA 3D Printing & Enclosure Design',
      'Bench Voltage & Debugging',
    ],
  },
  {
    _id: 'w5',
    title: 'Go-To-Market (GTM) Strategy & Unit Economics',
    slug: 'go-to-market-gtm-strategy-unit-economics',
    programSlug: 'program-02',
    programTitle: 'Pre-Incubation Program on Startup Innovation',
    description:
      'Solve the customer profitability equation for early-stage B2B ventures and formulate initial sales manipulation strategies for local and international markets.',
    date: 'Monday, June 02, 2025',
    startTime: '05:30 PM',
    endTime: '08:00 PM',
    venue: 'Executive Boardroom, TRACE Expert City',
    isOnline: false,
    speakerName: 'Kasthula Jayasuriya',
    speakerDescription: 'Principal Partner at Colombo Venture Partners',
    status: 'Upcoming',
    badgeExtra: 'Online/Hybrid',
    topicsCovered: [
      'Customer Acquisition Cost (CAC) vs LTV',
      'B2B Enterprise Pilot Pricing & SLAs',
      'Early Sales Funnels & Outreach',
    ],
  },
  {
    _id: 'w6',
    title: 'Pitch Deck Architecture & Investment Readiness',
    slug: 'pitch-deck-architecture-investment-readiness',
    programSlug: 'program-02',
    programTitle: 'Pre-Incubation Program on Startup Innovation',
    description:
      'Deconstruct institutional seed decks. Formulate defensible valuation caps, cap tables, founder equity distributions, and demo day delivery mechanics.',
    date: 'Friday, June 13, 2025',
    startTime: '04:00 PM',
    endTime: '07:30 PM',
    venue: 'TRACE Auditorium B, Bay 05, Maradana',
    isOnline: false,
    speakerName: 'Dr. Ramesh Shanmuganathan',
    speakerDescription: 'Executive Board Member & Tech Veteran',
    status: 'Upcoming',
    badgeExtra: 'Cap Track',
    topicsCovered: [
      'Venture Capital Valuation Modeling',
      'Cap Table Dilution Math',
      'Executive Demo Day Live Pitch Delivery',
    ],
  },
];

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await workshopService.getWorkshops();
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setWorkshops(res.data);
        } else {
          setWorkshops(FALLBACK_WORKSHOPS);
        }
      } catch (err) {
        console.warn('Using fallback workshop data:', err.message);
        setWorkshops(FALLBACK_WORKSHOPS);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  // Filter logic
  const filteredWorkshops = workshops.filter((w) => {
    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const titleMatch = w.title?.toLowerCase().includes(query);
    const descMatch = w.description?.toLowerCase().includes(query);
    const speakerMatch = w.speakerName?.toLowerCase().includes(query);
    const topicMatch = w.topicsCovered?.some((t) => t.toLowerCase().includes(query));
    const matchesSearch = !query || titleMatch || descMatch || speakerMatch || topicMatch;

    // Program track match
    const matchesProgram =
      selectedProgram === 'all' ||
      (selectedProgram === 'program-01' && (w.programSlug === 'program-01' || w.programTitle?.includes('Design Thinking'))) ||
      (selectedProgram === 'program-02' && (w.programSlug === 'program-02' || w.programTitle?.includes('Pre-Incubation')));

    // Format match
    const matchesFormat =
      selectedFormat === 'all' ||
      (selectedFormat === 'online' && w.isOnline) ||
      (selectedFormat === 'physical' && !w.isOnline);

    return matchesSearch && matchesProgram && matchesFormat;
  });

  const prog1Count = workshops.filter(
    (w) => w.programSlug === 'program-01' || w.programTitle?.includes('Design Thinking')
  ).length;
  const prog2Count = workshops.filter(
    (w) => w.programSlug === 'program-02' || w.programTitle?.includes('Pre-Incubation')
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3.5 py-1 rounded-full bg-[#eaedff] text-xs font-black uppercase tracking-wider text-[#006398] mb-3 inline-block">
              TRACE ACADEMIC & SPRINT CATALOG
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B192C] tracking-tight">
              Innovation Workshops & Masterclasses
            </h1>
            <p className="text-sm sm:text-base text-[#44474c] mt-3 leading-relaxed">
              Interactive hands-on sessions engineered to complement academic foundations with deep-tech prototyping,
              human-centered design thinking, and high-growth venture validation at TRACE Expert City Bay 05.
            </p>
          </div>

          {/* Filters & Search Control Bar */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-4 sm:p-6 mb-10">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search workshops by topic, keyword, or speaker..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#006398]/30 focus:border-[#006398] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Program Track Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#f1f5f9] rounded-xl">
                <button
                  onClick={() => setSelectedProgram('all')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedProgram === 'all'
                      ? 'bg-white text-[#006398] shadow-sm'
                      : 'text-slate-600 hover:text-[#0B192C]'
                  }`}
                >
                  All ({workshops.length})
                </button>
                <button
                  onClick={() => setSelectedProgram('program-01')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedProgram === 'program-01'
                      ? 'bg-white text-[#006398] shadow-sm'
                      : 'text-slate-600 hover:text-[#0B192C]'
                  }`}
                >
                  Program 01: Design Thinking ({prog1Count})
                </button>
                <button
                  onClick={() => setSelectedProgram('program-02')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedProgram === 'program-02'
                      ? 'bg-white text-[#006398] shadow-sm'
                      : 'text-slate-600 hover:text-[#0B192C]'
                  }`}
                >
                  Program 02: Pre-Incubation ({prog2Count})
                </button>
              </div>

              {/* Format Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#006398]/30"
                >
                  <option value="all">All Formats</option>
                  <option value="physical">Physical (Bay 05 Labs)</option>
                  <option value="online">Online / Virtual</option>
                </select>
              </div>
            </div>
          </div>

          {/* Workshops Cards Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-4 border-[#006398] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-semibold text-[#44474c]">Loading TRACE Workshops...</span>
            </div>
          ) : filteredWorkshops.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0B192C]">No workshops match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Try searching with different keywords or reset your filters to see all available workshops.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedProgram('all');
                  setSelectedFormat('all');
                }}
                className="px-4 py-2 rounded-lg bg-[#006398] text-white text-xs font-bold hover:bg-[#0284c7] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkshops.map((w, idx) => {
                const isProg1 =
                  w.programSlug === 'program-01' || w.programTitle?.includes('Design Thinking');
                return (
                  <div
                    key={w._id || idx}
                    className="rounded-2xl bg-white border border-[#e2e8f0] p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#cbd5e1] transition-all duration-300 group"
                  >
                    <div>
                      {/* Top Header: Parent Program Badge & Status Badge */}
                      <div className="flex items-center justify-between gap-2 mb-3.5">
                        <span
                          className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                            isProg1
                              ? 'bg-[#dbeafe] text-[#00476e]'
                              : 'bg-[#e2e8f0] text-[#0B192C]'
                          }`}
                        >
                          {isProg1 ? 'PROGRAM 01' : 'PROGRAM 02'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {w.isOnline ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                              <Video className="w-3 h-3" />
                              Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <MapPin className="w-3 h-3" />
                              Bay 05
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                            {w.badgeExtra || w.status}
                          </span>
                        </div>
                      </div>

                      {/* Workshop Title */}
                      <Link
                        to={`/programs/${w.programSlug || (isProg1 ? 'program-01' : 'program-02')}/workshops/${w.slug}`}
                        className="block"
                      >
                        <h3 className="text-lg font-bold text-[#0B192C] group-hover:text-[#006398] transition-colors leading-snug line-clamp-2">
                          {w.title}
                        </h3>
                      </Link>

                      {/* Parent Program Context */}
                      <p className="text-[11px] font-semibold text-[#006398] mt-1 mb-2.5">
                        {isProg1
                          ? 'Track: Innovation & Design Thinking'
                          : 'Track: Pre-Incubation & Startup Innovation'}
                      </p>

                      {/* Description */}
                      <p className="text-xs text-[#44474c] leading-relaxed line-clamp-3 mb-4">
                        {w.description}
                      </p>

                      {/* Logistics Info */}
                      <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                          <span className="font-medium text-[#131b2e] truncate">{w.date}</span>
                        </div>
                        {w.startTime && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                            <span>
                              {w.startTime} {w.endTime ? `- ${w.endTime}` : ''}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                          <span className="truncate">{w.venue || 'TRACE Expert City, Maradana'}</span>
                        </div>
                        {w.speakerName && (
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-[#006398] shrink-0" />
                            <span className="truncate font-semibold text-slate-700">{w.speakerName}</span>
                          </div>
                        )}
                      </div>

                      {/* Topics pills */}
                      {w.topicsCovered && w.topicsCovered.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-4">
                          {w.topicsCovered.slice(0, 3).map((topic, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-[#f1f5f9] text-[10px] font-medium text-slate-600"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/programs/${w.programSlug || (isProg1 ? 'program-01' : 'program-02')}`}
                        className="text-[11px] font-bold text-slate-500 hover:text-[#0B192C] transition-colors"
                      >
                        Parent Program
                      </Link>

                      <Link
                        to={`/programs/${w.programSlug || (isProg1 ? 'program-01' : 'program-02')}/workshops/${w.slug}`}
                        className="px-3.5 py-1.5 rounded-lg bg-[#006398] hover:bg-[#0284c7] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 group-hover:gap-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Educational Banner */}
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-[#0B192C] to-[#00476e] text-white p-8 sm:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#5bb8fe]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Integrated Academic Tracks</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Want to attend our hands-on workshops?
                </h3>
                <p className="text-sm text-[#cbd5e1] max-w-xl">
                  Workshops are linked directly to our two flagship cohorts. Enroll in Program 01 or Program 02
                  to gain full access to Maker Labs, session toolkits, and mentor critiques.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  to="/programs"
                  className="px-6 py-3 rounded-xl bg-white text-[#0B192C] text-sm font-extrabold hover:bg-[#f1f5f9] transition-all shadow-md"
                >
                  Explore Both Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

