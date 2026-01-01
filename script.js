const translations = {
  en: {
    dashboard: "Dashboard",
    orders: "Orders",
    analytics: "Analytics",
    products: "Products",
    customers: "Customers",
    inventory: "Inventory",
    reports: "Reports",
    settings: "Settings",
    searchPlaceholder: "Search orders, products, customers...",
    ordersCompleted: "Orders Completed",
    totalRevenue: "Total Revenue",
    revenueAnalytics: "Revenue Analytics (Last 6 Months)",
  },
  np: {
    dashboard: "ड्यासबोर्ड",
    orders: "अर्डरहरू",
    analytics: "विश्लेषण",
    products: "उत्पादनहरू",
    customers: "ग्राहकहरू",
    inventory: "सूची",
    reports: "प्रतिवेदनहरू",
    settings: "सेटिङहरू",
    searchPlaceholder: "अर्डर, उत्पादन, ग्राहक खोज्नुहोस्...",
    ordersCompleted: "पूरा गरिएका अर्डरहरू",
    totalRevenue: "कुल आय",
    revenueAnalytics: "आय विश्लेषण (पछिल्लो ६ महिना)",
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const languageBtn = document.getElementById('languageBtn');
  const languageList = document.getElementById('languageList');
  const currentLanguageSpan = document.getElementById('currentLanguage');
  const themeToggle = document.getElementById('themeToggle');
  const sidebar = document.getElementById('sidebar');
  const toggleSidebar = document.getElementById('toggleSidebar');
  const mainContent = document.getElementById('mainContent');

  // State
  let currentLanguage = localStorage.getItem('language') || 'en';
  let currentTheme = localStorage.getItem('theme') || 'light';

  // Initialize theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeToggleIcon();

  // Initialize language UI
  setLanguageUI(currentLanguage);
  updateTexts(currentLanguage);

  // Sidebar toggle
  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('sidebar-active');
  });

  // Theme toggle
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggleIcon();
  });

  // Language dropdown toggle
  languageBtn.addEventListener('click', () => {
    const expanded = languageBtn.getAttribute('aria-expanded') === 'true';
    languageBtn.setAttribute('aria-expanded', !expanded);
    languageList.hidden = expanded;
    if (!expanded) {
      languageList.focus();
    }
  });

  // Language option selection
  languageList.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      currentLanguage = option.dataset.lang;
      localStorage.setItem('language', currentLanguage);
      setLanguageUI(currentLanguage);
      updateTexts(currentLanguage);
      closeLanguageDropdown();
    });

    // Keyboard support for language options
    option.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        option.click();
      }
    });
  });

  // Close language dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!languageBtn.contains(e.target) && !languageList.contains(e.target)) {
      closeLanguageDropdown();
    }
  });

  // Close dropdown helper
  function closeLanguageDropdown() {
    languageBtn.setAttribute('aria-expanded', false);
    languageList.hidden = true;
  }

  // Update theme toggle icon and tooltip
  function updateThemeToggleIcon() {
    const icon = themeToggle.querySelector('i');
    const span = themeToggle.querySelector('span');
    if (currentTheme === 'dark') {
      icon.className = 'fas fa-sun';
      themeToggle.setAttribute('title', 'Switch to Light Mode');
      if (span) span.textContent = 'Light Mode';
    } else {
      icon.className = 'fas fa-moon';
      themeToggle.setAttribute('title', 'Switch to Dark Mode');
      if (span) span.textContent = 'Dark Mode';
    }
  }

  // Set UI language button and aria-selected on options
  function setLanguageUI(lang) {
    const languageName = lang === 'en' ? 'English' : 'नेपाली';
    currentLanguageSpan.textContent = languageName;
    languageList.querySelectorAll('li').forEach(li => {
      li.setAttribute('aria-selected', li.dataset.lang === lang ? 'true' : 'false');
    });
  }

  // Update all texts on the page according to language
  function updateTexts(lang) {
    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      const translation = translations[lang][key];
      if (!translation) return;

      if (el.tagName === 'INPUT') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    });
  }

  // ---------------------------
  // CURRENCY DISPLAY (Nepali Rs only)
  // ---------------------------
  const currencySymbol = 'रु';
  const exchangeRate = 133.5; // For internal USD to NPR calculations if needed

  // Update all currency amounts on the page
  function updateCurrencyDisplay() {
    document.querySelectorAll('.metric-value[data-usd]').forEach(el => {
      const usdValue = parseFloat(el.getAttribute('data-usd'));
      if (isNaN(usdValue)) return;

      // Convert to NPR
      const nprValue = usdValue * exchangeRate;
      el.textContent = `${currencySymbol} ${nprValue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
      el.classList.add('nepali-font');
    });
  }

  updateCurrencyDisplay();

  // ---------------------------
  // CHART.JS - REVENUE CHART with English months only
  // ---------------------------

  const revenueCtx = document.getElementById('revenueChart');
  if (revenueCtx) {
    const revenueChart = new Chart(revenueCtx.getContext('2d'), {
      type: 'line',
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [{
          label: translations[currentLanguage].totalRevenue || 'Total Revenue',
          data: [32000, 38000, 41000, 38500, 42580, 48000, 45000, 47000, 43000, 46000, 48000, 50000],
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-light').trim() || '#000',
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-light').trim() || '#000',
              callback: function(value) {
                const nprValue = value * exchangeRate;
                return `${currencySymbol} ${nprValue.toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;
              }
            },
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-light').trim() || '#ccc',
            }
          },
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-light').trim() || '#000',
            },
            grid: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--border-light').trim() || '#ccc',
            }
          }
        }
      }
    });
  }

  // ---------------------------
  // DYNAMIC METRIC UPDATES
  // ---------------------------

  function updateMetrics() {
    document.querySelectorAll('.metric-value[data-value]').forEach(el => {
      if (el.getAttribute('data-currency') === 'true') {
        // Currency metric: update value slightly around current value
        const currentValue = parseFloat(el.getAttribute('data-value'));
        const change = (Math.random() * 500 - 250);
        const newValue = Math.max(100, currentValue + change);
        el.setAttribute('data-value', newValue.toFixed(0));
        el.setAttribute('data-usd', newValue.toFixed(0));
      } else {
        // Non-currency metric
        const currentValue = parseFloat(el.getAttribute('data-value'));
        const change = Math.floor(Math.random() * 50 - 25);
        const newValue = Math.max(10, currentValue + change);
        el.setAttribute('data-value', newValue.toFixed(0));
      }
    });

    // Update % change indicators
    document.querySelectorAll('.change-value').forEach(el => {
      const isPositive = Math.random() > 0.3;
      const percentage = (Math.random() * 15 + 1).toFixed(1);
      el.textContent = `${percentage}%`;

      const parent = el.closest('.metric-change');
      if (parent) {
        if (isPositive) {
          parent.className = 'metric-change positive';
          const icon = parent.querySelector('i');
          if (icon) icon.className = 'fas fa-arrow-up me-1';
        } else {
          parent.className = 'metric-change negative';
          const icon = parent.querySelector('i');
          if (icon) icon.className = 'fas fa-arrow-down me-1';
        }
      }
    });

    // Update currency display after metric change
    updateCurrencyDisplay();
  }

  setInterval(updateMetrics, 30000); // Every 30 seconds

  // Close sidebar on window resize (desktop)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      sidebar.classList.remove('active');
      mainContent.classList.remove('sidebar-active');
    }
  });
});
