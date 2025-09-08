document.addEventListener('DOMContentLoaded', function() {
    const divisionSelect = document.getElementById('division');
    const departmentSelect = document.getElementById('department');
    const yearSelect = document.getElementById('year');
    const searchBtn = document.getElementById('search-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const resultsContainer = document.getElementById('results-container');
    const loadingState = document.getElementById('loading-state');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const contactUsBtn = document.getElementById('contact-us-btn');
    
    // Breadcrumb elements
    const breadcrumbDivision = document.getElementById('breadcrumb-division');
    const breadcrumbDepartment = document.getElementById('breadcrumb-department');
    const breadcrumbYear = document.getElementById('breadcrumb-year');
    const breadcrumbDivisionText = document.getElementById('breadcrumb-division-text');
    const breadcrumbDepartmentText = document.getElementById('breadcrumb-department-text');
    const breadcrumbYearText = document.getElementById('breadcrumb-year-text');
    
    // Incident reporting elements
    const reportIncidentBtn = document.getElementById('report-incident-btn');
    const incidentModal = document.getElementById('incident-modal');
    const closeModal = document.querySelector('.close');
    const cancelIncident = document.getElementById('cancel-incident');
    const incidentForm = document.getElementById('incident-form');
    const incidentDivisionSelect = document.getElementById('incident-division');
    const incidentDepartmentSelect = document.getElementById('incident-department');
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Department options based on division
    const departmentOptions = {
        'mena-investment': ['Asset Management', 'Portfolio Analysis', 'Market Research', 'Investment Operations', 'Due Diligence'],
        'international-investment': ['Global Markets', 'Cross-Border Transactions', 'International Relations', 'Currency Management', 'Regional Analysis'],
        'risk': ['Risk Assessment', 'Compliance Monitoring', 'Regulatory Affairs', 'Risk Analytics', 'Internal Audit'],
        'real-estate-investment': ['Property Acquisition', 'Asset Valuation', 'Development Projects', 'Property Management', 'Real Estate Analytics'],
        'legal': ['Corporate Law', 'Investment Legal', 'Compliance Legal', 'Contract Management', 'Regulatory Legal']
    };
    
    // Year options based on department
    const yearOptions = {
        // MENA Investment departments
        'Asset Management': ['2025', '2024', '2023'],
        'Portfolio Analysis': ['2025', '2024', '2023'],
        'Market Research': ['2025', '2024', '2023'],
        'Investment Operations': ['2025', '2024', '2023'],
        'Due Diligence': ['2025', '2024', '2023'],
        
        // International Investment departments
        'Global Markets': ['2025', '2024', '2023'],
        'Cross-Border Transactions': ['2025', '2024', '2023'],
        'International Relations': ['2025', '2024', '2023'],
        'Currency Management': ['2025', '2024', '2023'],
        'Regional Analysis': ['2025', '2024', '2023'],
        
        // Risk departments
        'Risk Assessment': ['2025', '2024', '2023'],
        'Compliance Monitoring': ['2025', '2024', '2023'],
        'Regulatory Affairs': ['2025', '2024', '2023'],
        'Risk Analytics': ['2025', '2024', '2023'],
        'Internal Audit': ['2025', '2024', '2023'],
        
        // Real Estate Investment departments
        'Property Acquisition': ['2025', '2024', '2023'],
        'Asset Valuation': ['2025', '2024', '2023'],
        'Development Projects': ['2025', '2024', '2023'],
        'Property Management': ['2025', '2024', '2023'],
        'Real Estate Analytics': ['2025', '2024', '2023'],
        
        // Legal departments
        'Corporate Law': ['2025', '2024', '2023'],
        'Investment Legal': ['2025', '2024', '2023'],
        'Compliance Legal': ['2025', '2024', '2023'],
        'Contract Management': ['2025', '2024', '2023'],
        'Regulatory Legal': ['2025', '2024', '2023']
    };
    
    // Update departments when division changes
    divisionSelect.addEventListener('change', function() {
        const division = this.value;
        console.log('Division selected:', division); // Debug log
        
        // Reset department and year
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';
        yearSelect.innerHTML = '<option value="">Select a Year</option>';
        
        if (division && departmentOptions[division]) {
            console.log('Found departments for division:', departmentOptions[division]); // Debug log
            // Add departments for the selected division
            departmentOptions[division].forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.toLowerCase().replace(/\s+/g, '-');
                option.textContent = dept;
                departmentSelect.appendChild(option);
            });
        } else {
            console.log('No departments found for division:', division); // Debug log
        }
        
        updateBreadcrumb();
        checkSearchButton();
    });
    
    // Update years when department changes
    departmentSelect.addEventListener('change', function() {
        const departmentText = this.options[this.selectedIndex].text;
        console.log('Department selected:', departmentText); // Debug log
        
        // Reset year
        yearSelect.innerHTML = '<option value="">Select a Year</option>';
        
        if (departmentText && departmentText !== 'Select a Department' && yearOptions[departmentText]) {
            console.log('Found years for department:', yearOptions[departmentText]); // Debug log
            // Add years for the selected department
            yearOptions[departmentText].forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        } else {
            console.log('No years found for department:', departmentText); // Debug log
        }
        
        updateBreadcrumb();
        checkSearchButton();
    });
    
    // Update result when year changes
    yearSelect.addEventListener('change', function() {
        updateBreadcrumb();
        checkSearchButton();
    });
    
    // Clear all selections
    clearAllBtn.addEventListener('click', function() {
        divisionSelect.value = '';
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';
        yearSelect.innerHTML = '<option value="">Select a Year</option>';
        
        // Reset results
        resultsContainer.innerHTML = `
            <div class="no-data">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Please select division, department, and year, then click Search to view results</p>
            </div>
        `;
        
        updateBreadcrumb();
        checkSearchButton();
        
        showToast('All selections cleared', 'info');
    });
    
    // Check if search button should be enabled
    function checkSearchButton() {
        const division = divisionSelect.value;
        const department = departmentSelect.value;
        const year = yearSelect.value;
        
        searchBtn.disabled = !(division && department && year);
    }
    
    // Function to update breadcrumb navigation
    function updateBreadcrumb() {
        const division = divisionSelect.options[divisionSelect.selectedIndex]?.text;
        const department = departmentSelect.options[departmentSelect.selectedIndex]?.text;
        const year = yearSelect.options[yearSelect.selectedIndex]?.text;
        
        // Reset all breadcrumb items
        breadcrumbDivision.style.display = 'none';
        breadcrumbDepartment.style.display = 'none';
        breadcrumbYear.style.display = 'none';
        
        if (division && division !== 'Select a Division') {
            breadcrumbDivisionText.textContent = division;
            breadcrumbDivision.style.display = 'inline';
        }
        
        if (department && department !== 'Select a Department') {
            breadcrumbDepartmentText.textContent = department;
            breadcrumbDepartment.style.display = 'inline';
        }
        
        if (year && year !== 'Select a Year') {
            breadcrumbYearText.textContent = year;
            breadcrumbYear.style.display = 'inline';
        }
    }
    
    // Dark mode functionality
    function initializeDarkMode() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
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

I am contacting you regarding the Resilience Hub dashboard.

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
        const year = yearSelect.options[yearSelect.selectedIndex].text;
        
        // Show loading state
        showLoadingState();
        
        // Simulate loading delay (in real app, this would be an API call)
        setTimeout(() => {
            hideLoadingState();
            displaySampleResults(department, year);
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
    
    // Display sample results function
    function displaySampleResults(department, year) {
        resultsContainer.innerHTML = `
            <div class="info-cards">
                <div class="info-card">
                    <h3><i class="fas fa-user-shield"></i> Risk Champion</h3>
                    <div class="info-content">
                        <div style="text-align: center; padding: 20px;">
                            <div style="width: 80px; height: 80px; background: var(--secondary-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 30px; color: var(--primary-dark-green);">
                                <i class="fas fa-user"></i>
                            </div>
                            <p><strong>Mashael Alyahya</strong></p>
                            <p>Senior Director of Risk Management</p>
                            <p style="font-size: 0.9rem; margin-top: 10px;">mashael.alyahya@pif.gov.sa</p>
                            <p style="font-size: 0.9rem;">+966 12 345 6789</p>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-file-contract"></i> Business Continuity Plan (BCP)</h3>
                    <div class="info-content">
                        <p><strong>Status:</strong> <span class="status yes">APPROVED</span></p>
                        <p><strong>Version:</strong> 3.2</p>
                        <p><strong>Last Updated:</strong> March 15, ${year}</p>
                        <p><strong>Next Review:</strong> September 15, ${year}</p>
                        
                        <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                            <a href="https://onedrive.pif.gov.sa/personal/taltamimi/_layouts/15/WopiFrame.aspx?sourcedoc={d23ed158-696b-48d0-8c94-53cac0d162d5}&action=embedview&wdStartOn=1" 
                               target="_blank" class="btn">
                                <i class="fas fa-eye"></i> View BCP
                            </a>
                            <a href="#" class="btn btn-download" onclick="downloadBCP('${department}', '${year}')">
                                <i class="fas fa-download"></i> Download BCP
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-chart-bar"></i> Business Impact Analysis (BIA)</h3>
                    <div class="info-content">
                        <p><strong>Status:</strong> <span class="status yes">CURRENT</span></p>
                        <p><strong>Version:</strong> 2.1</p>
                        <p><strong>Last Updated:</strong> February 20, ${year}</p>
                        <p><strong>Next Review:</strong> August 20, ${year}</p>
                        
                        <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                            <a href="https://intranet-new.pif.gov.sa/sites/OR/BR/_layouts/15/WopiFrame.aspx?sourcedoc={a1a85ffc-8768-4ef2-ad5c-9bbfd4ab4785}&action=embedview&wdStartOn=1" 
                               target="_blank" class="btn">
                                <i class="fas fa-eye"></i> View BIA
                            </a>
                            <a href="#" class="btn btn-download" onclick="downloadBIA('${department}', '${year}')">
                                <i class="fas fa-download"></i> Download BIA
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-dumbbell"></i> BC Exercise Document</h3>
                    <div class="info-content" id="bc-exercise">
                        <p><strong>Last Exercise:</strong> April 10, ${year}</p>
                        <p><strong>Type:</strong> Tabletop Exercise</p>
                        <p><strong>Next Exercise:</strong> October ${year}</p>
                        <ul class="document-list">
                            <li><i class="fas fa-file-alt"></i> Exercise Scenario</li>
                            <li><i class="fas fa-clipboard-check"></i> Participant Feedback</li>
                        </ul>
                        <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                            <a href="https://onedrive.pif.gov.sa/personal/taltamimi/_layouts/15/WopiFrame.aspx?sourcedoc={51a15634-a3f6-4dd1-957a-a280b5efc920}&amp;action=embedview&amp;wdStartOn=1" 
                               target="_blank" class="btn">
                                <i class="fas fa-eye"></i> View Exercise Documents
                            </a>
                            <a href="#" class="btn btn-download" onclick="downloadBCExercise('${department}', '${year}')">
                                <i class="fas fa-download"></i> Download Exercise
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-vial"></i> Testing Status</h3>
                    <div class="info-content" id="testing-status">
                        <p><strong>Last Test:</strong> April 10, ${year}</p>
                        <p><strong>Result:</strong> <span class="status yes">SUCCESSFUL</span></p>
                        <p><strong>Next Test:</strong> October 15, ${year}</p>
                        <p><strong>Test Type:</strong> Full Infrastructure Failover</p>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-tasks"></i> Actions Required</h3>
                    <div class="info-content" id="actions">
                        <p><strong>Priority Actions:</strong></p>
                        <ul class="document-list">
                            <li><i class="fas fa-sync-alt" style="color: #f57c00;"></i> Updating BIA</li>
                            <li><i class="fas fa-sync-alt" style="color: var(--primary-blue);"></i> Refresh contact lists</li>
                        </ul>
                        <p style="margin-top: 15px;"><strong>Deadlines:</strong></p>
                        <ul class="document-list">
                            <li><i class="fas fa-calendar"></i> BIA update - August 15, ${year}</li>
                        </ul>
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

// Download functions
function downloadBCP(department, year) {
    // In a real implementation, this would trigger an actual download
    alert(`Downloading Business Continuity Plan for ${department} - ${year}...`);
    console.log(`BCP download initiated for: ${department}, Year: ${year}`);
    
    // You can replace this with actual download logic, such as:
    // window.open('path/to/bcp/document.pdf', '_blank');
    // or trigger a file download from your server
}

function downloadBIA(department, year) {
    // In a real implementation, this would trigger an actual download
    alert(`Downloading Business Impact Analysis for ${department} - ${year}...`);
    console.log(`BIA download initiated for: ${department}, Year: ${year}`);
    
    // You can replace this with actual download logic, such as:
    // window.open('path/to/bia/document.pdf', '_blank');
    // or trigger a file download from your server
}

function downloadBCExercise(department, year) {
    // In a real implementation, this would trigger an actual download
    alert(`Downloading BC Exercise Document for ${department} - ${year}...`);
    console.log(`BC Exercise download initiated for: ${department}, Year: ${year}`);
    
    // You can replace this with actual download logic, such as:
    // window.open('path/to/exercise/document.pdf', '_blank');
    // or trigger a file download from your server
}
