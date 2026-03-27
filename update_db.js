const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.providers = db.providers.map((p, index) => {
    // Generate some dummy data based on provider to make it look filled
    const isMale = index % 2 === 0;
    const gender = isMale ? "men" : "women";
    const picId = (index + 20) % 90; // random id for portrait

    return {
        ...p,
        image: `https://randomuser.me/api/portraits/${gender}/${picId}.jpg`,
        tagline: p.description?.slice(0, 50) + "...",
        rating: (4 + Math.random()).toFixed(1), // Random rating between 4.0 and 5.0
        reviewCount: Math.floor(Math.random() * 200) + 20,
        experience: p.experience || Math.floor(Math.random() * 10) + 1,
        location: ["Mumbai, Maharashtra", "Delhi, NCR", "Bengaluru, Karnataka", "Pune, Maharashtra"][index % 4],
        languages: ["Hindi", "English", "Marathi", "Gujarati", "Tamil"].slice(index % 3, (index % 3) + 2),
        availability: index % 3 === 0 ? "Busy" : "Available",
        hourlyRate: "₹" + (Math.floor(Math.random() * 20) + 5) * 100 + " / hr",
        email: p.name.toLowerCase().replace(' ', '.') + "@digiseva.in",
        completedJobs: Math.floor(Math.random() * 300) + 50,
        repeatClients: Math.floor(Math.random() * 50) + 30,
        responseTime: "< " + (Math.floor(Math.random() * 3) + 1) + " hour(s)",
        about: p.description || `I'm a passionate professional with years of experience delivering robust, scalable, and user-friendly solutions. I take pride in clean execution, on-time delivery, and crystal-clear communication throughout the project.`,
        skills: ["React", "Node.js", "Communication", "Management", "Design", "Marketing", "Figma", "Cleaning", "Decor"].sort(() => 0.5 - Math.random()).slice(0, 4),
        services: [
            { icon: "🌟", title: "Premium Service", desc: "Top tier service delivery tailored to your needs." },
            { icon: "⚡", title: "Fast Delivery", desc: "Quick turnaround without compromising quality." }
        ],
        experience_timeline: [
            { year: "2020 – Present", company: "Freelance", role: "Specialist", desc: "Delivered multiple successful projects." },
            { year: "2017 – 2020", company: "Local Agency", role: "Junior Professional", desc: "Gained core industry experience." }
        ],
        reviews: [
            { name: "Rahul S.", avatar: "https://randomuser.me/api/portraits/men/12.jpg", rating: 5, comment: "Excellent work, highly recommended!", date: "Jan 2025" },
            { name: "Priya M.", avatar: "https://randomuser.me/api/portraits/women/34.jpg", rating: 4, comment: "Very professional and delivered on time.", date: "Dec 2024" }
        ],
        certifications: [
            { name: "Professional Certificate", issuer: "Industry standard", year: "2023" },
            { name: "Expertise Validation", issuer: "Local Authority", year: "2021" }
        ]
    };
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 4));
console.log('db.json enriched with dummy provider fields!');
