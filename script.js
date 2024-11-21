document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('article');
    const links = document.querySelectorAll('.side-menu a');

    // Navigation click handler
    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            
            // Get currently visible article
            const currentArticle = Array.from(articles).find(article => 
                article.classList.contains('fade-in'));

            if (currentArticle) {
                // Fade out current article
                currentArticle.classList.remove('fade-in');
                currentArticle.classList.add('fade-out');
                
                // Wait for animation to complete
                await new Promise(resolve => setTimeout(resolve, 500));
                
                currentArticle.classList.remove('fade-out');
                currentArticle.style.display = 'none';
                currentArticle.style.visibility = 'hidden';
            }

            // Show and fade in new article
            const newArticle = document.getElementById(target);
            if (newArticle) {
                newArticle.style.display = 'block';
                newArticle.style.visibility = 'visible';
                newArticle.classList.add('fade-in');
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // You can handle the form submission here
            console.log('Form submitted:', data);
            alert('Message sent! (This is a demo)');
            contactForm.reset();
        });
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Array Operations
    let currentArray = [];

    // Basic Operations Functions
    window.insertElement = function() {
        const num = parseInt(document.getElementById('arrayInput').value);
        const index = parseInt(document.getElementById('arrayIndex').value);
        
        if (isNaN(num)) {
            showResult('Please enter a valid number');
            return;
        }

        if (isNaN(index)) {
            currentArray.push(num);
        } else if (index >= 0 && index <= currentArray.length) {
            currentArray.splice(index, 0, num);
        } else {
            showResult('Invalid index');
            return;
        }

        updateArrayDisplay('array-display');
        updateArrayDisplay('sort-array-display');
        updateArrayDisplay('search-array-display');
        showResult(`Inserted ${num} successfully`);
        
        // Clear input fields
        document.getElementById('arrayInput').value = '';
        document.getElementById('arrayIndex').value = '';
    }

    window.deleteElement = function() {
        const index = parseInt(document.getElementById('arrayIndex').value);
        
        if (isNaN(index) || index < 0 || index >= currentArray.length) {
            showResult('Invalid index');
            return;
        }

        const deleted = currentArray.splice(index, 1)[0];
        updateArrayDisplay('array-display');
        updateArrayDisplay('sort-array-display');
        updateArrayDisplay('search-array-display');
        showResult(`Deleted ${deleted} at index ${index}`);
        
        // Clear input field
        document.getElementById('arrayIndex').value = '';
    }

    window.searchElement = function() {
        const num = parseInt(document.getElementById('arrayInput').value);
        if (isNaN(num)) {
            showResult('Please enter a valid number');
            return;
        }

        const index = currentArray.indexOf(num);
        if (index !== -1) {
            showResult(`Found ${num} at index ${index}`);
            // Highlight found element
            const elements = document.querySelectorAll('.array-element');
            elements[index].style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            setTimeout(() => {
                elements[index].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }, 1500);
        } else {
            showResult(`${num} not found in array`);
        }
        
        // Clear input field
        document.getElementById('arrayInput').value = '';
    }

    // Sorting Functions
    function updateArrayDisplay(containerId) {
        const display = document.getElementById(containerId);
        if (!display) return;
        
        display.innerHTML = '';
        currentArray.forEach((num, idx) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            element.setAttribute('data-index', idx);
            display.appendChild(element);
        });
    }

    window.generateRandomArray = function() {
        currentArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateArrayDisplay('sort-array-display');
    }

    window.bubbleSort = async function() {
        const arr = [...currentArray];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    currentArray = [...arr];
                    updateArrayDisplay('sort-array-display');
                    await new Promise(resolve => setTimeout(resolve, 500)); // Animation delay
                }
            }
        }
    }

    window.quickSort = async function() {
        const arr = [...currentArray];
        await quickSortHelper(arr, 0, arr.length - 1);
    }

    async function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                currentArray = [...arr];
                updateArrayDisplay('sort-array-display');
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        currentArray = [...arr];
        updateArrayDisplay('sort-array-display');
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return i + 1;
    }

    // Searching Functions
    function linearSearch() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const index = currentArray.indexOf(num);
        if (index !== -1) {
            document.getElementById('search-result').textContent = `Found ${num} at index ${index}`;
        } else {
            document.getElementById('search-result').textContent = `${num} not found in array`;
        }
    }

    async function binarySearch() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const sortedArray = [...currentArray].sort((a, b) => a - b);
        let left = 0;
        let right = sortedArray.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (sortedArray[mid] === num) {
                document.getElementById('search-result').textContent = `Found ${num} at index ${mid} in sorted array`;
                return;
            }
            if (sortedArray[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        document.getElementById('search-result').textContent = `${num} not found in array`;
    }

    // Utility Functions
    function showResult(message) {
        document.getElementById('operation-result').textContent = message;
    }

    // Initialize
    generateRandomArray();

    window.generateRandomArrayBasic = function() {
        currentArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateArrayDisplay('array-display');
        showResult('Generated new random array');
    }

    // Initialize array when basic operations article is shown
    document.addEventListener('DOMContentLoaded', () => {
        const basicOpsArticle = document.getElementById('array-operations');
        if (basicOpsArticle) {
            generateRandomArrayBasic();
        }
    });
});