import json
import random
import os

db_path = os.path.join(os.path.dirname(__file__), 'db.json')

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

for i, p in enumerate(db['providers']):
    is_male = i % 2 == 0
    gender = "men" if is_male else "women"
    pic_id = (i + 20) % 90
    
    desc = p.get('description', '')
    
    p['image'] = f"https://randomuser.me/api/portraits/{gender}/{pic_id}.jpg"
    p['tagline'] = desc[:50] + "..." if desc else "Professional service provider"
    p['rating'] = round(random.uniform(4.5, 5.0), 1)
    p['reviewCount'] = random.randint(20, 220)
    p['experience'] = p.get('experience', random.randint(1, 10))
    p['location'] = ["Mumbai, Maharashtra", "Delhi, NCR", "Bengaluru, Karnataka", "Pune, Maharashtra"][i % 4]
    
    languages_pool = ["Hindi", "English", "Marathi", "Gujarati", "Tamil"]
    start_idx = i % 3
    p['languages'] = languages_pool[start_idx:start_idx+2]
    
    p['availability'] = "Busy" if i % 3 == 0 else "Available"
    p['hourlyRate'] = f"₹{(random.randint(5, 25)) * 100} / hr"
    
    email_name = p['name'].lower().replace(' ', '.')
    p['email'] = f"{email_name}@digiseva.in"
    
    p['completedJobs'] = random.randint(50, 350)
    p['repeatClients'] = random.randint(30, 80)
    p['responseTime'] = f"< {random.randint(1, 4)} hour(s)"
    
    p['about'] = desc if desc else "I am a dedicated professional with years of experience delivering top-notch structural and seamless solutions for my clients. I prioritize quality and user satisfaction."
    
    sid = p.get('serviceId', 0)
    
    if sid == 101: # Web Dev
        skills_pool = ["React", "Node.js", "MongoDB", "TypeScript", "AWS", "GraphQL", "Docker", "Tailwind CSS", "Next.js"]
        services_pool = [
            {"icon": "🖥️", "title": "Web App Development", "desc": "End-to-end custom web applications using modern frameworks."},
            {"icon": "☁️", "title": "Backend Development", "desc": "Scalable REST APIs and robust database architecture."},
            {"icon": "🚀", "title": "Performance Optimization", "desc": "Speeding up your web apps for better UX and SEO."}
        ]
        certifications = [
            {"name": "AWS Certified Developer", "issuer": "Amazon Web Services", "year": "2023"},
            {"name": "Full Stack Web Certification", "issuer": "freeCodeCamp", "year": "2021"}
        ]
        reviews_keywords = ["website", "web app", "code quality", "React dashboard"]
        
    elif sid == 102: # App Dev
        skills_pool = ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "SQLite", "Mobile UI Design", "API Integration"]
        services_pool = [
            {"icon": "📱", "title": "iOS App Development", "desc": "Native iOS applications written in Swift."},
            {"icon": "🤖", "title": "Android App Development", "desc": "High-performance native Android apps using Kotlin."},
            {"icon": "🔄", "title": "Cross-Platform Apps", "desc": "Write once, run anywhere with Flutter or React Native."}
        ]
        certifications = [
            {"name": "Google Developers Certification", "issuer": "Google", "year": "2022"},
            {"name": "iOS App Development with Swift", "issuer": "Coursera", "year": "2021"}
        ]
        reviews_keywords = ["mobile app", "iOS", "Android", "app store launch"]

    elif sid == 103: # Cyber Security
        skills_pool = ["Penetration Testing", "Network Security", "Cryptography", "Vulnerability Scanning", "Malware Analysis", "Linux", "Python Scripting"]
        services_pool = [
            {"icon": "🛡️", "title": "Vulnerability Assessment", "desc": "Identifying security flaws in your infrastructure."},
            {"icon": "🕵️", "title": "Penetration Testing", "desc": "Ethical hacking to secure your applications."},
            {"icon": "🔒", "title": "Data Privacy Consulting", "desc": "Ensuring your business complies with data protection laws."}
        ]
        certifications = [
            {"name": "Certified Ethical Hacker (CEH)", "issuer": "EC-Council", "year": "2023"},
            {"name": "CompTIA Security+", "issuer": "CompTIA", "year": "2020"}
        ]
        reviews_keywords = ["security audit", "penetration testing", "secured our servers", "data protection"]

    elif sid == 104: # Digital Marketing
        skills_pool = ["SEO", "Google Ads", "Content Marketing", "Social Media Strategy", "Email Marketing", "Google Analytics", "Copywriting"]
        services_pool = [
            {"icon": "📈", "title": "SEO Optimization", "desc": "Improving your search engine rankings and organic traffic."},
            {"icon": "🎯", "title": "Pay-Per-Click Campaigns", "desc": "Maximizing ROI with targeted ads on Google and Facebook."},
            {"icon": "📧", "title": "Social Media Management", "desc": "Building your brand presence across all major platforms."}
        ]
        certifications = [
            {"name": "Google Ads Certification", "issuer": "Google Skillshop", "year": "2023"},
            {"name": "HubSpot Inbound Marketing", "issuer": "HubSpot Academy", "year": "2022"}
        ]
        reviews_keywords = ["increased our traffic", "great ad campaigns", "improved SEO ranking", "social media growth"]

    elif sid == 201: # Cleaning
        skills_pool = ["Deep Cleaning", "Sanitization", "Stain Removal", "Organization", "Eco-friendly Products", "Post-Construction Cleanup"]
        services_pool = [
            {"icon": "🧹", "title": "Deep Home Cleaning", "desc": "Thorough cleaning of every room, corner to corner."},
            {"icon": "✨", "title": "Move-In / Move-Out Cleaning", "desc": "Making your new or old home spotless."},
            {"icon": "🏢", "title": "Office Cleaning", "desc": "Professional sanitization for commercial spaces."}
        ]
        certifications = [
            {"name": "Certified Cleaning Technician", "issuer": "IICRC", "year": "2021"},
            {"name": "Health & Safety Protocol", "issuer": "Local Health Authority", "year": "2022"}
        ]
        reviews_keywords = ["spotless cleaning", "home looks brand new", "very thorough", "friendly and quick"]

    elif sid == 202: # Decor
        skills_pool = ["Event Planning", "Floral Design", "Lighting Setup", "Theme Conceptualization", "Table Scraping", "Balloon Arching"]
        services_pool = [
            {"icon": "🎉", "title": "Party Decoration", "desc": "Custom themes and decor for birthdays and anniversaries."},
            {"icon": "💐", "title": "Floral Arrangements", "desc": "Beautiful fresh or artificial floral setups."},
            {"icon": "💡", "title": "Ambient Lighting", "desc": "Creating the perfect mood with professional lighting."}
        ]
        certifications = [
            {"name": "Certified Event Planner", "issuer": "Event Planning Association", "year": "2022"},
            {"name": "Advanced Floral Design", "issuer": "Floral Institute", "year": "2020"}
        ]
        reviews_keywords = ["beautiful decorations", "made the party magical", "dreamy setup", "loved the flowers"]

    else:
        skills_pool = ["Communication", "Management", "Problem Solving", "Time Management", "Customer Service"]
        services_pool = [
            {"icon": "🌟", "title": "Premium Service", "desc": "Top tier professional service."},
            {"icon": "⚡", "title": "Fast Delivery", "desc": "Quick turnaround without compromising quality."}
        ]
        certifications = [
            {"name": "Professional Certificate", "issuer": "Industry Standard", "year": "2023"}
        ]
        reviews_keywords = ["great service", "highly recommended", "professional"]

    p['skills'] = random.sample(skills_pool, k=min(5, len(skills_pool)))
    p['services'] = random.sample(services_pool, k=min(2, len(services_pool)))
    p['certifications'] = certifications
    
    role = p.get('role', 'Specialist')
    p['experience_timeline'] = [
        {"year": "2020 – Present", "company": "Freelance", "role": f"Senior {role}", "desc": f"Delivered multiple successful projects and solutions as a {role}."},
        {"year": "2017 – 2020", "company": "Local Agency", "role": f"Junior {role}", "desc": "Developed a strong foundation and honed my core skills."}
    ]
    
    p['reviews'] = [
        {"name": "Rahul S.", "avatar": f"https://randomuser.me/api/portraits/men/{random.randint(1, 40)}.jpg", "rating": 5, "comment": f"Excellent work! They {random.choice(reviews_keywords)} perfectly. Highly recommended!", "date": "Jan 2025"},
        {"name": "Priya M.", "avatar": f"https://randomuser.me/api/portraits/women/{random.randint(1, 40)}.jpg", "rating": 4, "comment": f"Very professional. I was happy with the {random.choice(reviews_keywords)}.", "date": "Dec 2024"}
    ]

with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=4)

print("db.json updated successfully with role-based data!")
