# Security Architecture — ExamAlert Telangana

## Access Control Model

```
Public (no login)          → Browse exams, eligibility checker, mock tests, tags, AI chat
Optional Auth (login)      → Bookmarks, reminders, personalized alerts, AI recommendations
Required Auth (login)      → Profile management, notifications
Admin Auth (admin role)    → Exam CRUD, user management, broadcast notifications, PDF upload
```

---

## Authentication Flow

```
Email/Password signup
  → Supabase validates email format
  → Password hashed with bcrypt (Supabase handles)
  → Verification email sent automatically
  → User must verify email before login

Google OAuth
  → Supabase OAuth flow
  → Redirect to /auth/callback
  → Session cookie set securely

Password Reset
  → POST /api/auth/forgot-password (always returns success — prevents enumeration)
  → Supabase sends reset email
  → User clicks link → /auth/reset-password
  → New password validated (8+ chars, upper+lower+digit)
  → POST /api/auth/reset-password with JWT
```

---

## Security Layers

### Layer 1 — Network (Cloudflare)
- DDoS protection
- Bot detection (Cloudflare Turnstile — optional)
- SSL/TLS termination
- IP reputation filtering

### Layer 2 — Express Server
- `helmet` — 15+ security headers including CSP, HSTS, X-Frame-Options
- `cors` — strict origin allowlist, no wildcard
- `hpp` — HTTP Parameter Pollution prevention
- `express-rate-limit` — per-route rate limiting
- `express-slow-down` — progressive request slowdown
- Body size limits (50KB JSON, 5MB file upload)

### Layer 3 — Input Validation & Sanitization
- `joi` — schema validation on ALL inputs (body, query, params)
- `xss` — recursive XSS sanitization middleware on all requests
- UUID format validation on all ID parameters
- Slug format validation (alphanumeric + hyphens only)
- URL validation for all link fields
- Array length limits to prevent DoS

### Layer 4 — Authentication
- Supabase JWT verification on every protected request
- Token format check (Bearer prefix, max 2048 chars)
- Admin status cached in-process (5 min TTL) to reduce DB load
- Admin cache invalidated on role changes
- `optionalAuth` middleware for public routes that benefit from user context

### Layer 5 — Database (Supabase RLS)
- Row Level Security enabled on all user tables
- Users can only read/write their own data
- Exams are publicly readable (active only)
- Admin writes go through service role (backend only)
- Trigger prevents self-escalation to admin role
- No raw SQL — all queries via Supabase client (parameterized)

### Layer 6 — File Upload Security
- PDF-only uploads (MIME type + extension check)
- 5MB file size limit
- Files stored in Supabase Storage (not local filesystem)
- Filenames generated server-side (no user input in path)
- Separate storage bucket with controlled access

### Layer 7 — AI Security
- Prompt injection sanitization (strips "ignore instructions", "act as", etc.)
- Message length hard cap (1000 chars)
- History limited to last 6 messages
- System prompt is immutable and injected server-side
- AI responses never include raw database data

---

## Rate Limits

| Endpoint | Window | Max Requests |
|----------|--------|-------------|
| All API | 15 min | 200 |
| Auth endpoints | 15 min | 10 |
| AI chat | 1 min | 15 |
| Admin endpoints | 15 min | 60 |
| File upload | Per request | 1 file, 5MB |

---

## Security Headers (via Helmet)

```
Content-Security-Policy: default-src 'self'; script-src 'self'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload (prod only)
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

---

## Frontend Security (Next.js Middleware)

- Route protection: `/profile`, `/bookmarks`, `/notifications`, `/admin` require auth
- Admin routes verify `is_admin` from database
- Unauthenticated users redirected to `/login?redirect=<path>`
- Security headers added to every response
- No sensitive data in localStorage (Supabase uses httpOnly cookies)

---

## Content & Legal Compliance

- All exam data sourced from official government websites
- No copyrighted content reproduced — only summaries in original wording
- Official PDFs linked (not re-uploaded) unless admin uploads notification PDFs
- Disclaimer on every exam page: "Verify from official sources"
- Platform disclaimer: "Not affiliated with any government organization"
- Privacy Policy page: `/privacy`
- Terms of Service page: `/terms`

---

## Data Privacy

- Minimal data collection (only what's needed for features)
- No third-party analytics or advertising trackers
- No data sold to third parties
- Account deletion: removes all user data permanently
- GDPR-ready: access, correction, deletion, portability rights

---

## Monitoring & Incident Response

### Logging
- All requests logged with method, path, status, response time, IP
- Security events logged: failed auth, rate limit hits, CORS violations, admin actions
- Admin audit log: every admin action recorded with timestamp and metadata

### Alerts to set up (free)
- UptimeRobot: monitor `/health` endpoint
- Supabase Dashboard: monitor DB connections and errors
- Render Dashboard: monitor memory/CPU usage

### Incident Response
1. Detect: Monitor logs for unusual patterns
2. Contain: Disable affected endpoint or user account
3. Investigate: Review audit logs
4. Fix: Deploy patch
5. Notify: Inform affected users if data was compromised

---

## Security Checklist Before Going Live

- [ ] Run `002_security.sql` migration in Supabase
- [ ] Set `NODE_ENV=production` on Render
- [ ] Verify CORS only allows your Vercel domain
- [ ] Enable Supabase email confirmation requirement
- [ ] Set strong `JWT_SECRET` (64+ char random hex)
- [ ] Enable Cloudflare proxy (orange cloud) for DDoS protection
- [ ] Test rate limiting works (use curl to hit endpoints repeatedly)
- [ ] Test that `/admin` redirects non-admin users
- [ ] Verify `.env` files are NOT in Git (`git status` check)
- [ ] Enable Supabase 2FA on your admin account
- [ ] Set up UptimeRobot monitoring
- [ ] Review Supabase RLS policies in dashboard
