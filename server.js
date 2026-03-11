const express = require('express');
const path = require('path');
const CURRICULUM = require('./lessons/curriculum');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API: Get all lessons (metadata only)
app.get('/api/lessons', (req, res) => {
  const meta = CURRICULUM.map(({ id, week, day, title, topic, tags, summary }) => ({
    id, week, day, title, topic, tags, summary
  }));
  res.json(meta);
});

// API: Get a single lesson
app.get('/api/lessons/:id', (req, res) => {
  const lesson = CURRICULUM.find(l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  res.json(lesson);
});

// API: Chat with Claude about a lesson (proxy to Anthropic)
app.post('/api/chat', async (req, res) => {
  const { messages, lessonContext } = req.body;
  
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
    res.json({ content: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Security Coach running on http://0.0.0.0:${PORT}`);
});
