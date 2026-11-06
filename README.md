# Intelligent Civic Complaint Prioritization System

An AI-powered civic grievance management and prioritization platform designed for municipal governments, smart cities, and public works departments. The system provides automated NLP text classification, transparent explainable priority scoring, TF-IDF cosine-similarity duplicate detection, full complaint lifecycle tracking, and interactive Chart.js analytics.

---

## 🏛️ System Architecture & Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18, Tailwind CSS, Chart.js 4, Lucide Icons | Responsive single-page application with modern government portal design |
| **Backend** | Python Flask, RESTful APIs, Flask-CORS | Modular REST service with HMAC token-based auth & role-based access control |
| **Database** | SQLite 3 | WAL indexing, foreign keys, and audit logging tables |
| **Machine Learning** | Scikit-Learn (`TfidfVectorizer`, `LogisticRegression`) | Pipeline persisted via **Joblib** for high-speed inference |
| **NLP Classification** | Multinomial Text Classification | Classifies grievances across 5 municipal civic categories |
| **Duplicate Detection** | TF-IDF N-Grams + Cosine Similarity | Flags complaints $\ge 75\%$ similarity without auto-deleting |
| **Priority Engine** | 4-Dimension Quantitative Weighted Model | Safety Risk, Severity, Public Impact, Waiting Time ($0-100$ pts) |

---

## 📁 Complete Project Directory Structure

```
civic complaint/
├── backend/
│   ├── app.py                      # Flask REST API server, SPA catch-all, & auth middleware
│   ├── config.py                   # File paths, upload limits, secret keys, categories
│   ├── database.py                 # SQLite schema initialization (users, complaints, history)
│   ├── seed_data.py                # Pre-populated realistic complaints & demo user accounts
│   ├── test_complete_system.py     # End-to-end test suite verifying all 12 core system requirements
│   ├── test_all_endpoints.py       # Comprehensive test suite covering all 10 REST API endpoints
│   ├── test_ai_modules.py          # Machine learning & NLP module verification suite
│   ├── test_api.py                 # Rapid regression test suite for core workflows
│   ├── models/
│   │   ├── classifier.py           # NLP text classifier training & inference (Scikit-Learn)
│   │   ├── priority_engine.py      # Multi-factor explainable priority calculator
│   │   └── duplicate_detector.py   # TF-IDF + Cosine similarity duplicate detection engine
│   ├── ai_models/
│   │   └── complaint_classifier.pkl# Serialized Scikit-Learn model artifact (Joblib)
│   ├── uploads/                    # Secure storage directory for uploaded evidence photos
│   └── civic_complaints.db         # SQLite persistent database file
├── frontend/
│   ├── dist/
│   │   └── index.html              # Full production SPA with React 18, Tailwind CSS & Chart.js
│   ├── src/
│   │   ├── App.jsx                 # Modular React application component
│   │   ├── main.jsx                # Vite mount root
│   │   ├── index.css               # Tailwind CSS directives
│   │   └── LucideIcons.jsx         # Lucide SVG icon definitions
│   ├── package.json                # Frontend package metadata
│   └── vite.config.js              # Vite configuration
├── requirements.txt                # Complete Python dependencies
├── run.bat                         # Windows 1-click launcher script
└── README.md                       # Comprehensive system documentation
```

---

## 🚀 Core Modules & Functional Capabilities

### 1. Citizen Portal
- **Citizen Registration & Login**: Stateless HMAC Bearer tokens with securely salted and hashed passwords (`werkzeug.security`).
- **Smart Grievance Submission**:
  - Live AI preview while typing (instant category detection, priority score estimate, duplicate alerts).
  - Title, description, category selector (with AI Auto-Classification mode).
  - Spatial location & landmark fields for municipal sector dispatch.
  - Optional evidence photo upload (PNG, JPG, WEBP) with mime-type validation.
