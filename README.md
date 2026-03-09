``` $$$$$$\  $$$$$$$\  $$\   $$\ $$$$$$\ $$$$$$$\  $$\   $$\ $$\     $$\  $$$$$$\  
$$  __$$\ $$  __$$\ $$ |  $$ |\_$$  _|$$  __$$\ $$$\  $$ |\$$\   $$  |$$  __$$\ 
$$ /  $$ |$$ |  $$ |$$ |  $$ |  $$ |  $$ |  $$ |$$$$\ $$ | \$$\ $$  / $$ /  $$ |
$$$$$$$$ |$$$$$$$\ |$$$$$$$$ |  $$ |  $$ |  $$ |$$ $$\$$ |  \$$$$  /  $$$$$$$$ |
$$  __$$ |$$  __$$\ $$  __$$ |  $$ |  $$ |  $$ |$$ \$$$$ |   \$$  /   $$  __$$ |
$$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |  $$ |  $$ |$$ |\$$$ |    $$ |    $$ |  $$ |
$$ |  $$ |$$$$$$$  |$$ |  $$ |$$$$$$\ $$$$$$$  |$$ | \$$ |    $$ |    $$ |  $$ |
\__|  \__|\_______/ \__|  \__|\______|\_______/ \__|  \__|    \__|    \__|  \__|
```                                                                                
                                                                                
                                                                                
                                                                                                                                                                                                    

# Abhidnya — Hyper-Local Civic Transparency Platform

> **"The Government Built It. Now You'll Know."**

Abhidnya is an AI-powered civic transparency platform that automatically notifies citizens when a government infrastructure project is completed near them — with full proof, cost, scheme details, and before/after photo evidence.

Built for **India Innovates 2026** · Municipal Corporation of Delhi
Domain: **Digital Democracy** · Problem Statement: **Hyper-Local Targeting Engine**

---

## The Problem

Every year, Delhi's municipal bodies spend thousands of crores on civic infrastructure — roads, drains, hospitals, streetlights, parks, and bridges. Yet the citizen living 50 meters away from a completed project has no idea it happened.

- No notification was sent
- No proof was shared
- No accountability existed

This creates a trust deficit — citizens believe *"nothing ever gets done"* even when significant work is completed. Field officers finish projects but get zero public recognition. Administrators have no way to measure where communication is failing.

**The problem isn't that work isn't happening. The problem is that no one is telling the people it's for.**

---

## The Solution

Abhidnya uses geo-fencing technology to draw a digital boundary around every completed government project. When a citizen physically enters that zone, their phone automatically receives a notification — no app-opening required.

The notification includes:
- Project name and government scheme
- Total cost and completion date
- Before vs. After photo proof
- Scheme-specific personalization (e.g. Ayushman Bharat beneficiaries near a new hospital get entitlement details)
- A one-tap option to verify completion or report issues

### Three Users. One Platform.

| User | Problem Solved | What They Get |
|---|---|---|
| **Citizen** | No visibility into completed work nearby | Automatic notification with proof when walking near a project |
| **Field Officer** | Completes work but gets no credit | Public record of every project completed, with photos |
| **Administrator** | No way to measure communication gaps | Live dashboard with coverage scores, complaints, officer metrics |

---

## Demo

> 🔗 **Live MVP:** [add your Lovable/Vercel link here]
> 🎥 **Demo Video:** [add your YouTube/Drive link here]

### Demo Walkthrough

**Step 1 — Admin publishes a project**
Field officer opens the Admin Panel → fills in project details (name, ward, scheme, cost, geo-fence radius) → uploads before and after photos → clicks "Publish Project & Activate Geo-fence". The project appears on the live map with a colored geo-fence circle.

**Step 2 — Standard citizen notification**
In the Citizen Notification Simulator, select "Drainage Upgrade — Dwarka Ward 12" → click Simulate. A notification appears on the phone mockup: *"A drainage upgrade was completed 200m from your location. Smart Cities Mission · ₹40 Lakh · March 2026."* Before and after photos display side by side.

**Step 3 — Personalized beneficiary notification**
Select "Government Hospital — Janakpuri Sector 9" → click Simulate. The notification changes to blue: *"A government hospital opened 400m from you. As an Ayushman Bharat beneficiary, you are entitled to free OPD and emergency care here."* Label animates in: *"Personalized because: Ayushman Bharat beneficiary detected."*

**Step 4 — Citizen reports an issue**
Click "⚠ Report Issue" inside the phone → describe the issue → submit. A floating banner confirms: *"Admin Dashboard updated — Open Complaints: 4 ↑"*. The counter persists to the Admin Panel via localStorage.

**Step 5 — Administrator reviews coverage**
Navigate to Admin Panel → Dashboard shows ward-wise coverage (Rohini at 22% in red), scheme awareness gaps (PM Awas at 19% in red), and officer performance (Anil Verma flagged for review). Red zones on the map show hover warnings: *"Only 22% of nearby citizens were notified."*

---

## Features

### 📍 Proximity-Triggered Notifications
Citizens don't search for information. Information finds them the moment they walk near a completed project. Fully passive — zero effort required.

### 📸 Before/After Photo Proof
Every project requires a mandatory geotagged photo before work starts and after completion. No photo means the project cannot be marked complete. Creates an irrefutable public record.

### 🏥 Scheme-to-Citizen Personalization
The system cross-references citizen scheme enrollments. An Ayushman Bharat beneficiary near a new government hospital gets personalized entitlement information — not a generic alert.

