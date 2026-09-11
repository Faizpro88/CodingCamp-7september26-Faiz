// ============================================
// Todo Life Dashboard - JavaScript Application
// ============================================

// ============================================
// Global Variables
// ============================================
let time = 1500; // 25 menit dalam detik
let interval = null;
let timerStatus = 'Stopped';
let tasks = [];

// ============================================
// Local Storage Manager
// ============================================
const StorageManager = {
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('LocalStorage save error:', e);
        }
    },
    
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('LocalStorage load error:', e);
            return null;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('LocalStorage remove error:', e);
        }
    }
};

// ============================================
// HTML Escaping for XSS Protection
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// Dark Mode Management
// ============================================
function initTheme() {
    const savedTheme = StorageManager.load('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    StorageManager.save('theme', isDark ? 'dark' : 'light');
}

// ============================================
// Clock & Greeting - Realtime
// ============================================
function updateClock() {
    const now = new Date();
    
    // Format jam HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeStr = hours + ':' + minutes + ':' + seconds;
    
    // Update jam
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerText = timeStr;
    }
    
    // Format tanggal "Sabtu, 12 September 2026"
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dateStr = dayName + ', ' + day + ' ' + month + ' ' + year;
    
    // Update tanggal
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.innerText = dateStr;
    }
    
    // Update greeting berdasarkan waktu
    updateGreeting();
}

function updateGreeting() {
    const hour = new Date().getHours();
    const name = StorageManager.load('userName') || 'User';
    let greetingText = '';
    
    if (hour >= 5 && hour <= 11) {
        greetingText = 'Selamat Pagi, ' + name + '!';
    } else if (hour >= 12 && hour <= 17) {
        greetingText = 'Selamat Siang, ' + name + '!';
    } else if (hour >= 18 && hour <= 21) {
        greetingText = 'Selamat Sore, ' + name + '!';
    } else {
        greetingText = 'Selamat Malam, ' + name + '!';
    }
    
    const greetingElement = document.getElementById('greeting-text');
    if (greetingElement) {
        greetingElement.innerText = greetingText;
    }
}

// ============================================
// Focus Timer Component - 25 Minutes
// ============================================
function formatTimerTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}

function renderTimer() {
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.innerText = formatTimerTime(time);
    }
}

function startTimer() {
    if (timerStatus === 'Running') return;
    
    timerStatus = 'Running';
    
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            renderTimer();
        } else {
            stopTimer();
            timerStatus = 'Completed';
            alert('Pomodoro selesai! Waktu istirahat tiba.');
        }
    }, 1000);
}

function stopTimer() {
    if (timerStatus !== 'Running') return;
    
    timerStatus = 'Stopped';
    
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function resetTimer() {
    stopTimer();
    time = 1500;
    renderTimer();
}

// ============================================
// Custom Name Management
// ============================================
function saveCustomName() {
    const input = document.getElementById('custom-name');
    if (input) {
        const name = input.value.trim();
        if (name) {
            StorageManager.save('userName', name);
            updateGreeting();
        } else {
            alert('Silakan masukkan nama yang valid');
        }
    }
}

function loadCustomName() {
    const input = document.getElementById('custom-name');
    if (input) {
        input.value = StorageManager.load('userName') || 'User';
    }
}

// ============================================
// Todo List Component
// ============================================
function loadTasks() {
    const saved = StorageManager.load('tasks');
    if (saved) {
        tasks = saved;
    }
}

function saveTasks() {
    StorageManager.save('tasks', tasks);
}

function addTask() {
    const input = document.getElementById('task-input');
    if (!input) return;
    
    const title = input.value.trim();
    
    if (!title) {
        alert('Silakan masukkan tugas');
        return;
    }
    
    // Challenge 3: Prevent Duplicate Tasks
    const duplicate = tasks.find(t => t.title.toLowerCase() === title.toLowerCase());
    if (duplicate) {
        alert('Task sudah ada');
        input.value = '';
        return;
    }
    
    const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: title,
        completed: false,
        createdAt: Date.now()
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    input.value = '';
}

function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const newTitle = prompt('Edit tugas:', task.title);
    if (newTitle === null) return;
    
    const trimmedTitle = newTitle.trim();
    
    if (!trimmedTitle) {
        alert('Silakan masukkan judul yang valid');
        return;
    }
    
    // Challenge 3: Prevent Duplicate Tasks (excluding current task)
    const duplicate = tasks.find(t => 
        t.id !== id && t.title.toLowerCase() === trimmedTitle.toLowerCase()
    );
    
    if (duplicate) {
        alert('Task sudah ada');
        return;
    }
    
    tasks = tasks.map(task => 
        task.id === id ? { ...task, title: trimmedTitle } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

function renderTasks() {
    const listElement = document.getElementById('task-list');
    if (!listElement) return;
    
    if (tasks.length === 0) {
        listElement.innerHTML = '<li class="empty-message">Belum ada tugas. Tambahkan tugas di atas!</li>';
        return;
    }
    
    listElement.innerHTML = tasks.map(task => 
        '<li class="task-item ' + (task.completed ? 'completed' : '') + '">' +
            '<input type="checkbox" class="task-checkbox" ' + 
                (task.completed ? 'checked' : '') + 
                ' onchange="toggleTask(\'' + task.id + '\')">' +
            '<span class="task-title">' + escapeHtml(task.title) + '</span>' +
            '<div class="task-actions">' +
                '<button class="edit-btn" onclick="editTask(\'' + task.id + '\')">Edit</button>' +
                '<button class="delete-btn" onclick="deleteTask(\'' + task.id + '\')">Hapus</button>' +
            '</div>' +
        '</li>'
    ).join('');
}

// ============================================
// Quick Links Component
// ============================================
let links = [];

function loadLinks() {
    const saved = StorageManager.load('todoQuickLinks');
    if (saved) {
        links = saved;
    }
}

function saveLinks() {
    StorageManager.save('todoQuickLinks', links);
}

function addLink() {
    const nameInput = document.getElementById('link-name-input');
    const urlInput = document.getElementById('link-url-input');
    
    if (!nameInput || !urlInput) return;
    
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!name || !url) {
        alert('Silakan masukkan nama dan URL tautan');
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (e) {
        alert('Silakan masukkan URL yang valid (contoh: https://example.com)');
        return;
    }
    
    const newLink = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        url: url
    };
    
    links.push(newLink);
    saveLinks();
    renderLinks();
    
    nameInput.value = '';
    urlInput.value = '';
}

function deleteLink(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tautan ini?')) {
        links = links.filter(link => link.id !== id);
        saveLinks();
        renderLinks();
    }
}

