# 🛡️ AI Security Coach

A self-hosted daily lesson app to prepare for AI Security

**15–20 minute lessons** covering AI/ML security, cloud security (Azure/AWS/GCP), threat modelling, security frameworks, red teaming, and leadership.

---

## 🚀 Quick Start (Proxmox / any Linux server)

### 1. Clone the repo

```bash
git clone https://github.com/Herschy24/ai-security-coach.git
cd ai-security-coach
```

### 2. Set your Anthropic API key

Get a key from https://console.anthropic.com

```bash
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
```

### 3. Run with Docker Compose

```bash
docker compose up -d
```

App runs at **http://YOUR_SERVER_IP:3000**

---

## 🔄 Auto-deploy from GitHub

Set these GitHub repository secrets (Settings → Secrets):

Sycret | Value
|--------|-------|
| `PROXMOX_HOST`  | Your server IP or hostname |
| `PROXMOX_USER`  | SSH username (e.g. `root`) |
| `PROXMOX_SSH_KEY` | Your private SSH key |

Every push to `main` will auto-deploy via GitHub Actions.

```bash
# On your Proxmox server
curl -fsSL https://get.docker.com | sh
git clone https://github.com/Herschy24/ai-security-coach.git ~/ai-security-coach
cd ~/ai-security-coach
echo "ANTHROPIC_API_KEY=sk-ant-your-key" > .env
docker compose up -d
```

---

## 📘	Curriculum

### Week 1 — AI/ML Security Foundations
- Day 1: AI Tthreat Landscape Overview
- Day 2: Prompt Injection & Jailbreaking
- Day 3: Model Context Protocol (MCP) Security
- Day 4: Agent-to-Agent (A2A) Architecture Security
- Day 5: Vector Databases & RAG Security

### Week 2 ℔ Cloud Security
- Day 1: Azure AI Security Controls
- Day 2: AWS AI/ML Security
- Day 3: GCP AI Security & Vertex AI
- Day 4: AI Threat Modelling Deep Dive
- Day 5: Security Frameworks

### Week 3 ℔ Red Teaming, Governance & Leadership
- Day 1: Red/Purple Teaming AI Systems
- Day 2: Supply Chain Security
- Day 3: Influencing Engineering Teams
- Day 4: Data Privacy & AI (Australian Context)
- Day 5: MYOB-Specific Preparation
