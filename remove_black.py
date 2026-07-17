from PIL import Image
import sys

def remove_black(filepath):
    try:
        img = Image.open(filepath).convert("RGBA")
        data = img.getdata()
        
        # We will make any pixel that is very close to black completely transparent.
        # R<25, G<25, B<25 handles slight compression artifacts.
        new_data = [(0, 0, 0, 0) if (r < 25 and g < 25 and b < 25) else (r, g, b, a) for r, g, b, a in data]
        
        img.putdata(new_data)
        img.save(filepath, "PNG")
        print(f"Processed {filepath} successfully.")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    remove_black("public/hero-pizza.png")
