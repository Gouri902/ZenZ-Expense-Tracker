# Finance Dashboard Assignment

## Overview

This is a simple finance dashboard built with React and Tailwind CSS. It allows users to track financial activity, view summary metrics, explore transactions, and understand spending patterns.

## Features

- Single-page dashboard
- Summary cards for balance, income, and expenses
- Time-based chart for balance trend
- Category-based chart for spending breakdown
- Transactions table with:
    - search
    - filter
    - sorting
- Role-based UI:
    - Admin can add and edit transactions
    - Viewer can only view data
- Insights section with derived observations
- Empty state handling
- Local storage persistence

## Tech Stack

- React
- Tailwind CSS
- Vite
- JavaScript

## State Management

The app uses simple React state with `useState`, `useMemo`, and `useEffect`. This was intentionally kept lightweight for clarity and simplicity.

## How to Run

```bash
npm install
npm run dev
```