### 🗳️ Citizen Ground-Truth Verification
Citizens can flag incomplete or broken projects with a photo. That report auto-converts into a live complaint on the admin dashboard. Citizens become civic auditors.

### 📍 Street-Level Micro Targeting
A new streetlight on Gali no. 7 only notifies residents within 100 meters of that specific gali — not the entire ward. Precision that makes governance feel personal, not like PR.

### 📊 Ward Accountability Dashboard
Administrators see which wards have low citizen notification coverage, which schemes have zero awareness, and which officers are underperforming — all in one view.

---

## System Architecture

```
GOVERNMENT DATA SOURCES
(data.gov.in · Smart Cities Portal · PMGSY · MGNREGA MIS · MCD Reports)
        ↓
DATA INGESTION LAYER
(Scrape · Clean · Standardize project records with GPS coordinates)
        ↓
PROJECT INTELLIGENCE ENGINE
(Gemini API — attach scheme info, cost, photos, ward, coordinates)
        ↓
GEO-FENCE MANAGER
(Google Maps API — draw radius boundary around each project)
        ↓
CITIZEN DETECTION LAYER
(GPS signal triggers when citizen's device enters geo-fenced zone)
        ↓
NOTIFICATION DELIVERY
(Firebase FCM for smartphones · Twilio SMS for feature phones)
        ↓
CITIZEN FEEDBACK LOOP
(Photo upload → auto-logged as verification or complaint)
        ↓
ADMIN DASHBOARD
(Live map · Ward coverage scores · Officer performance · Complaint heatmap)
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js + Tailwind CSS | Citizen portal and admin dashboard |
| Charts | Recharts | Ward coverage, scheme awareness, donut charts |
| Backend | Node.js + Express.js | REST APIs, geo-fence logic, SLA management |
| Database | PostgreSQL + PostGIS | Project records with geographic coordinates |
| Maps | Google Maps Geofencing API | Zone boundaries, citizen entry detection |
| Satellite | ISRO Bhuvan API | India GIS data, before/after aerial imagery |
| Push Notifications | Firebase FCM | Real-time alerts for smartphone users |
| SMS Fallback | Twilio API | Notifications for feature phone users |
| AI Layer | Google Gemini API | Auto-generate Hindi/English notification text |
| Gov Data | data.gov.in API | Publicly accessible project records |
| Hosting | Vercel | Frontend deployment |

---

## Data Sources

All data sources used are **publicly accessible** — no government API approval required for prototype.

| Source | Data | URL |
|---|---|---|
| Open Government Data Platform | Project records across departments | data.gov.in |
| Smart Cities Mission Portal | Urban infrastructure projects | smartcities.gov.in |
| PMGSY | Road construction data | pmgsy.nic.in |
| MGNREGA MIS | Asset creation at panchayat level | mahatma.nic.in |
| MCD Budget Reports | Ward-wise expenditure | mcdonline.nic.in |
| ISRO Bhuvan | GIS and satellite imagery | bhuvan.nrsc.gov.in |
| UMANG App Framework | Government app integration | web.umang.gov.in |

---

## Project Structure

```
abhidnya/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── MapView.jsx           # Live map + notification simulator
│   │   └── AdminPanel.jsx        # Dashboard, add project, projects list
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx       # Sidebar project cards
│   │   ├── PhoneMockup.jsx       # Notification simulator phone UI
│   │   ├── NotificationBanner.jsx # Floating top banner
│   │   ├── charts/
│   │   │   ├── WardCoverageChart.jsx
│   │   │   ├── CoverageDonut.jsx
│   │   │   └── SchemeAwarenessChart.jsx
│   │   └── tables/
│   │       ├── OfficerTable.jsx
│   │       └── ProjectsTable.jsx
│   ├── data/
│   │   └── projects.js           # Hardcoded project data
│   └── utils/
│       └── localStorage.js       # Complaint counter persistence
├── public/
├── README.md
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/indieTea/abhidnya.git
cd abhidnya

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository directly at [vercel.com](https://vercel.com) for automatic deployments.

---

## Roadmap

| Phase | Timeline | Milestone |
|---|---|---|
| **Phase 1 — MVP** | 0–3 months | Core geo-fencing, notification engine, admin panel |
| **Phase 2 — Delhi Pilot** | 3–6 months | Integration with MCD data, 10 ward pilot, SMS rollout |
| **Phase 3 — National Scale** | 6–18 months | All Indian cities, UMANG integration, multilingual support |

---

## Impact

- **2 crore+** Delhi residents across 272 wards
- **90 days** from approval to city-wide deployment
- **Zero cost** to citizen — works on feature phones via SMS
- **Scalable** to any Indian city with government project data
- **Languages** — Hindi and English at launch, expandable to 8 Indian languages

---

## Team indieTea

| Name | College |
|---|---|
| Dawange Vaibhav | Sanjivani College of Engineering, Kopargaon |
| Metkar Nikhil | Sanjivani College of Engineering, Kopargaon |
| More Nishad | Sanjivani College of Engineering, Kopargaon |
| Nere Tejas | Sanjivani College of Engineering, Kopargaon |

Built for **India Innovates 2026** — Bharat Mandapam, New Delhi · 28 March 2026

---

## License

MIT License — free to use, modify, and distribute.

---

*All data sources are publicly accessible. All APIs have free tiers.*
**Abhidnya can be piloted across all 272 Delhi wards within 90 days of approval.**
