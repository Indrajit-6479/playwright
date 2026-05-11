## Git Interview Questions & Answers — SDET (5-6 Years Experience)
#### Q1. Your code is in Branch A, it got merged into main, but now you need to rollback. How do you do it?
- This actually happened in one of my projects. We merged a feature branch into main and later found it was breaking the regression suite in CI/CD. So we had to rollback immediately.
- Step 1 — Find the merge commit hash:
```
git log --oneline
```
- Output looks like:
```
a1b2c3d  Merge branch 'A' into main   <-- this is what we want to revert
f4e5d6c  last commit before merge
```
- Step 2 — Revert the merge commit:
```
git revert -m 1 a1b2c3d
```
`-m 1 means "keep the main branch side, undo the feature branch side"`
- Step 3 — Push it to remote:
```
git push origin main
```
#### Q. Why `revert` not `reset` ?
- Because main is a shared branch. If I use `git reset`, it rewrites history and will break everyone else's local copy. 
- `git revert` creates a new commit that safely undoes the changes without touching history.

#### Q. What if you want to re-merge Branch A later after fixing the issue?
- You need to revert the revert first, otherwise Git thinks those changes are already applied.
```
git revert <revert-commit-hash>
git push origin main
```
#### Q2. What is the difference between `git merge` and `git rebase`?
- I have used both `git merge` and `git rebase` in projects.
- The choice depends on team workflow and the purpose.
1. `git merge`:
- `git merge` combines two branches and creates a new merge commit.
- It preserves the complete branch history.
```
git checkout main
git merge feature-branch
```
- History :
```
A --- B --- C ------- M  (main)
              \      /
               D --- E   (feature-branch)
```
`Here M is the merge commit.`

#### Real Project Usage:
- In my project, before raising a PR to `main`, I usually:
```
git checkout feature/ir99880

# commit my local changes
git add .
git commit -m "changes done"

# get latest code from main
git pull origin main
```
- If conflicts happen:
- I resolve them locally,
- test the application,
- then push the updated feature branch.
```
git push origin feature/ir99880
```
`Then I raise the PR against main branch`

2. `git rebase`:
- Picks your commits and replays them on top of the target branch. 
- No merge commit. 
- History looks linear and clean.
```
git checkout feature-branch
git rebase main
```
- History:
```
A --- B --- C --- D' --- E'
```

#### Golden Rule:
- I never rebase a shared branch that multiple developers are using because rebasing rewrites commit history and can create problems for others.

#### When I Use What:
| Situation                                | Preferred Approach                                   |
| ---------------------------------------- | ---------------------------------------------------- |
| Raising PR to main/release               | `git merge` workflow                                 |
| Updating feature branch with latest main | Usually merge (`git pull origin main`) in my project |
| Cleaning personal commits before PR      | `git rebase`                                         |
| Shared/team branches                     | Avoid rebase                                         |
| Local branch cleanup/squashing commits   | `git rebase -i`                                      |

#### What is a merge conflict and how do you resolve it?
- When two branches modify the same lines,
- or Git cannot automatically decide which change to keep.
- Git marks conflicts like:
```
<<<<<<HEAD
my code
=======
incoming code
>>>>>> main
```
- I manually resolve the conflict, test the code, and then continue:
```
git add <resolved-file>

# if merge
git merge --continue

# if rebase
git rebase --continue
```
- In my project i am using Intellij editor itself to resolve conflicts, it's opening three windows, left for current code, middle for changes and right for remote code like this.

#### Q3. What is the difference between `git revert`, `git reset`, and `git rebase` for rollback? 
- This is something I have used in different situations in real projects. Each has its own purpose.
  1. `git revert` — Safest for shared/pushed branches
  - It creates a new commit that undoes a previous commit. 
  - Does not rewrite history.
   ```
   git revert <commit-hash>
   git push origin main
   ```
   `Safe for main, develop, or any shared branch.`

  2. `git reset` — For local/unpushed commits only 
  - It Moves the branch pointer back.
  -  Rewrites history.
   ```
    git reset --soft HEAD~1   # undo commit, keep changes staged
    git reset --mixed HEAD~1  # undo commit, keep changes unstaged
    git reset --hard HEAD~1   # undo commit, delete changes permanently
   ```
   `Use only on your local branch before pushing.❌ Never on shared branches.`

  3. `git rebase` — For cleaning up commit history 
   - It Replays commits on top of another branch. 
   - Can be used to drop or edit specific commits interactively.
   ```
    git rebase -i HEAD~3
   ```
   `Use for cleaning local history before raising a PR.`
   - In the interactive editor you can:
    * pick — keep the commit
    * squash — combine with previous
    * drop — delete the commit completely

#### Q4. What is git cherry-pick and when have you used it?
- `git cherry-pick` lets you pick a specific commit from one branch and apply it to another — without merging the entire branch.
- We had one situation in project where:
- we had :
   i) `develop` branch → contains MANY new changes
   ii) `release` branch → stable production branch
- Inside develop, there was:
   - one important bug fix 
   - plus lots of unfinished features
- You urgently needed ONLY the bug fix in `release`.
- You did NOT want this:
  `git merge develop`
- Because that would bring:
  - unfinished features
  - risky code
  - unrelated changes
- So instead, you copied ONLY one commit. That is what cherry-pick does.
```
# Step 1: Find the commit hash of the fix
git log --oneline develop

# Step 2: Switch to release branch
git checkout release

# Step 3: Cherry-pick that specific commit
git cherry-pick <commit-hash>

# Step 4: Push
git push origin release
```
#### Q. What if cherry-pick causes a conflict?
```
# Fix the conflict in the file, then:
git add <resolved-file>
git cherry-pick --continue

# To abort if things go wrong:
git cherry-pick --abort
```
#### Q5. What is the difference between git clone and git fork?
1. `git clone`:
- It downloads a full copy of a repository to your local machine. 
- You are directly connected to the original remote.
```
git clone repo_url
```
- You can pull/push update to the original repo (if you have access).
- It is used when you are a team member with direct access.

2. `git fork`:
- It creates a copy of the repository under your own GitHub/GitLab account. 
- It is a server-side copy, not local.
- You then clone your fork locally.
- Changes go to your fork first, then you raise a Pull Request to the original repo.
- Used in open source contribution or when you do not have direct write access.
```
# Step 1: Fork on GitHub UI

# Step 2: Clone your fork locally
git clone https://github.com/YOUR-USERNAME/repo.git

# Step 3: Add original repo as upstream
git remote add upstream https://github.com/org/repo.git

# Step 4: Keep your fork updated
git fetch upstream
git merge upstream/main
```
| Aspect                | Git Clone     | Git Fork                       |
| --------------------- | ------------- | ------------------------------ |
| Where it happens      | Local machine | GitHub/GitLab server           |
| Connected to original | ✅ Directly    | ✅ Via upstream remote          |
| Push access needed    | ✅ Yes         | ❌ No (push to your fork)       |
| Used for              | Team projects | Open source / no direct access |

#### Q. What is “upstream” in Git?
- In a fork workflow, upstream refers to the original repository that you forked from.
- Example:
  - Original repo: github.com/company/project
  - You fork it → github.com/yourname/project
  - You clone your fork locally
  ```
  origin    -> your fork
  upstream  -> original repository
  ```
  ```
  git remote -v
  git remote add upstream https://github.com/company/project.git
  git fetch upstream
  git merge upstream/main
  ```


   
