/**
 * Simple file-based conversation store.
 * Persists chat histories to /app/data/conversations.json, keyed by lessonId.
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

/** Get messages for a lesson */
function getMessages(lessonId) {
  const data = read();
  return data[lessonId] || [];
}

/** Append a message to a lesson */
function appendMessage(lessonId, role, content) {
  const data = read();
  if (!data[lessonId]) data[lessonId] = [];
  data[lessonId].push({ role, content, ts: Date.now() });
  write(data);
}

/** Delete all messages for a lesson */
function clearMessages(lessonId) {
  const data = read();
  delete data[lessonId];
  write(data);
}

module.exports = { getMessages, appendMessage, clearMessages };
