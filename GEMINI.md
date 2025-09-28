# Gemini Project Context: AstroWind

This document provides context for the AstroWind project, an Astro-based website.

## Project Overview

This project is a website built with the AstroWind template, which uses Astro 5.0 and Tailwind CSS. It is a static site that can be deployed to various hosting services. The project includes a blog, and various other pages.

### Key Technologies

*   **Astro:** A web framework for building fast, content-focused websites.
*   **Tailwind CSS:** A utility-first CSS framework for creating custom designs.
*   **MDX:** A format that allows you to write JSX in your Markdown documents.
*   **Partytown:** A library for off-loading third-party scripts to a web worker.
*   **Astro Icon:** An Astro component for using icons from various icon sets.
*   **Astro Compress:** An Astro integration for compressing the output of your build.

## Building and Running

The following commands are used to build, run, and test the project:

*   `npm install`: Installs the project's dependencies.
*   `npm run dev`: Starts the local development server at `localhost:4321`.
*   `npm run build`: Builds the production site to the `./dist/` directory.
*   `npm run preview`: Previews the built site locally before deploying.
*   `npm run check`: Checks the project for errors using `astro check`, `eslint`, and `prettier`.
*   `npm run fix`: Fixes linting and formatting errors.

## Development Conventions

The project follows the standard conventions for Astro projects.

*   **Code Style:** The project uses Prettier for code formatting and ESLint for linting.
*   **Testing:** There are no specific testing practices outlined in the project's documentation.
*   **Configuration:** The main configuration for the site is located in `src/config.yaml`. This file includes settings for the site's name, metadata, SEO, and more. The Astro configuration is in `astro.config.ts`.
*   **Deployment:** The `README.md` file provides instructions for deploying the project to Netlify and Vercel.
