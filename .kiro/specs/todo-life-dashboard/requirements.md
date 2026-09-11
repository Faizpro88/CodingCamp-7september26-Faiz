# Requirements Document

## Introduction

A browser-based time management dashboard with focus timer, to-do list, and quick links functionality. The application helps users manage their time effectively through a Pomodoro-style focus timer, task tracking, and quick access to favorite websites. The Dashboard is designed for personal productivity management with persistent data storage.

## Glossary

- **Dashboard**: The main web application that provides time management and task tracking features
- **Greeting_Module**: The component responsible for displaying the current date and time with dynamic greetings based on time of day
- **Focus_Timer**: The 25-minute countdown timer based on the Pomodoro technique
- **Todo_List**: The list of user tasks managed by the application
- **Task**: A user-defined item in the to-do list with properties: id (string), title (string), completed (boolean), createdAt (timestamp)
- **Quick_Links**: The collection of favorite websites saved by the user
- **Quick_Link**: A favorite website with properties: id (string), name (string), url (string)
- **Local_Storage**: Browser's Local Storage API used for persisting user data (tasks and quick links)
- **Time_Of_Day**: Time period classification based on hour with these ranges:
  - morning: 05:00-11:59
  - afternoon: 12:00-17:59
  - evening: 18:00-21:59
  - night: 22:00-04:59

## Challenge 1: Dark Mode

Aplikasi harus memiliki tombol toggle untuk mengganti tema antara Light Mode dan Dark Mode.

Preferensi tema harus disimpan di Local_Storage.

## Challenge 2: Custom Name

Greeting_Module harus menampilkan nama custom user.

User bisa menginput nama melalui input field dan nama akan disimpan di Local_Storage.

Default nama adalah "User" jika belum diisi.

## Challenge 3: Prevent Duplicate Tasks

Saat menambahkan Task baru ke Todo_List, sistem harus mengecek apakah Task dengan title yang sama sudah ada.

Jika duplikat, tampilkan alert "Task sudah ada" dan jangan tambahkan.

## Requirements

### Requirement 1: Display Current Date and Time

**User Story:** As a user, I want to see the current date and time, so that I can track the current moment.

#### Acceptance Criteria

1. THE Dashboard SHALL display the current date in a clear format
2. THE Dashboard SHALL display the current time in HH:MM:SS format
3. WHILE the application is running, THE Dashboard SHALL update the time display every second

### Requirement 2: Dynamic Greeting Based on Time of Day

**User Story:** As a user, I want to see a greeting that changes based on the time of day, so that I have a personalized experience.

#### Acceptance Criteria

1. WHEN the current hour is between 05:00 and 11:59, THE Greeting_Module SHALL display "Good Morning"
2. WHEN the current hour is between 12:00 and 17:59, THE Greeting_Module SHALL display "Good Afternoon"
3. WHEN the current hour is between 18:00 and 21:59, THE Greeting_Module SHALL display "Good Evening"
4. WHEN the current hour is between 22:00 and 04:59, THE Greeting_Module SHALL display "Good Night"

### Requirement 3: Focus Timer Functionality

**User Story:** As a user, I want a 25-minute focus timer, so that I can work in focused intervals following the Pomodoro technique.

#### Acceptance Criteria

1. WHEN the application loads, THE Focus_Timer SHALL display a default 25-minute countdown timer
2. THE Focus_Timer SHALL display the remaining time in MM:SS format
3. WHEN the Start button is clicked, THE Focus_Timer SHALL begin counting down
4. WHEN the Stop button is clicked, THE Focus_Timer SHALL pause the countdown
5. WHEN the Reset button is clicked, THE Focus_Timer SHALL reset to 25 minutes and pause
6. WHILE the timer is running, THE Focus_Timer SHALL update the display every second
7. WHEN the timer reaches 00:00, THE Focus_Timer SHALL stop and indicate completion
8. THE Focus_Timer SHALL display a visual progress indicator showing the elapsed percentage
9. THE Focus_Timer SHALL display its current status (Running, Stopped, Completed)

### Requirement 4: To-Do List Creation and Persistence

