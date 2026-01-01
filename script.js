document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const themeToggle = document.getElementById('themeToggle');
    const languageToggle = document.getElementById('languageToggle');
    
    // Current language
    let currentLanguage = 'en';
    
    // Language translations
    const translations = {
        en: {
            // Menu
            dashboard: "Dashboard",
            messages: "Messages",
            products: "Products",
            orders: "Orders",
            content: "Content",
            account: "Account",
            
            // Dashboard
            totalSales: "Total Sales",
            newOrders: "New Orders",
            customersReached: "Customers Reached",
            productsDelivered: "Products Delivered",
            salesGraph: "Sales Graph (Last 6 Months)",
            productCategories: "Product Categories",
            bestSelling: "Best Selling Product",
            recentOrders: "Recent Orders",
            viewAll: "View All",
            delivered: "Delivered",
            processing: "Processing",
            pending: "Pending"
        },
        np: {
            // Menu
            dashboard: "ड्यासबोर्ड",
            messages: "सन्देशहरू",
            products: "उत्पादनहरू",
            orders: "अर्डरहरू",
            content: "सामग्री",
            account: "खाता",
            
            // Dashboard
            totalSales: "कुल बिक्री",
            newOrders: "नयाँ अर्डरहरू",
            customersReached: "ग्राहकहरू पुगे",
            productsDelivered: "उत्पादनहरू वितरण भयो",
            salesGraph: "बिक्री ग्राफ (पछिल्लो ६ महिना)",
            productCategories: "उत्पादनको प्रकारहरू",
            bestSelling: "उत्कृष्ट बिक्री हुने उत्पादन",
            recentOrders: "हालैका अर्डरहरू",
            viewAll: "सबै हेर्नुहोस्",
            delivered: "वितरण भयो",
            processing: "प्रशोधन हुदैछ",
            pending: "पेन्डिङ"
        }
    };
    
    // Toggle sidebar on mobile
    toggleSidebar.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        localStorage.setItem('theme', newTheme);
    });
    
    // Language toggle
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'np' : 'en';
        updateLanguage();
        
        const span = languageToggle.querySelector('span');
        span.textContent = currentLanguage === 'en' ? 'English' : 'नेपाली';
        
        localStorage.setItem('language', currentLanguage);
    });
    
    // Update all text based on language
    function updateLanguage() {
        // Update menu items
        document.querySelectorAll('.menu-text').forEach(element => {
            const key = element.textContent.toLowerCase().replace(/\s+/g, '');
            if (translations[currentLanguage][key]) {
                element.textContent = translations[currentLanguage][key];
            }
        });
        
        // Update dashboard titles
        document.querySelectorAll('.total-sales').forEach(el => {
            el.textContent = translations[currentLanguage]['totalSales'];
        });
        document.querySelectorAll('.new-orders').forEach(el => {
            el.textContent = translations[currentLanguage]['newOrders'];
        });
        document.querySelectorAll('.customers-reached').forEach(el => {
            el.textContent = translations[currentLanguage]['customersReached'];
        });
        document.querySelectorAll('.products-delivered').forEach(el => {
            el.textContent = translations[currentLanguage]['productsDelivered'];
        });
        document.querySelectorAll('.sales-graph-title').forEach(el => {
            el.textContent = translations[currentLanguage]['salesGraph'];
        });
        document.querySelectorAll('.product-categories-title').forEach(el => {
            el.textContent = translations[currentLanguage]['productCategories'];
        });
        document.querySelectorAll('.best-selling-title').forEach(el => {
            el.textContent = translations[currentLanguage]['bestSelling'];
        });
        document.querySelectorAll('.recent-orders-title').forEach(el => {
            el.textContent = translations[currentLanguage]['recentOrders'];
        });
        document.querySelectorAll('.view-all-btn').forEach(el => {
            el.textContent = translations[currentLanguage]['viewAll'];
        });
        
        // Update status badges
        document.querySelectorAll('.status-delivered').forEach(el => {
            el.textContent = translations[currentLanguage]['delivered'];
        });
        document.querySelectorAll('.status-processing').forEach(el => {
            el.textContent = translations[currentLanguage]['processing'];
        });
        document.querySelectorAll('.status-pending').forEach(el => {
            el.textContent = translations[currentLanguage]['pending'];
        });
    }
    
    // Load saved theme and language
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    const savedLanguage = localStorage.getItem('language') || 'en';
    currentLanguage = savedLanguage;
    languageToggle.querySelector('span').textContent = savedLanguage === 'en' ? 'English' : 'नेपाली';
    updateLanguage();
    
    // Charts
    const salesCtx = document.getElementById('salesChart');
    const categoryCtx = document.getElementById('categoryChart');
    
    if (salesCtx) {
        new Chart(salesCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales (रु)',
                    data: [4200000, 5200000, 3800000, 6500000, 7200000, 8000000],
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
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'रु ' + (value / 100000).toFixed(0) + 'L';
                            }
                        }
                    }
                }
            }
        });
    }
    
    if (categoryCtx) {
        new Chart(categoryCtx.getContext('2d'), {
            type: 'pie',
            data: {
                labels: ['Electronics', 'Clothing', 'Books', 'Home', 'Sports'],
                datasets: [{
                    data: [35, 25, 15, 15, 10],
                    backgroundColor: [
                        '#4361ee',
                        '#3a0ca3',
                        '#f72585',
                        '#4cc9f0',
                        '#7209b7'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
});
