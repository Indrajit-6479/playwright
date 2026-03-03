# Git: Get Code Back to State Before `git pull`

## Scenario: How to Undo a `git pull` ?

---

## Method 1: Simplest Shortcut — `ORIG_HEAD`

Git automatically saves your previous `HEAD` state in a special reference called `ORIG_HEAD` before performing "dangerous" operations like `pull` or `merge`.
```bash
# Step 1 (Optional but Recommended): Stash any uncommitted changes first
git stash

# Step 2: Reset back to state before pull
git reset --hard ORIG_HEAD

# Step 3 (Optional): Restore your stashed changes
git stash pop
```

> ⚠️ **Warning:** `--hard` will permanently delete any uncommitted local changes. Always run `git stash` first if you have unsaved work.

---

## Method 2: Using Reflog (When `ORIG_HEAD` is No Longer Accurate)

If you have done other operations after the pull and `ORIG_HEAD` is outdated, use `git reflog` to find the exact state before the pull.
```bash
# Step 1: View your recent Git history
git reflog
```

Output will look like:
```
abc1234 HEAD@{0}  pull origin main: Fast-forward
def5678 HEAD@{1}  commit: your last commit before pull   <-- this is what you want
gh19012 HEAD@{2}  commit: some older commit
```
```bash
# Step 2: Reset to the state just before the pull
git reset --hard HEAD@{1}

# OR use the specific commit hash
git reset --hard def5678
```

> 💡 **Tip:** Look for the entry **just before** the `pull` action in the reflog list. That is your target.

---

## Method 3: Time-Based Reset

If you know approximately when you performed the pull, you can reset using a time reference.
```bash
# Reset to state 10 minutes ago
git reset --hard master@{"10 minutes ago"}

# Other time-based examples
git reset --hard main@{"1 hour ago"}
git reset --hard main@{"2026-01-15 10:00:00"}
```

> ⚠️ **Warning:** Be precise with your time. If unsure, prefer Method 2 (reflog) for accuracy.

---

## Method 4: Safe Reset Using `--keep`

If you are unsure whether you have uncommitted changes, use `--keep` instead of `--hard`. It acts like `--hard` but **fails safely** if uncommitted changes would be overwritten.
```bash
git reset --keep ORIG_HEAD
# OR
git reset --keep HEAD@{1}
```

> ✅ **Safer alternative to `--hard`** — it protects you from accidentally losing uncommitted work.

---

## Method 5: `git revert` (When Changes Are Already Pushed)

If you have already pushed the pulled changes to a shared/remote repository, **never use `git reset`** as it rewrites history. Use `git revert` instead to create a new commit that reverses the changes.
```bash
# Step 1: Find the merge commit hash introduced by the pull
git log --oneline

# Step 2: Revert the merge commit
git revert -m 1 <merge-commit-hash>

# Step 3: Push the revert commit to remote
git push origin <branch-name>
```

---

## Quick Comparison Table

| Method                   | Rewrites History | Safe for Shared Branch | Keeps Uncommitted Changes |
| ------------------------ | ---------------- | ---------------------- | ------------------------- |
| `reset --hard ORIG_HEAD` | ✅ Yes            | ❌ No                   | ❌ No                      |
| `reset --hard HEAD@{N}`  | ✅ Yes            | ❌ No                   | ❌ No                      |
| `reset --keep ORIG_HEAD` | ✅ Yes            | ❌ No                   | ✅ Yes (or fails safely)   |
| Time-based reset         | ✅ Yes            | ❌ No                   | ❌ No                      |
| `git revert`             | ❌ No             | ✅ Yes                  | ✅ Yes                     |

---

## Recommended Workflow (Safe Approach)
```bash
# 1. Stash uncommitted work (if any)
git stash

# 2. Undo the pull using ORIG_HEAD
git reset --hard ORIG_HEAD

# 3. Restore stashed work
git stash pop

# 4. Verify you are back to the correct state
git log --oneline
```

---

> 💡 **Pro Tip:** Always run `git log --oneline` or `git reflog` after resetting to confirm you are at the correct commit before continuing your work.