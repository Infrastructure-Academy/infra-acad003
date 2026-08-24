/**
 * Seed script — Update review matrix with grading resolution (v2)
 * UK Banda, US GPA, India CGPA, APAC, China grades
 */
import "dotenv/config";
import mysql from "mysql2/promise";

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Update Round grading
await conn.execute(
  `UPDATE review_rounds SET ukBanda='Upper Second (2:1)', usGpa='3.3', indiaCgpa='7.5', apacGrade='B+', chinaGrade='Good' WHERE roundCode='R1'`
);
await conn.execute(
  `UPDATE review_rounds SET ukBanda='First Class', usGpa='4.0', indiaCgpa='9.0+', apacGrade='A+/S', chinaGrade='Outstanding' WHERE roundCode='R2'`
);
await conn.execute(
  `UPDATE review_rounds SET ukBanda='First Class', usGpa='4.0', indiaCgpa='8.7-8.8', apacGrade='A/S', chinaGrade='Excellent' WHERE roundCode='R3'`
);

// Update R2 university grading — 12 universities
const r2Unis = [
  { uni: "MIT", ukBanda: "First Class", usGpa: "4.0", indiaCgpa: "9.5", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Cambridge", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.0", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Imperial College London", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "NUS", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "Tsinghua", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "IIT Bombay", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
  { uni: "ETH Zurich", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "TU Delft", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
  { uni: "UCL", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "Melbourne", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
  { uni: "KAUST", ukBanda: "Upper Second (2:1)", usGpa: "3.6", indiaCgpa: "8.3", apacGrade: "A-", chinaGrade: "Good" },
  { uni: "Toronto", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
];

for (const u of r2Unis) {
  await conn.execute(
    `UPDATE review_university_scores SET ukBanda=?, usGpa=?, indiaCgpa=?, apacGrade=?, chinaGrade=? WHERE roundCode='R2' AND university=?`,
    [u.ukBanda, u.usGpa, u.indiaCgpa, u.apacGrade, u.chinaGrade, u.uni]
  );
}

// Update R3 university grading — 16 universities
const r3Unis = [
  { uni: "MIT", ukBanda: "First Class", usGpa: "4.0", indiaCgpa: "9.5", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Cambridge", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.2", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Imperial College London", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.0", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "NUS", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.0", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Tsinghua", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "IIT Bombay", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "ETH Zurich", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.0", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "TU Delft", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "UCL", ukBanda: "First Class", usGpa: "3.9", indiaCgpa: "9.0", apacGrade: "A+", chinaGrade: "Outstanding" },
  { uni: "Melbourne", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "KAUST", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.7", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "Toronto", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.8", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "Nottingham", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.7", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "HKUST", ukBanda: "First Class", usGpa: "3.8", indiaCgpa: "8.7", apacGrade: "A", chinaGrade: "Excellent" },
  { uni: "Monash", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
  { uni: "KFUPM", ukBanda: "Upper Second (2:1)", usGpa: "3.7", indiaCgpa: "8.5", apacGrade: "A-", chinaGrade: "Good" },
];

for (const u of r3Unis) {
  await conn.execute(
    `UPDATE review_university_scores SET ukBanda=?, usGpa=?, indiaCgpa=?, apacGrade=?, chinaGrade=? WHERE roundCode='R3' AND university=?`,
    [u.ukBanda, u.usGpa, u.indiaCgpa, u.apacGrade, u.chinaGrade, u.uni]
  );
}

console.log("Grading resolution v2 seeded successfully.");
await conn.end();
