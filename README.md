# TMA Reunion 2027 – Survey

This is a repository survey for TMA reunion in 2027.

## About

A lightweight, single-page survey form to gather information from TMA alumni ahead of the 2027 reunion. No build tools or external dependencies required – just open the HTML file in a browser.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main survey page |
| `styles.css` | Responsive CSS styles |
| `script.js` | Form validation and submission logic |

## Running Locally

Simply open `index.html` in any modern web browser:

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Or serve it with any static file server:

```bash
npx serve .
# then visit http://localhost:3000
```

## Survey Sections

1. **Personal Information** – name, email, phone, graduation year
2. **Attendance** – RSVP status and number of guests
3. **Preferences** – event format, preferred season, and desired activities
4. **Additional Information** – memories, suggestions, and volunteer interest

## Features

- Client-side form validation with inline error messages
- Responsive design for desktop and mobile
- No external dependencies
