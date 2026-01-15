i want help in building a form for my website. i want to use the following libraries:

- react-hook-form
- zod
- tailwindcss
- shadcn/ui
- convex
- next.js
- typescript
- react

please review this guide: 

- https://ui.shadcn.com/docs/forms/react-hook-form

**STAGE 1**

inside the /Users/morgan/projects/selbekk-labs/components/contact/form.tsx component I want you to build me a form. It should have 

on first line: name input and email input side by side
on second line: it should have a 'Tell me about your project' box
on third line it should have How can I help you? and underneath buttons side by side saying 

- Application 
- Website
- Ecommerce

The end user must be able to click as many as they want. And when a button is clicked it changes color and is remembered in some form of state so i can eventually send this data to my database. 

on the fourth line it should have a dropdown saying Your Budget, with the options of 

- $2,000 - £5,000
- $5,000 - £10,000
- $10,000 - £20,000
- $20,000 +

on the fith line should be a button saying Send message 

- There should be accurate error handeling with the required fields using zod
- all components should be from shadcn:
https://ui.shadcn.com/docs/components/input-group
https://ui.shadcn.com/docs/components/input
https://ui.shadcn.com/docs/components/native-select
https://ui.shadcn.com/docs/components/button
feel free to read the llms.txt here: /Users/morgan/projects/selbekk-labs/docs/llms.txt

Once the message has been submitted, I would like the form to dissapear and a new component to appear saying 

h1 - thank you for your interest 
p - I will review your inquiry and respond as soon as possible.

**STAGE 2**

The data that the form collects I would like to store in my convex database which you have access to via MPC server

- I would like a new table to be created in my database called contact-form
- the data captured should be 
  - name 
  - email 
  - tell me about your project
  - the options the person chose. Needs to be able to save all that are chosen. Il leave that to you to decide how
  - budget 

  Please go ahead and write the neccessary code, mutations etc.. to get this working. 