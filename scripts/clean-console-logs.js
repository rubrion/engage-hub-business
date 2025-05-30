#!/usr/bin/env node

/**
 * Script to clean up console.log statements from the codebase
 *
 * This script either:
 * 1. Replaces direct console.log with debugLog from our debug utility
 * 2. Or completely removes console.log statements if they're simple
 *
 * Usage:
 *   node scripts/clean-console-logs.js [--check] [--fix]
 *
 * Options:
 *   --check  Only report files with console.log statements
 *   --fix    Replace console.log with debugLog from our utility
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');

const EXCLUDE_PATHS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git',
  'debugUtils.ts',
  'debugControl.ts',
];

const CHECK_ONLY = process.argv.includes('--check');
const FIX_MODE = process.argv.includes('--fix');

if (!CHECK_ONLY && !FIX_MODE) {
  console.log('Please specify either --check or --fix mode');
  process.exit(1);
}

const CONSOLE_LOG_REGEX = /console\.log\((.*?)\);?/g;
const CONSOLE_WARN_REGEX = /console\.warn\((.*?)\);?/g;
const CONSOLE_ERROR_REGEX = /console\.error\((.*?)\);?/g;

function shouldExclude(filePath) {
  return EXCLUDE_PATHS.some((excludePath) => filePath.includes(excludePath));
}

function isJsOrTsFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return ['.js', '.jsx', '.ts', '.tsx'].includes(ext);
}

function processFile(filePath) {
  if (shouldExclude(filePath) || !isJsOrTsFile(filePath)) {
    return { changed: false, matches: 0 };
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;

    const logMatches = content.match(CONSOLE_LOG_REGEX) || [];
    const warnMatches = content.match(CONSOLE_WARN_REGEX) || [];
    const errorMatches = content.match(CONSOLE_ERROR_REGEX) || [];

    const totalMatches =
      logMatches.length + warnMatches.length + errorMatches.length;

    if (totalMatches === 0) {
      return { changed: false, matches: 0 };
    }

    if (FIX_MODE) {
      if (
        totalMatches > 0 &&
        !content.includes('import { debugLog') &&
        !content.includes('import {debugLog')
      ) {
        if (content.includes('import {') || content.includes('import { ')) {
          if (
            content.includes("from './utils/debugControl'") ||
            content.includes('from "./utils/debugControl"')
          ) {
            newContent = newContent.replace(
              /(import \{[^}]*)(} from ['"]\.\.?\/utils\/debugControl['"];?)/,
              '$1, debugLog$2'
            );
          } else if (
            content.includes("from '../utils/debugControl'") ||
            content.includes('from "../utils/debugControl"')
          ) {
            newContent = newContent.replace(
              /(import \{[^}]*)(} from ['"]\.\.\/utils\/debugControl['"];?)/,
              '$1, debugLog$2'
            );
          } else {
            const importLines = content.match(/^import .*$/gm) || [];
            if (importLines.length > 0) {
              const lastImport = importLines[importLines.length - 1];
              newContent = newContent.replace(
                lastImport,
                `${lastImport}\nimport { debugLog } from './utils/debugControl';`
              );
            } else {
              newContent = `import { debugLog } from './utils/debugControl';\n\n${newContent}`;
            }
          }
        } else {
          newContent = `import { debugLog } from './utils/debugControl';\n\n${newContent}`;
        }
      }

      newContent = newContent.replace(
        CONSOLE_LOG_REGEX,
        (match, args) => `debugLog(${args});`
      );

      newContent = newContent.replace(
        CONSOLE_WARN_REGEX,
        (match, args) => `debugWarn(${args});`
      );

      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        return { changed: true, matches: totalMatches };
      }
    }

    return { changed: false, matches: totalMatches };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return { changed: false, matches: 0 };
  }
}

function walkDir(dir, action) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !shouldExclude(filePath)) {
      walkDir(filePath, action);
    } else {
      action(filePath);
    }
  });
}

function main() {
  console.log(
    `${CHECK_ONLY ? 'Checking' : 'Fixing'} console.log statements in the codebase...`
  );

  let filesWithConsole = [];
  let totalFixed = 0;

  walkDir(SRC_DIR, (filePath) => {
    const result = processFile(filePath);

    if (result.matches > 0) {
      filesWithConsole.push({ file: filePath, matches: result.matches });

      if (result.changed) {
        totalFixed++;
      }
    }
  });

  filesWithConsole.sort((a, b) => b.matches - a.matches);

  console.log('\nFiles with console statements:');
  filesWithConsole.forEach(({ file, matches }) => {
    console.log(`- ${file.replace(ROOT_DIR + '/', '')}: ${matches} statements`);
  });

  console.log(
    `\n${filesWithConsole.length} files with console statements found.`
  );

  if (FIX_MODE) {
    console.log(`${totalFixed} files fixed.`);
  }
}

main();
