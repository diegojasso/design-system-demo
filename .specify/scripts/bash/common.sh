#!/usr/bin/env bash
# Common functions and variables for all scripts

# Get repository root, with fallback for non-git repositories
get_repo_root() {
    if git rev-parse --show-toplevel >/dev/null 2>&1; then
        git rev-parse --show-toplevel
    else
        # Fall back to script location for non-git repos
        local script_dir="$(CDPATH="" cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
        (cd "$script_dir/../../.." && pwd)
    fi
}

# Get current branch, with fallback for non-git repositories
get_current_branch() {
    # First check if SPECIFY_FEATURE environment variable is set
    if [[ -n "${SPECIFY_FEATURE:-}" ]]; then
        echo "$SPECIFY_FEATURE"
        return
    fi

    # Then check git if available
    if git rev-parse --abbrev-ref HEAD >/dev/null 2>&1; then
        git rev-parse --abbrev-ref HEAD
        return
    fi

    # For non-git repos, try to find the latest feature directory
    local repo_root=$(get_repo_root)
    local specs_dir="$repo_root/specs"

    if [[ -d "$specs_dir" ]]; then
        local latest_feature=""
        local highest=0

        for dir in "$specs_dir"/*; do
            if [[ -d "$dir" ]]; then
                local dirname=$(basename "$dir")
                if [[ "$dirname" =~ ^([0-9]{3})- ]]; then
                    local number=${BASH_REMATCH[1]}
                    number=$((10#$number))
                    if [[ "$number" -gt "$highest" ]]; then
                        highest=$number
                        latest_feature=$dirname
                    fi
                fi
            fi
        done

        if [[ -n "$latest_feature" ]]; then
            echo "$latest_feature"
            return
        fi
    fi

    echo "main"  # Final fallback
}

# Get specs root directory.
# - If SPECIFY_APP is set, prefer specs/<app>
# - Otherwise fall back to specs/
get_specs_root() {
    local repo_root="$1"
    local specs_root="$repo_root/specs"

    if [[ -n "${SPECIFY_APP:-}" ]]; then
        local candidate="$specs_root/${SPECIFY_APP}"
        if [[ -d "$candidate" ]]; then
            echo "$candidate"
            return
        fi
    fi

    echo "$specs_root"
}

# Check if we have git available
has_git() {
    git rev-parse --show-toplevel >/dev/null 2>&1
}

check_feature_branch() {
    local branch="$1"
    local has_git_repo="$2"

    # For non-git repos, we can't enforce branch naming but still provide output
    if [[ "$has_git_repo" != "true" ]]; then
        echo "[specify] Warning: Git repository not detected; skipped branch validation" >&2
        return 0
    fi

    # Accept either:
    # - legacy numeric feature branches: 001-feature-name
    # - Jira-key feature branches: NDAI-27696-feature-name (or generally ABC-123-*)
    if [[ ! "$branch" =~ ^[0-9]{3}- && ! "$branch" =~ ^[A-Z][A-Z0-9]+-[0-9]+- ]]; then
        echo "ERROR: Not on a feature branch. Current branch: $branch" >&2
        echo "Feature branches should be named like: 001-feature-name or NDAI-27696-feature-name" >&2
        return 1
    fi

    return 0
}

get_feature_dir() { echo "$1/specs/$2"; }

# Find a feature directory for the current branch.
# Supports both layouts:
# - specs/<feature>/
# - specs/<app>/<feature>/
# Also supports legacy numeric-prefix matching for 3-digit feature numbers.
find_feature_dir() {
    local repo_root="$1"
    local branch_name="$2"
    local specs_root
    specs_root=$(get_specs_root "$repo_root")

    # 1) Exact match at specs root
    if [[ -d "$specs_root/$branch_name" ]]; then
        echo "$specs_root/$branch_name"
        return
    fi

    # 2) Exact match one level deeper: specs/<app>/<feature>
    local deep_matches=()
    if [[ -d "$specs_root" ]]; then
        for dir in "$specs_root"/*/"$branch_name"; do
            [[ -d "$dir" ]] || continue
            deep_matches+=("$dir")
        done
    fi

    if [[ ${#deep_matches[@]} -eq 1 ]]; then
        echo "${deep_matches[0]}"
        return
    elif [[ ${#deep_matches[@]} -gt 1 ]]; then
        echo "ERROR: Multiple spec directories found for '$branch_name':" >&2
        printf '  - %s\n' "${deep_matches[@]}" >&2
        echo "Set SPECIFY_APP to disambiguate (e.g., export SPECIFY_APP=agent-portal)." >&2
        echo "${deep_matches[0]}"
        return
    fi

    # 3) Legacy numeric-prefix lookup (supports multiple branches per numeric feature)
    if [[ "$branch_name" =~ ^([0-9]{3})- ]]; then
        local prefix="${BASH_REMATCH[1]}"
        local prefix_matches=()

        # Search at specs root: specs/<prefix>-*
        for dir in "$specs_root"/"$prefix"-*; do
            [[ -d "$dir" ]] || continue
            prefix_matches+=("$dir")
        done

        # Search one level deeper: specs/<app>/<prefix>-*
        for dir in "$specs_root"/*/"$prefix"-*; do
            [[ -d "$dir" ]] || continue
            prefix_matches+=("$dir")
        done

        if [[ ${#prefix_matches[@]} -eq 1 ]]; then
            echo "${prefix_matches[0]}"
            return
        elif [[ ${#prefix_matches[@]} -gt 1 ]]; then
            echo "ERROR: Multiple spec directories found with prefix '$prefix':" >&2
            printf '  - %s\n' "${prefix_matches[@]}" >&2
            echo "Please ensure only one spec directory exists per numeric prefix, or set SPECIFY_APP." >&2
            echo "${prefix_matches[0]}"
            return
        fi
    fi

    # 4) Fall back to the expected path (will fail later with clear error messages)
    echo "$specs_root/$branch_name"
}

get_feature_paths() {
    local repo_root=$(get_repo_root)
    local current_branch=$(get_current_branch)
    local has_git_repo="false"

    if has_git; then
        has_git_repo="true"
    fi

    # Locate feature directory (supports specs/<app>/<feature>/)
    local feature_dir=$(find_feature_dir "$repo_root" "$current_branch")

    cat <<EOF
REPO_ROOT='$repo_root'
CURRENT_BRANCH='$current_branch'
HAS_GIT='$has_git_repo'
FEATURE_DIR='$feature_dir'
FEATURE_SPEC='$feature_dir/spec.md'
IMPL_PLAN='$feature_dir/plan.md'
TASKS='$feature_dir/tasks.md'
RESEARCH='$feature_dir/research.md'
DATA_MODEL='$feature_dir/data-model.md'
QUICKSTART='$feature_dir/quickstart.md'
CONTRACTS_DIR='$feature_dir/contracts'
EOF
}

check_file() { [[ -f "$1" ]] && echo "  ✓ $2" || echo "  ✗ $2"; }
check_dir() { [[ -d "$1" && -n $(ls -A "$1" 2>/dev/null) ]] && echo "  ✓ $2" || echo "  ✗ $2"; }

