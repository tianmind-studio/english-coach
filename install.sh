#!/usr/bin/env bash
# English Coach Installer for Antigravity CLI & Claude Code
# Dual-compatible installation utility

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_SKILL="${SCRIPT_DIR}/english-coach/SKILL.md"
SOURCE_RULE="${SCRIPT_DIR}/rules/AGENTS.md"

# Colors for terminal output
BOLD="\033[1m"
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
RED="\033[0;31m"
RESET="\033[0m"

info() { echo -e "${BLUE}ℹ${RESET} $1"; }
success() { echo -e "${GREEN}✔${RESET} $1"; }
warn() { echo -e "${YELLOW}⚠${RESET} $1"; }
error() { echo -e "${RED}✖${RESET} $1"; }

show_help() {
  echo -e "${BOLD}English Coach Installer${RESET}"
  echo -e "Supports Antigravity CLI and Claude Code.\n"
  echo -e "${BOLD}USAGE:${RESET}"
  echo -e "  ./install.sh [OPTIONS]\n"
  echo -e "${BOLD}OPTIONS:${RESET}"
  echo -e "  -g, --global               Install Antigravity skill globally (~/.gemini/config/skills/english-coach)"
  echo -e "  -l, --local [DIR]          Install Antigravity skill in project workspace (.agents/skills/english-coach)"
  echo -e "      --rule [DIR]           Install Antigravity always-on rule (AGENTS.md) to workspace"
  echo -e "      --plugin-global        Install Antigravity plugin bundle globally (~/.gemini/config/plugins/english-coach)"
  echo -e "      --plugin-local [DIR]   Install Antigravity plugin bundle to project (.agents/plugins/english-coach)"
  echo -e "      --claude               Install for Claude Code (via npx skills add)"
  echo -e "  -h, --help                 Show this help message\n"
  echo -e "${BOLD}INTERACTIVE MODE:${RESET}"
  echo -e "  Run ./install.sh with no flags for an interactive prompt."
}

install_global_skill() {
  local target_dir="${HOME}/.gemini/config/skills/english-coach"
  info "Installing Antigravity skill globally to: ${target_dir}"
  mkdir -p "${target_dir}"
  cp "${SOURCE_SKILL}" "${target_dir}/SKILL.md"
  success "Installed global Antigravity skill!"
  echo -e "   Run Antigravity CLI and invoke ${CYAN}/english-coach${RESET} or start practicing English."
}

install_local_skill() {
  local base_dir="${1:-$(pwd)}"
  local target_dir="${base_dir}/.agents/skills/english-coach"
  info "Installing Antigravity skill to workspace: ${target_dir}"
  mkdir -p "${target_dir}"
  cp "${SOURCE_SKILL}" "${target_dir}/SKILL.md"
  success "Installed workspace Antigravity skill!"
  echo -e "   The skill will now be discovered by Antigravity CLI in this project."
}

install_rule() {
  local base_dir="${1:-$(pwd)}"
  local target_file="${base_dir}/AGENTS.md"
  info "Installing Antigravity always-on rule to: ${target_file}"
  mkdir -p "${base_dir}"
  if [[ -f "${target_file}" ]]; then
    warn "${target_file} already exists. Appending English Coach rule..."
    echo -e "\n\n" >> "${target_file}"
    cat "${SOURCE_RULE}" >> "${target_file}"
  else
    cp "${SOURCE_RULE}" "${target_file}"
  fi
  success "Installed Antigravity always-on rule!"
  echo -e "   Antigravity CLI will now coach English continuously in this workspace."
}

