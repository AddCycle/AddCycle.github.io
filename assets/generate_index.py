import os
import json

recipe_folder = 'recipes'
index_file = os.path.join(recipe_folder, 'index.json')

files = [
    f for f in os.listdir(recipe_folder)
    if f.endswith('.json') and f != 'index.json'
]

files.sort()

with open(index_file, 'w') as f:
    json.dump(files, f, indent=2)
    print(f"Generated {index_file} with {len(files)} entries.")
