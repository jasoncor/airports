# Airports Directory

A modern React + TypeScript + Vite application for browsing and viewing details about airports, built with:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-window](https://react-window.vercel.app/) (for performant lists)

## Features

- Browse a searchable, virtualized list of airports
- View detailed information for each airport, including location, timezone, and currency
- Responsive, mobile-friendly UI with modern design
- Fast navigation with TanStack Router
- Data fetching and caching with TanStack Query
- Axios as the HTTP client

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  api/             # API clients and types (Axios, airport types)
  components/      # React components (AirportList, AirportDetail, Header, etc.)
  hooks/           # Custom React hooks (e.g., useAirports)
  lib/             # Router, QueryClient, and other setup
  routes/          # Route definitions for TanStack Router
  App.tsx          # App entry point
  main.tsx         # Vite entry point
```

## Customization

- **Styling:** Uses Tailwind CSS for rapid UI development.
- **API:** Update the API endpoint in `src/api/airport.ts` if needed.
- **Currency Mapping:** Uses [`currency-codes`](https://www.npmjs.com/package/currency-codes) for mapping country to currency.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## License

MIT

---

````<!-- filepath: /Users/jasoncorcoran/Desktop/Development/airports/README.md -->
# Airports Directory

A modern React + TypeScript + Vite application for browsing and viewing details about airports, built with:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-window](https://react-window.vercel.app/) (for performant lists)

## Features

- Browse a searchable, virtualized list of airports
- View detailed information for each airport, including location, timezone, and currency
- Responsive, mobile-friendly UI with modern design
- Fast navigation with TanStack Router
- Data fetching and caching with TanStack Query
- Axios as the HTTP client

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
````

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  api/             # API clients and types (Axios, airport types)
  components/      # React components (AirportList, AirportDetail, Header, etc.)
  hooks/           # Custom React hooks (e.g., useAirports)
  lib/             # Router, QueryClient, and other setup
  routes/          # Route definitions for TanStack Router
  App.tsx          # App entry point
  main.tsx         # Vite entry point
```

## Customization

- **Styling:** Uses Tailwind CSS for rapid UI development.
- **API:** Update the API endpoint in `src/api/airport.ts` if needed.
- **Currency Mapping:** Uses [`currency-codes`](https://www.npmjs.com/package/currency-codes) for mapping country to currency.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build

## License

MIT

---
