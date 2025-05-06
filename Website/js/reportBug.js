document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links a");

    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';

    // Highlight link menu navigasi yang sedang aktif
    links.forEach(link => {
        const linkPath = link.getAttribute("href");
        const linkPage = linkPath.split('/').pop();

        // Periksa apakah link saat ini cocok dengan halaman yang aktif
        if (linkPage === currentPage ||
            (currentPage === 'index.html' && linkPath === './index.html') ||
            (currentPage === '' && linkPath === './index.html')) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Event listener untuk hamburger menu (navigasi di mobile)
    if (hamburger) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            navLinks.classList.toggle("active");
        });

        // Menutup menu jika klik di luar navigasi
        document.addEventListener("click", (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }
});

// File handling
const fileInput = document.getElementById('attachment');
const fileList = document.getElementById('file-list');
const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

// Store selected files
let selectedFiles = [];

fileInput.addEventListener('change', function(e) {
    const files = Array.from(this.files);

    // Check if total files exceed limit
    if (files.length + selectedFiles.length > MAX_FILES) {
        showFileError(`Maximum ${MAX_FILES} files allowed`);
        return;
    }

    // Validate each file
    for (const file of files) {
        if (file.size > MAX_SIZE) {
            showFileError('File size must be less than 5MB');
            continue;
        }

        if (!file.type.match('image.*') && !file.type.match('video.*')) {
            showFileError('Only images and videos are allowed');
            continue;
        }

        // Add to selected files if valid
        selectedFiles.push(file);
    }

    // Reset file input
    this.value = '';

    // Update file list display
    updateFileList();
});

function showFileError(message) {
    const errorElement = document.getElementById('file-error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Update the file list display
function updateFileList() {
    fileList.innerHTML = '';

    if (selectedFiles.length === 0) {
        document.getElementById('file-error').style.display = 'none';
        return;
    }

    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        fileItem.innerHTML = `
            <div class="file-info">
                <svg class="file-icon" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <span class="file-name" title="${file.name}">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="file-remove" data-index="${index}" aria-label="Remove file">×</button>
        `;

        fileList.appendChild(fileItem);
    });

    // Hide error if files are valid
    document.getElementById('file-error').style.display = 'none';
}

// Format file size to readable format
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Remove file from list
fileList.addEventListener('click', function(e) {
    if (e.target.classList.contains('file-remove')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        selectedFiles.splice(index, 1);
        updateFileList();
    }
});

// Form submission
document.getElementById('bugReportForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!validateForm()) return;

    // Prepare FormData for actual submission
    const formData = new FormData(this);

    // Clear existing files from FormData and add our selected files
    formData.delete('attachments[]');
    selectedFiles.forEach(file => {
        formData.append('attachments[]', file);
    });

    // Show loading state
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Show progress bar if files are attached
    const progressContainer = document.getElementById('progress-container');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    if (selectedFiles.length > 0) {
        progressContainer.style.display = 'block';
    }

    try {
        // Simulate upload with progress (replace with actual fetch/XHR)
        await simulateUpload(formData, (progress) => {
            const percent = Math.round(progress * 100);
            progressFill.style.width = `${percent}%`;
            progressText.textContent = `${percent}%`;
        });

        // Show success popup
        document.getElementById('popup-overlay').classList.add('active');

        // Reset form
        this.reset();
        selectedFiles = [];
        updateFileList();
        progressContainer.style.display = 'none';

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your report. Please try again.');
    } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }
});

// Form validation
function validateForm() {
    // Reset error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.style.display = 'none';
    });

    let isValid = true;

    // Validate username
    const username = document.getElementById('username').value.trim();
    if (username === '') {
        document.getElementById('username-error').style.display = 'block';
        isValid = false;
    } else if (username.length < 3) {
        document.getElementById('username-error').textContent = 'Username must be at least 3 characters';
        document.getElementById('username-error').style.display = 'block';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value.trim();
    if (email === '') {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }

    // Validate server selection
    const server = document.getElementById('server').value;
    if (!server) {
        document.getElementById('server-error').style.display = 'block';
        isValid = false;
    }

    // Validate bug description
    const description = document.getElementById('bugDescription').value.trim();
    if (description === '') {
        document.getElementById('description-error').style.display = 'block';
        isValid = false;
    } else if (description.length < 20) {
        document.getElementById('description-error').textContent = 'Please provide more details (at least 20 characters)';
        document.getElementById('description-error').style.display = 'block';
        isValid = false;
    }

    // Validate files (optional)
    if (selectedFiles.length > 0) {
        const invalidFiles = selectedFiles.filter(file =>
            file.size > MAX_SIZE ||
            (!file.type.match('image.*') && !file.type.match('video.*'))
        );

        if (invalidFiles.length > 0) {
            showFileError('Some files are invalid (max 5MB, images/videos only)');
            isValid = false;
        }
    }

    return isValid;
}

// Simulate file upload with progress
function simulateUpload(formData, progressCallback) {
    return new Promise((resolve) => {
        const duration = 2000; // 2 seconds for simulation
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            progressCallback(progress);

            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                resolve();
            }
        };

        updateProgress();
    });
}

// Close popup handler
document.getElementById('popup-close').addEventListener('click', function() {
    document.getElementById('popup-overlay').classList.remove('active');
});

// Drag and drop functionality
const fileInputLabel = document.querySelector('.file-input-label');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    fileInputLabel.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    fileInputLabel.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    fileInputLabel.addEventListener(eventName, unhighlight, false);
});

function highlight() {
    fileInputLabel.style.borderColor = 'var(--tertiary-color)';
    fileInputLabel.style.backgroundColor = 'rgba(26, 20, 42, 0.9)';
}

function unhighlight() {
    fileInputLabel.style.borderColor = 'var(--secondary-color)';
    fileInputLabel.style.backgroundColor = 'rgba(26, 20, 42, 0.8)';
}

// Handle dropped files
fileInputLabel.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    // Trigger change event with dropped files
    fileInput.files = files;
    const event = new Event('change');
    fileInput.dispatchEvent(event);
}