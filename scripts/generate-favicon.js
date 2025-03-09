const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;

const inputPath = path.join(__dirname, "../public/logo.png");
const outputPath = path.join(__dirname, "../src/app/favicon.ico");
const tempPath = path.join(__dirname, "../public/temp-favicon.png");

try {
  console.log("Creating favicon from:", inputPath);
  console.log("FFmpeg path:", ffmpegPath);

  // Create a 32x32 PNG version
  const command = `"${ffmpegPath}" -y -i "${inputPath}" -vf "scale=32:32" "${tempPath}"`;
  console.log("Running command:", command);

  execSync(command);
  console.log("Created 32x32 PNG version");

  // Move the file to the favicon location
  fs.copyFileSync(tempPath, outputPath);
  console.log("Copied to favicon.ico");

  // Create the larger icon for modern browsers (192x192)
  const iconCommand = `"${ffmpegPath}" -y -i "${inputPath}" -vf "scale=192:192" "${path.join(
    __dirname,
    "../src/app/icon.png"
  )}"`;
  console.log("Running command for icon:", iconCommand);

  execSync(iconCommand);
  console.log("Created icon.png (192x192)");

  // Clean up temp file
  fs.unlinkSync(tempPath);
  console.log("Cleaned up temporary files");

  console.log("Favicon generation complete!");
} catch (error) {
  console.error("Error generating favicon:", error.message);
}
