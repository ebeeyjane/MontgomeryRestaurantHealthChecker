# Hackathon Submission: MGM Health Check & City Analytics

## Project Title
**MGM Health Check:** A Civic Analytics Engine for Montgomery

## Simple Summary (The "Elevator Pitch")
MGM Health Check is a "vibe-coded" mobile application that transforms raw Montgomery Open Data into a beautiful, life-saving tool for citizens and a powerful economic analytics dashboard for city officials. By correlating official city health scores with real-world public sentiment via Bright Data, we provide a 360-degree view of the city's restaurant ecosystem.

---

## Inspiration
Montgomery's Open Data portal is a treasure trove of information, but for many citizens, raw ArcGIS data is difficult to parse on the go. We were inspired to bridge the gap between "Government Data" and "User Experience." We wanted to answer one simple question: *"How does a city's health inspection score impact a business's real-world reputation and the local economy?"*

## What it does
- **Citizen Portal:** Provides an interactive, color-coded map and discovery list where users can find restaurants filtered by health score, distance, and category.
- **AI Inspector Insight:** Each facility features an "Intelligent Agent" summary that analyzes historical inspection findings to predict a restaurant's next audit outcome and public sentiment risk.
- **City Analytics Dashboard:** A macro-view for city officials that uses **Bright Data** to correlate official health scores with public ratings (Yelp/Google).
- **Economic Impact Alerts:** Highlighting how health compliance directly influences public sentiment and foot traffic, driving city-wide economic growth.

## How we built it
- **Frontend:** Built with **Vite + React** for a snappy, mobile-first performance.
- **Mapping:** Integrated **Leaflet.js** with custom markers to visualize geospatial city data.
- **Data Pipeline:**
    - Connected to the **Montgomery Open Data API** to fetch live ArcGIS health records.
    - Utilized the **Bright Data MCP** to scrape live public sentiment and review data from search engines.
- **Visualizations:** Used **Recharts** to build the correlation engine and distribution graphs.
- **Design:** Followed high-fidelity "vibe-coded" design principles with smooth gradients, modern typography (Public Sans), and interactive micro-animations.

## Challenges we ran into
One of the biggest challenges was handling the raw, nested JSON structure of municipal ArcGIS data and mapping it to a modern React state. Additionally, we had to solve the "Concurrency Challenge"—ensuring the app remained responsive while performing real-time public sentiment scraping via the Bright Data proxy network.

## Accomplishments that we're proud of
- **Market Originality:** Our research shows that while the Alabama Department of Public Health and the City of Montgomery provide online databases and ArcGIS dashboards, there is **no dedicated mobile-first, consumer-focused application** specifically for this data in Montgomery.
- **The Correlation Engine:** Successfully proving—with live data—that a 10-point drop in a city health score correlates to a measurable star-rating drop in public sentiment is a powerful proof-of-concept for how Open Data can drive business decisions. This fusion of **Bright Data** with government records is a first-of-its-kind feature in this market.

## What we learned
We learned that the true power of "Smart Cities" isn't just in collecting data, but in **Data Fusion**. By mixing government records with public web data (Bright Data), you uncover insights that neither dataset could show on its own.

## What's next for MGM Health Check
- **Compliance-as-a-Service:** Allowing business owners to "Claim their Business" for automated compliance alerts.
- **Expanded Civic Data:** Integrating Montgomery Crime and 311 service request data to create a comprehensive "City Vibe & Safety" score.
- **Predictive Auditing:** Helping city departments optimize their inspection routes based on AI-predicted risk levels.