- **Unique Complaint ID Generation**: Standardized municipal tracking identifiers (e.g. `CIVIC-2026-1001`).
- **Interactive Tracking Stepper**: Visual timeline progression (`Pending` ➔ `Verified` ➔ `In Progress` ➔ `Resolved` / `Rejected`).
- **Complete Audit Trail**: Detailed timestamped history logs showing which officer reviewed the complaint and their notes.
- **My Complaints History**: Citizen portal view displaying all filed reports and their live resolution statuses.

### 2. AI Classification Module (NLP)
Automatically classifies complaints into 5 core civic categories using a Scikit-Learn TF-IDF + Logistic Regression pipeline:
1. **Road Damage**: Potholes, asphalt cracks, road cave-ins, sinkholes, broken pavers.
2. **Garbage Accumulation**: Overflowing dumpsters, rotting waste, illegal dumping, public litter.
3. **Water Leakage**: Burst municipal pipelines, drinking water wastage, cracked mains, broken valves.
4. **Blocked Drainage**: Choked stormwater drains, sewage backflow, submerged manholes, culvert clogs.
5. **Broken Streetlights**: Dark avenues, flickering lamps, exposed electric wires, knocked-down poles.

- **Persistence**: Serialized to disk using **Joblib** (`complaint_classifier.pkl`).
- **Confidence Scoring**: Outputs calibrated class probability distribution (`category_confidence` %) displayed to both citizens and staff.

### 3. Multi-Factor Priority Prediction Module
Calculates a weighted, explainable priority score ($0 - 100$) based on 4 quantitative civic dimensions each scored on a clean $0 - 10$ scale:

$$\text{Priority Score} = (\text{Safety Risk} \times 3.5) + (\text{Severity} \times 2.5) + (\text{Public Impact} \times 2.5) + (\text{Waiting Time} \times 1.5)$$

- **Safety Risk ($0 - 10$ pts)**: Analyzes life-hazard keywords (live wires, electric shock, deep sinkholes, open manholes) and proximity to sensitive public zones (schools, hospitals, clinics).
- **Complaint Severity ($0 - 10$ pts)**: Analyzes physical scale of operational disruption (burst mains, complete road blockages, knee-deep sewage inside buildings).
- **Public Impact ($0 - 10$ pts)**: Triage based on arterial roads, highways, main junctions, commercial hubs, and high commuter footfall.
- **Waiting Time Boost ($0 - 10$ pts)**: Dynamically escalates unresolved complaints as days elapse ($+2.5$ pts for 2 days, up to $+10.0$ pts for $>9$ days) to prevent backlog stagnation.
- **Priority Bands (Exact Prompt Specifications)**:
  - 🔴 **Critical**: $80 - 100$ pts
  - 🟠 **High**: $60 - 79$ pts
  - 🟡 **Medium**: $40 - 59$ pts
  - 🔵 **Low**: $0 - 39$ pts
- **Explainability**: Outputs a structured explanation detailing exact sub-scores and triggering context.

### 4. Duplicate Detection Module
- Evaluates incoming reports against all active complaints using **TF-IDF Vectorization** (unigrams + bigrams) and **Pairwise Cosine Similarity**.
- **75% Threshold**: Flags potential duplicates if similarity is **$\ge 75\%$**.
- **Returns**: Similar Complaint ID, Similarity Percentage, and the Existing Complaint Description.
- **Guaranteed Safety**: Does NOT automatically merge or delete complaints; staff retains full review and linking authority.

### 5. Staff Command Center & Complaint Dossier
- **Staff Authentication**: Secure role-based access for municipal officers.
- **KPI Summary Cards**: Total Complaints, Pending Verification, In Progress, Resolved, Critical & High, Flagged Duplicates.
- **Recalculate Aging Priorities**: 1-click button to re-evaluate waiting scores across all active tickets.
- **Multi-Filter & Search**: Query by ID, keyword, category, priority level, status, or duplicate status.
- **Complaint Details Page**:
  - Full complaint information and citizen contact.
  - AI-predicted category and NLP confidence score.
  - Priority breakdown and transparent score explanation.
  - Evidence photo preview with high-resolution lightbox.
  - Duplicate detection candidates with percentage similarity badges.
  - Complete status audit trail.
  - Dedicated **Verify Complaint**, **Reject Complaint**, and **Update Status** action buttons.

