import fs from 'fs';
import path from 'path';

const url = "https://services7.arcgis.com/xNUwUjOJqYE54USz/arcgis/rest/services/Food_Scoring/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
const filePath = path.join(process.cwd(), 'src', 'data');

if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
}

async function fetchScores() {
    console.log("Fetching real Montgomery Open Data food scores...");
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        fs.writeFileSync(
            path.join(filePath, 'rawMontgomeryData.json'),
            JSON.stringify(data, null, 2)
        );
        console.log(`Successfully saved ${data.features ? data.features.length : 0} facility records!`);
    } catch (e) {
        console.error("Error fetching data:", e.message);
    }
}

fetchScores();
