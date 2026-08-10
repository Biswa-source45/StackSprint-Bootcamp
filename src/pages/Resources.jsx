import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  FolderCode,
  ExternalLink,
  Download,
  Sparkles
} from 'lucide-react';


// ─── Video Data ────────────────────────────────────────────────────────────────
const CURRICULUM = [
  {
    id: 'github',
    topic: 'GitHub',
    icon: GitBranch,
    color: 'from-violet-600 to-indigo-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    lectures: [
      {
        id: 'gh-lec-1',
        title: 'GitHub — Lecture 1',
        description: 'Introduction to Git & GitHub: repositories, commits, branching basics.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1FaK1SrvwJ63KRBJP8-SlthcZk2pPRcFS/preview'
      },
      {
        id: 'gh-lec-2',
        title: 'GitHub — Lecture 2',
        description: 'GitHub: collaboration workflows.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1POPfBVwsb82jStx3y439nKv0DLe6SiwS/preview'
      }
    ]
  },
  {
    id: 'css',
    topic: 'CSS',
    icon: Palette,
    color: 'from-blue-600 to-cyan-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    lectures: [
      {
        id: 'css-lec-1',
        title: 'CSS — Lecture 1',
        description: 'Introduction to CSS: syntax, selectors, colors, fonts',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1GsimyMwTfRO2-y7WTGmJngt5RepkHIe9/preview'
      },
      {
        id: 'css-lec-2',
        title: 'CSS — Lecture 2',
        description: 'CSS Box Model, text properties, and styling fundamentals.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1dLSfJCBNOlP6GOMJPObFafLIm1-Oeog1/preview'
      },
      {
        id: 'css-lec-3',
        title: 'CSS — Lecture 3',
        description: 'CSS-3 lecture: Deep dive into flexbox architecture with examples of a sample design page.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1XJ7wYAmcFa8b0avmC6yqqW68K6eQS8dZ/preview'
      },
      {
        id: 'css-lec-4',
        title: 'CSS — Lecture 4',
        description: 'CSS-4 lecture: Position and overflow property and scale and transform property.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1MGpCg5pqac2LSHUuSZDADH_FMKbxQ7oN/preview'
      },
      {
        id: 'css-lec-5',
        title: 'CSS — Lecture 5',
        description: 'CSS-5 lecture: UI/UX design principles and AI tools like Google stitch.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1bscWR_cYMLaZO1LMIHYgZnrw_RNJuUpM/preview'
      },
      {
        id: 'css-lec-6',
        title: 'CSS — Lecture 6',
        description: 'CSS-6 lecture: Transition property and functions (delay, timing functions, duration).',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/150R8pfsRyu4bIE_dkBIL5mHf5AiDs76r/preview'
      },
      {
        id: 'css-lec-7',
        title: 'CSS — Lecture 7',
        description: 'CSS-7 lecture: CSS Modules & Animation — scoped CSS modules in React, keyframes, transitions, and hover effects.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1_0MSDLIKqJ7kXMoWIHZoh7lDj7t4dbbx/preview'
      },
      {
        id: 'css-lec-8',
        title: 'CSS — Lecture 8',
        description: 'CSS-8 lecture: Responsive design, media queries, mobile-first approach, and fluid layouts.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1TD37eu9kd4LKMQVu5O6Akhbfj28knsYp/preview'
      }
    ]
  },
  {
    id: 'javascript',
    topic: 'JavaScript',
    icon: Code,
    color: 'from-amber-600 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    lectures: [
      {
        id: 'js-lec-1',
        title: 'JavaScript — Lecture 1',
        description: 'Introduction to JavaScript: variables, scope (var, let, const), data types, and core fundamentals.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1ebs6eNP9KojznDfA86xZNaQY3IFCRlY2/preview'
      },
      {
        id: 'js-lec-2',
        title: 'JavaScript — Lecture 2',
        description: 'JavaScript DOM: Document Object Model, selecting/manipulating elements, event listeners, and dynamic web page interactivity.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1UUrVeS92cRoEC2XtsuR3TKG8JnEEH2_l/preview'
      },
      {
        id: 'js-lec-3',
        title: 'JavaScript — Lecture 3',
        description: 'JavaScript Fetch API & Promises: Understanding asynchronous programming, promises, resolve/reject, and APIs.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/16T4kifyPfEocgf7EsHW1XLIlXO0EZfsZ/preview'
      },
      {
        id: 'js-rev-1',
        title: 'JavaScript Revision — Part 1',
        description: 'Comprehensive review of JavaScript fundamentals, variables, functions, and DOM manipulation basics.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1EFH6Bu0U8V3P8HmcHLL3WPfM2X_6xbEK/preview'
      },
      {
        id: 'js-rev-2',
        title: 'JavaScript Revision — Part 2',
        description: 'Comprehensive revision of advanced JavaScript concepts, callback functions, asynchronous flows, and API integration.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/11iQV8sS2IBhlJDwUCSeJ20D-ahLLRleX/preview'
      }
    ]
  },
  {
    id: 'react',
    topic: 'React',
    icon: Atom,
    color: 'from-cyan-600 to-blue-600',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200',
    lectures: [
      {
        id: 'react-lec-1',
        title: 'React — Lecture 1',
        description: 'Introduction to React: Library overview, virtual DOM, JSX, components, and environment setup.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1Ona7MWOERuZdRfZbVPA3ume2aw8BaDJ5/preview'
      },
      {
        id: 'react-lec-2',
        title: 'React — Lecture 2',
        description: 'React components, props, state management, event handling, and conditional rendering.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1-5vK0W4YGzPmhXtVkl1KYbHmuDLyIQXQ/preview'
      },
      {
        id: 'react-lec-3',
        title: 'React — Lecture 3',
        description: 'React state management: deep dive into useState, useEffect, side effects, and state concepts.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1NPsRQN6SamsXvrNGaXNlEHgQzO2uccUz/preview'
      },
      {
        id: 'react-lec-4',
        title: 'React — Lecture 4',
        description: 'React state & side effects: custom hooks, complex component architecture, and advanced pattern implementations.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/15_PyWRCsvfgVpZB08RK-jbGWU7xy3CsZ/preview'
      },
      {
        id: 'react-lec-5',
        title: 'React — Lecture 5',
        description: 'React Context API, global state management, performance optimization, and custom hooks.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1db29_IzgLOUzS8FsfT32_NHn4HqKn_iM/preview'
      },
      {
        id: 'react-lec-6',
        title: 'React — Lecture 6',
        description: 'React routing, navigation with React Router, dynamic routes, and single-page app architecture.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/18mh5GJwyCxJOv218AInXrmzN_inkBFfL/preview'
      },
      {
        id: 'react-lec-7',
        title: 'React — Lecture 7',
        description: 'Advanced React concepts: state, hooks, project building, and end-to-end frontend integration.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1r7b_mK0FfTFaZVk2RhcXb3t2rxiT6Rsf/preview'
      },
      {
        id: 'react-proj-gh-finder',
        title: 'React Project — GitHub User Finder',
        description: 'Hands-on React project session & codebase: GitHub REST API integration, profile searching, components & state management.',
        duration: 'Project Recording',
        embedUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/preview',
        driveUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/view?usp=drive_link'
      }
    ]
  },
  {
    id: 'express',
    topic: 'Express.js & Node.js',
    icon: Server,
    color: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    lectures: [
      {
        id: 'express-lec-1',
        title: 'Express.js — Lecture 1: Backend & API Setup',
        description: 'Comprehensive Express.js backend masterclass & backend project walkthrough: REST API architecture, server initialization, and route configuration.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1NlrWpzJEsijXslUMRJ1dfKknkpTBEUXG/preview',
        driveUrl: 'https://drive.google.com/file/d/1NlrWpzJEsijXslUMRJ1dfKknkpTBEUXG/view?usp=drive_link'
      },
      {
        id: 'express-lec-2',
        title: 'Express.js — Lecture 2: Middleware & Backend Concepts',
        description: 'Deep dive into Express.js Middleware: custom middleware functions, request & response processing, next() control flow, error handling, and backend architecture.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1iJ8VqQNL5zmAeeU_USANCU3kesu9pcPn/preview',
        driveUrl: 'https://drive.google.com/file/d/1iJ8VqQNL5zmAeeU_USANCU3kesu9pcPn/view?usp=drive_link'
      }
    ]
  }
];

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
          <div className="flex items-center justify-between gap-2 pt-1 px-1">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span className="text-[10px] text-zinc-400">
                Use the native player controls for seeks, volume, CC, quality &amp; fullscreen.
              </span>
            </div>
            {lecture.driveUrl && (
              <a
                href={lecture.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-emerald-600 hover:underline font-medium flex items-center gap-1"
              >
                Direct Download / View <Download className="w-3 h-3" />
              </a>
            )}
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

// ─── Notes Data ───────────────────────────────────────────────────────────────
const NOTES_DATA = [
  {
    id: 'git-notes',
    title: 'Git & GitHub Notes',
    description: 'Comprehensive guide covering version control basics, repository management, and collaboration workflows.',
    url: 'https://drive.google.com/file/d/17HlIglnw0RgRcsk2dsTNqjhKxaViOvqI/view?usp=sharing',
    icon: GitBranch,
    color: 'from-violet-600 to-indigo-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
  },
  {
    id: 'html-notes',
    title: 'HTML Notes',
    description: 'Detailed cheat sheet and reference for HTML5 tags, document structure, and semantic elements.',
    url: 'https://drive.google.com/file/d/1GaXTjo48OpYVGq6ZeJshgHTd0eNRouNN/view?usp=sharing',
    icon: FileText,
    color: 'from-orange-600 to-red-600',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
  }
];

// ─── Notes Tab ────────────────────────────────────────────────────────────────
function NotesTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-4">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-800">
          Click on any note card to open the PDF reference material in a new tab.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {NOTES_DATA.map((note) => {
          const Icon = note.icon;
          return (
            <a
              key={note.id}
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-white border border-zinc-200/80 rounded-xl hover:shadow-md hover:border-zinc-300 transition-all group"
            >
              <div className={`flex-shrink-0 p-2.5 bg-gradient-to-br ${note.color} rounded-xl shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors truncate">
                  {note.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed line-clamp-2">
                  {note.description}
                </p>
                <span className={`inline-block mt-3 text-[10px] font-bold ${note.textColor} ${note.bgLight} border ${note.borderColor} px-2.5 py-1 rounded-full`}>
                  View PDF
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Projects & Repos Data ───────────────────────────────────────────────────
const PROJECTS_DATA = [
  {
    id: 'react-github-finder',
    title: 'React Project — GitHub User Finder',
    topic: 'React.js',
    category: 'Frontend Project',
    description: 'Complete hands-on React project for building a GitHub User Finder application. Features live GitHub API integration, component state, profile card rendering, dynamic repositories list, and modern responsive styling.',
    tags: ['React.js', 'GitHub API', 'Component State', 'Tailwind CSS'],
    embedUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/preview',
    driveUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/view?usp=drive_link',
    icon: Atom,
    color: 'from-cyan-600 to-blue-600',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200'
  },
  {
    id: 'express-backend-api',
    title: 'Express.js & Node.js Backend Masterclass',
    topic: 'Express.js',
    category: 'Backend Architecture',
    description: 'Comprehensive Express.js backend project architecture covering Node.js server setup, RESTful API endpoint configuration, modular route controllers, middleware layers, and backend project structure.',
    tags: ['Node.js', 'Express.js', 'REST API', 'Backend Architecture'],
    embedUrl: 'https://drive.google.com/file/d/1NlrWpzJEsijXslUMRJ1dfKknkpTBEUXG/preview',
    driveUrl: 'https://drive.google.com/file/d/1NlrWpzJEsijXslUMRJ1dfKknkpTBEUXG/view?usp=drive_link',
    icon: Server,
    color: 'from-emerald-600 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  }
];

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab() {
  const [activePreview, setActivePreview] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
        <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <p className="text-xs text-emerald-800">
          Explore complete project repositories &amp; recording walkthroughs. Click <strong>Open Drive Project</strong> to access source files directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PROJECTS_DATA.map((project) => {
          const Icon = project.icon;
          const isPreviewing = activePreview === project.id;

          return (
            <div
              key={project.id}
              className="bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 bg-gradient-to-br ${project.color} rounded-xl shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${project.textColor}`}>
                        {project.category}
                      </span>
                      <h3 className="text-sm font-extrabold text-zinc-900 leading-snug">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expandable Player Preview */}
                {isPreviewing && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-zinc-200">
                    <VideoPlayer embedUrl={project.embedUrl} title={project.title} />
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 mt-2">
                <a
                  href={project.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Drive Project
                </a>

                <button
                  onClick={() => setActivePreview(isPreviewing ? null : project.id)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold transition-colors"
                >
                  <MonitorPlay className="w-3.5 h-3.5 text-zinc-500" />
                  {isPreviewing ? 'Hide Preview' : 'Watch Session'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function Resources() {
  const [activeTab, setActiveTab] = useState('videos');

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
            Access all class recordings, project source code, and study materials. Organized by module and session.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-white border border-zinc-200 rounded-xl p-1 shadow-sm mb-6 w-fit flex-wrap gap-1">
          {[
            { key: 'videos', label: 'Video Lectures', Icon: MonitorPlay },
            { key: 'notes', label: 'Notes & Docs', Icon: FileText },
            { key: 'projects', label: 'Projects & Code', Icon: FolderCode }
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
            {CURRICULUM.map((topic) => (
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

        {activeTab === 'notes' && <NotesTab />}

        {activeTab === 'projects' && <ProjectsTab />}
      </div>
    </div>
  );
}
