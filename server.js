const express = require('express');
const path = require('path');
const fs = require('fs');
const CURRICULUM = require('./lessons/curriculum');
const store = require('./store');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Optionally load Sportsbet curriculum from the data volume (gitignored, never pushed to GitHub)
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
let SB_CURRICULUM = [];
const sbPath = path.join(DATA_DIR, 'sportsbet_curriculum.json');
if (fs.existsSync(sbPath)) {
  try {
    SB_CURRICULUM = JSON.parse(fs.readFileSync(sbPath, 'utf8'));
    console.log(`Loaded ${SB_CURRICULUM.length} Sportsbet lessons`);
  } catch (e) {
    console.warn('Failed to load Sportsbet curriculum:', e.message);
  }
}

const ALL_CURRICULUM = [
  ...CURRICULUM.map(l => ({ ...l, module: l.module || 'myob' })),
  ...SB_CURRICULUM.map(l => ({ ...l, module: l.module || 'sportsbet' }))
];

// ── Lessons ──────────────────────────────────────────────────────────────────

app.get('/api/lessons', (req, res) => {
  const meta = ALL_CURRICULUM.map(({ id, week, day, title, topic, tags, summary, module }) => ({
    id, week, day, title, topic, tags, summary, module
  }));
  res.json(meta);
});

app.get('/api/lessons/:id', (req, res) => {
  const lesson = ALL_CURRICULUM.find(l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

// ── Conversation history ──────────────────────────────────────────────────────

app.get('/api/history/:lessonId', (req, res) => {
  const messages = store.getMessages(parseInt(req.params.lessonId));
  res.json({ messages });
});

app.delete('/api/history/:lessonId', (req, res) => {
  store.clearMessages(parseInt(req.params.lessonId));
  res.json({ ok: true });
});

// ── Chat ──────────────────────────────────────────────────────────────────────

app.post('/api/chat', async (req, res) => {
  const { messages, lessonContext, lessonId } = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment' });
  }

  const isSportsbet = lessonContext?.module === 'sportsbet';

  const systemPrompt = isSportsbet
    ? `You are an expert AWS Cloud Security interview coach helping someone prepare for a Senior Cloud Security Engineer role at Sportsbet, a leading Australian online sports betting company.

Current lesson context:
${lessonContext ? JSON.stringify(lessonContext, null, 2) : 'General AWS cloud security coaching'}

Your role:
- Give clear, practical explanations of AWS and cloud security concepts
- Provide mock interview question practice with detailed feedback
- Use concrete examples relevant to a high-traffic gaming/betting SaaS context
- Be encouraging but honest about gaps in knowledge
- Keep responses focused and digestible (the learner has 15-20 minutes)
- When answering interview questions, model what a GREAT answer sounds like, then ask them to try

Sportsbet context: Small centralised Cloud Security team, heavy engineering bias — build automated capabilities at scale. Key domains: Vulnerability Management, Detection Engineering, Incident Response, IAM, Network Security. Python is the primary language. Role also mentors junior members and uplifts DevOps capability across the Cloud team.

Format your responses with clear structure. Use markdown for code blocks or lists when helpful.`
    : `You are an expert AI Security interview coach helping someone prepare for a Principal AI Security Engineer role at MYOB, a business management SaaS company in Australia.

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

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

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
        max_tokens: 8192,
        stream: true,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const err = await response.text();
      res.write(`data: ${JSON.stringify({ error: err })}\n\n`);
      return res.end();
    }

    let fullText = '';
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (!line.startsWith('data: ')) continue;
        const json = line.slice(6);
        if (json === '[DONE]') continue;
        try {
          const evt = JSON.parse(json);
          if (evt.type === 'content_block_delta' && evt.delta?.text) {
            fullText += evt.delta.text;
            res.write(`data: ${JSON.stringify({ token: evt.delta.text })}\n\n`);
          }
        } catch {}
      }
    }

    if (lessonId) {
      const lastUser = messages[messages.length - 1];
      if (lastUser && lastUser.role === 'user') {
        store.appendMessage(parseInt(lessonId), 'user', lastUser.content);
      }
      store.appendMessage(parseInt(lessonId), 'assistant', fullText);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Security Coach running on http://0.0.0.0:${PORT}`);
});
