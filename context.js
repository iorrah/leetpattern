#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = process.cwd();

const FILES = [
  // Project overview
  // 'README.md',
  'package.json',

  // Database
  'prisma/schema.prisma',

  // API
  'app/api/ai/route.ts',
  'app/api/session/route.ts',

  // Context
  'context/InterviewContext.tsx',

  // Main page
  'app/problems/[slug]/WorkspaceClient.tsx',

  // Workspace
  'components/workspace/ChatPanel.tsx',
  'components/workspace/CodeEditorPanel.tsx',
  'components/workspace/ProblemDescription.tsx',
  'components/workspace/StepGuidance.tsx',

  // Shared components
  'components/StepTracker.tsx',
  'components/TopNav.tsx',

  // Libraries
  'lib/gemini.ts',
  'lib/prisma.ts',

  // Types
  'types/index.ts',
  'types/question.ts',
];

const IGNORE = new Set([
  '.git',
  '.next',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'out',
  '.turbo',
  '.idea',
  '.vscode',
  'public',
  'docs',
]);

const IGNORE_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.pdf',
  '.zip',
  '.db',
  '.sqlite',
]);

function walk(dir, prefix = '') {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => {
      if (IGNORE.has(entry.name)) return false;
      if (entry.name.startsWith('.')) return false;

      const ext = path.extname(entry.name);
      if (IGNORE_EXTENSIONS.has(ext)) return false;

      return true;
    })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  let lines = [];

  entries.forEach((entry, index) => {
    const last = index === entries.length - 1;
    const connector = last ? '└── ' : '├── ';

    lines.push(prefix + connector + entry.name);

    if (entry.isDirectory()) {
      lines.push(...walk(path.join(dir, entry.name), prefix + (last ? '    ' : '│   ')));
    }
  });

  return lines;
}

function language(file) {
  const ext = path.extname(file);

  switch (ext) {
    case '.ts':
      return 'ts';
    case '.tsx':
      return 'tsx';
    case '.js':
      return 'js';
    case '.jsx':
      return 'jsx';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    case '.md':
      return 'md';
    case '.prisma':
      return 'prisma';
    case '.sql':
      return 'sql';
    case '.yml':
    case '.yaml':
      return 'yaml';
    default:
      return 'text';
  }
}

let output = '';

output += '# Project Context\n\n';
output += `Generated: ${new Date().toLocaleString()}\n\n`;

output += '---\n\n';

output += '# Project Tree\n\n';
output += '```text\n';
output += '.\n';
output += walk(ROOT).join('\n');
output += '\n```\n\n';

for (const file of FILES) {
  const fullPath = path.join(ROOT, file);

  if (!fs.existsSync(fullPath)) {
    console.warn(`Skipping missing file: ${file}`);
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  output += '---\n\n';
  output += `# ${file}\n\n`;
  output += `Path: ${file}\n\n`;
  output += '```' + language(file) + '\n';
  output += content;
  if (!content.endsWith('\n')) output += '\n';
  output += '```\n\n';
}

const chars = output.length;
const estimatedTokens = Math.round(chars / 4);

try {
  if (process.platform === 'darwin') {
    execSync('pbcopy', { input: output });
  } else if (process.platform === 'win32') {
    execSync('clip', { input: output });
  } else {
    execSync('xclip -selection clipboard', { input: output });
  }

  console.log('────────────────────────────────────');
  console.log('✓ Project context copied to clipboard');
  console.log('');
  console.log(`Files: ${FILES.length}`);
  console.log(`Characters: ${chars.toLocaleString()}`);
  console.log(`Estimated Tokens: ${estimatedTokens.toLocaleString()}`);
  console.log('────────────────────────────────────');
} catch (err) {
  console.error('Failed to copy to clipboard.');
  console.log(output);
}
