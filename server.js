const express = require('express');
const path = require('path');
const CURRICULUM = require('./lessons/curriculum');
const store = require('./store');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Lessons ──────────────────────────────────────────────────────────────────

app.get('/api/lessons', (req, res) => {
  const meta = CURRICULUM.map(({ id, week, day, title, topic, tags, summary }) => ({
    id, week, day, title, topic, tags, summary
  }));
  res.json(meta);
});

app.get('/api/lessons/:id', (req, res) => {
  const lesson = CURRICULUM.find(l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

// ── Conversation history ──────────────────────────────────────────────────────

// GET  /api/history/:sessionId/:lessonId  → returns saved messages
app.get('/api/history/:sessionId/:lessonId', (req, res) => {
  const { sessionId, lessonId } = req.params;
  if (!isValidId(sessionId)) return res.status(400).json({ error: 'Invalid session ID' });
  const messages = store.getMessages(sessionId, parseInt(lessonId));
  res.json({ messages });
});

// DELETE /api/history/:sessionId/:lessonId  → clear chat for this lesson
app.delete('/api/history/:sessionId/:lessonId', (req, res) => {
  const { sessionId, lessonId } = req.params;
  if (!isValidId(sessionId)) return res.status(400).json({ error: 'Invalid session ID' });
  store.clearMessages(sessionId, parseInt(lessonId));
  res.json({ ok: true });
});

// ── Chat (proxies to Anthropic, auto-saves) ───────────────────────────────────

app.post('/api/chat', async (req, res) => {
  const { messages, lessonContext, sessionId, lessonId } = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment' });
  }

  const systemPrompt = `You are an expert AI Security interview coach helping someone prepare for a Principal AI Security Engineer role at MYOB, a business management SaaS company in Australia.

Current lesson context:
${lessonContext ? JSON.stringify(lessonContext, null, 2) : 'General AI security coaching'}

Your role:
- Give clear, practical explanations of AI security concepts
- Provide mock interview question practice with detailed feedback
- Use concrete examples relevant to a SaaS/fintech context
- Be encouraging but honest about gaps in knowledge
- Keep responses focused and digestible (the learner has 15-20 minutes)
- When answering interview questions, model what a GREAT answer sounds like, then ask them to try

Format your responses with clear structure. Use markdown for code blocks or lists when helpful.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const reply = data.content[0].text;

    // Persist conversation if a valid session is provided
    if (sessionId && isValidId(sessionId) && lessonId) {
      const lastUser = messages[messages.length - 1];
      if (lastUser && lastUser.role === 'user') {
        store.appendMessage(sessionId, parseInt(lessonId), 'user', lastUser.content);
      }
      store.appendMessage(sessionId, parseInt(lessonId), 'assistant', reply);
    }

    res.json({ content: reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Helpers ──────────────────────────────────────────────────────────────────

// Only allow alphanumeric + hyphens, max 64 chars
function isValidId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9-]{1,64}$/.test(id);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Security Coach running on http://0.0.0.0:${PORT}`);
});
