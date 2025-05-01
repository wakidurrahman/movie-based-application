#!/bin/bash

# Script to run all CI checks locally
# Usage: ./scripts/check-ci.sh

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Running CI checks locally...${NC}"

# Function to run a command and check its exit status
run_check() {
  local command=$1
  local description=$2
  
  echo -e "${YELLOW}📋 $description${NC}"
  
  eval $command
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ $description passed!${NC}"
    return 0
  else
    echo -e "${RED}❌ $description failed!${NC}"
    return 1
  fi
}

# Check Node.js version
NODE_VERSION=$(node -v)
REQUIRED_VERSION="v22.14.0" # TODO: this is the version used in the CI workflow

echo -e "${YELLOW}📋 Checking Node.js version...${NC}"

if [[ "$NODE_VERSION" == *"$REQUIRED_VERSION"* ]]; then
  echo -e "${GREEN}✅ Using Node.js $NODE_VERSION${NC}"
else
  echo -e "${RED}❌ Using Node.js $NODE_VERSION, but project requires $REQUIRED_VERSION${NC}"
  echo -e "${YELLOW}⚠️ Consider using nvm to switch Node.js versions:${NC}"
  echo -e "nvm use 22.14.0"
  exit 1
fi

# Initialize error flag
HAS_ERROR=0

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}📋 Installing dependencies...${NC}"
  npm install
  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Dependency installation failed!${NC}"
    exit 1
  fi
fi

# Run ESLint
run_check "npm run lint" "Linting" || HAS_ERROR=1

# Run Prettier
run_check "npx prettier --check \"src/**/*.{ts,tsx,scss}\"" "Formatting" || HAS_ERROR=1

# Run Tests
run_check "npm test" "Tests" || HAS_ERROR=1

# Build project
run_check "npm run build" "Build" || HAS_ERROR=1

# Summary
if [ $HAS_ERROR -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed! CI would pass.${NC}"
  exit 0
else
  echo -e "${RED}❌ Some checks failed. Fix the issues above to make CI pass.${NC}"
  exit 1
fi 