**User Story:** As a user, I want to add new tasks to my to-do list, so that I can track my tasks.

#### Acceptance Criteria

1. WHEN a new task is added, THE Dashboard SHALL create a task with a unique ID, title, completion status (incomplete), and timestamp
2. THE Dashboard SHALL persist new tasks using Local_Storage
3. WHEN a task is added, THE Dashboard SHALL immediately display the new task in the list
4. THE Dashboard SHALL load and display all tasks from Local_Storage when the application starts

### Requirement 5: To-Do List Editing

**User Story:** As a user, I want to edit existing tasks, so that I can update task titles when needed.

#### Acceptance Criteria

1. WHEN an edit action is triggered for a task, THE Dashboard SHALL allow modification of the task title
2. WHEN a task title is updated, THE Dashboard SHALL save the change to Local_Storage
3. WHEN a task title is updated, THE Dashboard SHALL immediately reflect the change in the display

### Requirement 6: To-Do List Completion Toggle

**User Story:** As a user, I want to mark tasks as completed or incomplete, so that I can track my progress.

#### Acceptance Criteria

1. WHEN a task completion toggle is triggered, THE Dashboard SHALL invert the completion status of the task
2. WHEN a task is marked as completed, THE Dashboard SHALL visually indicate the completed state
3. WHEN a task completion status changes, THE Dashboard SHALL save the change to Local_Storage

### Requirement 7: To-Do List Deletion

**User Story:** As a user, I want to delete tasks from my to-do list, so that I can remove completed or unwanted tasks.

#### Acceptance Criteria

1. WHEN a delete action is triggered for a task, THE Dashboard SHALL remove the task from the display
2. WHEN a task is deleted, THE Dashboard SHALL remove the task from Local_Storage
3. WHEN a task is deleted, THE Dashboard SHALL not affect other tasks in the list

### Requirement 8: Quick Links Creation and Persistence

**User Story:** As a user, I want to add favorite websites to my quick links, so that I can access them quickly.

#### Acceptance Criteria

1. WHEN a new quick link is added, THE Dashboard SHALL create a quick link with a unique ID, display name, and URL
2. THE Dashboard SHALL persist new quick links using Local_Storage
3. WHEN a quick link is added, THE Dashboard SHALL immediately display the new link
4. THE Dashboard SHALL load and display all quick links from Local_Storage when the application starts

### Requirement 9: Quick Links Editing

**User Story:** As a user, I want to edit the name and URL of quick links, so that I can update their information.

#### Acceptance Criteria

1. WHEN a quick link edit action is triggered, THE Dashboard SHALL allow modification of the display name and URL
2. WHEN a quick link is updated, THE Dashboard SHALL save the changes to Local_Storage
3. WHEN a quick link is updated, THE Dashboard SHALL immediately reflect the changes in the display

### Requirement 10: Quick Links Deletion

**User Story:** As a user, I want to delete quick links, so that I can remove outdated or unused links.

#### Acceptance Criteria

1. WHEN a quick link delete action is triggered, THE Dashboard SHALL remove the link from the display
2. WHEN a quick link is deleted, THE Dashboard SHALL remove the link from Local_Storage
3. WHEN a quick link is deleted, THE Dashboard SHALL not affect other quick links

### Requirement 11: Quick Links Opening in New Tabs

**User Story:** As a user, I want to open quick links in new tabs, so that I can visit favorite websites without leaving the dashboard.

#### Acceptance Criteria

1. WHEN a quick link is clicked, THE Dashboard SHALL open the link's URL in a new browser tab
2. WHEN a quick link is clicked, THE Dashboard SHALL use the target="_blank" attribute for security

### Requirement 12: Single File Structure

**User Story:** As a developer, I want the application to use a single HTML file, single CSS file, and single JavaScript file, so that the project is simple and organized.

#### Acceptance Criteria

1. THE Dashboard SHALL consist of exactly one HTML file in the root directory
2. THE Dashboard SHALL link to exactly one CSS file in the css/ directory
3. THE Dashboard SHALL link to exactly one JavaScript file in the js/ directory

