# Him Ayurveda – MongoDB Customer Reviews API

## Setup
1. MongoDB Atlas mein chat mein share hua database password **rotate** karein. New connection string sirf `.env` mein rakhein; GitHub ya frontend mein kabhi na daalein.
2. `.env.example` copy karke `.env` banayein aur `MONGODB_URI` update karein.
3. Run: `npm install` then `npm start`.
4. Open `http://localhost:3089`. Website aur APIs same server se serve honge, CORS ki zaroorat nahi.
5. Videos ko `public/up1st.mp4`, `public/up2nd.mp4`, `public/do1.mp4` ... `public/do5.mp4` mein rakhein. HTML video paths ko agar zaroorat ho toh server root ke hisaab se set karein.

## APIs
`GET /api/reviews?limit=111` returns `{success:true,reviews:[...]}` latest first.
`POST /api/reviews` JSON: `{"name":"Rahul","product":"HIM POWER Combo","comment":"Delivery was on time","rating":5}`.

Example:
```bash
curl -X POST http://localhost:3089/api/reviews -H 'Content-Type: application/json' -d '{"name":"Rahul","product":"HIM POWER Combo","comment":"Delivery was on time","rating":5}'
curl http://localhost:3089/api/reviews?limit=111
```

The frontend fetches reviews from the same origin at `/api/reviews`. To use a separate API domain, update `API_BASE` in `index.html` and configure allowed CORS origins on the backend.

**Notes:** The server has input validation and a basic POST rate limit; for a public production site, add spam protection and review moderation. Reviews are shown as customer-submitted, not verified purchases. No real database calls were made during file generation.
