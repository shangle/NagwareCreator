# Nagware Creator 💾

**Reviving the Spirit of Shareware.**

[Live Demo](https://shangle.me/NagwareCreator/) <!-- Update this link after hosting -->

The **Nagware Creator** is a zero-dependency tool that generates "ethical nagware" for your websites and web apps. It allows developers to monetize free software by politely reminding users that a human being made the tool, without locking features behind paywalls or subscriptions.

Think of it as the **WinRAR model** for the modern web:
* ✅ **No Feature Locking:** The app remains 100% free.
* ✅ **No Tracking:** No cookies, no analytics, no accounts.
* ✅ **Self-Destructs:** Once your financial goal is reached, the popup disappears forever for everyone.

## 🚀 How It Works

This project is a **Static Site Generator** contained in a single HTML file. 

1.  **Open the Generator:** Launch `index.html` in your browser.
2.  **Customize:** Enter your funding goal (Student Loans, Server Costs, Coffee Fund), colors, and message.
3.  **Generate Code:** The tool instantly creates a lightweight JavaScript snippet.
4.  **Embed:** Paste that snippet into your website's `<body>`.

### The "No-Backend" Magic 🪄

This tool does not require a database. 
* **The Generator:** Saves your settings directly into the **URL**. To save your configuration, just bookmark the page.
* **The Pop-up:** The generated code is self-contained. To update your "Remaining Balance" after receiving a donation, simply re-generate the code with the new number and paste it into your site.

## 🛠 Features

* **Smart Frequency:** Uses `localStorage` to ensure the popup only appears once every X days (customizable). It respects your users' time.
* **Goal Tracking:** Visually displays a progress bar towards your financial goal.
* **The Kill Switch:** If you set the "Amount Remaining" to `$0`, the script automatically stops rendering.
* **Lightweight:** The generated code is vanilla JavaScript and CSS. No React, jQuery, or external fonts required.

## 📦 Installation & Usage

### To Use the Generator
Simply download the `index.html` file and open it in any browser. 

### To Host the Generator (for yourself or others)
1.  Fork this repository.
2.  Enable **GitHub Pages** in the repository settings.
3.  Your generator is now live at `https://your-username.github.io/repo-name`.

## 📝 Example Configuration

The generator creates code that looks like this (minified in production):

```javascript
(function() {
  var config = {
    balance: 450.00,       // Amount left to raise
    goal: 1000.00,         // Total goal
    frequency: 1,          // Days between popups
    link: "https://..."    // Payment URL
  };
  
  // ... Logic to check localStorage and render the UI ...
})();
