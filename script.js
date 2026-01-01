document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeDashboard();
});

function initializeDashboard() {
    // Elements
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.getElementById('sidebar');
    const themeToggle = document.getElementById('themeToggle');
    const languageToggle = document.getElementById('languageToggle');
    const excelFile = document.getElementById('excelFile');
    const importExcel = document.getElementById('importExcel');
    const addProductBtn = document.getElementById('addProductBtn');
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    
    // Current settings
    let currentLanguage = localStorage.getItem('language') || 'en';
    let currentBusiness = 'all';
    let currentPeriod = 'today';
    
    // Sample data
    let products = [
        {
            id: 1,
            name: 'Wireless Headphones',
            price: 'रु 5,499',
            category: 'electronics',
            stock: 42,
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400'
        },
        {
            id: 2,
            name: 'Running Shoes',
            price: 'रु 3,999',
            category: 'sports',
            stock: 28,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'
        },
        {
            id: 3,
            name: 'Smart Watch',
            price: 'रु 12,999',
            category: 'electronics',
            stock: 15,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
        },
        {
            id: 4,
            name: 'T-Shirt',
            price: 'रु 799',
            category: 'clothing',
            stock: 67,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
        }
    ];
    
    let orders = [
        { id: '#ORD-7841', customer: 'Sarah Johnson', amount: 'रु 33,200', type: 'online', status: 'delivered' },
        { id: '#ORD-7840', customer: 'Michael Chen', amount: 'रु 25,400', type: 'offline', status: 'processing' },
        { id: '#ORD-7839', customer: 'Emma Williams', amount: 'रु 56,900', type: 'online', status: 'pending' },
        { id: '#ORD-7838', customer: 'Robert Garcia', amount: 'रु 10,200', type: 'offline', status: 'delivered' },
        { id: '#ORD-7837', customer: 'Lisa Martinez', amount: 'रु 42,500', type: 'online', status: 'processing' }
    ];
    
    // Translations
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
            dashboardTitle: "Dashboard Overview",
            totalSales: "Total Sales",
            newOrders: "Total Orders",
            customersReached: "Customers Reached",
            productsDelivered: "Products Delivered",
            salesGraph: "Sales Comparison",
            productCategories: "Revenue Sources",
            bestSelling: "Best Selling Products",
            recentOrders: "Recent Orders",
            viewAll: "View All Orders",
            businessText: "All Business",
            onlineBusiness: "Online Only",
            offlineBusiness: "Offline Only",
            
            // Excel Import
            importTitle: "Import Offline Data",
            importBtnText: "Import Excel",
            importHelp: "Upload offline sales data from Excel",
            
            // Status
            delivered: "Delivered",
            processing: "Processing",
            pending: "Pending",
            online: "Online",
            offline: "Offline",
            
            // Brand
            brandName: "ShopNepal Admin",
            userName: "Shreyas Sharma"
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
            dashboardTitle: "ड्यासबोर्ड विवरण",
            totalSales: "कुल बिक्री",
            newOrders: "कुल अर्डरहरू",
            customersReached: "ग्राहकहरू पुगे",
            productsDelivered: "उत्पादनहरू वितरण भयो",
            salesGraph: "बिक्री तुलना",
            productCategories: "आयको स्रोतहरू",
            bestSelling: "उत्कृष्ट बिक्री हुने उत्पादनहरू",
            recentOrders: "हालैका अर्डरहरू",
            viewAll: "सबै अर्डरहरू हेर्नुहोस्",
            businessText: "सबै व्यवसाय",
            onlineBusiness: "अनलाइन मात्र",
            offlineBusiness: "अफलाइन मात्र",
            
            // Excel Import
            importTitle: "अफलाइन डाटा आयात गर्नुहोस्",
            importBtnText: "एक्सेल आयात गर्नुहोस्",
            importHelp: "एक्सेलबाट अफलाइन बिक्री डाटा अपलोड गर्नुहोस्",
            
            // Status
            delivered: "वितरण भयो",
            processing: "प्रशोधन हुदैछ",
            pending: "पेन्डिङ",
            online: "अनलाइन",
            offline: "अफलाइन",
            
            // Brand
            brandName: "नेपालShop व्यवस्थापक",
            userName: "श्रेयस शर्मा"
        }
    };
    
    // Initialize
    loadSavedSettings();
    setupEventListeners();
    loadProducts();
    loadOrders();
    initializeCharts();
    setupNavigation();
    
    // Functions
    
    function loadSavedSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.querySelector('i').className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Language
        const langSpan = languageToggle.querySelector('span');
        langSpan.textContent = currentLanguage === 'en' ? 'English' : 'नेपाली';
        updateLanguage();
    }
    
    function setupEventListeners() {
        // Sidebar toggle
        toggleSidebar.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            
            localStorage.setItem('theme', newTheme);
        });
        
        // Language toggle
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'np' : 'en';
            updateLanguage();
            
            const langSpan = languageToggle.querySelector('span');
            langSpan.textContent = currentLanguage === 'en' ? 'English' : 'नेपाली';
            
            localStorage.setItem('language', currentLanguage);
        });
        
        // Excel import
        importExcel.addEventListener('click', handleExcelImport);
        
        // Business type toggle
        document.querySelectorAll('[data-business]').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('[data-business]').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                currentBusiness = this.dataset.business;
                filterOrdersByBusiness(currentBusiness);
            });
        });
        
        // Period toggle
        document.querySelectorAll('[data-period]').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('[data-period]').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                currentPeriod = this.dataset.period;
                updateDashboardByPeriod(currentPeriod);
            });
        });
        
        // Order type filter
        document.querySelectorAll('[data-type]').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('[data-type]').forEach(b => {
                    b.classList.remove('active');
                });
                this.classList.add('active');
                const type = this.dataset.type;
                filterRecentOrders(type);
            });
        });
        
        // Add product button
        if (addProductBtn) {
            addProductBtn.addEventListener('click', () => {
                productModal.show();
            });
        }
        
        // Save product
        document.getElementById('saveProduct').addEventListener('click', addNewProduct);
    }
    
    function updateLanguage() {
        // Update all translatable elements
        Object.keys(translations[currentLanguage]).forEach(key => {
            const elements = document.querySelectorAll(`[id="${key}"]`);
            elements.forEach(el => {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[currentLanguage][key];
                } else {
                    el.textContent = translations[currentLanguage][key];
                }
            });
            
            // Update elements with classes
            document.querySelectorAll(`.${key}`).forEach(el => {
                el.textContent = translations[currentLanguage][key];
            });
        });
        
        // Update menu items
        document.querySelectorAll('.menu-text').forEach(el => {
            const key = el.textContent.toLowerCase().replace(/\s+/g, '');
            const translationKey = Object.keys(translations.en).find(k => 
                translations.en[k].toLowerCase().replace(/\s+/g, '') === key
            );
            if (translationKey && translations[currentLanguage][translationKey]) {
                el.textContent = translations[currentLanguage][translationKey];
            }
        });
        
        // Update business toggle buttons
        const businessBtns = document.querySelectorAll('.business-text');
        if (businessBtns.length >= 3) {
            businessBtns[0].textContent = translations[currentLanguage].businessText;
            businessBtns[1].textContent = translations[currentLanguage].onlineBusiness;
            businessBtns[2].textContent = translations[currentLanguage].offlineBusiness;
        }
        
        // Update import section
        const importElements = document.querySelectorAll('.import-title, .import-btn-text, .import-help');
        importElements.forEach(el => {
            const key = el.textContent.toLowerCase().replace(/\s+/g, '');
            const translationKey = Object.keys(translations.en).find(k => 
                translations.en[k].toLowerCase().replace(/\s+/g, '') === key
            );
            if (translationKey && translations[currentLanguage][translationKey]) {
                el.textContent = translations[currentLanguage][translationKey];
            }
        });
    }
    
    function handleExcelImport() {
        if (!excelFile.files.length) {
            alert(currentLanguage === 'en' ? 'Please select an Excel file first' : 'कृपया पहिले एक्सेल फाइल चयन गर्नुहोस्');
            return;
        }
        
        const file = excelFile.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const content = e.target.result;
            processExcelData(content);
        };
        
        reader.readAsText(file);
    }
    
    function processExcelData(content) {
        // Parse CSV data
        const rows = content.split('\n').filter(row => row.trim() !== '');
        const data = rows.slice(1).map(row => {
            const cols = row.split(',').map(col => col.trim());
            return {
                date: cols[0],
                product: cols[1],
                sales: parseInt(cols[2]) || 0,
                orders: parseInt(cols[3]) || 0,
                category: cols[4],
                type: 'offline'
            };
        });
        
        // Calculate totals
        const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
        const totalOrders = data.reduce((sum, item) => sum + item.orders, 0);
        
        // Update dashboard
        updateOfflineMetrics(totalSales, totalOrders);
        
        // Show success message
        alert(
            currentLanguage === 'en' 
            ? `Successfully imported ${data.length} offline records!\nTotal Sales: रु ${totalSales.toLocaleString()}\nTotal Orders: ${totalOrders}`
            : `${data.length} अफलाइन रेकर्ड सफलतापूर्वक आयात गरियो!\nकुल बिक्री: रु ${totalSales.toLocaleString()}\nकुल अर्डर: ${totalOrders}`
        );
    }
    
    function updateOfflineMetrics(sales, orders) {
        // Update total sales metric
        const salesMetric = document.querySelector('.metric-card:nth-child(1) .metric-value');
        const salesText = salesMetric.textContent;
        const currentTotal = parseInt(salesText.replace(/[^0-9]/g, '')) || 0;
        const newTotal = currentTotal + sales;
        salesMetric.textContent = `रु ${newTotal.toLocaleString()}`;
        
        // Update total orders metric
        const ordersMetric = document.querySelector('.metric-card:nth-child(2) .metric-value');
        const ordersText = ordersMetric.textContent;
        const currentOrders = parseInt(ordersText.replace(/[^0-9]/g, '')) || 0;
        const newOrdersTotal = currentOrders + orders;
        ordersMetric.textContent = newOrdersTotal.toLocaleString();
        
        // Update breakdown
        const breakdowns = document.querySelectorAll('.metric-breakdown');
        breakdowns[1].querySelector('small').textContent = 
            currentLanguage === 'en' 
            ? `Online: 892 | Offline: ${newOrdersTotal - 892}`
            : `अनलाइन: ८९२ | अफलाइन: ${newOrdersTotal - 892}`;
        
        // Add to orders list
        addOfflineOrdersToTable(orders);
    }
    
    function addOfflineOrdersToTable(count) {
        // Add sample offline orders
        for (let i = 0; i < Math.min(count, 5); i++) {
            const orderId = `#OFF-${Date.now().toString().slice(-6)}`;
            const customer = ['राम श्रेष्ठ', 'शर्मिला पौडेल', 'कृष्ण बस्नेत', 'सुनिता थापा', 'विक्रम गुरुङ'][i] || 'Offline Customer';
            const amount = `रु ${Math.floor(Math.random() * 50000) + 10000}`;
            
            orders.unshift({
                id: orderId,
                customer: customer,
                amount: amount,
                type: 'offline',
                status: 'delivered'
            });
        }
        
        // Reload orders
        loadOrders();
    }
    
    function loadProducts() {
        const container = document.getElementById('productsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const stockClass = product.stock > 20 ? 'in-stock' : 
                             product.stock > 0 ? 'low-stock' : 'out-of-stock';
            const stockText = product.stock > 20 ? 'In Stock' : 
                            product.stock > 0 ? 'Low Stock' : 'Out of Stock';
            
            const productCard = `
                <div class="col-md-3 col-sm-6">
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="product-info">
                            <h6 class="mb-2">${product.name}</h6>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="product-price">${product.price}</span>
                                <span class="product-stock ${stockClass}">${stockText}</span>
                            </div>
                            <p class="small text-muted mb-3">Category: ${product.category}</p>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-sm btn-outline-primary" onclick="editProduct(${product.id})">
                                    <i class="fas fa-edit me-1"></i>
                                    ${currentLanguage === 'en' ? 'Edit' : 'सम्पादन'}
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${product.id})">
                                    <i class="fas fa-trash me-1"></i>
                                    ${currentLanguage === 'en' ? 'Delete' : 'मेट्नुहोस्'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += productCard;
        });
    }
    
    function loadOrders() {
        const tableBody = document.querySelector('#ordersTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        orders.slice(0, 5).forEach(order => {
            const statusClass = order.status === 'delivered' ? 'status-delivered' :
                              order.status === 'processing' ? 'status-processing' : 'status-pending';
            const typeClass = order.type === 'online' ? 'status-online' : 'status-offline';
            
            const row = `
                <tr>
                    <td>${order.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/${order.gender || 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg" 
                                 class="product-img" alt="${order.customer}">
                            <span>${order.customer}</span>
                        </div>
                    </td>
                    <td>${order.amount}</td>
                    <td><span class="order-status ${typeClass}">${translations[currentLanguage][order.type]}</span></td>
                    <td><span class="order-status ${statusClass}">${translations[currentLanguage][order.status]}</span></td>
                </tr>
            `;
            
            tableBody.innerHTML += row;
        });
    }
    
    function filterOrdersByBusiness(type) {
        let filteredOrders = orders;
        
        if (type === 'online') {
            filteredOrders = orders.filter(order => order.type === 'online');
        } else if (type === 'offline') {
            filteredOrders = orders.filter(order => order.type === 'offline');
        }
        
        updateCharts(filteredOrders);
        updateMetrics(filteredOrders);
    }
    
    function filterRecentOrders(type) {
        const tableBody = document.querySelector('#ordersTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        
        let filteredOrders = orders;
        
        if (type === 'online') {
            filteredOrders = orders.filter(order => order.type === 'online');
        } else if (type === 'offline') {
            filteredOrders = orders.filter(order => order.type === 'offline');
        }
        
        filteredOrders.slice(0, 5).forEach(order => {
            const statusClass = order.status === 'delivered' ? 'status-delivered' :
                              order.status === 'processing' ? 'status-processing' : 'status-pending';
            const typeClass = order.type === 'online' ? 'status-online' : 'status-offline';
            
            const row = `
                <tr>
                    <td>${order.id}</td>
                    <td>
                        <div class="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/${order.gender || 'men'}/${Math.floor(Math.random() * 70) + 1}.jpg" 
                                 class="product-img" alt="${order.customer}">
                            <span>${order.customer}</span>
                        </div>
                    </td>
                    <td>${order.amount}</td>
                    <td><span class="order-status ${typeClass}">${translations[currentLanguage][order.type]}</span></td>
                    <td><span class="order-status ${statusClass}">${translations[currentLanguage][order.status]}</span></td>
                </tr>
            `;
            
            tableBody.innerHTML += row;
        });
    }
    
    function updateDashboardByPeriod(period) {
        // Update metrics based on period
        const periods = {
            today: { sales: 1245820, orders: 1248, customers: 8542, delivered: 1148 },
            week: { sales: 8542000, orders: 5892, customers: 45892, delivered: 5248 },
            month: { sales: 35482000, orders: 24892, customers: 145892, delivered: 22148 }
        };
        
        const data = periods[period];
        
        document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = 
            `रु ${data.sales.toLocaleString()}`;
        document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = 
            data.orders.toLocaleString();
        document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = 
            data.customers.toLocaleString();
        document.querySelector('.metric-card:nth-child(4) .metric-value').textContent = 
            data.delivered.toLocaleString();
    }
    
    function initializeCharts() {
        // Sales Chart
        const salesCtx = document.getElementById('salesChart');
        if (salesCtx) {
            new Chart(salesCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Online Sales',
                            data: [4200000, 5200000, 3800000, 6500000, 7200000, 8000000],
                            borderColor: '#4361ee',
                            backgroundColor: 'rgba(67, 97, 238, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Offline Sales',
                            data: [1800000, 2200000, 1500000, 2800000, 3200000, 3500000],
                            borderColor: '#28a745',
                            backgroundColor: 'rgba(40, 167, 69, 0.1)',
                            borderWidth: 2,
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
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
        
        // Revenue Chart
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
            new Chart(revenueCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Online Sales', 'Offline Sales', 'Digital Products', 'Services'],
                    datasets: [{
                        data: [65, 25, 7, 3],
                        backgroundColor: [
                            '#4361ee',
                            '#28a745',
                            '#ffc107',
                            '#dc3545'
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
    }
    
    function updateCharts(filteredData) {
        // This would update charts based on filtered data
        console.log('Updating charts with:', filteredData);
    }
    
    function updateMetrics(filteredData) {
        // This would update metrics based on filtered data
        console.log('Updating metrics with:', filteredData);
    }
    
    function addNewProduct() {
        const form = document.getElementById('productForm');
        const inputs = form.querySelectorAll('input, select, textarea');
        
        const newProduct = {
            id: products.length + 1,
            name: inputs[0].value,
            price: `रु ${parseInt(inputs[1].value).toLocaleString()}`,
            category: inputs[2].value,
            stock: parseInt(inputs[3].value),
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
        };
        
        products.push(newProduct);
        loadProducts();
        productModal.hide();
        form.reset();
        
        alert(currentLanguage === 'en' ? 'Product added successfully!' : 'उत्पादन सफलतापूर्वक थपियो!');
    }
    
    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('.dashboard-section');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.style.display = 'none');
                
                // Add active class to clicked
                this.classList.add('active');
                
                // Show corresponding section
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'block';
                }
                
                // Close sidebar on mobile
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('active');
                }
            });
        });
    }
    
    // Make functions available globally
    window.editProduct = function(id) {
        alert(currentLanguage === 'en' ? `Edit product ${id}` : `उत्पादन ${id} सम्पादन गर्नुहोस्`);
    };
    
    window.deleteProduct = function(id) {
        if (confirm(currentLanguage === 'en' ? 'Are you sure you want to delete this product?' : 'के तपाइँ यो उत्पादन मेट्न निश्चित हुनुहुन्छ?')) {
            products = products.filter(p => p.id !== id);
            loadProducts();
            alert(currentLanguage === 'en' ? 'Product deleted successfully!' : 'उत्पादन सफलतापूर्वक मेटियो!');
        }
    };
                                     }