### Requirement 13: Local Storage Persistence

**User Story:** As a user, I want my data to persist between browser sessions, so that I don't lose my tasks and links.

#### Acceptance Criteria

1. WHEN tasks are added, edited, or deleted, THE Dashboard SHALL persist changes using the Local_Storage API
2. WHEN quick links are added, edited, or deleted, THE Dashboard SHALL persist changes using the Local_Storage API
3. WHEN the application loads, THE Dashboard SHALL retrieve and display all persisted tasks from Local_Storage
4. WHEN the application loads, THE Dashboard SHALL retrieve and display all persisted quick links from Local_Storage

### Requirement 14: Modern Browser Compatibility

**User Story:** As a user, I want the application to work in modern browsers, so that I can use it regardless of my preferred browser.

#### Acceptance Criteria

1. THE Dashboard SHALL work correctly in Google Chrome (latest stable version)
2. THE Dashboard SHALL work correctly in Mozilla Firefox (latest stable version)
3. THE Dashboard SHALL work correctly in Microsoft Edge (latest stable version)
4. THE Dashboard SHALL work correctly in Apple Safari (latest stable version)

### Requirement 15: Clean, Minimal Interface

**User Story:** As a user, I want a clean and minimal interface, so that I can focus on my tasks without distractions.

#### Acceptance Criteria

1. THE Dashboard SHALL use a simple layout with clear sections for each feature
2. THE Dashboard SHALL avoid excessive colors or visual clutter
3. THE Dashboard SHALL use white space effectively to separate different feature areas

### Requirement 16: Fast Load Time and Responsive UI

**User Story:** As a user, I want the application to load quickly and respond instantly to my actions, so that I can use it without delays.

#### Acceptance Criteria

1. WHEN the application starts, THE Dashboard SHALL display all content within 1 second
2. WHEN a user action is performed (click, input), THE Dashboard SHALL update the display within 100 milliseconds
3. WHEN the application runs, THE Dashboard SHALL not exhibit noticeable lag or freezing

### Requirement 17: Readable Typography and Visual Hierarchy

**User Story:** As a user, I want clear typography and visual hierarchy, so that I can easily read and understand the interface.

#### Acceptance Criteria

1. THE Dashboard SHALL use a font size of at least 16px for primary text
2. THE Dashboard SHALL use font sizes that create a clear visual hierarchy (headings larger than body text)
3. THE Dashboard SHALL use high contrast between text and background for readability
4. THE Dashboard SHALL use consistent styling for similar UI elements

### Requirement 18: Dark Mode Toggle

**User Story:** As a user, I want to toggle between Light Mode and Dark Mode, so that I can use the application in different lighting conditions.

#### Acceptance Criteria

1. WHEN the Dark Mode toggle button is clicked, THE Dashboard SHALL switch between Light Mode and Dark Mode
2. WHEN a theme preference is set, THE Dashboard SHALL save it to Local_Storage
3. WHEN the application loads, THE Dashboard SHALL apply the saved theme preference from Local_Storage
4. WHEN no theme preference exists, THE Dashboard SHALL default to Light Mode

### Requirement 19: Custom User Name

**User Story:** As a user, I want to set a custom name, so that the greeting is personalized to me.

#### Acceptance Criteria

1. WHEN the application loads, THE Greeting_Module SHALL display the custom name if saved in Local_Storage
2. WHEN no custom name exists, THE Greeting_Module SHALL display "User" as the default name
3. WHEN a new name is entered and saved, THE Dashboard SHALL update the greeting immediately
4. WHEN a custom name is saved, THE Dashboard SHALL persist it to Local_Storage

### Requirement 20: Prevent Duplicate Tasks

**User Story:** As a user, I want to prevent duplicate tasks from being added, so that my to-do list remains clean and organized.

#### Acceptance Criteria

1. WHEN a new task is added, THE Dashboard SHALL check if a task with the same title already exists in the list
2. IF a duplicate task is detected, THE Dashboard SHALL display an alert message "Task sudah ada" and NOT add the task
3. IF no duplicate exists, THE Dashboard SHALL add the task normally
