# Git Undo Commit - Practical Scenarios & Solutions

## Scenario: How to Undo a Git Commit?

---

## Case 1: Commit is Local (Not Pushed)

Use `git reset` to remove the commit from branch history.

### Commands & Their Behavior
```bash
# Undo last commit — keeps changes STAGED (ready to re-commit)
git reset --soft HEAD~1

# Undo last commit — keeps changes UNSTAGED in working directory (default behavior)
git reset --mixed HEAD~1

# Undo last commit — DISCARDS all changes permanently
git reset --hard HEAD~1
```

> ⚠️ **Warning:** `--hard` deletes all changes permanently. Recovery is possible via `git reflog` but only within a limited time frame.

### Undo Multiple Commits
```bash
# Replace N with number of commits to undo (e.g., 3)
git reset --soft HEAD~3
git reset --mixed HEAD~3
git reset --hard HEAD~3
```

### Quick Reference Table

| Command   | Commit Removed | Changes Staged | Changes in Working Dir |
| --------- | -------------- | -------------- | ---------------------- |
| `--soft`  | ✅              | ✅              | ✅                      |
| `--mixed` | ✅              | ❌              | ✅                      |
| `--hard`  | ✅              | ❌              | ❌                      |

---

## Case 2: Commit is Already Pushed to Remote

Use `git revert` — it creates a **new commit** that undoes the changes without rewriting history. Safe for shared/public branches.

### Step-by-Step
```bash
# Step 1: Find the commit hash you want to undo
git log --oneline

# Step 2: Revert the target commit using its hash
git revert <commit-hash>

# Example:
git revert a1b2c3d
```
```bash
# Step 3: A text editor opens — edit the revert commit message if needed
# Save and close the editor to finalize

# Step 4: Push the new revert commit to remote
git push origin <branch-name>
```

---

## Key Difference: `reset` vs `revert`

|                          | `git reset`     | `git revert`     |
| ------------------------ | --------------- | ---------------- |
| Rewrites history         | ✅ Yes           | ❌ No             |
| Safe for shared branches | ❌ No            | ✅ Yes            |
| Creates new commit       | ❌ No            | ✅ Yes            |
| Use when                 | Commit is local | Commit is pushed |

---

> 💡 **Pro Tip:** If you accidentally did `git reset --hard` and lost commits, run `git reflog` to find the lost commit hash and recover it with `git checkout <hash>` or `git reset --hard <hash>`.