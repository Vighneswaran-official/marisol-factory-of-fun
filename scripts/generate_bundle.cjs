const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ignoreDirs = new Set(['node_modules', 'dist', '.git', '.gemini', 'android', 'apk_latest', 'apk_output', 'platform-tools']);
const codeExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.md']);

let output = '# Marisol Factory of Fun - Complete Codebase for Claude\n\n';
output += '## Project Overview\n';
output += '- **Project Name**: Marisol Factory of Fun (Kritika Companion, Culinary Cinema Trivia & Batch 41 Community)\n';
output += '- **GitHub Repository**: https://github.com/Vighneswaran-official/marisol-factory-of-fun\n';
output += '- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Web Audio API / Synth, Firebase Firestore & Auth, PWA (vite-plugin-pwa)\n';
output += '- **Key Features**:\n';
output += '  - Sisterly wellness companion (dynamic mood, affirmations, comfort corner)\n';
output += '  - Culinary & Bollywood cinema trivia engine with recipes & cucumber sandwich scoring\n';
output += '  - In-website YouTube Jukebox & live search\n';
output += '  - Level clear celebration with hero banner video\n';
output += '  - Secret locket with voice memos & notes\n';
output += '  - Glow-Up Week polaroid scrapbook\n';
output += '  - Batch 41 Unified Real-Time Group Chat (Firestore + BroadcastChannel) restricted to authenticated email users\n';
output += '  - Dedicated "📌 Pinned & Important Highlights" section with category tagging & jump-to-message navigation\n';
output += '  - Batch Wall photo & update feed with author-only controls & filters\n';
output += '  - Full PWA downloadable on Android & iOS\n\n';

output += '## Project Directory Structure\n```\n';

function listDir(dir, prefix = '') {
  const items = fs.readdirSync(dir).sort();
  for (const item of items) {
    if (ignoreDirs.has(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      output += prefix + item + '/\n';
      listDir(full, prefix + '  ');
    } else {
      output += prefix + item + '\n';
    }
  }
}
listDir(root);
output += '```\n\n';

output += '## Complete Source Code\n\n';

function dumpFiles(dir) {
  const items = fs.readdirSync(dir).sort();
  for (const item of items) {
    if (ignoreDirs.has(item)) continue;
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      dumpFiles(full);
    } else {
      const ext = path.extname(item);
      const rel = path.relative(root, full).replace(/\\/g, '/');
      if (
        codeExts.has(ext) &&
        !rel.endsWith('.zip') &&
        !rel.includes('package-lock.json') &&
        !rel.includes('CLAUDE_CODEBASE_BUNDLE.md')
      ) {
        try {
          const content = fs.readFileSync(full, 'utf8');
          if (content.length < 600000) {
            output += `### File: \`${rel}\`\n\n\`\`\`${ext.replace('.', '') || 'text'}\n${content}\n\`\`\`\n\n---\n\n`;
          }
        } catch (e) {}
      }
    }
  }
}

dumpFiles(root);

fs.writeFileSync(path.join(root, 'CLAUDE_CODEBASE_BUNDLE.md'), output, 'utf8');
console.log('Successfully generated CLAUDE_CODEBASE_BUNDLE.md! Size: ' + (output.length / 1024).toFixed(1) + ' KB');