### 6. Analytics Dashboard (Chart.js)
1. **Complaints by Category**: Doughnut chart showing distribution across the 5 categories.
2. **Complaints by Priority**: Color-coded Bar chart for Critical, High, Medium, and Low issues.
3. **Pending vs Resolved Resolution Pipeline**: Polar Area distribution chart.
4. **Monthly Grievance Trends**: Multi-dataset Line chart tracking registered vs resolved complaints.

---

## ⚡ Installation & Quick Start

### Prerequisites
- Python 3.10 or higher
- Modern Web Browser (Chrome, Edge, Firefox, Safari)

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Seed Sample Complaints & Demo Accounts
```bash
python backend/seed_data.py
```
*(Initializes the SQLite schema, trains and serializes the Scikit-Learn NLP model, and inserts 15 realistic civic complaints including verified duplicate pairs).*

### 3. Run Application Server
```bash
python backend/app.py
```
*(Or double-click `run.bat` on Windows for automated environment setup and execution).*

### 4. Access Application in Browser
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Municipal Staff** | `staff@civic.gov` | `staff123` | Full Staff Dashboard, Verify/Reject Actions, Priority Recalculation, Status Updates |
| **Field Inspector** | `inspector.elena@civic.gov` | `staff123` | Field verification, status changes, inspector remarks |
| **Citizen (Demo)** | `citizen@example.com` | `citizen123` | Grievance submission, public tracking, submission history |
| **Citizen 2** | `sarah.j@example.com` | `citizen123` | Grievance submission, tracking |

*(The Sign-In modal also includes 1-Click "Demo Login" buttons for instant testing without manual typing).*

---

## 📡 REST API Reference

### 1. Authentication
- `POST /api/register`: Register new citizen or staff account.
- `POST /api/login`: Authenticate and receive HMAC Bearer token.
- `GET /api/auth/me`: Validate current session and retrieve profile.

### 2. Grievance Management
- `POST /api/complaints`: Submit new complaint (JSON or `multipart/form-data` with image). Runs AI category prediction, priority scoring, and duplicate detection.
- `POST /api/complaints/preview`: Real-time typing preview of AI classification and priority score.
- `GET /api/complaints`: Retrieve complaints with filtering by `category`, `priority`, `status`, `duplicate`, and `search`.
- `GET /api/complaints/{id}`: Retrieve detailed complaint dossier by integer primary key or complaint ID.
- `GET /api/complaints/track/{complaint_id}`: Public tracking endpoint returning status progression and history timeline.
- `GET /api/complaints/{id}/duplicates`: Retrieve cosine similarity matches for a complaint.
- `GET /api/complaints/my`: Retrieve grievances filed by the authenticated citizen.

### 3. Staff Actions (Role-Protected: `@staff_required`)
- `PUT /api/complaints/{id}/verify`: Mark complaint as verified after inspection.
- `PUT /api/complaints/{id}/status`: Update status (`Pending`, `Verified`, `In Progress`, `Resolved`, `Rejected`) with inspector notes.
- `PATCH /api/complaints/{id}/duplicate`: Link or dismiss duplicate complaint relationship.
- `POST /api/staff/recalculate-priorities`: Re-evaluate waiting time scores across all active tickets.

### 4. Analytics
- `GET /api/analytics`: Complete analytics package (KPI summaries and Chart.js datasets).
- `GET /api/analytics/summary`: KPI summary metrics for quick dashboard rendering.
- `GET /api/analytics/charts`: Datasets formatted for Chart.js components.

---

## 🧪 Automated Testing & Verification Results

All automated test suites pass with **100% success**:

### Test Suites Execution Commands:
```bash
# 1. Complete End-to-End System Validation Suite (12 Core Requirements)
python backend/test_complete_system.py

# 2. All 10 REST API Endpoints Test Suite
python backend/test_all_endpoints.py

# 3. AI & Machine Learning Modules Test Suite
python backend/test_ai_modules.py

# 4. Core Backend Workflow Regression Test Suite
python backend/test_api.py
```

