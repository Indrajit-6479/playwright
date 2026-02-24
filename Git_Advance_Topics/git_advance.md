##### I checked out the developer branch and pulled the latest changes from the release branch. I also pulled the latest changes from the main branch.
##### When I raise a PR from developer to release, it shows “able to merge” with no conflicts and zero files changed. However, when I raise a PR from release to main, it shows conflicts.
##### I am unable to understand why this is happening because I already raised the PR from developer to release, and then from release to main.

It looks like you've run into a classic "Git synchronization" puzzle. Seeing 14 commits but 0 files changed is usually a sign that the work in those commits is already present in your target branch, even if the commit history looks different.

Here is the breakdown of why this is happening and how to fix the conflicts you're seeing.

1. Why develop -> release shows "0 files changed"
When GitHub shows 14 commits but 0 files changed, it means that the specific changes (the lines of code) contained in those 14 commits are already part of the release branch.

This usually happens if:

You previously merged these changes into release.

Someone else merged the same changes into release.

The release branch is already "ahead" of or identical to develop in terms of code content.

Essentially, Git is saying: "I see these 14 commit messages are new to the timeline, but when I look at the actual code, there is nothing new to add to the release branch."

2. Why release -> main has conflicts
Even though you pulled main into develop, that did not update the release branch.

In Git, branches are independent. Pulling main into develop only resolves conflicts for develop. If the release branch has its own unique changes (like hotfixes or version updates) that aren't in main, or if main has moved forward in a way that clashes with release, you will get conflicts.

3. How to fix the release -> main conflicts
To resolve this, you need to sync the release branch with main directly. Follow these steps in your terminal:

Switch to your release branch:
```git checkout release/release```

Pull the latest changes from main into release:
```git pull origin main```
(This is where the conflicts will appear on your local machine).

Resolve the conflicts manually:
Open the files with conflicts, choose the correct code, and save them.

4. Commit and Push:
```
git add .
git commit -m "Merge main into release and resolve conflicts"
git push origin release/release
```   
Once you do this, your PR from release to main should update automatically and show "Able to merge."

#### I unable to push on release directly because of my organization policy
That makes total sense—most organizations protect branches like release and main to prevent accidental overwrites. Since you can't push to release directly, you have to use a "Conflict Resolution Branch" to bridge the gap.

Here is why your previous attempt didn't work: When you pulled main into develop, you only fixed the conflicts for your local develop branch. The release branch on the server still doesn't know about those fixes.

The "Policy-Friendly" Workflow
You need to create a temporary branch to resolve the conflict and then merge it into release via a Pull Request.

Step 1: Create a Resolution Branch
Instead of trying to push to release, create a new branch based on it.
```
# Get the latest from the server
git fetch origin

# Create a new branch starting from the current release
git checkout -b fix/resolve-main-conflicts origin/release
```
Step 2: Pull Main and Resolve
Now, bring the changes from main into this new temporary branch. This is where you will see the conflicts locally.
```
git pull origin main
```
Resolve the conflicts in your code editor (VS Code, IntelliJ, etc.).

Save the files.

Commit the fix:
```
git add .
git commit -m "chore: resolve conflicts between release and main"
```
Step 3: Push and Raise a PR to Release
Since you can't push to release, push this new branch and PR it into release.

```
git push origin fix/resolve-main-conflicts
```
1. Go to GitHub/Bitbucket.
2. Raise a PR: fix/resolve-main-conflicts $\rightarrow$ release.
3. Once this is approved and merged, your release branch will now contain the fixes from main.

Step 4: Check your Release $\rightarrow$ Main PR
Once Step 3 is merged, go back to your original PR (release $\rightarrow$ main). The conflicts should disappear automatically because the release branch now "knows" how to handle the code that was previously conflicting.

Summary of the "0 Files Changed" ConfusionThe reason your develop $\rightarrow$ release PR shows 0 files changed is that by pulling release into develop earlier, you made them identical. There is no "new" code to move, even if the commit history (the list of 14 commits) looks different.

#### Can u explain me in more details why even I pull release branch and main branch in the develop so why all code is not in develop. Explain me in detail 2. Why release -> main has conflicts

Even though you pulled main into develop, that did not update the release branch.
In Git, branches are independent. Pulling main into develop only resolves conflicts for develop. If the release branch has its own unique changes (like hotfixes or version updates) that aren't in main, or if main has moved forward in a way that clashes with release, you will get conflicts.

This is the "Git Paradox" that trips up almost everyone at some point. It feels like if you’ve mixed all the ingredients in one bowl (develop), then all the other bowls should be fixed too. But in Git, every bowl is isolated.

