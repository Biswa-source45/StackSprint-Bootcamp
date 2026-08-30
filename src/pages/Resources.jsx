import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import {
  CURRICULUM as LEGACY_CURRICULUM,
  NOTES_DATA as LEGACY_NOTES
} from '../lib/legacyResourcesSeed';
import {
  ChevronDown,
  ChevronUp,
  GitBranch,
  BookOpen,
  FileText,
  MonitorPlay,
  Home,
  Loader2,
  CheckCircle2,
  Palette,
  Code,
  Atom,
  Server,
  ExternalLink,
  Database,
  Layers,
  Terminal
} from 'lucide-react';

// ─── Topic visual style palette ───────────────────────────────────────────────
// Admin-created topics are free text, so a visual style is assigned deterministically
// by topic name rather than hand-picked — keeps the "add a resource" admin form to
// just title / description / Drive link, no color-picking required.
const TOPIC_STYLES = [
  { icon: GitBranch, color: 'from-violet-600 to-indigo-600', bgLight: 'bg-violet-50', textColor: 'text-violet-700', borderColor: 'border-violet-200' },
  { icon: Palette, color: 'from-blue-600 to-cyan-600', bgLight: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  { icon: Code, color: 'from-amber-600 to-orange-600', bgLight: 'bg-amber-50', textColor: 'text-amber-700', borderColor: 'border-amber-200' },
  { icon: Atom, color: 'from-cyan-600 to-blue-600', bgLight: 'bg-cyan-50', textColor: 'text-cyan-700', borderColor: 'border-cyan-200' },
  { icon: Server, color: 'from-emerald-600 to-teal-600', bgLight: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200' },
  { icon: Database, color: 'from-emerald-600 to-green-700', bgLight: 'bg-emerald-50', textColor: 'text-emerald-800', borderColor: 'border-emerald-200' },
  { icon: Layers, color: 'from-pink-600 to-rose-600', bgLight: 'bg-pink-50', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
  { icon: Terminal, color: 'from-slate-700 to-zinc-800', bgLight: 'bg-slate-50', textColor: 'text-slate-700', borderColor: 'border-slate-200' }
];

function getTopicStyle(name) {
  let hash = 0;
  const str = name || '';
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return TOPIC_STYLES[hash % TOPIC_STYLES.length];
}

// ─── Group flat Firestore video resources into the topic-sectioned shape ─────
function groupVideosByTopic(items) {
  const sorted = [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const topicOrder = [];
  const map = new Map();
  for (const item of sorted) {
    if (!map.has(item.topic)) {
      map.set(item.topic, []);
      topicOrder.push(item.topic);
    }
    map.get(item.topic).push(item);
  }
  return topicOrder.map((topic) => ({
    id: topic,
    topic,
    ...getTopicStyle(topic),
    lectures: map.get(topic).map((l) => ({
      id: l.id,
      title: l.title,
      description: l.description,
      duration: l.category || 'Session Recording',
      embedUrl: l.embedUrl,
      driveUrl: l.driveUrl
    }))
  }));
}

// ─── Video Player ──────────────────────────────────────────────────────────────
function VideoPlayer({ embedUrl, title }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <div
      className="relative w-full bg-zinc-950 rounded-xl overflow-hidden shadow-2xl shadow-zinc-900/30"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Loading spinner */}
      {!iframeLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-30 bg-zinc-950">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-zinc-400 text-xs font-medium tracking-widest uppercase animate-pulse">
            Loading Video…
          </p>
        </div>
      )}

      {/* Centred Play button */}
      {iframeLoaded && !hasStarted && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/25 backdrop-blur-[1.5px]">
          <button
            onClick={() => setHasStarted(true)}
            className="group flex items-center justify-center w-20 h-20 rounded-full bg-white/95 shadow-2xl shadow-black/50 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
            aria-label={`Play ${title}`}
          >
            <div className="w-0 h-0 ml-2 border-t-[13px] border-t-transparent border-l-[22px] border-l-zinc-900 border-b-[13px] border-b-transparent group-hover:border-l-emerald-600 transition-colors duration-200" />
          </button>
        </div>
      )}

      {/* Google Drive iframe */}
      <iframe
        src={embedUrl}
        title={title}
        allow="autoplay; fullscreen"
        allowFullScreen
        onLoad={() => setIframeLoaded(true)}
        className="absolute inset-0 w-full h-full border-0"
        style={{ opacity: iframeLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
      />
    </div>
  );
}

// ─── Lecture Card ──────────────────────────────────────────────────────────────
function LectureCard({ lecture, index, topicColor }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border border-zinc-200/80 rounded-xl overflow-hidden bg-white shadow-sm transition-shadow ${
        open ? 'shadow-md' : 'hover:shadow-md'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left group"
      >
        {/* Index badge */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${topicColor} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors truncate">
              {lecture.title}
            </h3>
            <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <MonitorPlay className="w-3 h-3" />
              {lecture.duration}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5 truncate">{lecture.description}</p>
        </div>

        <div className="flex-shrink-0 text-zinc-400 group-hover:text-zinc-600 transition-colors">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable player */}
      {open && (
        <div className="border-t border-zinc-100 bg-zinc-950/5 px-4 pb-4 pt-3 space-y-3">
          {/* Description */}
          <div className="flex items-center justify-between gap-2 flex-wrap px-1">
            <p className="text-xs text-zinc-500 leading-relaxed flex-1">{lecture.description}</p>
            {lecture.driveUrl && (
              <a
                href={lecture.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg transition-colors shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open Drive Link
              </a>
            )}
          </div>

          {/* Player */}
          <VideoPlayer embedUrl={lecture.embedUrl} title={lecture.title} />

          {/* Player tip */}
          <div className="flex items-center gap-1.5 pt-1 px-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
            <span className="text-[10px] text-zinc-400">
              Use the native player controls for seeks, volume, CC, quality &amp; fullscreen.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Topic Section ────────────────────────────────────────────────────────────
function TopicSection({ topic }) {
  const Icon = topic.icon;
  return (
    <div className="space-y-3">
      {/* Topic header */}
      <div className={`flex items-center gap-3 px-4 py-3 ${topic.bgLight} ${topic.borderColor} border rounded-xl`}>
        <div className={`p-2 bg-gradient-to-br ${topic.color} rounded-lg shadow-sm`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className={`text-sm font-bold ${topic.textColor}`}>{topic.topic}</h2>
          <p className="text-[10px] text-zinc-400">{topic.lectures.length} lecture{topic.lectures.length !== 1 ? 's' : ''} available</p>
        </div>
        <div className="ml-auto">
          <span className={`text-[10px] font-bold ${topic.textColor} ${topic.bgLight} border ${topic.borderColor} px-2.5 py-1 rounded-full`}>
            {topic.lectures.length} Videos
          </span>
        </div>
      </div>

      {/* Lecture cards */}
      <div className="space-y-2.5 pl-1">
        {topic.lectures.map((lec, i) => (
          <LectureCard key={lec.id} lecture={lec} index={i} topicColor={topic.color} />
        ))}
      </div>
    </div>
  );
}

// ─── Notes Tab ────────────────────────────────────────────────────────────────
function NotesTab({ notes }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-4">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-800">
          Click on any note card to open the PDF reference material in a new tab.
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="py-16 text-center text-zinc-400 text-sm">No notes published yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {notes.map((note) => {
            const style = note.icon ? note : { ...getTopicStyle(note.topic || note.title), ...note };
            const Icon = style.icon || FileText;
            const url = note.url || note.driveUrl;
            return (
              <a
                key={note.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white border border-zinc-200/80 rounded-xl hover:shadow-md hover:border-zinc-300 transition-all group"
              >
                <div className={`flex-shrink-0 p-2.5 bg-gradient-to-br ${style.color} rounded-xl shadow-sm group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors truncate">
                    {note.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">
                    {note.description}
                  </p>
                  <span className={`inline-block mt-3 text-[10px] font-bold ${style.textColor} ${style.bgLight} border ${style.borderColor} px-2.5 py-1 rounded-full`}>
                    View PDF
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Resources() {
  const [activeTab, setActiveTab] = useState('videos');
  const [liveResources, setLiveResources] = useState([]);

  // Live, admin-managed resources. Falls back to the legacy hardcoded curriculum
  // (imported above) until the admin's one-time "Import existing curriculum" runs
  // or new resources are added — so this page never goes blank during the transition.
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'resources'),
      (snap) => setLiveResources(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => console.warn('Resources: could not load live resources, showing defaults:', err.message)
    );
    return unsub;
  }, []);

  const liveVideos = useMemo(() => liveResources.filter((r) => r.kind === 'video'), [liveResources]);
  const liveNotes = useMemo(() => liveResources.filter((r) => r.kind === 'note'), [liveResources]);

  const videoTopics = liveVideos.length > 0 ? groupVideosByTopic(liveVideos) : LEGACY_CURRICULUM;
  const notes =
    liveNotes.length > 0
      ? [...liveNotes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      : LEGACY_NOTES;

  return (
    <div className="min-h-screen bg-zinc-50/50 pt-20 pb-16">
      {/* Page header */}
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs text-zinc-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1 font-medium">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <span>/</span>
          <span className="text-zinc-700 font-semibold">Resources</span>
        </div>

        {/* Title area */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-xl shadow-md shadow-emerald-600/30">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            Learning Resources
          </h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-xl">
            Access all class recordings and study materials. Organized by module and session.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white border border-zinc-200 rounded-xl p-1 shadow-sm mb-6 w-fit flex-wrap gap-1">
          {[
            { key: 'videos', label: 'Video Lectures', Icon: MonitorPlay },
            { key: 'notes', label: 'Notes & Docs', Icon: FileText }
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === key
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {videoTopics.map((topic) => (
              <TopicSection key={topic.id} topic={topic} />
            ))}

            {/* Coming soon note */}
            <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">More topics</span>
              <p className="text-xs text-amber-700">
                More module recordings (HTML, CSS, JS, React, Express.js, Gen-AI…) will appear here as classes are completed.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'notes' && <NotesTab notes={notes} />}
      </div>
    </div>
  );
}
