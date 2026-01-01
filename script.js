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
        nepalStats: "Nepal Statistics",
        timezone: "Timezone:",
        currency: "Currency:",
        vat: "VAT Rate:",
        searchPlaceholder: "Search orders, products, customers...",
        ordersCompleted: "Orders Completed",
        totalRevenue: "Total Revenue",
        totalVisits: "Total Visits",
        totalSales: "Total Sales",
        fromLastMonth: "from last month",
        revenueAnalytics: "Revenue Analytics (Last 6 Months)",
        realityVsTarget: "Reality vs Target (Sales Goals)",
        q1Target: "Q1 Target",
        monthlyTarget: "Monthly Target",
        weeklyTarget: "Weekly Target",
        customerSatisfaction: "Customer Satisfaction Score",
        basedOnReviews: "Based on 342 reviews",
        recentOrders: "Recent Orders Overview",
        viewAll: "View All",
        orderId: "Order ID",
        customer: "Customer",
        date: "Date",
        amount: "Amount",
        status: "Status",
        completed: "Completed",
        processing: "Processing",
        bestProducts: "Best Performing Products",
        earningRevenue: "Earning Revenue (Net)",
        afterDeductions: "After discounts & refunds:",
        orderReserved: "Order Reserved from Website",
        preOrders: "Pre-orders & reservations",
        ourProducts: "Our Products (Listings & SKUs)",
        newThisMonth: "8 new this month",
        lowStock: "24 low in stock",
        todaysSales: "Today's Sales",
        fromYesterday: "from yesterday"
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
        nepalStats: "नेपाल तथ्याङ्क",
        timezone: "समय क्षेत्र:",
        currency: "मुद्रा:",
        vat: "भ्याट दर:",
        searchPlaceholder: "अर्डर, उत्पादन, ग्राहक खोज्नुहोस्...",
        ordersCompleted: "पूरा गरिएका अर्डरहरू",
        totalRevenue: "कुल आय",
        totalVisits: "कुल भ्रमणहरू",
        totalSales: "कुल बिक्री",
        fromLastMonth: "गत महिना भन्दा",
        revenueAnalytics: "आय विश्लेषण (पछिल्लो ६ महिना)",
        realityVsTarget: "वास्तविकता बनाम लक्ष्य (बिक्री लक्ष्य)",
        q1Target: "प्रथम चौमासिक लक्ष्य",
        monthlyTarget: "मासिक लक्ष्य",
        weeklyTarget: "साप्ताहिक लक्ष्य",
        customerSatisfaction: "ग्राहक सन्तुष्टि स्कोर",
        basedOnReviews: "३४२ समीक्षा आधारित",
        recentOrders: "हालैका अर्डरहरू",
        viewAll: "सबै हेर्नुहोस्",
        orderId: "अर्डर आईडी",
        customer: "ग्राहक",
        date: "मिति",
        amount: "रकम",
        status: "स्थिति",
        completed: "पूरा भयो",
        processing: "प्रशोधन हुदैछ",
        bestProducts: "उत्कृष्ट उत्पादनहरू",
        earningRevenue: "शुद्ध आय",
        afterDeductions: "छुट र फिर्ता पछि:",
        orderReserved: "वेबसाइटबाट आरक्षित अर्डर",
        preOrders: "प्री-अर्डर र आरक्षणहरू",
        ourProducts: "हाम्रा उत्पादनहरू (सूची र SKUs)",
        newThisMonth: "यस महिना ८ नयाँ",
        lowStock: "२४ कम स्टकमा",
        todaysSales: "आजको बिक्री",
        fromYesterday: "हिजो भन्दा"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const themeToggle = document.getElementById('themeToggle');
    const currencyBtns = document.querySelectorAll('.currency-btn');
    const languageOptions = document.querySelectorAll('.language-option');
    const languageDropdown = document.getElementById('languageDropdown');
    const exchangeRate = 133.5;

    let currentLanguage = 'en';
    let currentCurrency = 'usd';

    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('sidebar-active');
    });

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
            if (text) text.textContent = ' Light Mode';
            themeToggle.setAttribute('title', 'Switch to Light Mode');
        } else {
            icon.className = 'fas fa-moon';
            if (text) text.textContent = ' Dark Mode';
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
        }
        
        localStorage.setItem('theme', newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    currencyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            currencyBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCurrency = this.dataset.currency;
            updateCurrencyDisplay();
            localStorage.setItem('currency', currentCurrency);
        });
    });

    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            currentLanguage = this.dataset.lang;
            updateLanguage();
            
            const dropdownText = languageDropdown.querySelector('span');
            if (dropdownText) {
                dropdownText.textContent = this.textContent;
            } else {
                languageDropdown.innerHTML = `<i class="fas fa-language"></i> ${this.textContent}`;
            }
            
            localStorage.setItem('language', currentLanguage);
        });
    });

    function updateLanguage() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[currentLanguage][key]) {
                if (element.tagName === 'INPUT') {
                    element.setAttribute('placeholder', translations[currentLanguage][key]);
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });
    }

    function updateCurrencyDisplay() {
        const currencyElements = document.querySelectorAll('.currency-amount, .metric-value[data-currency="true"], .goal-value');
        
        currencyElements.forEach(element => {
            const usdValue = parseFloat(element.getAttribute('data-usd') || element.textContent.replace(/[^0-9.-]+/g, ""));
            
            if (!isNaN(usdValue)) {
                if (currentCurrency === 'npr') {
                    const nprValue = usdValue * exchangeRate;
                    if (element.classList.contains('metric-value') || element.classList.contains('goal-value')) {
                        element.textContent = `रु ${nprValue.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}`;
                    } else {
                        element.textContent = `रु ${nprValue.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`;
                    }
                    element.classList.add('nepali-font');
                } else {
                    if (element.classList.contains('metric-value') || element.classList.contains('goal-value')) {
                        element.textContent = `$${usdValue.toLocaleString('en-US', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        })}`;
                    } else {
                        element.textContent = `$${usdValue.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}`;
                    }
                    element.classList.remove('nepali-font');
                }
            }
        });
    }

    const savedCurrency = localStorage.getItem('currency') || 'usd';
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    if (savedCurrency === 'npr') {
        document.querySelector('.currency-btn[data-currency="npr"]').click();
    }
    
    if (savedLanguage === 'np') {
        document.querySelector('.language-option[data-lang="np"]').click();
    }

    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन'],
                datasets: [{
                    label: 'आय',
                    data: [32000, 38000, 41000, 38500, 42580, 48000],
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-light'),
                            callback: function(value) {
                                if (currentCurrency === 'npr') {
                                    return 'रु ' + (value * exchangeRate).toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    });
                                }
                                return '$' + value.toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                });
                            }
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-light')
                        }
                    },
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-light')
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border-light')
                        }
                    }
                }
            }
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('sidebar-active');
        }
    });

    setInterval(updateMetrics, 30000);
});

