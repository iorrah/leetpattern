import fs from "fs";
import path from "path";

// Directories you want to completely skip
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".turbo",
  "dist",
  "build",
  ".next",
  "coverage",
  ".cache",
]);

// Prevents the monorepo tree from getting too deep/massive
const MAX_DEPTH = 4;

function printTree(dir, prefix = "", depth = 0) {
  if (depth > MAX_DEPTH) return;

  try {
    const files = fs.readdirSync(dir);
    const filteredFiles = files.filter((file) => !IGNORE_DIRS.has(file));

    filteredFiles.forEach((file, index) => {
      const filePath = path.join(dir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const isLast = index === filteredFiles.length - 1;

      // Print the current file/folder
      console.log(`${prefix}${isLast ? "└── " : "├── "}${file}`);

      // Recursively dive into directories
      if (isDirectory) {
        printTree(filePath, `${prefix}${isLast ? "    " : "│   "}`, depth + 1);
      }
    });
  } catch (err) {
    // Skip unreadable files/folders securely
  }
}

console.log(".");
printTree(process.cwd());
