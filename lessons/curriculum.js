const CURRICULUM = [
  // ─── WEEK 1: AI/ML Security Foundations ───────────────────────────────────
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
  },

  {
    id: 2, week: 1, day: 2,
    title: "Prompt Injection & LLM Attacks",
    topic: "AI Security Foundations",
    tags: ["prompt-injection", "LLM", "jailbreaking"],
    summary: "Direct and indirect prompt injection, jailbreaking techniques, and layered defences for LLM-powered products.",
    keyPoints: [
      "Direct injection: attacker controls the user input field to override system instructions",
      "Indirect injection: malicious instructions embedded in external content the LLM retrieves (emails, docs, web pages)",
      "Jailbreaking techniques: role-playing (DAN), encoding attacks (Base64/leetspeak), many-shot prompting",
      "Defence layers: input sanitisation, output validation, privilege separation, prompt hardening, human-in-the-loop for high-risk actions"
    ],
    interviewQuestions: [
      "Explain the difference between direct and indirect prompt injection with a real-world example.",
      "A customer-facing LLM feature at MYOB retrieves documents to answer questions. What injection risks exist and how would you mitigate them?",
      "What does 'prompt hardening' mean and what are its limits?"
    ]
  },

  {
    id: 3, week: 1, day: 3,
    title: "Model Security & Data Poisoning",
    topic: "AI Security Foundations",
    tags: ["poisoning", "model-inversion", "supply-chain"],
    summary: "Attacks that target model integrity — from training data through inference — and how to detect and prevent them.",
    keyPoints: [
      "Training data poisoning: injecting malicious examples to skew model behaviour (clean-label vs backdoor attacks)",
      "Backdoor attacks: model behaves normally except when a specific trigger pattern is present",
      "Model inversion: recovering training data from model outputs (privacy risk for sensitive datasets)",
      "Membership inference: determining whether a specific record was in the training set",
      "Model stealing / extraction: cloning a proprietary model via query-response pairs",
      "Supply chain risk: malicious pre-trained weights on model hubs (Hugging Face, etc.)"
    ],
    interviewQuestions: [
      "What is a backdoor attack on an ML model and how would you detect one?",
      "How does model inversion differ from model stealing — and which is more concerning for MYOB?",
      "What controls would you apply when your team wants to use a pre-trained model from a public hub?"
    ]
  },

  {
    id: 4, week: 1, day: 4,
    title: "Securing the ML Pipeline",
    topic: "AI Security Foundations",
    tags: ["MLSecOps", "pipeline", "DevSecOps"],
    summary: "Security across every stage of the ML lifecycle: data ingestion, training, evaluation, deployment, and monitoring.",
    keyPoints: [
      "Threat model the full pipeline: data sources → feature engineering → training → model registry → serving → monitoring",
      "Data ingestion security: input validation, schema enforcement, provenance tracking",
      "Training environment security: isolated compute, reproducible builds, experiment tracking access control (MLflow, DVC)",
      "Model registry security: signed artefacts, immutable tags, approval workflows before promotion to production",
      "Serving security: API authentication, rate limiting, input/output logging for audit",
      "Monitoring as a security signal: sudden output distribution shifts can indicate inference-time attacks"
    ],
    interviewQuestions: [
      "Walk me through the security controls you'd apply at each stage of an ML training pipeline.",
      "How do you ensure the model that gets deployed is the exact artefact that was tested and approved?",
      "What monitoring would you put in place to detect if a model in production has been tampered with or is under attack?"
    ]
  },

  {
    id: 5, week: 1, day: 5,
    title: "AI Governance & Risk Frameworks",
    topic: "AI Security Foundations",
    tags: ["NIST", "governance", "risk", "compliance"],
    summary: "Applying NIST AI RMF, OWASP LLM Top 10, and responsible AI principles to build a defensible AI risk posture.",
    keyPoints: [
      "NIST AI RMF four functions: GOVERN, MAP, MEASURE, MANAGE — applied iteratively throughout the AI lifecycle",
      "EU AI Act risk tiers: unacceptable (banned), high-risk (financial, HR), limited-risk, minimal-risk",
      "OWASP LLM Top 10 2025: LLM01 Prompt Injection, LLM02 Insecure Output Handling, LLM03 Training Data Poisoning, LLM04 Model DoS, LLM05 Supply Chain, LLM06 Sensitive Info Disclosure, LLM07 Insecure Plugin Design, LLM08 Excessive Agency, LLM09 Overreliance, LLM10 Model Theft",
      "Responsible AI principles: fairness, transparency, accountability, privacy, safety — each has security implications",
      "AI risk differs from traditional IT risk: probabilistic outputs, emergent behaviour, data dependency"
    ],
    interviewQuestions: [
      "How would you use the NIST AI RMF to structure a risk assessment for a new LLM feature at MYOB?",
      "Which OWASP LLM Top 10 risks are most relevant to a SaaS accounting product and why?",
      "MYOB handles sensitive financial data. How does the EU AI Act (or Australian equivalents) affect your AI feature decisions?"
    ]
  },

  // ─── WEEK 2: Practical AI Security Engineering ────────────────────────────
  {
    id: 6, week: 2, day: 1,
    title: "Securing LLM-Powered Applications",
    topic: "Practical AI Security Engineering",
    tags: ["LLM", "application-security", "output-validation"],
    summary: "Practical controls for building secure LLM features: system prompt hardening, output validation, rate limiting, and abuse prevention.",
    keyPoints: [
      "System prompt confidentiality: treat the system prompt as a secret but design assuming it will leak",
      "Output validation: LLM responses should be treated as untrusted — validate structure, sanitise before rendering (XSS via LLM output is real)",
      "Content filtering: both input classifiers and output classifiers for policy violations, PII, and harmful content",
      "Rate limiting strategies: per-user token budgets, per-session limits, adaptive throttling on abuse signals",
      "Context stuffing / token budget attacks: filling context to exhaust budget or override instructions",
      "Prompt versioning and change management: treat prompt changes with the same rigor as code changes"
    ],
    interviewQuestions: [
      "How do you prevent system prompt leakage? And why is 'just keep it secret' not sufficient?",
      "A user submits an LLM response to be displayed in a dashboard. What security checks would you apply before rendering it?",
      "What rate limiting strategy would you design for a per-seat SaaS LLM feature with 10,000 business users?"
    ]
  },

  {
    id: 7, week: 2, day: 2,
    title: "RAG Security & Vector Database Threats",
    topic: "Practical AI Security Engineering",
    tags: ["RAG", "vector-db", "retrieval", "multi-tenant"],
    summary: "Security architecture for Retrieval-Augmented Generation: poisoning vectors, indirect injection via documents, and tenant isolation.",
    keyPoints: [
      "RAG pipeline attack surface: document ingestion → chunking → embedding → vector store → retrieval → generation",
      "Vector DB poisoning: injecting documents with adversarial content that will be retrieved and followed as instructions",
      "Indirect prompt injection via retrieved documents: a malicious PDF or email can hijack the LLM when retrieved",
      "Multi-tenant RAG isolation: ensuring retrieved documents respect user/tenant access controls (row-level security in vector DBs)",
      "Retrieval manipulation: if an attacker can influence what's in the vector store, they control the LLM's grounding",
      "Document provenance tracking: know where each chunk came from to detect and remove poisoned content"
    ],
    interviewQuestions: [
      "Describe a realistic vector database poisoning attack against a RAG-powered customer support system.",
      "How would you enforce tenant isolation in a multi-tenant RAG system where multiple MYOB customers share the same infrastructure?",
      "What logging and monitoring would you add to a RAG pipeline to detect retrieval-based attacks?"
    ]
  },

  {
    id: 8, week: 2, day: 3,
    title: "AI Agent Security",
    topic: "Practical AI Security Engineering",
    tags: ["agents", "autonomous-AI", "tool-use", "least-privilege"],
    summary: "Threat modelling autonomous AI agents: privilege escalation, confused deputy attacks, safe tool design, and human-in-the-loop controls.",
    keyPoints: [
      "Agentic AI threat model: agents take real-world actions (code execution, API calls, file writes, emails) — the blast radius is huge",
      "Confused deputy problem: an agent with broad permissions can be manipulated by injected instructions to act on an attacker's behalf",
      "Prompt injection in agentic workflows: indirect injection (via emails, calendar events, web content) can hijack agent actions",
      "Least-privilege for agents: scope tool permissions tightly — an agent reading docs shouldn't also be able to send emails",
      "Human-in-the-loop checkpoints: require approval for irreversible or high-impact actions (deleting data, sending external messages)",
      "Agent observability: log every tool call with inputs/outputs for audit and incident investigation"
    ],
    interviewQuestions: [
      "What is the 'confused deputy' problem in AI agents? Give a concrete example in a business context.",
      "How would you design safe tool use for an AI coding assistant that has access to MYOB's codebase and CI/CD pipeline?",
      "At what point does an AI agent need human approval before acting? How would you design that policy?"
    ]
  },

  {
    id: 9, week: 2, day: 4,
    title: "Red Teaming AI Systems",
    topic: "Practical AI Security Engineering",
    tags: ["red-team", "adversarial-testing", "automation"],
    summary: "AI red teaming methodology, automated tools, and how to build a systematic adversarial testing practice for LLMs and ML models.",
    keyPoints: [
      "AI red teaming differs from traditional pen testing: probabilistic outputs, fuzzy pass/fail, emergent behaviours, content safety + security",
      "Red team scope for LLMs: prompt injection, jailbreaks, PII extraction, harmful content generation, goal hijacking, SSRF via tool calls",
      "Automated tools: Garak (LLM vulnerability scanner), PyRIT (Microsoft's AI red teaming toolkit), PromptBench, Promptfoo",
      "Adversarial ML testing: robustness to input perturbations, fairness attacks (manipulating protected attribute predictions)",
      "Structured red team process: threat model first, define test cases, automate repeatable checks, document findings, retest after mitigations",
      "Purple teaming AI: security and product teams testing together to balance safety with utility"
    ],
    interviewQuestions: [
      "How does red teaming an LLM differ from traditional application penetration testing?",
      "You're setting up automated AI security testing in CI/CD for a new LLM feature. What tools and test categories would you include?",
      "Describe a structured red team engagement for a customer-facing AI feature at MYOB. What does success look like?"
    ]
  },

  {
    id: 10, week: 2, day: 5,
    title: "AI Incident Response",
    topic: "Practical AI Security Engineering",
    tags: ["incident-response", "detection", "model-rollback"],
    summary: "Detecting, classifying, and responding to AI-specific incidents: compromised models, inference attacks, and recovery strategies.",
    keyPoints: [
      "AI-specific incident types: model output manipulation, training data exfiltration, adversarial input campaigns, model theft via API, prompt injection attacks at scale",
      "Detection signals: output distribution drift, unusual query patterns (high entropy inputs, probing sequences), anomalous token consumption",
      "Model rollback: maintain versioned model artefacts so you can redeploy a known-good version quickly",
      "Incident classification: severity based on data exposure, regulatory impact (financial data + Privacy Act), reputational risk",
      "Post-incident analysis: was it a model issue or a prompt issue? Was training data compromised? Retrain decision framework",
      "Communication: AI incidents may require disclosure under Australian Privacy Act notifiable data breach scheme"
    ],
    interviewQuestions: [
      "What signals would tell you that a deployed model is under an adversarial attack in production?",
      "Walk me through the incident response steps if you discovered your RAG system had been feeding poisoned documents to customers for 48 hours.",
      "When would you roll back a model vs patch the application layer vs retrain? What are the tradeoffs?"
    ]
  },

  // ─── WEEK 3: Enterprise & Strategic AI Security ───────────────────────────
  {
    id: 11, week: 3, day: 1,
    title: "Enterprise AI Security Architecture",
    topic: "Enterprise & Strategic AI Security",
    tags: ["architecture", "zero-trust", "AI-gateway", "patterns"],
    summary: "Designing AI security architecture at scale: AI gateways, zero-trust for LLM services, secrets management, and multi-cloud patterns.",
    keyPoints: [
      "AI gateway pattern: a centralised policy enforcement point for all LLM API calls — handles auth, rate limiting, content filtering, logging, cost control",
      "Zero-trust for AI: never trust LLM output implicitly; validate before using in downstream systems; treat each tool call as a new trust decision",
      "Secrets management for AI: API keys for LLM providers should never be in code — use secrets managers (Vault, AWS Secrets Manager); rotate regularly",
      "Model serving security: authentication on inference endpoints, network isolation, mTLS between services",
      "Multi-cloud AI risk: vendor lock-in vs control tradeoffs; data residency requirements for Australian financial data",
      "AI asset inventory: know every model, embedding, and LLM integration in your estate — you can't secure what you can't see"
    ],
    interviewQuestions: [
      "What is an AI gateway and what security capabilities should it provide? Would you build or buy one?",
      "How would you apply zero-trust principles specifically to a microservices architecture that has multiple LLM integrations?",
      "MYOB is considering moving LLM workloads to a third-party AI platform. What security architecture review would you conduct?"
    ]
  },

  {
    id: 12, week: 3, day: 2,
    title: "AI Regulatory Compliance",
    topic: "Enterprise & Strategic AI Security",
    tags: ["compliance", "EU-AI-Act", "NIST", "privacy"],
    summary: "Navigating AI regulations: EU AI Act, Australian Privacy Act, NIST AI RMF implementation, and compliance implications for SaaS financial software.",
    keyPoints: [
      "EU AI Act (2024): four-tier risk system; high-risk AI includes credit scoring, employment, critical infrastructure — likely applies to MYOB features",
      "High-risk AI requirements: conformity assessment, technical documentation, human oversight, accuracy/robustness standards, logging obligations",
      "Australian context: Privacy Act 1988 (amended 2024), CDR (Consumer Data Right) for financial data, APRA CPS 234 for financial institutions",
      "NIST AI RMF 1.0: governance structure for AI risk management — increasingly referenced by regulators as a best-practice framework",
      "AI transparency obligations: some regulations require explainability for automated decisions affecting individuals (loans, credit)",
      "Compliance as a security input: regulatory requirements often drive security controls — use them to build the business case"
    ],
    interviewQuestions: [
      "MYOB uses AI to help classify business expenses and flag anomalies. What regulatory obligations might apply under the EU AI Act?",
      "How does Australia's Privacy Act affect how you design an LLM feature that processes customer financial records?",
      "How would you build a compliance programme for AI that doesn't slow down product velocity?"
    ]
  },

  {
    id: 13, week: 3, day: 3,
    title: "AI Security in SaaS & Fintech",
    topic: "Enterprise & Strategic AI Security",
    tags: ["SaaS", "fintech", "PII", "third-party-AI"],
    summary: "MYOB-specific context: protecting financial data in LLM workflows, third-party AI vendor risk, fraud model security, and customer trust.",
    keyPoints: [
      "Financial data in LLM prompts: transaction records, tax data, payroll — all highly sensitive; use data minimisation, anonymisation, and prompt redaction",
      "PII in prompts is a data breach risk: if the LLM provider logs prompts, sensitive data can be exposed — review vendor data retention policies",
      "Third-party AI vendor assessment: data processing agreements, model training on customer data opt-outs, subprocessor disclosure, breach notification SLAs",
      "Fraud detection models as targets: if attackers can probe the model they can find patterns to evade detection",
      "Multi-tenancy security: MYOB serves many small businesses — tenant data isolation in AI features is critical to prevent cross-customer data leakage",
      "Customer trust: AI features in financial software require a higher bar — explain what AI does with customer data in plain language"
    ],
    interviewQuestions: [
      "MYOB's AI assistant can see a customer's transaction history to answer questions. What are the security and privacy risks and how do you mitigate them?",
      "How would you assess a third-party AI provider before integrating their API into MYOB's core product?",
      "A small business owner asks: 'Does MYOB's AI train on my financial data?' How do you answer that, and how do you ensure the answer is accurate?"
    ]
  },

  {
    id: 14, week: 3, day: 4,
    title: "Building an AI Security Program",
    topic: "Enterprise & Strategic AI Security",
    tags: ["program", "policy", "SBOM", "culture"],
    summary: "Designing and running an AI security function: policies, AI-BOM, developer enablement, security review processes, and influencing without authority.",
    keyPoints: [
      "AI security policy: acceptable use of AI tools (Copilot, ChatGPT), data classification for LLM inputs, approved AI vendors, mandatory controls for AI features",
      "AI Bill of Materials (AI-BOM / ML-BOM): inventory of models, datasets, embeddings, and their provenance — critical for supply chain security",
      "Security review for AI features: threat modelling template tailored to AI, checklist based on OWASP LLM Top 10, mandatory before launch",
      "Developer enablement: 'paved road' for secure AI development — pre-approved patterns, secure libraries, training on prompt injection for devs",
      "Influencing product teams: frame AI security as risk reduction + customer trust, not as a blocker — use data, not fear",
      "Metrics: track AI security debt, red team finding remediation rate, time-to-detect AI incidents, developer training completion"
    ],
    interviewQuestions: [
      "You're starting as MYOB's first Principal AI Security Engineer. What do you do in the first 90 days?",
      "How would you design the security review process for new AI features to be both thorough and fast enough for a product team?",
      "How do you influence a product team that wants to ship an AI feature quickly but hasn't done a security review?"
    ]
  },

  {
    id: 15, week: 3, day: 5,
    title: "Mock Interview & Final Synthesis",
    topic: "Enterprise & Strategic AI Security",
    tags: ["interview", "synthesis", "MYOB", "strategy"],
    summary: "Integrating all three weeks into compelling interview answers. Principal-level behavioural questions, MYOB-specific scenarios, and final preparation tips.",
    keyPoints: [
      "Principal Engineer level: answers must show strategic thinking, cross-functional leadership, and ability to build programs — not just technical depth",
      "MYOB context: SaaS accounting/payroll for Australian SMBs, regulated financial data, rapid AI adoption by product teams",
      "Behavioural framework (STAR): Situation, Task, Action, Result — prepare 5-6 strong stories covering leadership, conflict, ambiguity, failure, and innovation",
      "Common traps: going too deep technically before establishing the business case; not mentioning stakeholder management; ignoring regulatory context",
      "Strong opening statement: be able to pitch your AI security background in 90 seconds with a clear narrative arc",
      "Questions to ask them: AI security team structure, current biggest AI risks they're facing, how security is embedded in the product development lifecycle"
    ],
    interviewQuestions: [
      "Tell me about a time you had to build security buy-in for a programme that stakeholders initially resisted.",
      "MYOB is launching an AI-powered expense categorisation feature in 6 weeks. As the Principal AI Security Engineer, what do you do?",
      "Where do you see the biggest unsolved problems in AI security over the next 3 years?"
    ]
  }
];

module.exports = CURRICULUM;
