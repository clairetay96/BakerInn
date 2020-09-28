## Project Post Mortem
Post mortems are important to understand about what happened in a project and actively think about what you learned.

Post-mortems are meant to be a blame-less space open to objective conversation about what went well and what could be improved.

Even in the examples below, where tens of millions of dollars could be lost, the best approach is to think through the series of events that led to the outcome.

Large mistakes are almost never the fault of the developer, but of the sytems and processes in place to prevent errors and problems.

[https://github.com/danluu/post-mortems](https://github.com/danluu/post-mortems)
https://blog.codinghorror.com/the-project-postmortem/



### What to Bring
Please gather as a group to answer the following questions. Take at least 30 minutes to prepare. Be honest with each other but without blaming anyone. (see the above links to see how you might approach this exercise )

#### Approach and Process

1. What in our process and approach to this project would we do differently next time?

Avoid using index.jsx for all the components - it's confusing. 
Broaden the job scope - there were very clear splits between people working on front end/back end. Worked great for the project but not great for our learning.

2. What in our process and approach to this project went well that we would repeat next time?

We really pushed ourselves to learn new technologies, so it was a great learning experience.

--

#### Code and Code Design

1. What in our code and program design in the project would we do differently next time?

State management - State management in parent component, 1 overall fetch at the start and distribute the information 
Repeated code for authentication - kept getting the userId from document.cookie, there's probably a better way.
For chats, a lot of functions cluttered the jsx file - should have done a utility function file and to pull from there
Unused resources - can minimise waste of resources.

2. What in our code and program design in the project went well? Is there anything we would do the same next time?

File structure is relatively easy to navigate.
