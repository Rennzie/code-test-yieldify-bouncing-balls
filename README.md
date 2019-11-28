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

- [x] Set-up project with tooling which helps minimise small bugs. Eslint etc
- [x] Build a contained which adds a ball on click
- [x] Make sure multiple balls can be added
- [x] Set the start position of the ball based on click
- [x] Get the balls to drop after they appear in the container
      (Create a gravity function?)
- [x] Remove the ball from the container when it reaches the bottom
- [x] Make the ball change direction when it hits the bottom
- [x] create a gravitational effect so ball speeds up when going down and slows down when moving up
- [x] get gravity to reduce the velocity with time, so the ball eventually sits on the bottom
- [x] remove the ball once its on the bottom and its velocity is 0;
- [x] start the ball off on a random velocity when it mounts
- [x] set an angle and change the horizontal position as the ball drops
- [x] randomise all the start inputs
- [x] change horizontal direction on vertical wall collision
- primary task complete. Now for some additions and imporovements
- [x] improve the energy decay, it should fade itself over time. look at actuall gravity
- [ ] ~~improve perfomance by only having one renderer: try a timer display, not sure react will like this?~~
- [x] refactor the useMovement, add comments and test critical components
- [x] make the display a bit more fun and add some instructions
- [ ] ~~allow the user to power up the ball on a long click hold~~
- [x] add Yieldify faviconÌ
- [ ] publish to github pages

### Components and hooks

ß

1. `Container`
   - Parent which holds number of balls
2. `Ball`
   - Rendered on click. Position changes relative to the parent as a function of movement control
3. `useMovment`
   - handles the changing movement of the ball based on its initial start position

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
