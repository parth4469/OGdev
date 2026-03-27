// transactionAnalysisService.js
// O(N) Fintech Transaction Analysis Engine

const KNOWN_SUBSCRIPTIONS = {
  'netflix': { normalized: 'Netflix', category: 'Entertainment' },
  'spotify': { normalized: 'Spotify', category: 'Entertainment' },
  'amazon': { normalized: 'Amazon Prime', category: 'Shopping/Entertainment' },
  'amzn': { normalized: 'Amazon Prime', category: 'Shopping/Entertainment' },
  'prime': { normalized: 'Amazon', category: 'Shopping' },
  'hotstar': { normalized: 'Disney+ Hotstar', category: 'Entertainment' },
  'swiggy': { normalized: 'Swiggy', category: 'Food' },
  'zomato': { normalized: 'Zomato', category: 'Food' },
  'google': { normalized: 'Google Services', category: 'Cloud/Storage' },
  'apple': { normalized: 'Apple Services', category: 'Entertainment/Cloud' },
  'jio': { normalized: 'Jio Services', category: 'Utilities' },
  'airtel': { normalized: 'Airtel', category: 'Utilities' }
};

/**
 * Normalizes description and checks if it's a known service
 */
const normalizeMerchant = (description) => {
  const descLower = description.toLowerCase();
  for (const [key, meta] of Object.entries(KNOWN_SUBSCRIPTIONS)) {
    if (descLower.includes(key)) {
      return { name: meta.normalized, category: meta.category, isKnown: true };
    }
  }
  // Fallback: clean up noisy characters and return a capitalized version
  const clean = description.replace(/[^a-zA-Z\s]/g, '').trim().split(' ')[0];
  return { 
    name: clean ? (clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase()) : 'Unknown', 
    category: 'Uncategorized', 
    isKnown: false 
  };
};

/**
 * Analyzes raw transactions and detects subscriptions, confidence, and insights.
 */
const analyzeTransactions = (transactions) => {
  const groups = {};
  let totalRawSpend = 0;

  // 1. Group transactions by normalized normalized names and collect dates/amounts
  transactions.forEach(t => {
    if (!t.description || isNaN(Number(t.amount))) return;
    
    const amt = Math.abs(Number(t.amount));
    totalRawSpend += amt;

    const { name, category, isKnown } = normalizeMerchant(t.description);

    if (!groups[name]) {
      groups[name] = { 
        name, 
        category, 
        isKnown, 
        amounts: [], 
        dates: [] 
      };
    }
    
    groups[name].amounts.push(amt);
    groups[name].dates.push(new Date(t.date));
  });

  const subscriptions = [];
  const hiddenSubscriptions = [];
  let totalMonthlySpend = 0;
  let wastedMoney = 0;
  const suggestions = [];

  const today = new Date();

  // 2. Score groups
  for (const name in groups) {
    const group = groups[name];
    
    // Sort dates ascending
    group.dates.sort((a, b) => a - b);
    
    let isRecurring = false;
    let confidence = 0.0;
    
    // Check recurrence rules
    if (group.dates.length > 1) {
      let totalDaysDiff = 0;
      for (let i = 1; i < group.dates.length; i++) {
        const diffTime = Math.abs(group.dates[i] - group.dates[i - 1]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        totalDaysDiff += diffDays;
      }
      
      const avgInterval = totalDaysDiff / (group.dates.length - 1);
      
      // If average interval is roughly ~30 days (monthly) or ~365 days (yearly)
      if ((avgInterval >= 25 && avgInterval <= 35) || (avgInterval >= 355 && avgInterval <= 375)) {
        isRecurring = true;
        confidence = group.isKnown ? 0.95 : 0.80; // High confidence for known, medium for unknown
      } else {
        confidence = 0.4;
      }
    } else if (group.isKnown) {
       // Known subscription but only 1 transaction seen (maybe new user data)
       isRecurring = true;
       confidence = 0.70;
    }

    if (isRecurring || confidence >= 0.7) {
      // Calculate latest cost
      const averageCost = group.amounts.reduce((a, b) => a + b, 0) / group.amounts.length;
      const lastUsed = group.dates[group.dates.length - 1];
      
      const sub = {
        name: group.name,
        cost: Math.round(averageCost * 100) / 100,
        category: group.category,
        confidence,
        lastUsed,
        billingCycle: 'monthly' // default assumption for hackathon
      };
      
      subscriptions.push(sub);
      totalMonthlySpend += sub.cost;

      // Hidden subscriptions: Not known or very low confidence but showing recurring signs
      if (!group.isKnown && confidence < 0.9) {
        hiddenSubscriptions.push(sub);
      }

      // Wasted Money logic: If the most recent transaction was over 45 days ago, it might be forgotten but still active.
      const daysSinceLast = Math.ceil(Math.abs(today - lastUsed) / (1000 * 60 * 60 * 24));
      if (daysSinceLast > 45) {
        wastedMoney += sub.cost;
        suggestions.push(`Consider canceling ${sub.name} in the ${sub.category} category. It hasn't been used or billed recently but might auto-renew. Costs: ₹${sub.cost}.`);
      }
    }
  }

  // 3. Generate Holistic Suggestions
  if (subscriptions.length > 5) {
    suggestions.push(`You have ${subscriptions.length} active subscriptions. Consider combining similar services to save money.`);
  }
  
  const entertainmentCount = subscriptions.filter(s => s.category.includes('Entertainment')).length;
  if (entertainmentCount >= 3) {
    suggestions.push(`You have ${entertainmentCount} entertainment subscriptions. You might want to downgrade an expensive plan or pause one.`);
  }

  return {
    totalMonthlySpend: Math.round(totalMonthlySpend * 100) / 100,
    wastedMoney: Math.round(wastedMoney * 100) / 100,
    subscriptions: subscriptions.sort((a, b) => b.cost - a.cost),
    hiddenSubscriptions,
    suggestions
  };
};

module.exports = { analyzeTransactions };
