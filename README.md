# Who's That Pokémon? (Front-end)

This repository stores project files for the front-end "Who's That Pokémon" application. This app is developed with:

- React
- TanStack Query
- Zustand
- Vite
- Vitest
- React Testing Library

![Screenshot of the app's interface](https://github.com/user-attachments/assets/3497dd38-5ec5-4df4-b2e6-2317d2df24ee)

## Running the app locally

In order to run the application properly in your local environment, the back-end application must also be running. Please [click here for more details on setting up the back-end application locally](https://github.com/repercussive/pokemon-project-backend).

With [Node](https://nodejs.org/en) installed, open a terminal window in the repository's root directory.

To install the dependencies, execute the following command:

```
npm install
```

To run the application in development mode, execute the following command:

```
npm run dev
```

👉 The application will be exposed on **http://localhost:5173/**

To build a production-ready application bundle, execute the following command:

```
npm run build
```

The build artefact will be generated in `/dist`.

## Running tests

Testing is handled by **Vitest** and **React Testing Library**.

To run the rests with the Vitest UI, execute the following command:

```
npm run test:ui
```

Or, to run the tests in the terminal only, execute the following command:

```
npm run test
```
