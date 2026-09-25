# 🎙️ VÉLORA Parfums — Final Project Presentation Script (4 Speakers)

> **Course**: DTI 224 — Web Development Final Project  
> **Project Name**: VÉLORA Parfums (Haute Parfumerie E-Commerce)  
> **Total Time**: 12 – 15 Minutes (approx. 3 – 4 minutes per speaker)  
> **Live Demo URL**: [https://rexx0dora1005.github.io/VELORA-PERFUME/](https://rexx0dora1005.github.io/VELORA-PERFUME/)  
> **GitHub Repo**: [https://github.com/RexX0Dora1005/VELORA-PERFUME](https://github.com/RexX0Dora1005/VELORA-PERFUME)

---

## 👥 Speaker Roles & Agenda Overview

| Speaker | Role | Topic Covered | Live Action on Screen |
| :--- | :--- | :--- | :--- |
| **Speaker 1** | *Team Leader / Brand Strategist* | Project Intro, Problem, Brand Vision & Homepage | Show Hero Banner, Announcement bar, Brand Story |
| **Speaker 2** | *Product & UX Specialist* | 4 Perfume Editions, Modal Quick-View & Scent Quiz | Open Product Modal, change size, test Scent Quiz |
| **Speaker 3** | *Front-End Architecture & State Lead* | Tech Stack, DOM/BOM, Shopping Bag & LocalStorage | Add items, open cart drawer, +/- quantity, refresh page |
| **Speaker 4** | *Checkout, Systems & Deployment Lead* | 2-Column Checkout, Payment, Deluxe Receipt, Print & Q&A | Apply promo code, upload slip, place order, print receipt |

---

## 🗣️ SPEAKER 1: Introduction, Brand Concept & Homepage Tour
**⏱ Time**: ~3.5 Minutes  
**Focus**: Professional Opening, Project Purpose, Haute Parfumerie Aesthetics

### Spoken Script:
> "Good morning/afternoon, Ajarn and fellow classmates.  
> On behalf of our team, I would like to welcome you to our Final Project presentation for **DTI 224: Web Development**.  
>
> Today, we are thrilled to present **VÉLORA Parfums** — an ultra-luxury Haute Parfumerie e-commerce web application built entirely using vanilla front-end technologies: semantic HTML5, modern CSS3, and vanilla JavaScript.
>
> **The Problem & Vision:**  
> When shopping for fragrance online, consumers face a unique barrier: *scent is invisible*. Most standard e-commerce stores treat perfume like generic commodities with boring grids. Our goal was to design an immersive Parisian boutique experience — combining editorial luxury aesthetics with interactive discovery tools that give customers confidence before acquiring a signature scent.
>
> **Brand & Visual Identity:**  
> We established a refined **Black & Gold visual palette**:
> - `#0a0a0a` Obsidian Jet Black and smoky charcoal surfaces to evoke mystery and prestige.
> - `#d4af37` Warm metallic gold and champagne accents for artisanal craftmanship.
> - Editorial serif typography using **Cormorant Garamond** for titles, paired with modern **Montserrat** for clean UI readability.
>
> *(Speaker 1 points to the screen)*  
> As you can see on our homepage:
> - At the top, we have our complimentary boutique packaging announcement bar.
> - Our fixed navigation bar features a glassmorphic blur effect, custom gold foil logo, and live bag badge counter.
> - Our hero section presents **The Exclusive Collection** banner, showcasing the four flacons displayed on a polished black marble slab.
>
> Now, I would like to pass the presentation to **Speaker 2**, who will walk us through our four signature editions and our interactive Scent Sommelier."

### 🎬 Screen Actions for Speaker 1:
1. Open the live website in full screen (`F11`).
2. Point out the glowing gold logo and sticky blurred navigation bar.
3. Scroll smoothly down the hero banner and brand perks section.

---

## 🗣️ SPEAKER 2: The 4 Fragrance Editions & AI Scent Sommelier
**⏱ Time**: ~3.5 Minutes  
**Focus**: Product Design, Olfactory Pyramids, Interactive Recommendation

### Spoken Script:
> "Thank you, Speaker 1. Hello everyone.  
>
> I will now introduce our four signature fragrance editions and demonstrate how we solved the fragrance discovery challenge through JavaScript DOM manipulation.
>
> **The Four Olfactory Masterpieces:**  
> Each fragrance in the VÉLORA collection represents a distinct emotional atmosphere:
> 1. **VÉLORA NOIR (฿1,290)**: Dark & Mysterious — formulated with cracked black pepper, smoked cedarwood, and rich tonka amber.
> 2. **VÉLORA BLOOM (฿1,190)**: Floral & Romantic — featuring sweet lychee, morning Damask rose, and creamy sandalwood.
> 3. **VÉLORA AQUA (฿1,090)**: Fresh & Oceanic — capturing Italian mandarin, marine sea salt accord, and sun-bleached driftwood.
> 4. **VÉLORA OUD (฿1,390)**: Warm & Regal Woody — rare Cambodian agarwood infused with golden saffron and warm resinous incense.
>
> **Feature 1: Interactive Product Quick-View Modal:**  
> *(Speaker 2 clicks 'Details' on VÉLORA NOIR)*  
> When a customer clicks on any product, an animated glassmorphic modal opens without reloading the page.  
> Here, customers can:
> - Inspect the high-resolution bottle mockup.
> - Review the complete olfactory pyramid: Top Notes, Heart Notes, and Base Notes.
> - Select their preferred flacon size: clicking **50 ml** updates the price to ฿1,290, and clicking **100 ml** dynamically recalculates the price to ฿1,990 in real-time using JavaScript event listeners.
>
> **Feature 2: AI Scent Sommelier Quiz:**  
> *(Speaker 2 scrolls down to the Scent Quiz section)*  
> To assist buyers who are unsure of which scent fits them, we engineered an **AI Scent Sommelier**.  
> The user simply chooses their mood:
> - If I click *'Dark & Mysterious'*, the algorithm instantly matches and displays **VÉLORA NOIR**.
> - If I select *'Floral & Romantic'*, it transitions to recommend **VÉLORA BLOOM**.  
> From right inside the quiz result, the user can click one button to add the recommended perfume directly to their bag.
>
> Next, **Speaker 3** will explain our front-end architecture, shopping bag drawer, and state persistence."

### 🎬 Screen Actions for Speaker 2:
1. Scroll down to **"The Four Olfactory Elements"** grid.
2. Click **"Details"** on VÉLORA NOIR -> Modal opens.
3. Click between **50 ml** and **100 ml** -> show the price updating dynamically.
4. Close the modal, scroll to the **"AI Scent Sommelier"** quiz card.
5. Click **"Dark & Mysterious"** -> show VÉLORA NOIR recommendation result appear.
6. Click **"Add 50ml to Bag"** -> show the toast notification appear in the bottom-right corner!

---

## 🗣️ SPEAKER 3: Front-End Architecture, Bag Drawer & State Management
**⏱ Time**: ~3 Minutes  
**Focus**: Code Structure, Responsive Design, LocalStorage Persistence

### Spoken Script:
> "Thank you, Speaker 2. Good day everyone.  
>
> I will now discuss the technical foundation behind VÉLORA Parfums and how we manage application state.
>
> **1. Clean Vanilla Architecture:**  
> In accordance with our DTI 224 curriculum, we intentionally chose **zero external runtime frameworks** — no React, no Vue, and no bulky npm libraries.  
> - **index.html**: Uses clean semantic HTML5 markup (`<header>`, `<section>`, `<article>`, `<dialog>/modal`).
> - **style.css**: Built with modern CSS custom properties (`var(--gold-primary)`), CSS Grid for fluid product cards, and Flexbox for modular alignment.
> - **app.js**: Manages all interactive DOM manipulation, custom event listeners, and data arrays.
>
> **2. Interactive Shopping Bag Drawer:**  
> *(Speaker 3 clicks the 'Bag' button in the top navigation)*  
> When the user opens their bag, an off-canvas drawer slides smoothly from the right using hardware-accelerated CSS keyframe animations.
> - Each item displays its bottle thumbnail, selected volume (50ml/100ml), unit price, and subtotal.
> - Users can increment or decrement quantity using the `+` and `-` buttons, which recalculates the total synchronously.
> - If quantity reaches zero or 'Remove' is clicked, the item gracefully detaches from the list.
>
> **3. Data Persistence via LocalStorage API:**  
> A critical feature of any serious e-commerce application is cart persistence. If a customer accidentally closes their browser tab or refreshes the page:  
> *(Speaker 3 presses F5 to refresh the page, then re-opens the bag)*  
> As you can see, our cart data remains intact! Every change is serialized as JSON and synchronized with the browser's `localStorage` engine.
>
> I will now hand over to **Speaker 4** to demonstrate our 2-column checkout, payment options, and deluxe printable order receipt."

### 🎬 Screen Actions for Speaker 3:
1. Click the **"Bag"** button in the header -> show the slide-in drawer.
2. Click **`+`** on an item -> show quantity increment and subtotal update.
3. Click **`-`** -> show quantity decrement.
4. Refresh the page (`F5`) -> click **"Bag"** again to show all items remained saved in `localStorage`!

---

## 🗣️ SPEAKER 4: 2-Column Checkout, Deluxe Receipt, Print & Conclusion
**⏱ Time**: ~4 Minutes  
**Focus**: Checkout Engine, Promo Vouchers, Official Certificate, Print Stylesheet, GitHub

### Spoken Script:
> "Thank you, Speaker 3. Hello everyone.  
>
> To finalize the shopping journey, we built an enterprise-grade **2-Column Boutique Checkout** and an authentic **Haute Parfumerie Digital Certificate**.
>
> *(Speaker 4 clicks 'Proceed to Checkout')*  
>
> **1. The 2-Column Checkout Experience:**  
> - **Left Column — Step 1 & 2 (Client & Gifting):**  
>   The user enters their delivery information. Notice they can select between *Complimentary White-Glove Delivery* or *VIP Same-Day Chauffeur*.  
>   If we check the *'Complimentary Handwritten Calligraphy Gift Card'* box, a personalized greeting section expands where we can write a custom dedication.
>
> - **Step 3 (Multi-Channel Payment Tabs):**  
>   We designed three interactive payment methods:
>   1. **PromptPay QR / Bank Transfer**: Renders a Thai banking QR code, Kasikornbank account credentials, and simulated transfer slip upload with file preview.
>   2. **Credit / Debit Card**: Formatted card inputs with automatic 4-digit block spacing (`#### #### #### ####`) and TLS 1.3 security badges.
>   3. **Cash on Delivery**: Concierge payment service upon parcel inspection.
>
> - **Right Column — Live Summary & Voucher Engine:**  
>   We engineered a promotional discount validator.  
>   *(Speaker 4 enters `VELORA10` and clicks Apply)*  
>   Typing `VELORA10` instantly applies a **10% VIP Privilege discount**, deducting the amount from the total in real time. We also support `VIP300` for a ฿300 deduction!
>
> **2. Deluxe Official Receipt & Certificate of Authenticity:**  
> *(Speaker 4 clicks 'Confirm Acquisition →')*  
> When the order is placed, instead of a boring text message, our application generates a **Parisian Haute Parfumerie Certificate & Commercial Invoice**:
> - Unique Order Reference `#VEL-XXXXXX` and fulfillment status.
> - Delivery address and payment cleared indicator.
> - Calligraphy gift card inscription rendered in elegant serif typography.
> - Complete itemized table with flacon thumbnails.
> - Authentic **VÉLORA Paris Wax Seal** watermark.
>
> **3. One-Click Print & Plaintext Export:**  
> *(Speaker 4 clicks 'Print Official Receipt')*  
> By implementing custom `@media print` CSS rules, clicking 'Print' hides all dark web backgrounds, navigation bars, and buttons — producing a pristine, high-resolution A4 invoice ready to save as PDF or print on paper.  
> Users can also click *'Save Text Record'* to download an offline `.txt` receipt!
>
> **4. Deployment & Conclusion:**  
> The entire project is version-controlled on GitHub and deployed live on **GitHub Pages**, accessible worldwide on desktop, tablet, and mobile browsers.
>
> Thank you very much, Ajarn and classmates. We are now open to any questions!"

### 🎬 Screen Actions for Speaker 4:
1. In the bag, click **"Proceed to Checkout"** -> The large 2-column modal opens.
2. Fill in Name: `Lady Eleanor`, Phone: `+66 81 234 5678`, Email: `eleanor@luxury.com`, Address: `Bangkok, Thailand`.
3. Check the **"Complimentary Handwritten Calligraphy Gift Card"** box -> write a short note: *"With love and warmth"*.
4. Switch tabs between **PromptPay QR**, **Credit Card**, and **Cash on Delivery**.
5. In the voucher box, type **`VELORA10`** and click **"Apply"** -> show the green success badge and discount deducted!
6. Click **"Confirm Acquisition →"** -> The Deluxe Official Receipt & Wax Seal appears!
7. Click **"Print Official Receipt"** -> show the browser print dialog preview with clean white paper layout.
8. Click **"Save Text Record"** -> show the `.txt` receipt download.

---

## 💡 Anticipated Q&A (Tips for the Professor's Questions)

| Potential Professor Question | Recommended Answer |
| :--- | :--- |
| **Q1: Where is data stored? Is there a database?** | *"For this front-end demo, all catalog data is stored in structured JavaScript objects in `app.js`, and user session state (cart items, quantities) is persisted client-side using HTML5 `localStorage`. This allows the application to run at full speed without needing a server."* |
| **Q2: How does the voucher system work?** | *"In `app.js`, we have a state object `appliedVoucher`. When the user enters a code, we validate against defined coupon objects (`VELORA10`, `VIP300`, `MAISON`). If valid, we recalculate `discountAmount` and update the DOM subtotal and grand total dynamically."* |
| **Q3: How does the print receipt work without printing dark backgrounds?** | *"We wrote dedicated `@media print` CSS rules. When `window.print()` is triggered, all webpage elements are hidden except `#orderReceipt`, and colors are inverted to clean paper-friendly tones with high-contrast text and gold headers."* |
| **Q4: How responsive is the website on mobile screens?** | *"We used CSS Media Queries with breakpoints at `900px` and `600px`. The 2-column checkout collapses into a single column, navigation links tuck into clean icons, and touch targets meet Apple and Google mobile usability standards."* |
