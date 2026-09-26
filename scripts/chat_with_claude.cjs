#!/usr/bin/env node

/**
 * Interactive Terminal Chat with Claude
 * Powered by Anthropic Messages API
 * 
 * Automatically loads project context from CLAUDE.md / CHAT_WITH_CLAUDE.md
 * Zero extra dependencies (uses native Node.js https and readline).
 */

const https = require('https');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Helper to load .env variables if present
function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

// Helper to load system prompt context
function loadSystemContext() {
  const candidates = ['CHAT_WITH_CLAUDE.md', 'CLAUDE.md'];
  for (const file of candidates) {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        return content.slice(0, 15000); // Keep reasonable system prompt size
      } catch (e) {}
    }
  }
  return 'You are Claude, assistant for the Marisol Factory of Fun project.';
}

const systemContext = loadSystemContext();
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-3-7-sonnet-20250219';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\n\x1b[36mYou ➜ \x1b[0m'
});

function askApiKey() {
  return new Promise((resolve) => {
    if (process.env.ANTHROPIC_API_KEY) {
      return resolve(process.env.ANTHROPIC_API_KEY);
    }
    const tempRl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log('\n\x1b[33m🔑 Anthropic API Key not detected in environment or .env file.\x1b[0m');
    tempRl.question('Please enter your ANTHROPIC_API_KEY (sk-ant-...): ', (key) => {
      tempRl.close();
      const trimmedKey = key.trim();
      process.env.ANTHROPIC_API_KEY = trimmedKey;
      resolve(trimmedKey);
    });
  });
}

const conversationHistory = [];

function streamClaudeResponse(apiKey, messages) {
  return new Promise((resolve, reject) => {
    const requestBody = JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      system: `You are Claude, an expert software architect helping with the "Marisol: Factory of Fun" web application. Context:\n\n${systemContext}`,
      messages: messages,
      stream: true
    });

    const options = {
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };

    process.stdout.write('\x1b[35mClaude ➜ \x1b[0m');
    let fullReply = '';

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errData = '';
        res.on('data', chunk => errData += chunk);
        res.on('end', () => {
          console.error(`\n\x1b[31mAPI Error (${res.statusCode}): ${errData}\x1b[0m`);
          resolve(null);
        });
        return;
      }

      let buffer = '';
      res.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6);
            if (dataStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                process.stdout.write(parsed.delta.text);
                fullReply += parsed.delta.text;
              }
            } catch (err) {}
          }
        }
      });

      res.on('end', () => {
        process.stdout.write('\n');
        resolve(fullReply);
      });
    });

    req.on('error', (err) => {
      console.error(`\n\x1b[31mNetwork Error: ${err.message}\x1b[0m`);
      resolve(null);
    });

    req.write(requestBody);
    req.end();
  });
}

async function startChat() {
  console.log('\n\x1b[1m\x1b[32m🌸 Welcome to Claude Chat for Marisol: Factory of Fun 🌸\x1b[0m');
  console.log(`\x1b[90mModel: ${MODEL} | Project Context: Loaded (${(systemContext.length / 1024).toFixed(1)} KB)\x1b[0m`);
  console.log('\x1b[90mCommands: "exit" / "quit" to leave, "clear" to reset history, "context" to view prompt.\x1b[0m');

  const apiKey = await askApiKey();
  if (!apiKey) {
    console.log('\x1b[31mNo API key provided. Exiting.\x1b[0m');
    process.exit(1);
  }

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim();
    if (!input) {
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('\x1b[33mGoodbye! ✨\x1b[0m');
      process.exit(0);
    }

    if (input.toLowerCase() === 'clear') {
      conversationHistory.length = 0;
      console.log('\x1b[32mConversation history cleared!\x1b[0m');
      rl.prompt();
      return;
    }

    if (input.toLowerCase() === 'context') {
      console.log('\n\x1b[34m--- System Context Preview ---\x1b[0m');
      console.log(systemContext.slice(0, 500) + '...\n');
      rl.prompt();
      return;
    }

    conversationHistory.push({ role: 'user', content: input });

    try {
      const reply = await streamClaudeResponse(apiKey, conversationHistory);
      if (reply) {
        conversationHistory.push({ role: 'assistant', content: reply });
      }
    } catch (e) {
      console.error('\x1b[31mAn error occurred during response:\x1b[0m', e);
    }

    rl.prompt();
  });
}

startChat();
