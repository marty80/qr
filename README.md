# Historical Events QR Gallery

A dynamic web application that displays historical events that occurred on the current date, complete with QR codes for easy sharing and relevant images from Wikipedia.

## Features

- Fetches historical events from the "On This Day" API
- Generates QR codes for each historical event
- Retrieves relevant images from Wikipedia
- Responsive grid layout with hover effects
- Clean and modern user interface

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- External APIs:
  - On This Day API
  - QR Server API
  - Wikipedia API

## How It Works

1. The application fetches historical events that occurred on the current date
2. For each event:
   - Generates a QR code containing the event description
   - Fetches a relevant image from Wikipedia when available
   - Displays both in a card layout with the event description
3. Users can scan the QR codes to share historical events

## API Dependencies

- [QR Server API](https://api.qrserver.com/) for QR code generation
- Wikipedia API for event-related images
- On This Day API for historical events

## Setup

1. Clone this repository
2. Open `index.html` in a modern web browser
3. No build process or installation required

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- Fetch API

## License

This project is open source and available under the MIT License.