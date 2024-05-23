# Web Exploration Recorder

Web Exploration Recorder is a Chrome extension paired with a Node.js backend that captures and records web browsing activities. It captures the sequence of URLs you hover over while exploring web pages and records these interactions as rr web events. These events can then be displayed on a video player using the extension.

## Features

- **Real-time URL Capture**: Records the sequence of URLs hovered over during browsing.
- **WebSocket Communication**: Ensures real-time communication between the Chrome extension and the Node.js backend.
- **RR Web Events**: Captures interactions as rr web events for accurate replay.
- **Video Playback**: Displays captured interactions as a video through the extension.

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (Node package manager)

### Demo 
-[Demo video of extension live here](https://drive.google.com/file/d/1svMlMLnAVk106Bwh5ChAPR8mV_jhb8rM/view?usp=sharing).


### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/web-exploration-recorder.git
    cd web-exploration-recorder/backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm start
    ```

   The backend server will start on `http://localhost:3000`.

### Chrome Extension Setup

1. Clone the repository if you haven't already:
    ```sh
    git clone https://github.com/yourusername/web-exploration-recorder.git
    cd web-exploration-recorder/extension
    ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select the `extension` directory from the cloned repository.

5. The extension should now be loaded and visible in the list of installed extensions.

## Usage

1. Make sure the backend server is running (`npm start` in the `backend` directory).

2. Open the Chrome browser and activate the Web Exploration Recorder extension.

3. Browse the web and hover over URLs as needed. The extension will capture these interactions and send them to the backend via WebSocket.

4. To view the recorded video, access the video player through the extension's UI.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.


## Contact

If you have any questions or suggestions, feel free to open an issue or contact us at [owaismohd857@example.com](owaismohd857@example.com).

---

**Happy Exploring!**
