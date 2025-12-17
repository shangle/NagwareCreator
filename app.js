(function() {
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const CONFIG = {
        currentBalance: 99812.27, 
        initialLoanAmount: 120000.00, 
        paymentLink: "https://account.venmo.com/TimShangle",
        daysBetweenNags: 7, 
    };

    // ==========================================
    // KILL SWITCH & LOGIC
    // ==========================================
    if (CONFIG.currentBalance <= 0) return; 

    const STORAGE_KEY = 'dev_loan_nag_last_seen';
    const now = new Date().getTime();
    const lastSeen = localStorage.getItem(STORAGE_KEY);
    if (lastSeen && (now - lastSeen) < (CONFIG.daysBetweenNags * 24 * 60 * 60 * 1000)) return; 

    // ==========================================
    // UI BUILDER
    // ==========================================
    function createModal() {
        const paidAmount = CONFIG.initialLoanAmount - CONFIG.currentBalance;
        const progressPct = (paidAmount / CONFIG.initialLoanAmount) * 100;
        const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
        
        const styles = `
            #loan-nag-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.6); z-index: 99999;
                display: flex; justify-content: center; align-items: center;
                backdrop-filter: blur(3px);
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            }
            #loan-nag-box {
                background: white; border-radius: 16px;
                box-shadow: 0 15px 35px rgba(0,0,0,0.25);
                width: 90%; max-width: 440px; overflow: hidden;
                animation: loanPopIn 0.3s ease-out;
            }
            @keyframes loanPopIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
            #loan-nag-header {
                background: #f8fafc; padding: 18px 24px;
                border-bottom: 1px solid #e2e8f0;
                display: flex; justify-content: space-between; align-items: center;
            }
            #loan-nag-title { font-weight: 800; color: #0f172a; font-size: 18px; }
            #loan-close-x { cursor: pointer; font-size: 24px; color: #94a3b8; line-height: 1; transition: color 0.2s;}
            #loan-close-x:hover { color: #475569; }
            #loan-nag-content { padding: 24px; }
            .loan-text { font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
            .loan-progress-track {
                width: 100%; background: #e2e8f0; border-radius: 12px;
                height: 14px; margin: 0 0 10px 0; overflow: hidden; position: relative;
            }
            .loan-progress-fill {
                height: 100%; background: linear-gradient(90deg, #FFD700, #FFA500); 
                width: ${progressPct}%; border-radius: 12px;
            }
            .loan-stats {
                display: flex; justify-content: space-between; 
                font-size: 14px; color: #64748b; font-weight: 600; margin-bottom: 28px;
            }
            .loan-actions { display: flex; gap: 12px; flex-wrap: wrap; }
            .loan-btn-primary {
                flex: 1 0 140px; background: #0ea5e9; color: white; border: none; 
                padding: 14px; border-radius: 10px; font-weight: 700; cursor: pointer;
                text-align: center; text-decoration: none; font-size: 16px;
                transition: transform 0.1s, background 0.2s; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.3);
            }
            .loan-btn-primary:hover { background: #0284c7; transform: translateY(-1px); }
            .loan-btn-secondary {
                flex: 1 0 140px; background: #f1f5f9; color: #64748b; border: 1px solid #e2e8f0;
                padding: 14px; border-radius: 10px; font-weight: 600; cursor: pointer;
                text-align: center; font-size: 15px; transition: background 0.2s, color 0.2s;
            }
            .loan-btn-secondary:hover { background: #e2e8f0; color: #334155; }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        const overlay = document.createElement('div');
        overlay.id = 'loan-nag-overlay';
        
        overlay.innerHTML = `
            <div id="loan-nag-box">
                <div id="loan-nag-header">
                    <span id="loan-nag-title">👋 Student Loan Tracker 🎓</span>
                    <span id="loan-close-x">&times;</span>
                </div>
                <div id="loan-nag-content">
                    <p class="loan-text">
                        Hi! I build free apps because I love coding. 💻✨ 
                        <br>But... I also have these pesky student loans. 😅💸
                        <br><br>
                        <strong>The deal:</strong> Once this bar hits 100%, this popup disappears forever for everyone. 🎉
                    </p>
                    
                    <div class="loan-progress-track">
                        <div class="loan-progress-fill"></div>
                    </div>
                    <div class="loan-stats">
                        <span>✅ Paid: ${fmt.format(paidAmount)}</span>
                        <span style="color:#ef4444">📉 Remaining: ${fmt.format(CONFIG.currentBalance)}</span>
                    </div>

                    <div class="loan-actions">
                        <a href="${CONFIG.paymentLink}" target="_blank" class="loan-btn-primary">
                            ☕ Chip in via Venmo 💖
                        </a>
                        <button id="loan-close-btn" class="loan-btn-secondary">
                            😌 I'll just use the app
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const close = () => {
            document.body.removeChild(overlay);
            localStorage.setItem(STORAGE_KEY, new Date().getTime());
        };

        document.getElementById('loan-close-btn').onclick = close;
        document.getElementById('loan-close-x').onclick = close;
    }

    if (document.readyState === 'complete') createModal();
    else window.addEventListener('load', createModal);
})();



