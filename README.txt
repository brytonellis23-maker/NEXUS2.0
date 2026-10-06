NEXUS CAM V2
1. Create a NEW GitHub repository.
2. Upload every file in this folder to the repository root.
3. Enable GitHub Pages from Settings > Pages > Deploy from branch > main > /(root).
4. Open the Pages URL in Safari.
5. Allow camera and microphone permissions.
6. Enter the Nano ESP32 IP address to send motion commands.

Architecture:
USB webcam -> PC/browser
Gsycle joystick -> Reyann USB encoder -> PC
PC/browser -> Wi-Fi -> Nano ESP32 -> motor controller

This package is a control/vision UI prototype. The Nano firmware must be configured for the actual TMC2209 and DS3218 hardware before motor movement is enabled. Emergency-stop hardware should remain independent of software.
