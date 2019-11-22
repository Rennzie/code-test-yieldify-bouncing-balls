## Code test for Yieldify Frontend Engineer 22-11-2019

## Getting Started

This project is downloadable from github:

      git clone ...

To start the project locally first:

- install the dependancies:

      npm install

- then

      npm start

_**Note**: Node.js is required to run the project_

Alternatively visit the working project [here]()

---

## Task

Link to instructions found [here](https://docs.google.com/document/d/1b21q6uYsMD9wI9aeUq5bvzveKSQW31Y-FRqmJcWy-r0/edit)

---

## Plan

This section is a rough outline of the thought process I followed to acomplish the task.

1.  Set-up project with tooling which helps minimise small bugs. Eslint etc
2.  Build a contained which adds a ball on click
3.  Make sure multiple balls can be added
4.  Set the start position of the ball based on click
5.  Get the balls to drop after they appear in the container
    - Create a gravity function?
6.  Remove the ball from the container when it reaches the bottom
7.  Get this working for all balls added

### Components and hooks

1. `Container`
   - Parent which holds number of balls
2. `Ball`
   - Rendered on click. Position changes relative to the parent as a function of movement control
3. `useMovment`
   - handles the chaning movement of the ball based on its initial start position

### Folder Structure

```
-- src
|  --- __tests__
|
|  --- components
|    |   --- App.tsx
|    |   --- Ball.tsx
|    |   --- Container.tsx
|
|  --- hooks
|    |   --- useMovement.ts
|  --- index.tsx
```

## Third party attribution

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [typescript].
- Dev tooling includes [eslint](), [prettier](), [husky]() & [lint-staged]()
- Hosting simplified with [gh-pages]()
