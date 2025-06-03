import os
import json

# Define the directory containing your item PNGs
input_dir = 'assets/static/item'
output_file = 'assets/item_index.json'

# List to hold item names in the format namespace:item_name
item_names = []

for filename in os.listdir(input_dir):
    if filename.endswith('.png'):
        name = filename[:-4]  # strip ".png"
        item_name = name.replace('_', ':', 1)  # only first "_" becomes ":"
        item_names.append(item_name)

# Write the JSON file
with open(output_file, 'w') as f:
    json.dump(item_names, f, indent=2)

print(f'Wrote {len(item_names)} items to {output_file}')