install_plugin_global() {
  local target_dir="${HOME}/.gemini/config/plugins/english-coach"
  info "Installing Antigravity plugin bundle globally to: ${target_dir}"
  mkdir -p "${target_dir}/skills/english-coach" "${target_dir}/rules"
  cat > "${target_dir}/plugin.json" << 'EOF'
{
  "name": "english-coach",
  "description": "Dual-purpose conversational English coach for Antigravity CLI. Answers your questions first, provides categorized corrections, and introduces practical English tips.",
  "version": "2.1.0",
  "author": "tianmind-studio"
}
EOF
  cp "${SOURCE_SKILL}" "${target_dir}/skills/english-coach/SKILL.md"
  cp "${SOURCE_RULE}" "${target_dir}/rules/AGENTS.md"
  success "Installed global Antigravity plugin!"
}

install_plugin_local() {
  local base_dir="${1:-$(pwd)}"
  local target_dir="${base_dir}/.agents/plugins/english-coach"
  info "Installing Antigravity plugin bundle to workspace: ${target_dir}"
  mkdir -p "${target_dir}/skills/english-coach" "${target_dir}/rules"
  cat > "${target_dir}/plugin.json" << 'EOF'
{
  "name": "english-coach",
  "description": "Dual-purpose conversational English coach for Antigravity CLI. Answers your questions first, provides categorized corrections, and introduces practical English tips.",
  "version": "2.1.0",
  "author": "tianmind-studio"
}
EOF
  cp "${SOURCE_SKILL}" "${target_dir}/skills/english-coach/SKILL.md"
  cp "${SOURCE_RULE}" "${target_dir}/rules/AGENTS.md"
  success "Installed workspace Antigravity plugin!"
}

install_claude() {
  info "Installing English Coach for Claude Code..."
  if command -v npx >/dev/null 2>&1; then
    npx skills add tianmind-studio/english-coach -a claude-code -g -y || {
      error "npx command failed. You can manually copy english-coach/SKILL.md into your Claude skill directory."
      return 1
    }
    success "Installed for Claude Code!"
  else
    error "'npx' not found. Please install Node.js/npm or install manually."
    return 1
  fi
}

interactive_menu() {
  echo -e "${BOLD}${CYAN}=== English Coach Setup ===${RESET}"
  echo -e "Choose how you would like to install English Coach:\n"
  echo "1) Antigravity CLI: Global Skill (on-demand in all projects)"
  echo "2) Antigravity CLI: Workspace Skill (on-demand in current project)"
  echo "3) Antigravity CLI: Always-On Rule (coaches on every turn in current project)"
  echo "4) Antigravity CLI: Full Plugin Bundle (workspace .agents/plugins)"
  echo "5) Claude Code: Official skill via npx"
  echo "6) Exit"
  echo ""
  read -r -p "Select option [1-6]: " choice

  case "${choice}" in
    1) install_global_skill ;;
    2) install_local_skill "$(pwd)" ;;
    3) install_rule "$(pwd)" ;;
    4) install_plugin_local "$(pwd)" ;;
    5) install_claude ;;
    6) echo "Exiting."; exit 0 ;;
    *) error "Invalid choice"; exit 1 ;;
  esac
}

# Parse CLI arguments
if [[ $# -eq 0 ]]; then
  interactive_menu
  exit 0
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    -g|--global)
      install_global_skill
      shift
      ;;
    -l|--local)
      local_dir="${2:-$(pwd)}"
      install_local_skill "${local_dir}"
      if [[ $# -ge 2 && "$2" != -* ]]; then shift 2; else shift; fi
      ;;
    --rule)
      rule_dir="${2:-$(pwd)}"
      install_rule "${rule_dir}"
      if [[ $# -ge 2 && "$2" != -* ]]; then shift 2; else shift; fi
      ;;
    --plugin-global)
      install_plugin_global
      shift
      ;;
    --plugin-local)
      plugin_dir="${2:-$(pwd)}"
      install_plugin_local "${plugin_dir}"
      if [[ $# -ge 2 && "$2" != -* ]]; then shift 2; else shift; fi
      ;;
    --claude)
      install_claude
      shift
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      error "Unknown parameter: $1"
      show_help
      exit 1
      ;;
  esac
done