Let’s break this down into the "Why" and the "How."

1. Why is "all the code" not in develop?Actually, the code is likely in develop, but that's exactly why your PR to release shows 0 files changed.Think of a Git PR like a delivery truck. The PR only shows the difference between the source and the destination.
   - You pulled release into develop: Now develop has everything release has.
   - You pulled main into develop: Now develop has everything main has.
   - The PR (develop $\rightarrow$ release): Git looks at release and asks, "What does develop have that I don't?"
   - The Result: Since you just pulled release into develop, the answer is "Nothing new" (or at least nothing that hasn't already been accounted for).
   - The 14 commits you see are "empty" commits in the eyes of the PR—they exist in the history, but the actual code changes they contain are already present in the release branch.

2. Why does release $\rightarrow$ main still have conflicts?This is the most frustrating part. You fixed the conflicts in develop, so why are they back?

The answer: Git doesn't "share" conflict resolutions between branches.

When you pulled main into develop and fixed the conflicts, you saved those fixes inside the develop branch only. You did not touch the release branch.

Imagine three people: Main, Release, and Develop.

i) Main and Release are arguing about a line of code (a conflict).

ii) Develop talks to Main, hears the argument, and decides how to fix it. Develop now has the solution.

iii) Release still has the original problematic code. Release has never talked to Main directly.

iv) When you try to merge Release into Main, they start the same argument all over again because Release doesn't know about the solution Develop found.

In short: Pulling main into develop helps develop get to main. It does not help release get to main.

3. How to fix this given your Org Policy
Since you cannot push to release or main directly, you have to follow a "Sync PR" workflow. You need to bring the resolution from main into release through a middle-man branch.

The Step-by-Step "Fix" Strategy:
i) Create a Sync Branch: Create a new branch from release. Let's call it sync-release-to-main.

ii) Merge Main into Sync: Locally, run git pull origin main. You will see the conflicts here.

iii) Fix the Conflicts: Resolve them exactly how you did in develop.

iv) Push and PR: Push sync-release-to-main and raise a PR into release.

v) Merge: Once that PR is merged into release, your release branch is now "compatible" with main.

Now, when you look at your release $\rightarrow$ main PR, the conflicts will be gone!

#### So if I raise the PR develop to release and develop to main separately will it work ? Is it right strategy?

Technically, yes—it will "work" in the sense that your code will eventually land in both branches. However, in most professional environments, it is not considered a good strategy.

Here is the breakdown of why this approach might cause more headaches than it solves.

1. The Risk of "Bypassing" the Release Branch
The release branch usually acts as a stabilization zone. Its job is to hold the code that is being tested (QA/UAT) before it hits Production (main).
- If you PR develop $\rightarrow$ main: You are putting "raw" development code directly into production. If there are bugs in develop that haven't been vetted in the release branch, you risk breaking main.
- The "Drift" Problem: If you merge develop to main and develop to release separately, you aren't actually fixing the conflict between release and main. They will continue to be out of sync, and the next person who tries to do a proper release will face even worse conflicts.

2. Why develop $\rightarrow$ release shows "0 files changed"If you raise this PR and see 0 files changed, it means release already has everything that is in develop. This happened because you pulled release into develop earlier. You effectively told develop: "Make yourself look exactly like release." If you haven't added new code to develop since that pull, the branches are now identical. Raising a PR between two identical branches results in "Zero files changed."

3. Why develop $\rightarrow$ main will still have conflictsEven though develop is now identical to release, it still has the same conflict with main that release has.Think of it this way:

- Main says: "The background color should be Red."
- Release (and now Develop) says: "The background color should be Blue."
- When you PR either one to Main, Git sees Red vs. Blue and stops. It doesn't matter which branch you use; the conflict exists because the content is different.

The "Right" Strategy (The Sync PR)
Since your organization policy prevents pushing to release, you should resolve the "Red vs. Blue" argument in a way that keeps the chain intact.

| Step | Action                                                    | Why?                                                       |
| ---- | --------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | Create a branch `fix-release-sync` from `release`.        | To bypass the direct push policy.                          |
| 2    | Merge `main` into `fix-release-sync` & resolve conflicts. | You are teaching the "Release" code how to talk to "Main." |
| 3    | PR `fix-release-sync` → `release`.                        | Updates `release` with the conflict resolutions.           |
| 4    | Now PR `release` → `main`.                                | It will now be "Able to merge" with 0 conflicts.           |

Summary
Raising separate PRs is a short-term fix that makes your Git history messy and leaves the release branch "broken" (out of sync with main). The strategy above is the professional way to fix the synchronization without breaking your company's branch protection policies.