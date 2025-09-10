+++
date = '2025-09-11T06:27:09+07:00'
title = 'TryHackMe - Intro To IaC Room Walkthrough'
tags = ['TryHackMe', 'CTFs']
description = "An introduction to infrastructure as code." 
draft = false

[cover]
  image = '/images/posts/tryhackme-intro-to-iac.png'
  alt = 'TryHackMe Intro To IaC Room'
  caption = 'TryHackMe Intro To IaC Room'
  relative = false
+++

This is my TryHackMe walkthrough, created to document my learning journey and share solutions with the community. The writeups include a mix of hints, step-by-step explanations, and final answers to help players who get stuck, while still encouraging independent problem-solving.

> Intro To IaC Room - An introduction to infrastructure as code.

## Overview
- **Room URL:** [https://tryhackme.com/room/introtoiac](https://tryhackme.com/room/introtoiac)
- **Difficulty:** Easy
- **Time to complete:** 90

## Walkthrough
### 1. Introduction
*No hints needed!*

### 2. IaC - The Concept
- Your organisation is preparing to launch a new service called <b>FlyNet</b>. The DevSecOps team provisioned an infrastructure and tested this service in the dev environment. Which IaC characteristic will streamline the provisioning of this same infrastructure in staging and production?

**=> Answer: `Repeatable`**

- <p>It's the day before launch, and the latest infra change has started producing strange errors, something about "destroying humanity". Weird! Which IaC characteristic allows us to go back to the last known working version? </p>

**=> Answer: `Versionable`**

- <p>It's launch day, and it couldn't have gone better; the service is almost running itself! The <b>FlyNet</b> launch has attracted a lot of new customers! Which IaC characteristic enables us to increase the resources available to our infrastructure to meet this increased demand with ease? </p>

**=> Answer: `Scalable`**

### 3. IaC - The Tools Part 1
- In the scenario given, which type of IaC tool considers where you are on the map and gives instructions to reach the desired X point?

**=> Answer: `Declarative`**

### 4. IaC - The Tools Part 2
- Can you retrieve the location and retrieve the flag?

**=> Answer: `thm{l4b_C0mpl3x_co0rds}`**

### 5. Infrastructure as Code Lifecycle
- A DevSecOps Engineer at CyberMyne is looking for guidance on developing their next infrastructure. What type of phases provide guidance during the development or configuration of an infrastructure?

**=> Answer: `Repeatable`**

- <p>What type of phases ensure best practices throughout infrastructure development and management?</p>

**=> Answer: `Continual`**

- <p>The 'Monitoring/Maintenance' continual phase can trigger which other continual phase?</p>

**=> Answer: `Rollback`**

### 6. Virtualisation &amp; IaC
- CyberMine is deploying the latest machine model E-1000. This model requires virtualisation at an operating system level to allow for lightweight and rapid deployment behind the scenes! What level of virtualisation would be needed for this?<br />

**=> Answer: `Containerisation`**

- <p>CyberMine's E-100 Model is still very popular for all your extermination needs, this model requires multiple OS to run on a single machine. Which level of virtualisation would be needed for this?<br /></p>

**=> Answer: `Hypervisor`**

- <p>The new E-1000 model has a feature that allows it to pass through physical objects. Wild! This new feature, however, is very resource-intensive. Which 'Use of IaC' will ensure that this resource consumption won't affect the performance of the machine's other components?</p>

**=> Answer: `Resource Isolation`**

- <p>Due to the resource consumption of this new feature, it requires rapid scaling of resources. Which container orchestration software can be used to automate this process?</p>

**=> Answer: `Kubernetes`**

### 7. On-Prem IaC vs. Cloud-Based IaC
- Cloud-based resources are provisioned/configured in a cloud environment. Who handles the underlying infrastructure?

**=> Answer: `Cloud Service Provider`**

- <p>What category does on-prem infrastructure struggle with due to hardware limitations when facing increased traffic?<br /></p>

**=> Answer: `Scalability`**

### 8. IaC - The Final Push
- Can you get the flag using your infrastructure as code skills?

**=> Answer: `thm{1Nfr4StrUctUr3_Pr0}`**

