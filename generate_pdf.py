"""
VÉLORA PARFUMS — LUXURY RECEIPT PDF GENERATOR
Generates 300 DPI A4 Official Checkout Final Receipt & Tax Invoice PDF
"""

import http.server
import socketserver
import threading
import subprocess
import time
import os
from PIL import Image

PORT = 8775

def generate_pdf():
    # Start temporary local HTTP server
    Handler = http.server.SimpleHTTPRequestHandler
    httpd = socketserver.TCPServer(('127.0.0.1', PORT), Handler)
    t = threading.Thread(target=httpd.serve_forever)
    t.daemon = True
    t.start()

    time.sleep(0.6)

    temp_png = 'temp_receipt_render.png'
    chrome_paths = [
        r'C:\Program Files\Google\Chrome\Application\chrome.exe',
        r'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe',
        r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
        r'C:\Program Files\Microsoft\Edge\Application\msedge.exe'
    ]
    
    browser_bin = None
    for p in chrome_paths:
        if os.path.exists(p):
            browser_bin = p
            break
            
    if not browser_bin:
        print("No compatible Chromium browser found.")
        httpd.shutdown()
        return False

    chrome_cmd = [
        browser_bin,
        '--headless=new',
        '--disable-gpu',
        '--window-size=880,1520',
        '--device-scale-factor=2',
        '--hide-scrollbars',
        f'--screenshot={os.path.abspath(temp_png)}',
        f'http://127.0.0.1:{PORT}/receipt.html'
    ]
    subprocess.run(chrome_cmd, capture_output=True, text=True)
    httpd.shutdown()

    if os.path.exists(temp_png):
        im = Image.open(temp_png)
        w, h = im.size
        
        # Crop out web toolbar, focus on luxury certificate card
        card = im.crop((16, 130, w - 16, h - 20))
        
        # Fit onto standard A4 page (2480 x 3508 at 300 DPI)
        a4_w, a4_h = 2480, 3508
        scale = min((a4_w - 160) / card.width, (a4_h - 160) / card.height)
        new_w = int(card.width * scale)
        new_h = int(card.height * scale)
        card_resized = card.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Create dark obsidian velvet A4 background
        a4_page = Image.new('RGB', (a4_w, a4_h), color=(10, 10, 12))
        pos_x = (a4_w - new_w) // 2
        pos_y = (a4_h - new_h) // 2
        a4_page.paste(card_resized, (pos_x, pos_y))
        
        output_pdf = 'VELORA_Official_Checkout_Receipt.pdf'
        a4_page.save(output_pdf, 'PDF', resolution=300.0)
        print(f"✓ Generated {output_pdf} ({os.path.getsize(output_pdf):,} bytes) [A4 210x297mm 300DPI]")
        
        if os.path.exists(temp_png):
            os.remove(temp_png)
        return True
    else:
        print("Failed to capture screenshot.")
        return False

if __name__ == '__main__':
    generate_pdf()
