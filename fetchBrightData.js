import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import fs from 'fs';
import path from 'path';

// Load our transformed Montgomery open data so we know who to search for
import { foodScores } from './src/data/foodScores.js';

// Setup MCP Client for Bright Data
const transport = new StdioClientTransport({
    command: "npx",
    args: ["-y", "@brightdata/mcp@1.0.3"],
    env: {
        ...process.env,
        BRIGHTDATA_TOKEN: "fc286d14-a679-4415-82c4-19b7521a1317"
    }
});

const client = new Client(
    { name: "mgm-health-check", version: "1.0.0" },
    { capabilities: {} }
);

async function fetchSentimentData() {
    console.log("Connecting to Bright Data MCP...");
    await client.connect(transport);
    console.log("Connected successfully.");

    // For the hackathon demo, we don't want to scrape all 100 on the fly (too slow + cost)
    // Let's pick 5 representative restaurants across the score spectrum to pull live sentiment for
    const demoTargets = [
        foodScores.find(f => f.score >= 95),  // Excellent
        foodScores.find(f => f.score >= 85 && f.score < 90), // Good
        foodScores.find(f => f.score >= 75 && f.score < 80), // Borderline
        foodScores.find(f => f.score < 70) // Poor
    ].filter(Boolean); // removes undefined if any

    console.log(`\nSelected ${demoTargets.length} representative facilities for sentiment analysis via Bright Data:`);

    const sentimentResults = [];

    for (const target of demoTargets) {
        console.log(`\n-> Analyzing sentiment for: ${target.name} (Health Score: ${target.score})`);

        // We will use the search_engine tool from the brightdata MCP to look for Yelp/Tripadvisor ratings
        const query = `${target.name} restaurant Montgomery Alabama review rating`;

        try {
            console.log(`   Executing Bright Data search: "${query}"...`);
            const response = await client.callTool({
                name: "search_engine",
                arguments: {
                    query: query,
                    engine: "google"
                }
            });

            const resultText = response.content[0].text;

            // EXTREMELY basic parsing: Look for rating numbers in the search results snippet
            // "4.5 stars", "Rating: 3.2", etc.
            const ratingMatches = resultText.match(/([1-5](?:\.[0-9])?)\s*(?:out of 5|stars?|rating)/gi);
            let estimatedRating = 3.0; // default neutral

            if (ratingMatches && ratingMatches.length > 0) {
                // Extract the first number found
                const firstMatch = ratingMatches[0].match(/([1-5](?:\.[0-9])?)/);
                if (firstMatch) {
                    estimatedRating = parseFloat(firstMatch[1]);
                    console.log(`   [SUCCESS] Found estimated public rating: ${estimatedRating} / 5.0`);
                }
            } else {
                console.log(`   [NOTE] Could not parse exact numerical rating from search snippets. Defaulting to 3.0`);
            }

            sentimentResults.push({
                id: target.id,
                name: target.name,
                healthScore: target.score,
                address: target.address,
                brightDataSentiment: estimatedRating
            });

        } catch (err) {
            console.error(`   [ERROR] Failed to fetch sentiment for ${target.name}:`, err.message);
        }
    }

    // Save the result so the frontend can use real data instead of placeholders
    const outputPath = path.resolve('src/data/brightDataSentiment.json');
    fs.writeFileSync(outputPath, JSON.stringify(sentimentResults, null, 2));

    console.log(`\n✅ Bright Data sentiment correlation complete! Saved to ${outputPath}`);
    process.exit(0);
}

fetchSentimentData().catch(console.error);
