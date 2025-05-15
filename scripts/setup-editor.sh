#!/bin/bash

# Color definitions
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   Rubrion Web Client Template          ${NC}"
echo -e "${BLUE}   Editor Setup Script                  ${NC}"
echo -e "${BLUE}=========================================${NC}"

# Check for common editors and configure them
echo -e "\n${YELLOW}Configuring editor extensions...${NC}"

# VS Code
if [ -f "/usr/bin/code" ] || [ -f "/usr/local/bin/code" ] || [ -f "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ] || [ -f "$HOME/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code" ]; then
  echo -e "${GREEN}VS Code detected. Configuring settings...${NC}"
  
  # Create .vscode directory if it doesn't exist
  mkdir -p ./.vscode
  
  # Create settings.json with auto-formatting on save
  cat > ./.vscode/settings.json << EOF
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "prettier.requireConfig": true,
  "prettier.useEditorConfig": true
}
EOF
  
  echo -e "${GREEN}✓ VS Code settings created${NC}"
  echo -e "${YELLOW}Please install the following VS Code extensions:${NC}"
  echo -e "  - esbenp.prettier-vscode (Prettier)"
  echo -e "  - dbaeumer.vscode-eslint (ESLint)"
  echo -e "  - EditorConfig.EditorConfig"
fi

# WebStorm
if [ -d ~/.webstorm* ] || [ -d ~/Library/Application\ Support/JetBrains/WebStorm* ]; then
  echo -e "\n${GREEN}WebStorm detected.${NC}"
  echo -e "${YELLOW}Please configure WebStorm with:${NC}"
  echo -e "  1. Go to Preferences > Languages & Frameworks > JavaScript > Prettier"
  echo -e "  2. Check 'On save'"
  echo -e "  3. Go to Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint"
  echo -e "  4. Check 'Automatic ESLint configuration'"
  echo -e "  5. Check 'Run eslint --fix on save'"
fi

# Add pre-commit hook for Git
echo -e "\n${YELLOW}Setting up Git pre-commit hook...${NC}"

# Create .git/hooks directory if it doesn't exist
mkdir -p ./.git/hooks

# Create pre-commit hook to automatically format files
cat > ./.git/hooks/pre-commit << 'EOF'
#!/bin/bash

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '\.(js|jsx|ts|tsx|css|scss|json|md)$')

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

echo "Running Prettier and ESLint on staged files before commit..."

echo "$STAGED_FILES" | xargs npx prettier --write

echo "$STAGED_FILES" | grep -E '\.(js|jsx|ts|tsx)$' | xargs npx eslint --fix

echo "$STAGED_FILES" | xargs git add

exit 0
EOF

# Make the hook executable
chmod +x ./.git/hooks/pre-commit

echo -e "${GREEN}✓ Git pre-commit hook created and enabled${NC}"

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "${BLUE}Your editor should now automatically format code according to project standards.${NC}"
echo -e "${BLUE}The pre-commit hook will ensure all committed code is properly formatted.${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo -e "  1. Install the recommended editor extensions"
echo -e "  2. Restart your editor to apply the new settings"