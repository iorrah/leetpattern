import fs from "fs";
import path from "path";
import { spawn } from "child_process";

// Get the file path argument from the command line
const relativePath = process.argv[2];

if (!relativePath) {
  console.error("❌ Error: Please provide a file path.");
  console.log("Usage: pnpm clip <file-path>");
  process.exit(1);
}

const absolutePath = path.resolve(process.cwd(), relativePath);

// Check if file exists
if (!fs.existsSync(absolutePath)) {
  console.error(`❌ Error: File not found at ${relativePath}`);
  process.exit(1);
}

try {
  // Read file content
  const content = fs.readFileSync(absolutePath, "utf8");

  // Format the output string exactly as requested
  const output = `File relative path: ${relativePath}\n\n\`\`\`\n${content}\n\`\`\``;

  // Detect OS to use the correct clipboard command
  const platform = process.platform;
  let proc;

  if (platform === "darwin") {
    // macOS
    proc = spawn("pbcopy");
  } else if (platform === "win32") {
    // Windows
    proc = spawn("clip");
  } else {
    // Linux (requires xclip or xsel installed)
    proc = spawn("xclip", ["-selection", "clipboard"]);
  }

  // Pipe the formatted text into the system clipboard
  proc.stdin.write(output);
  proc.stdin.end();

  console.log(`✅ Copied formatted ${relativePath} to clipboard!`);
} catch (error) {
  console.error("❌ An error occurred:", error.message);
  process.exit(1);
}
