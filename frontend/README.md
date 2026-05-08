# MetalMindTech Agency — Frontend (`metalmindtech-agency-front`)

Luxurious dark-theme AI agency landing page for **www.metalmindtech.com**.
Built on React 19 + Tailwind + shadcn/ui. Lead capture is handled by a
**Vercel serverless function** that forwards submissions to your inbox via
[Resend](https://resend.com) — no FastAPI / MongoDB backend required for
production.

The Forge (`ark.metalmindtech.com`) is a separate deployment and is linked
from the navigation, hero, final CTA and footer.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 19, Create React App (craco), TailwindCSS, shadcn/ui, sonner |
| Fonts | Cabinet Grotesk (Fontshare) + IBM Plex Sans/Mono (Google Fonts) |
| Lead capture | `/api/leads` Vercel Serverless Function (Node 20) → Resend |
| Hosting | Vercel (frontend + serverless function in one project) |

---

## Vercel Deployment — Path B (recommended, self-contained)

### 1. Import the repository

1. In Vercel, click **Add New → Project** and import
   `techshare101/metalmindtech-agency-front`.
2. **Framework Preset**: `Create React App`
3. **Root Directory**: leave at `./` if this repo's `package.json` is at
   the root. If you push the entire `/app` folder of the Emergent project,
   set Root Directory to `frontend` instead.
4. **Build Command**: `yarn build`
5. **Install Command**: `yarn install`
6. **Output Directory**: `build`
7. **Node.js Version**: `20.x`

> A `vercel.json` is already included with the SPA rewrite rule and serverless
> function memory/timeout settings — Vercel will auto-apply it.

### 2. Set environment variables (Project → Settings → Environment Variables)

Apply each variable to **Production**, **Preview** and **Development**.

| Key | Required? | Example |
|---|---|---|
| `REACT_APP_BACKEND_URL` | optional | *leave empty* — the frontend will then call same-origin `/api/leads` and hit the serverless function. Only set this if you split the backend onto another host. |
| `RESEND_API_KEY` | **required** | `re_xxxxxxxxxxxxxxxxxxxxx` (from https://resend.com/api-keys) |
| `LEAD_NOTIFY_FROM` | **required** | `MetalMindTech Agency <leads@metalmindtech.com>` — must be a **verified domain** in Resend |
| `LEAD_NOTIFY_TO` | **required** | `kodjo@metalmindtech.com` (or comma-separated list) |
| `LEAD_NOTIFY_BCC` | optional | `archive@metalmindtech.com` |

After editing env vars, **redeploy** so they're baked in (CRA reads
`REACT_APP_*` at build time).

### 3. Add the custom domain

1. Vercel → Domains → add `www.metalmindtech.com` (CNAME → `cname.vercel-dns.com`).
2. Add `metalmindtech.com` (apex) — Vercel issues A records or an ALIAS.
3. In your DNS provider, set the records exactly as Vercel instructs.
4. Mark `www` as the primary; Vercel will redirect apex → `www` automatically.
5. **Do not touch** `ark.metalmindtech.com` — that is The Forge and is hosted
   elsewhere.

---

## Local development

```bash
yarn install
cp .env.example .env.local
# Optionally:
# REACT_APP_BACKEND_URL=http://localhost:8001   # if running the FastAPI backend
yarn start
```

The app runs at `http://localhost:3000`. The `api/leads.js` serverless
function is **not** executed locally by `yarn start` — to test it locally,
install the Vercel CLI (`npm i -g vercel`) and run `vercel dev`.

---

## How `/api/leads` works

1. The lead-capture dialog (`src/components/LeadFormDialog.jsx`) submits a
   JSON `POST` to `${API}/leads` where `API` resolves to:
   - `https://<your-vercel-domain>/api` when `REACT_APP_BACKEND_URL` is empty
     (Path B — same-origin serverless), or
   - `<REACT_APP_BACKEND_URL>/api` when set (split deployment / dev).
2. `api/leads.js` validates the payload, formats a luxury HTML email,
   sends it via Resend with `replyTo` set to the submitter, and returns the
   same JSON shape the FastAPI backend would have returned. **No data is
   persisted server-side** in Path B — every lead is in your inbox.

If you later want persistence (Mongo, Notion, Airtable, etc.), extend
`api/leads.js` — the function already returns the full lead record.

---

## Structure

```
.
├── api/
│   └── leads.js              # Vercel serverless function (Resend email)
├── public/
├── src/
│   ├── App.js
│   ├── pages/Home.jsx
│   ├── components/           # Hero, AuditOffer, Guarantee, Framework,
│   │                         # FounderLetter, FAQ, FinalCTA, LeadFormDialog…
│   ├── components/ui/        # shadcn primitives
│   └── lib/constants.js      # FORGE_URL + API base resolution
├── .env.example
├── vercel.json               # SPA rewrites + function config
├── tailwind.config.js
├── package.json
└── README.md
```

---

## License

© MetalMindTech. All outcomes reserved.