function renderLinks() {
    const listElement = document.getElementById('link-list');
    if (!listElement) return;
    
    if (links.length === 0) {
        listElement.innerHTML = '<li class="empty-message">Belum ada tautan cepat. Tambahkan di atas!</li>';
        return;
    }
    
    listElement.innerHTML = links.map(link => 
        '<li class="link-item">' +
            '<a href="' + escapeHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' + 
                escapeHtml(link.name) + 
            '</a>' +
            '<div class="link-actions">' +
                '<button class="delete-btn" onclick="deleteLink(\'' + link.id + '\')">Hapus</button>' +
            '</div>' +
        '</li>'
    ).join('');
}

// ============================================
// Application Initialization
// ============================================
function initApp() {
    // Load Data from Local Storage
    loadCustomName();
    loadTasks();
    loadLinks();
    renderTasks();
    
    // Initialize Dark Mode
    initTheme();
    
    // Initialize Clock - jalan tiap 1 detik
    setInterval(updateClock, 1000);
    updateClock();
    
    // Initialize Timer
    renderTimer();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

document.getElementById('darkModeBtn')?.addEventListener('click', toggleTheme);

document.getElementById('startBtn')?.addEventListener('click', startTimer);
document.getElementById('stopBtn')?.addEventListener('click', stopTimer);
document.getElementById('resetBtn')?.addEventListener('click', resetTimer);

document.getElementById('save-name-btn')?.addEventListener('click', saveCustomName);

document.getElementById('custom-name')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveCustomName();
});

document.getElementById('add-task-btn')?.addEventListener('click', addTask);
document.getElementById('task-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

document.getElementById('add-link-btn')?.addEventListener('click', addLink);
// BUG FIX: JAM REALTIME FINAL
function updateClock(){
  const now = new Date();
  document.getElementById('current-time').innerText = now.toLocaleTimeString('id-ID');
  document.getElementById('current-date').innerText = now.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
}
setInterval(updateClock, 1000);
updateClock();
// BUG FIX: DARK MODE
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// BUG FIX: SIMPAN NAMA
function saveCustomName(){
  const name = document.getElementById('custom-name').value;
  localStorage.setItem('userName', name);
  document.getElementById('greeting-text').innerText = `Selamat Pagi, ${name}!`;
}

function loadCustomName(){
  const savedName = localStorage.getItem('userName');
  if(savedName){
    document.getElementById('custom-name').value = savedName;
    document.getElementById('greeting-text').innerText = `Selamat Pagi, ${savedName}!`;
  }
}
loadCustomName(); // panggil pas buka halaman