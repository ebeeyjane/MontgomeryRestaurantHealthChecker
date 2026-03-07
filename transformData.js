import fs from 'fs';
import path from 'path';

const rawDataPath = path.join(process.cwd(), 'src', 'data', 'rawMontgomeryData.json');
const outputPath = path.join(process.cwd(), 'src', 'data', 'foodScores.js');

const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));

// Take the first 100 features for the app to keep it performant for the demo
const features = rawData.features.slice(0, 100);

function getRating(score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Satisfactory";
    return "Poor";
}

function formatDate(dateStr) {
    if (!dateStr) return "Unknown";
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const formattedData = features.map((f, index) => {
    const props = f.properties;
    const coords = f.geometry ? f.geometry.coordinates : [0, 0];
    const score = props.Score_1 || 100;

    return {
        id: props.OBJECTID ? props.OBJECTID.toString() : index.toString(),
        name: props.Establishment || "Unknown Restaurant",
        address: props.Address ? `${props.Address}, Montgomery, AL` : "Montgomery, AL",
        distance: (Math.random() * 5).toFixed(1) + " mi", // Mock distance
        rating: getRating(score),
        score: score,
        lat: coords[1],
        lng: coords[0],
        category: "Restaurant",
        inspections: [
            {
                date: formatDate(props.Date),
                type: "Routine Check",
                inspector: "Montgomery Co. Inspector",
                findings: score >= 90 ? ["No major violations found."] : ["Non-critical violations observed and corrected on site."]
            }
        ]
    };
});

const fileContent = `export const foodScores = ${JSON.stringify(formattedData, null, 2)};\n`;

fs.writeFileSync(outputPath, fileContent);
console.log("Transformed foodScores.js successfully!");
