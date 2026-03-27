import json
import os

db_path = os.path.join(os.path.dirname(__file__), 'db.json')

with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

# Update services images
images = {
    101: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    102: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    103: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    104: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    201: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    202: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}

for s in db.get('services', []):
    if s.get('id') in images:
        s['image'] = images[s['id']]

# Save safely
with open(db_path, 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=4)

print("Updated service images!")
