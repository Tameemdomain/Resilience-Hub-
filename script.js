document.addEventListener('DOMContentLoaded', function() {
    const divisionSelect = document.getElementById('division');
    const departmentSelect = document.getElementById('department');
    const yearSelect = document.getElementById('year');
    const searchBtn = document.getElementById('search-btn');
    const resultElement = document.getElementById('selected-result');
    const resultsContainer = document.getElementById('results-container');
    
    // Department options based on division
    const departmentOptions = {
        engineering: ['Software Development', 'Quality Assurance', 'DevOps', 'Data Science', 'Infrastructure'],
        sales: ['Digital Marketing', 'Sales Operations', 'Customer Success', 'Business Development', 'Partnerships'],
        finance: ['Accounting', 'Financial Planning', 'Auditing', 'Tax Compliance', 'Investment Analysis'],
        hr: ['Recruitment', 'Training and Development', 'Compensation and Benefits', 'Employee Relations', 'HR Operations'],
        operations: ['Supply Chain', 'Logistics', 'Facilities Management', 'Production', 'Quality Control'],
        research: ['Product Research', 'Market Analysis', 'Innovation Lab', 'Technology Scouting', 'Feasibility Studies']
    };
    
    // Year options based on department
    const yearOptions = {
        // Engineering departments
        'Software Development': ['2023', '2022', '2021', '2020'],
        'Quality Assurance': ['2023', '2022', '2021'],
        'DevOps': ['2023', '2022'],
        'Data Science': ['2023', '2022', '2021', '2020', '2019'],
        'Infrastructure': ['2023', '2022', '2021'],
        
        // Sales departments
        'Digital Marketing': ['2023', '2022'],
        'Sales Operations': ['2023', '2022', '2021', '2020'],
        'Customer Success': ['2023'],
        'Business Development': ['2023', '2022', '2021'],
        'Partnerships': ['2023', '2022'],
        
        // Finance departments
        'Accounting': ['2023', '2022', '2021'],
        'Financial Planning': ['2023', '2022'],
        'Auditing': ['2023', '2022', '2021', '2020'],
        'Tax Compliance': ['2023'],
        'Investment Analysis': ['2023', '2022', '2021'],
        
        // HR departments
        'Recruitment': ['2023', '2022', '2021'],
        'Training and Development': ['2023'],
        'Compensation and Benefits': ['2023', '2022'],
        'Employee Relations': ['2023', '2022', '2021', '2020'],
        'HR Operations': ['2023', '2022'],
        
        // Operations departments
        'Supply Chain': ['2023', '2022', '2021'],
        'Logistics': ['2023', '2022'],
        'Facilities Management': ['2023', '2022', '2021'],
        'Production': ['2023'],
        'Quality Control': ['2023', '2022'],
        
        // Research departments
        'Product Research': ['2023', '2022', '2021'],
        'Market Analysis': ['2023', '2022'],
        'Innovation Lab': ['2023'],
        'Technology Scouting': ['2023', '2022'],
        'Feasibility Studies': ['2023', '2022', '2021']
    };
    
    // Update departments when division changes
    divisionSelect.addEventListener('change', function() {
        const division = this.value;
        
        // Reset department and year
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';
        yearSelect.innerHTML = '<option value="">Select a Year</option>';
        
        if (division) {
            // Add departments for the selected division
            departmentOptions[division].forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.toLowerCase().replace(/\s+/g, '-');
                option.textContent = dept;
                departmentSelect.appendChild(option);
            });
        }
        
        updateResult();
        checkSearchButton();
    });
    
    // Update years when department changes
    departmentSelect.addEventListener('change', function() {
        const departmentText = this.options[this.selectedIndex].text;
        
        // Reset year
        yearSelect.innerHTML = '<option value="">Select a Year</option>';
        
        if (departmentText && yearOptions[departmentText]) {
            // Add years for the selected department
            yearOptions[departmentText].forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        }
        
        updateResult();
        checkSearchButton();
    });
    
    // Update result when year changes
    yearSelect.addEventListener('change', function() {
        updateResult();
        checkSearchButton();
    });
    
    // Check if search button should be enabled
    function checkSearchButton() {
        const division = divisionSelect.value;
        const department = departmentSelect.value;
        const year = yearSelect.value;
        
        searchBtn.disabled = !(division && department && year);
    }
    
    // Function to update the result display
    function updateResult() {
        const division = divisionSelect.options[divisionSelect.selectedIndex].text;
        const department = departmentSelect.options[departmentSelect.selectedIndex].text;
        const year = yearSelect.options[yearSelect.selectedIndex].text;
        
        if (division && department && year) {
            resultElement.innerHTML = `Division: <span style="color: var(--primary-blue)">${division}</span>, 
                                     Department: <span style="color: var(--primary-blue)">${department}</span>, 
                                     Year: <span style="color: var(--primary-blue)">${year}</span>`;
        } else if (division && department) {
            resultElement.innerHTML = `Division: <span style="color: var(--primary-blue)">${division}</span>, 
                                     Department: <span style="color: var(--primary-blue)">${department}</span>`;
        } else if (division) {
            resultElement.innerHTML = `Division: <span style="color: var(--primary-blue)">${division}</span>`;
        } else {
            resultElement.textContent = 'Please make your selections above';
        }
    }
    
    // Handle search button click
    searchBtn.addEventListener('click', function() {
        const department = departmentSelect.options[departmentSelect.selectedIndex].text;
        const year = yearSelect.options[yearSelect.selectedIndex].text;
        
        // For demonstration purposes - in a real scenario, you would fetch actual data
        displaySampleResults(department, year);
    });
    
    // Display sample results function
    function displaySampleResults(department, year) {
        resultsContainer.innerHTML = `
            <div class="info-cards">
                <div class="info-card">
                    <h3><i class="fas fa-user-shield"></i> Risk Champion</h3>
                    <div class="info-content">
                        <div style="text-align: center; padding: 20px;">
                            <div style="width: 80px; height: 80px; background: var(--accent-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 30px; color: var(--primary-blue);">
                                <i class="fas fa-user"></i>
                            </div>
                            <p><strong>Sarah Johnson</strong></p>
                            <p>Senior Director of Risk Management</p>
                            <p style="font-size: 0.9rem; margin-top: 10px;">sarah.johnson@example.com</p>
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
                            <a href="#" class="btn" style="background-color: var(--secondary-green);">
                                <i class="fas fa-download"></i> Download PDF
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-dumbbell"></i> BC Exercise Document</h3>
                    <div class="info-content" id="bc-exercise">
                        <p><strong>Last Exercise:</strong> April 10, ${year}</p>
                        <p><strong>Type:</strong> Tabletop Exercise</p>
                        <p><strong>Participants:</strong> 24 team members</p>
                        <p><strong>Next Exercise:</strong> October ${year}</p>
                        <ul class="document-list">
                            <li><i class="fas fa-file-alt"></i> Exercise Scenario</li>
                            <li><i class="fas fa-clipboard-check"></i> Participant Feedback</li>
                            <li><i class="fas fa-chart-line"></i> Performance Metrics</li>
                        </ul>
                        <a href="https://onedrive.pif.gov.sa/personal/taltamimi/_layouts/15/WopiFrame.aspx?sourcedoc={51a15634-a3f6-4dd1-957a-a280b5efc920}&amp;action=embedview&amp;wdStartOn=1" target="_blank" class="btn">View Exercise Documents</a>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-vial"></i> Testing Status</h3>
                    <div class="info-content" id="testing-status">
                        <p><strong>Last Test:</strong> April 10, ${year}</p>
                        <p><strong>Result:</strong> <span class="status yes">SUCCESSFUL</span></p>
                        <p><strong>Next Test:</strong> October 15, ${year}</p>
                        <p><strong>Test Type:</strong> Full Infrastructure Failover</p>
                        <div class="progress-bar">
                            <div class="progress" style="width: 75%;"></div>
                        </div>
                        <p style="font-size: 0.9rem;">Test Preparedness: 75%</p>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3><i class="fas fa-tasks"></i> Actions Required</h3>
                    <div class="info-content" id="actions">
                        <p><strong>Priority Actions:</strong></p>
                        <ul class="document-list">
                            <li><i class="fas fa-user-plus" style="color: #f57c00;"></i> Train new team members on BCP</li>
                            <li><i class="fas fa-sync-alt" style="color: var(--primary-blue);"></i> Refresh contact lists</li>
                        </ul>
                        <p style="margin-top: 15px;"><strong>Deadlines:</strong></p>
                        <ul class="document-list">
                            <li><i class="fas fa-calendar"></i> Training Completion - August 15, ${year}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
});
