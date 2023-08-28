# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug : 
 - Sign up to the app
 - Create at least 2 others users on people page ( not with signup ) 
 - Edit these profiles and add aditional information 
 - Create a project
 - Input some information about the project
 - Input some activities to track your work in the good project
  
Then, see what happens in the app and fix the bug you found doing that.

## Then
Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions : 
- What bugs did you find ? How did you solve these and why ? 
- Which feature did you develop and why ? 
- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ? 


## Fixed Bugs:


- I removed the user password from the API response using select('-password').
- I fixed the issue of the opened list when clicking on the header.
- I added an onChange event to the email field to update the email account.
- I corrected the get one project function by replacing find with findOne.
- I removed the disabled attribute from the name field to enable editing.
- I replaced onChange with onClick in user/view.js to detect edit actions.
- I replaced "e.project" with "e.projectName" to correctly display the project name instead of "NaN".
- I changed username to name in user/list.js to correctly update the user's name field.
- After creating a new project, I added a call to the "fetchProject" function to refresh the project list.


## New Features:


- I added a delete button to the project list for the removal feature.
- I implemented a filter on the project list page based on the project's status (active/inactive) to display active, inactive, or all the projects.
- I introduced a new modal in the project detail section to display a new tool for calculating net incomes based on entered incomes and expenses. It also provides a growth rate field for monitoring them.
- I incorporated statistics graphs in the dashboard to display:
     1 - Projects with a risked financial status (initial budget < consumed budget) and project with normal financial status.
     2 - Statistics about active and inactive projects.
     3 - Statistics about active and inactive users.

## Notes:

  - In the activity model, it's advisable to change the data types of userId and projectId to Schema.Types.ObjectId instead of using strings. This change simplifies the references to users and projects associated with an activity and reduces unnecessary API calls.

  - It's generally not considered a best practice to make API calls directly in a component, a better approach is to use a state management library like Redux to handle data fetching and state management.


