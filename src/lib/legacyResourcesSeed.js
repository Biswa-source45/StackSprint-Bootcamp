import {
  GitBranch,
  Palette,
  Code,
  Atom,
  Server,
  Database,
  FileText
} from 'lucide-react';

// ─── One-time seed data ──────────────────────────────────────────────────────
// This is the curriculum that used to be hardcoded directly in Resources.jsx.
// It now exists only so the "Import existing curriculum" admin action can push
// it into Firestore once. The live Resources page reads from Firestore; this
// file is the fallback shown before that import has happened, so nothing on
// the public page breaks during the transition.

export const CURRICULUM = [
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
        id: 'react-proj-gh-finder-1',
        title: 'React Project — GitHub User Finder (Part 1)',
        description: 'Hands-on React project session & codebase: GitHub REST API integration, profile searching, components & state management.',
        duration: 'Project Recording',
        embedUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/preview',
        driveUrl: 'https://drive.google.com/file/d/1-XH2fc98tnr2GAEdHNeK9nqWV7xL16om/view?usp=drive_link'
      },
      {
        id: 'react-proj-gh-finder-2',
        title: 'React Project — GitHub User Finder (Part 2)',
        description: 'Hands-on React project session (Part 2): Advanced profile rendering, repositories integration, state optimization, and UI polish.',
        duration: 'Project Recording',
        embedUrl: 'https://drive.google.com/file/d/1W9-MNCvR7-GAIVgzbk01Q78LybbG2f4x/preview',
        driveUrl: 'https://drive.google.com/file/d/1W9-MNCvR7-GAIVgzbk01Q78LybbG2f4x/view?usp=drive_link'
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
  },
  {
    id: 'mongodb',
    topic: 'MongoDB & Schema Design',
    icon: Database,
    color: 'from-emerald-600 to-green-700',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    lectures: [
      {
        id: 'mongo-lec-1',
        title: 'MongoDB — Lecture 1: Introduction to MongoDB & Schema Design',
        description: 'Introduction to NoSQL databases, MongoDB architecture, document data models, BSON/JSON, collections, and schema design best practices.',
        duration: 'Session Recording',
        embedUrl: 'https://drive.google.com/file/d/1TOgkyCMLyzbFXGMnz73hlcsAcE9vG7Sg/preview',
        driveUrl: 'https://drive.google.com/file/d/1TOgkyCMLyzbFXGMnz73hlcsAcE9vG7Sg/view?usp=drive_link'
      }
    ]
  }
];

export const NOTES_DATA = [
  {
    id: 'git-notes',
    title: 'Git & GitHub Notes',
    description: 'Comprehensive guide covering version control basics, repository management, and collaboration workflows.',
    url: 'https://drive.google.com/file/d/17HlIglnw0RgRcsk2dsTNqjhKxaViOvqI/view?usp=sharing',
    icon: GitBranch,
    color: 'from-violet-600 to-indigo-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200'
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
    borderColor: 'border-orange-200'
  }
];

export const PROJECTS_DATA = [
  {
    id: 'react-github-finder-1',
    title: 'React Project — GitHub User Finder (Part 1)',
    topic: 'React.js',
    category: 'Frontend Project',
    description: 'Complete hands-on React project for building a GitHub User Finder application (Part 1). Features live GitHub API integration, component state, profile card rendering, dynamic repositories list, and modern responsive styling.',
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
    id: 'react-github-finder-2',
    title: 'React Project — GitHub User Finder (Part 2)',
    topic: 'React.js',
    category: 'Frontend Project',
    description: 'Hands-on React project implementation (Part 2). Covers dynamic repositories fetching, state optimization, search filtering, error handling, and enhanced UI polish.',
    tags: ['React.js', 'GitHub API', 'Async Fetch', 'UI Polish'],
    embedUrl: 'https://drive.google.com/file/d/1W9-MNCvR7-GAIVgzbk01Q78LybbG2f4x/preview',
    driveUrl: 'https://drive.google.com/file/d/1W9-MNCvR7-GAIVgzbk01Q78LybbG2f4x/view?usp=drive_link',
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

// ─── Flatten into the shape the `resources` Firestore collection expects ─────
// Used once by the admin "Import existing curriculum" action.
export function flattenLegacyResources() {
  const items = [];

  for (const section of CURRICULUM) {
    for (const lecture of section.lectures) {
      items.push({
        kind: 'video',
        topic: section.topic,
        title: lecture.title,
        description: lecture.description,
        category: lecture.duration,
        driveShareLink: lecture.driveUrl || lecture.embedUrl,
        embedUrl: lecture.embedUrl,
        driveUrl: lecture.driveUrl || lecture.embedUrl.replace('/preview', '/view?usp=drive_link')
      });
    }
  }

  for (const note of NOTES_DATA) {
    items.push({
      kind: 'note',
      topic: note.title,
      title: note.title,
      description: note.description,
      category: '',
      driveShareLink: note.url,
      embedUrl: '',
      driveUrl: note.url
    });
  }

  for (const project of PROJECTS_DATA) {
    items.push({
      kind: 'project',
      topic: project.topic,
      title: project.title,
      description: project.description,
      category: project.category,
      tags: project.tags,
      driveShareLink: project.driveUrl,
      embedUrl: project.embedUrl,
      driveUrl: project.driveUrl
    });
  }

  return items;
}
