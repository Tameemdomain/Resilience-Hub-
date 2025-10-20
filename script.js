document.addEventListener('DOMContentLoaded', function() {
    const divisionSelect = document.getElementById('division');
    const departmentSelect = document.getElementById('department');
    const searchBtn = document.getElementById('search-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const resultsContainer = document.getElementById('results-container');
    const loadingState = document.getElementById('loading-state');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const contactUsBtn = document.getElementById('contact-us-btn');
    
    // Breadcrumb elements
    const breadcrumbDivision = document.getElementById('breadcrumb-division');
    const breadcrumbDepartment = document.getElementById('breadcrumb-department');
    const breadcrumbDivisionText = document.getElementById('breadcrumb-division-text');
    const breadcrumbDepartmentText = document.getElementById('breadcrumb-department-text');
    
    // Incident reporting elements
    const reportIncidentBtn = document.getElementById('report-incident-btn');
    const incidentModal = document.getElementById('incident-modal');
    const closeModal = document.querySelector('.close');
    const cancelIncident = document.getElementById('cancel-incident');
    const incidentForm = document.getElementById('incident-form');
    const incidentDivisionSelect = document.getElementById('incident-division');
    const incidentDepartmentSelect = document.getElementById('incident-department');
    
    // Initialize the page with empty results and proper initial message
    function initializePage() {
        resultsContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Please select division and department, then click Search to view results</p>
            </div>
        `;
    }
    
    // Initialize dark mode
    function initializeDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    // Initialize everything
    initializeDarkMode();
    initializePage();
    
    // Department options based on division
    const departmentOptions = {
        'mena-investment': ['Direct Investments (1)', 'Direct Investments (2)', 'Investment Planning & Governance', 'Operational Value Creation Group', 'Securities Investments'],
        'international-investment': ['Direct Investments', 'Private Equity', 'Public Investments', 'RE & Infrastructure'],
        'risk': ['Operational Risk', 'Cybersecurity Risk', 'Investment Risk Analysis', 'Investment Risk Coverage', 'Risk Planning and Governance'],
        'real-estate-investment': ['Center of Excellence', 'Local Real Estate Investment Strategy', 'Local Real Estate Planning and Governance', 'Portfolio Management'],
        'legal': ['Finance Legal Advisory', 'Legislative, Governance & Commercial Legal Advisory', 'Legal Planning & Operations', 'Local Real Estate Investments Legal Advisory', 'Legal Planning & Operations']
    };
    
    // Update departments when division changes
    divisionSelect.addEventListener('change', function() {
        const division = this.value;
        
        // Reset department
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';
        
        // Reset results to initial state
        initializePage();
        
        if (division && departmentOptions[division]) {
            // Add departments for the selected division
            departmentOptions[division].forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.toLowerCase().replace(/\s+/g, '-');
                option.textContent = dept;
                departmentSelect.appendChild(option);
            });
        }
        
        updateBreadcrumb();
        checkSearchButton();
    });
    
    // Update breadcrumb when department changes
    departmentSelect.addEventListener('change', function() {
        updateBreadcrumb();
        checkSearchButton();
    });
    
    // Clear all selections
    clearAllBtn.addEventListener('click', function() {
        divisionSelect.value = '';
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';
        
        // Reset results to initial state
        initializePage();
        
        updateBreadcrumb();
        checkSearchButton();
        
        showToast('All selections cleared', 'info');
    });
    
    // Check if search button should be enabled
    function checkSearchButton() {
        const division = divisionSelect.value;
        const department = departmentSelect.value;
        
        searchBtn.disabled = !(division && department);
    }
    
    // Function to update breadcrumb navigation
    function updateBreadcrumb() {
        const division = divisionSelect.options[divisionSelect.selectedIndex]?.text;
        const department = departmentSelect.options[departmentSelect.selectedIndex]?.text;
        
        // Reset all breadcrumb items
        breadcrumbDivision.style.display = 'none';
        breadcrumbDepartment.style.display = 'none';
        
        if (division && division !== 'Select a Division') {
            breadcrumbDivisionText.textContent = division;
            breadcrumbDivision.style.display = 'inline';
        }
        
        if (department && department !== 'Select a Department') {
            breadcrumbDepartmentText.textContent = department;
            breadcrumbDepartment.style.display = 'inline';
        }
    }
    
    // Dark mode functionality
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            showToast('Dark mode enabled', 'success');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            showToast('Light mode enabled', 'success');
        }
    });
    
    // Contact Us button functionality
    contactUsBtn.addEventListener('click', function() {
        const subject = 'Resilience Hub - Contact Request';
        const body = `Hello,

I am contacting you regarding the Resilience Hub.

Please provide your inquiry below:


Best regards,
`;
        
        const mailtoLink = `mailto:brgovernance@pif.gov.sa?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
        
        showToast('Opening email client...', 'info');
    });
    
    // Toast notification system
    function showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="${icon[type]}"></i>
            <span>${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            removeToast(toast);
        }, duration);
        
        // Manual close
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(autoRemove);
            removeToast(toast);
        });
    }
    
    function removeToast(toast) {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Handle search button click with loading state
    searchBtn.addEventListener('click', function() {
        const department = departmentSelect.options[departmentSelect.selectedIndex].text;
        
        // Show loading state
        showLoadingState();
        
        // Simulate loading delay (in real app, this would be an API call)
        setTimeout(() => {
            hideLoadingState();
            displaySampleResults(department);
            showToast('Results loaded successfully!', 'success');
        }, 1500);
    });
    
    function showLoadingState() {
        searchBtn.disabled = true;
        searchBtn.querySelector('.btn-text').style.display = 'none';
        searchBtn.querySelector('.spinner').style.display = 'inline-block';
        searchBtn.querySelector('i').style.display = 'none';
        
        resultsContainer.style.display = 'none';
        loadingState.style.display = 'block';
    }
    
    function hideLoadingState() {
        searchBtn.disabled = false;
        searchBtn.querySelector('.btn-text').style.display = 'inline';
        searchBtn.querySelector('.spinner').style.display = 'none';
        searchBtn.querySelector('i').style.display = 'inline';
        
        loadingState.style.display = 'none';
        resultsContainer.style.display = 'block';
    }
    
    // Display sample results function - Updated to use compact row layout
    function displaySampleResults(department) {
        resultsContainer.innerHTML = `
            <div class="info-rows">
                <!-- Risk Champion Row -->
                <div class="info-row risk-champion-row">
                    <div class="risk-champion-content">
                        <div class="risk-champion-avatar">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <div class="risk-champion-info">
                            <h3>Risk Champion</h3>
                            <div class="champion-section">
                                <h4>Primary:</h4>
                                <p><strong>Mashael Alyahya</strong> - Senior Associate | mashael.alyahya@pif.gov.sa | +966 12 345 6789</p>
                            </div>
                            <div class="champion-section">
                                <h4>Secondary:</h4>
                                <p><strong>Raghad Alotaibi</strong> - Senior Analyst | raghad.alotaibi@pif.gov.sa | +966 12 345 6788</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Floor Marshal Row -->
                <div class="info-row other-row">
                    <div class="floor-marshal-content">
                        <div class="floor-marshal-avatar">
                            <i class="fas fa-hard-hat"></i>
                        </div>
                        <div class="floor-marshal-info">
                            <h3>Floor Marshal</h3>
                            <p><strong>Tameem Altamimi</strong> - Business Resilience Expert | tameem.altamimi@pif.gov.sa | +966 12 345 6787</p>
                        </div>
                    </div>
                </div>
                
                <!-- BCP Row -->
                <div class="info-row other-row">
                    <div class="info-row-content">
                        <div class="info-row-icon">
                            <i class="fas fa-file-contract"></i>
                        </div>
                        <div class="info-row-details">
                            <h3>Business Continuity Plan (BCP)</h3>
                        </div>
                    </div>
                    <div class="info-row-actions">
                        <a href="https://intranet-new.pif.gov.sa/sites/OR/BR/_layouts/15/WopiFrame.aspx?sourcedoc={ec7ec71d-84a0-45de-b8b1-f688e9a5d6da}&amp;action=embedview&amp;wdStartOn=1" 
                           target="_blank" class="btn">
                            <i class="fas fa-eye"></i> View
                        </a>
                        <a href="https://intranet-new.pif.gov.sa/sites/OR/BR/_layouts/15/WopiFrame.aspx?sourcedoc={ec7ec71d-84a0-45de-b8b1-f688e9a5d6da}&amp;action=embedview&amp;wdStartOn=1" 
                           target="_blank" class="btn btn-download">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
                
                <!-- BIA Row -->
                <div class="info-row other-row">
                    <div class="info-row-content">
                        <div class="info-row-icon">
                            <i class="fas fa-chart-bar"></i>
                        </div>
                        <div class="info-row-details">
                            <h3>Business Impact Analysis (BIA)</h3>
                        </div>
                    </div>
                    <div class="info-row-actions">
                        <a href="https://intranet-new.pif.gov.sa/sites/OR/BR/_layouts/15/WopiFrame.aspx?sourcedoc={a1a85ffc-8768-4ef2-ad5c-9bbfd4ab4785}&action=embedview&wdStartOn=1" 
                           target="_blank" class="btn">
                            <i class="fas fa-eye"></i> View
                        </a>
                        <a href="https://intranet-new.pif.gov.sa/sites/OR/BR/_layouts/15/WopiFrame.aspx?sourcedoc={a1a85ffc-8768-4ef2-ad5c-9bbfd4ab4785}&action=embedview&wdStartOn=1" 
                           target="_blank" class="btn btn-download">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
                
                <!-- BC Exercise Document Row -->
                <div class="info-row other-row">
                    <div class="info-row-content">
                        <div class="info-row-icon">
                            <i class="fas fa-clipboard-list"></i>
                        </div>
                        <div class="info-row-details">
                            <h3>BC Exercise Document</h3>
                            <div class="info-row-meta">Exercise Date: October 15, 2025</div>
                        </div>
                    </div>
                    <div class="info-row-actions">
                        <a href="https://onedrive.pif.gov.sa/personal/taltamimi/_layouts/15/WopiFrame.aspx?sourcedoc={51a15634-a3f6-4dd1-957a-a280b5efc920}&amp;action=embedview&amp;wdStartOn=1" 
                           target="_blank" class="btn">
                            <i class="fas fa-eye"></i> View
                        </a>
                        <a href="https://onedrive.pif.gov.sa/personal/taltamimi/_layouts/15/WopiFrame.aspx?sourcedoc={51a15634-a3f6-4dd1-957a-a280b5efc920}&amp;action=embedview&amp;wdStartOn=1" 
                           target="_blank" class="btn btn-download">
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
                
                <!-- Actions Required Row -->
                <div class="info-row other-row">
                    <div class="info-row-content">
                        <div class="info-row-icon">
                            <i class="fas fa-tasks"></i>
                        </div>
                        <div class="info-row-details">
                            <h3>Actions Required</h3>
                            <div class="actions-content">
                                <div class="action-item priority-item">
                                    <div class="action-icon priority">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <div class="action-details">
                                        <span class="action-title">Update Business Impact Analysis (BIA)</span>
                                        <span class="action-deadline">Due: August 15, 2025</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Incident reporting functionality
    reportIncidentBtn.addEventListener('click', function() {
        incidentModal.style.display = 'block';
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('incident-date').value = today;
    });
    
    closeModal.addEventListener('click', function() {
        incidentModal.style.display = 'none';
        resetIncidentForm();
    });
    
    cancelIncident.addEventListener('click', function() {
        incidentModal.style.display = 'none';
        resetIncidentForm();
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === incidentModal) {
            incidentModal.style.display = 'none';
            resetIncidentForm();
        }
    });
    
    // Update incident departments when division changes
    incidentDivisionSelect.addEventListener('change', function() {
        const division = this.value;
        incidentDepartmentSelect.innerHTML = '<option value="">Select a Department</option>';
        
        if (division && departmentOptions[division]) {
            departmentOptions[division].forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.toLowerCase().replace(/\s+/g, '-');
                option.textContent = dept;
                incidentDepartmentSelect.appendChild(option);
            });
        }
    });
    
    // Handle incident form submission
    incidentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            division: incidentDivisionSelect.options[incidentDivisionSelect.selectedIndex].text,
            department: incidentDepartmentSelect.options[incidentDepartmentSelect.selectedIndex].text,
            date: document.getElementById('incident-date').value,
            description: document.getElementById('incident-description').value
        };
        
        // In a real implementation, you would send this data to your server
        console.log('Incident Report Submitted:', formData);
        
        // Show success message with toast
        showToast(`Incident report submitted successfully for ${formData.division} - ${formData.department}`, 'success', 4000);
        
        // Close modal and reset form
        incidentModal.style.display = 'none';
        resetIncidentForm();
    });
    
    function resetIncidentForm() {
        incidentForm.reset();
        incidentDepartmentSelect.innerHTML = '<option value="">Select a Department</option>';
    }
});