### Verification Matrix (12/12 Requirements Verified):

| # | Verification Check | Status | Details |
| :---: | :--- | :---: | :--- |
| **1** | Citizen Registration and Login | ✅ PASSED | Hashed passwords, token generation, duplicate email rejection (409), invalid password handling (401) |
| **2** | Complaint Submission | ✅ PASSED | Form submission, unique ID generation (`CIVIC-2026-XXXX`), initial Pending status, AI results returned |
| **3** | AI Category Prediction | ✅ PASSED | Scikit-Learn TF-IDF + Logistic Regression classified all 5 civic categories with high confidence |
| **4** | Priority Calculation | ✅ PASSED | 4 dimensions (0-10), weighted formula (0-100), verified all 4 bands (Critical, High, Medium, Low) |
| **5** | Duplicate Complaint Detection | ✅ PASSED | TF-IDF + Cosine similarity flagged duplicates $\ge 75\%$; unique cases unflagged; no auto-deletion |
| **6** | Database Storage | ✅ PASSED | SQLite tables (`users`, `complaints`, `complaint_status_history`), foreign keys, secure password hashes |
| **7** | Staff Authentication & RBAC | ✅ PASSED | Municipal staff access permitted; citizen and anonymous forbidden (403/401) on staff endpoints |
| **8** | Complaint Verification | ✅ PASSED | `PUT /api/complaints/{id}/verify` transitioned status to `Verified` and logged officer audit note |
| **9** | Status Updates & History | ✅ PASSED | Full transition pipeline (`Pending` ➔ `Verified` ➔ `In Progress` ➔ `Resolved`) logged in history |
| **10** | Complaint Tracking | ✅ PASSED | Public portal `GET /api/complaints/track/{complaint_id}` returned current status, priority, and timeline |
| **11** | Analytics Dashboard | ✅ PASSED | KPI summary counters and Chart.js datasets (Category, Priority, Status, Monthly trends) verified |
| **12** | Image Upload Validation | ✅ PASSED | Multipart upload saved to `uploads/`, accessible via HTTP, invalid extensions (.exe) rejected with 400 |

---

## 🌐 Online Deployment Guide (Publish & Get a Public URL)

The project includes all production deployment files:
- `Procfile` (for Render, Railway, and Heroku)
- `Dockerfile` (for container platforms like Railway, Fly.io, Cloud Run)
- `render.yaml` (Render Blueprint IaC)
- `.gitignore` (excludes caches and virtual environments)

### Option 1: Deploy on Render (Recommended - Free & Fast)
1. Push this project folder to your **GitHub** account.
2. Sign up / Log in to [Render](https://render.com).
3. Click **New +** ➔ **Web Service**.
4. Connect your GitHub repository.
5. Configure the service:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn --chdir backend app:app`
   - **Instance Type**: `Free`
6. Click **Deploy Web Service**.
7. In ~2 minutes, your service will be live at:
   `https://civic-complaint-system.onrender.com`

*(The application automatically initializes the SQLite schema, loads the Scikit-Learn NLP model, and seeds demo accounts upon first start).*

### Option 2: Deploy on Railway
1. Sign up / Log in to [Railway](https://railway.app).
2. Click **New Project** ➔ **Deploy from GitHub repo**.
3. Select this repository. Railway automatically detects the `Procfile` / `Dockerfile`.
4. Click **Generate Domain** in Service Settings to get your public HTTPS URL (`https://your-app.up.railway.app`).

### Option 3: Instant Public URL with Zero Setup (Local Tunnel)
If you want to demo your live local instance immediately to someone over the internet without setting up cloud accounts:
1. Start the server locally: `python backend/app.py`
2. Open a second terminal window and run:
   ```bash
   npx localtunnel --port 5000
   ```
   *(Or using Cloudflare Tunnel: `cloudflared tunnel --url http://localhost:5000`)*
3. You will instantly receive a public HTTPS URL (e.g. `https://your-session.loca.lt`) accessible from anywhere!

---

## 🛡️ License & Copyright
Developed for public sector civic administration and municipal smart city infrastructure. Open-source under the MIT License.
