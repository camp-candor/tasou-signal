# AGENTS.md

This document provides a comprehensive overview of the key components, tools, and agents within this repository. It serves as the single source of truth for understanding the project's architecture and is intended to guide AI developer assistants in generating accurate and relevant plans.

## Tech Stack Overview

This project is a modern web application built with the following technologies:

- **Framework**: [Astro](https://astro.build/) 5.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Linting & Formatting**: [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)

---

### 💠 PermalinkManager

- **Purpose**: To provide a centralized and consistent way to generate permalinks for different parts of the application.
- **Location**: `src/utils/permalinks.ts`
- **Description**: This module contains a set of functions that create clean, SEO-friendly URLs for pages, blog posts, categories, and tags. It handles slugification, path trimming, and base path considerations to ensure that all generated links are consistent with the site's configuration.
- **Key Methods / Functions**:
  - `getPermalink(slug: string, type: string) -> string`
- **Usage Example**:

  ```python
  # A simple, clear code snippet showing how to import and use the component.
  # This example should be self-contained and runnable.
  from project.tools import PermalinkManager

  tool = PermalinkManager()
  result = tool.getPermalink(slug="my-first-post", type="post")
  print(result)
  ```

- **Input/Output Conventions**:
  - **Input**: A string containing a valid slug and a string indicating the type of permalink to generate.
  - **Output**: Returns a string with the generated permalink.
- **Dependencies & Configuration**:
  - Depends on the `limax` library for slugification.
- **Error Handling & Edge Cases**:
  - If the slug starts with `https://`, `http://`, `://`, `#`, or `javascript:`, the function will return the slug as is.

---

### 💠 Formatting

- **Purpose**: To provide a collection of utility functions for formatting dates and numbers.
- **Location**: `src/utils/utils.ts`
- **Description**: This module contains a set of functions that provide consistent formatting for dates and numbers across the application. It includes functions for formatting dates in a human-readable format and for formatting numbers in thousands (K) or millions (M) format.
- **Key Methods / Functions**:
  - `getFormattedDate(date: Date) -> string`
  - `toUiAmount(amount: number) -> string`
- **Usage Example**:

  ```python
  # A simple, clear code snippet showing how to import and use the component.
  # This example should be self-contained and runnable.
  from project.tools import Formatting

  tool = Formatting()
  result = tool.getFormattedDate(date="2022-01-01")
  print(result)
  ```

- **Input/Output Conventions**:
  - **Input**: A `Date` object or a number.
  - **Output**: Returns a string with the formatted date or number.
- **Dependencies & Configuration**:
  - Depends on the `Intl.DateTimeFormat` API for date formatting.
- **Error Handling & Edge Cases**:
  - If the date is not a valid `Date` object, the function will return an empty string. If the amount is not a valid number, the function will return `0`.
