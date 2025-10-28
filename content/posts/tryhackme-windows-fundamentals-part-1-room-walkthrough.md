+++
date = '2025-09-10T16:33:46+07:00'
draft = false
tags = ['TryHackMe']
description = "In part 1 of the Windows Fundamentals module, we'll start our journey learning about the Windows desktop, the NTFS file system, UAC, the Control Panel, and more."
title = 'TryHackMe - Windows Fundamentals Part 1 Room Walkthrough'

[cover]
  image = '/images/posts/tryhackme-windows-fundamentals-part-1.png'
  alt = 'TryHackMe Windows Fundamentals Part 1 Room'
  caption = 'TryHackMe Windows Fundamentals Part 1 Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Windows Fundamentals Part 1 Room - In part 1 of the Windows Fundamentals module, we'll start our journey learning about the Windows desktop, the NTFS file system, UAC, the Control Panel, and more.

## Overview

-   **Room URL:** [https://tryhackme.com/room/windowsfundamentals1xbx](https://tryhackme.com/room/windowsfundamentals1xbx)
-   **Difficulty:** Info
-   **Time to complete:** 30

## Walkthrough

### 1. Introduction to Windows

_No hints needed!_

### 2. Windows Editions

-   What encryption can you enable on Pro that you can't enable in Home?

```
- Search online and you can find the answer.
```

**=> Answer: `BitLocker`**

### 3. The Desktop (GUI)

-   Which selection will hide/disable the Search box?

**=> Answer: `Hidden`**

-   <p>Which selection will hide/disable the Task View button?</p>

**=> Answer: `Show Task View button`**

-   <p>Besides Clock and Network, what other icon is visible in the Notification Area?</p>

**=> Answer: `Action Center`**

### 4. The File System

-   What is the meaning of NTFS?

**=> Answer: `New Technology File System`**

### 5. The Windows\System32 Folders

-   What is the system variable for the Windows folder?

**=> Answer: `%windir%`**

### 6. User Accounts, Profiles, and Permissions

-   <p>What is the name of the other user account?<br /></p>

```
- Right-click on the Start Menu and click Run. Type lusrmgr.msc. See below
```

![Guide image](/images/posts/windows-fundamentals-1-1.png)

**=> Answer: `tryhackmebilly`**

-   <p>What groups is this user a member of?</p>

```
- Choose user "tryhackmebilly" -> More Actions -> Properties -> Member of
```

![Guide image](/images/posts/windows-fundamentals-1-2.png)

**=> Answer: `Remote Desktop Users,Users`**

-   What built-in account is for guest access to the computer?

```
- You can see:
- Name "Guest"
- Description "Built-in account for guest access to the computer/domain..."
```

![Guide image](/images/posts/windows-fundamentals-1-3.png)

**=> Answer: `Guest`**

-   <p>What is the account description?</p>

```
- You can see the description of "tryhackmebilly" user.
```

![Guide image](/images/posts/windows-fundamentals-1-4.png)

**=> Answer: `window$Fun1!`**

### 7. User Account Control

-   What does UAC mean?

**=> Answer: `User Account Control`**

### 8. Settings and the Control Panel

-   In the Control Panel, change the view to <b>Small icons</b>. What is the last setting in the Control Panel view?

![Guide image](/images/posts/windows-fundamentals-1-5.png)

**=> Answer: `Windows Defender Firewall`**

### 9. Task Manager

-   What is the keyboard shortcut to open Task Manager?

**=> Answer: `Ctrl+Shift+Esc`**

### 10. Conclusion

_No hints needed!_
