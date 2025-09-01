// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Create and add the dark mode toggle button
    createThemeToggle();

    // Initialize theme based on user preference or system preference
    initializeTheme();

    // Add event listener for theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', toggleThemeWithTransition);
});

function createThemeToggle() {
    // Create the toggle button element
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.setAttribute('title', 'Toggle dark mode');

    // Add to the container
    const container = document.querySelector('.container');
    container.appendChild(toggleButton);
}

function initializeTheme() {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Use saved preference
        setTheme(savedTheme);
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Save user preference
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    const html = document.documentElement;
    const toggleButton = document.querySelector('.theme-toggle');
    const icon = toggleButton.querySelector('i');

    // Set theme attribute
    html.setAttribute('data-theme', theme);

    // Update toggle button icon with animation
    icon.style.transform = 'rotate(180deg)';

    setTimeout(() => {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            toggleButton.setAttribute('aria-label', 'Toggle light mode');
            toggleButton.setAttribute('title', 'Toggle light mode');
        } else {
            icon.className = 'fas fa-moon';
            toggleButton.setAttribute('aria-label', 'Toggle dark mode');
            toggleButton.setAttribute('title', 'Toggle dark mode');
        }
        icon.style.transform = 'rotate(0deg)';
    }, 150);
}

// Add smooth transition when theme changes
function addThemeTransition() {
    const css = document.createElement('style');
    css.textContent = `
        *, *::before, *::after {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
    `;
    document.head.appendChild(css);

    // Remove transition after theme change to avoid interfering with other animations
    setTimeout(() => {
        css.remove();
    }, 300);
}

// Call this function when toggling theme for smooth transitions
function toggleThemeWithTransition() {
    addThemeTransition();
    toggleTheme();
}

// Notes App Functionality
const noteInput = document.getElementById("noteInput")
const saveNoteButton = document.getElementById("saveNote")
const notesContainer = document.getElementById("notesContainer")

document.addEventListener("DOMContentLoaded", displayNotes)

saveNoteButton.addEventListener("click", function () {
    let noteText = noteInput.value.trim();
    if (noteText === "") {
        return;
    }

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    displayNotes();
});

function displayNotes() {
    notesContainer.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.innerHTML = `
        <p>${note}</p>
        <button class="deleteBtn" onclick="deleteNote(${index})">Delete</button>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}