
# 🛡️ GhostPilot Auto

> The ultimate open-source antidetect browser automation platform for growth hackers, marketers, and power users.

GhostPilot Auto is a full-featured, local-first automation OS with stealth browser profiles, visual scripting, fingerprint spoofing, proxy rotation, and AI script generation — all with zero cloud lock-in or monthly fees.

---

## 🚀 Features

- ✅ Chromium-based isolated browser profiles
- ✅ Smart fingerprint rotation (with stealth scoring)
- ✅ Human-like mouse and interaction via GhostCursor
- ✅ Proxy rotation pools (per-profile or global)
- ✅ AI Script Assistant (type tasks in plain English → automation)
- ✅ Visual automation builder (Blockly-based)
- ✅ REST API to control automations remotely
- ✅ Built-in script marketplace + script validator
- ✅ Dropbox sync + optional cloud backup
- ✅ Hosted admin dashboard with login & role system
- ✅ Team collaboration (Admin / Viewer)
- ✅ Script logs, stealth score analytics, and test tools (Whoer / AmIUnique)

---

## 🧠 Ideal For

- Ad/funnel/account managers with multiple Facebook, Gmail, Hotmail logins
- Automation pros building custom workflows
- Growth hackers who want stealth, control, and no cloud surveillance
- Devs who want full customization + headless distributed task runners

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/ghostpilot-auto.git
cd ghostpilot-auto
npm install
npm start
```

To use the hosted dashboard:

```bash
cd ghostpilot-auto-hosted
npm install
node app.js
```

> Access at: `http://localhost:4000/login` (default user: `admin / admin123`)

---

## 🛠️ Tech Stack

- Electron + Puppeteer + Chromium
- Node.js (Express.js, APIs)
- GhostCursor
- Dropbox SDK (optional)
- EJS templating (for hosted dashboard)
- JSON-based profile + script storage

---

## 📁 Project Structure

```
ghostpilot-auto/
├── automation/              # Script runner + flows
├── profiles/                # Encrypted user profiles
├── server/                  # API, worker, queue
├── src/ui/                  # Frontend HTML UIs
├── utils/                   # Fingerprint, behavior, scoring
├── logs/                    # Execution + stealth data
└── ghostpilot-auto-hosted/  # Hosted admin dashboard (optional)
```

---

## 🎯 Roadmap

- [x] Profile launcher + encryption
- [x] Visual automation builder
- [x] AI script assistant
- [x] Proxy + fingerprint rotation
- [x] Hosted dashboard with team roles
- [x] Script marketplace
- [x] Stealth score dashboard
- [ ] Dockerized deploy (coming)
- [ ] SaaS licensing wrapper (coming)

---

## 📜 License

MIT for personal use — Commercial license required for resell or SaaS hosting.  
Contact: `yourname@yourdomain.com`

---

## 👋 Contributing

Want to improve it, fork it, or integrate your own fingerprint engine?  
Submit a pull request or email us for collaboration.

---

## 🌍 Learn More

- [Website (Coming Soon)](https://ghostpilot.app)
- [Telegram](https://t.me/ghostpilot)
- [Twitter](https://twitter.com/ghostpilotapp)

---

### ✨ “Ghost your tracks. Pilot your empire.”  

---

## 🧑‍🏫 Getting Started (For Beginners)

You don't need to be a developer to use GhostPilot — here's how:

### 🖥 1. Download and Install

- Make sure you have **Node.js** installed. Download from: https://nodejs.org
- Then install GhostPilot:

```bash
# Open your terminal (Command Prompt or Terminal app)
git clone https://github.com/yourusername/ghostpilot-auto.git
cd ghostpilot-auto
npm install
npm start
```

> This will open the GhostPilot Electron desktop app.

---

### 🌐 2. Use the Hosted Dashboard (Optional)

If you prefer using GhostPilot from your browser:

```bash
cd ghostpilot-auto-hosted
npm install
node app.js
```

- Open your browser and go to: `http://localhost:4000/login`
- Login using:  
  Username: `admin`  
  Password: `admin123`

---

### 👨‍💻 3. What You Can Do

- 📂 Add browser profiles (like Facebook, Gmail accounts)
- 🔁 Attach proxies and fingerprints
- 🤖 Write automation in plain English or use Blockly builder
- 🧠 Validate and run your automation scripts
- 🧪 Test your profile against real detection tools
- 👥 Manage team users (Admin / Viewer)

---

### 💡 Pro Tips

- Use **Script Marketplace** to download or upload new flows
- Check **Fingerprint Score** to avoid detection
- Use **AI Assistant** to create bots from plain English
- Want to automate from your phone? Use the hosted version + Telegram integration (coming soon)

---

## ❓ Need Help?

DM on Telegram: [@ghostpilot](https://t.me/ghostpilot)  
More docs coming soon at: [https://ghostpilot.app](https://ghostpilot.app)

