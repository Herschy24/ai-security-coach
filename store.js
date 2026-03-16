/**
 * Simple file-based conversation store.
 * Persists session chat histories to /app/data/conversations.json
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const FILE = path.join(DATA_DIR, 'conversations.json');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function read() {
  ensureDir();
  if (!fs.existsSync(FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return {};
  }
}

function write(data) {
  ensureDir();
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf8');
}

function key(sessionId, lessonId) {
  return `${sessionId}:${lessonId}`;
}

/** Get messages for a session + lesson */
function getMessages(sessionId, lessonId) {
  const data = read();
  return data[key(sessionId, lessonId)] || [];
}

/** Append a message to a session + lesson */
function appendMessage(sessionId, lessonId, role, content) {
  const data = read();
  const k = key(sessionId, lessonId);
  if (!data[k]) data[k] = [];
  data[k].push({ role, content, ts: Date.now() });
  write(data);
}

/** Delete all messages for a session + lesson */
function clearMessages(sessionId, lessonId) {
  const data = read();
  delete data[key(sessionId, lessonId)];
  write(data);
}

module.exports = { getMessages, appendMessage, clearMessages };
