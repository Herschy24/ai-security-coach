const CURRICULUM = [
  // WEEK 1: AI/ML Security Foundations
  {
    id: 1, week: 1, day: 1,
    title: "AI Threat Landscape Overview",
    topic: "AI Security Foundations",
    tags: ["AI", "threat-modelling", "fundamentals"],
    summary: "The unique attack surface of AI/ML systems and why traditional security models fall short.",
    keyPoints: [
      "AI systems introduce new attack vectors: model poisoning, adversarial inputs, prompt injection",
      "The ML pipeline has multiple stages each with distinct security concerns",
      "Difference between securing AI vs securing traditional software",
      "OWASP Top 10 for LLM Applications as a starting framework"
    ],
    interviewQuestions: [
      "How does securing an AI system differ from securing a traditional API?",
      "What is prompt injection and why is it uniquely dangerous in LLM-based products?",
      "Walk me through the OWASP LLM Top 10 risks you consider most critical."
    ]
  }
];

module.exports = CURRICULUM;