function updateMetrics() {
    const metricValues = document.querySelectorAll('.metric-value[data-value]');
    
    metricValues.forEach(element => {
        if (element.getAttribute('data-currency') === 'true') {
            const currentValue = parseFloat(element.getAttribute('data-value'));
            const change = (Math.random() * 500 - 250);
            const newValue = Math.max(100, currentValue + change);
            element.setAttribute('data-value', newValue.toFixed(0));
            element.setAttribute('data-usd', newValue.toFixed(0));
        } else {
            const currentValue = parseFloat(element.getAttribute('data-value'));
            const change = Math.floor(Math.random() * 50 - 25);
            const newValue = Math.max(10, currentValue + change);
            element.setAttribute('data-value', newValue.toFixed(0));
        }
    });

    const changeValues = document.querySelectorAll('.change-value');
    changeValues.forEach(element => {
        const isPositive = Math.random() > 0.3;
        const percentage = (Math.random() * 15 + 1).toFixed(1);
        element.textContent = `${percentage}%`;
        
        const parent = element.closest('.metric-change');
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

    const savedCurrency = localStorage.getItem('currency') || 'usd';
    const currencyElements = document.querySelectorAll('.currency-amount, .metric-value[data-currency="true"], .goal-value');
    const exchangeRate = 133.5;

    currencyElements.forEach(element => {
        const usdValue = parseFloat(element.getAttribute('data-usd') || element.textContent.replace(/[^0-9.-]+/g, ""));
        
        if (!isNaN(usdValue)) {
            if (savedCurrency === 'npr') {
                const nprValue = usdValue * exchangeRate;
                if (element.classList.contains('metric-value') || element.classList.contains('goal-value')) {
                    element.textContent = `रु ${nprValue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`;
                } else {
                    element.textContent = `रु ${nprValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`;
                }
                element.classList.add('nepali-font');
            } else {
                if (element.classList.contains('metric-value') || element.classList.contains('goal-value')) {
                    element.textContent = `$${usdValue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    })}`;
                } else {
                    element.textContent = `$${usdValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}`;
                }
                element.classList.remove('nepali-font');
            }
        }
    });
}
