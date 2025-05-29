# Build Tools Showcase

## Overview

Build Tools Showcase is a web application that displays a collection of modern build tools, allowing users to filter them by category and toggle between light and dark themes. The app fetches data from a local JSON file and presents it in a responsive, card-based UI with a tabbed interface. It’s built with TypeScript, Webpack, SCSS, and Moment.js, emphasizing modularity, performance, and maintainability.

## Features

- **Tabbed Interface**: Filter build tools by category (e.g., Traditional, NextGen) or view all tools.
- **Theme Toggle**: Switch between light and dark themes, with preferences saved in `localStorage`.
- **Responsive Cards**: Display tool details (name, description, category, icon, website link) in fixed-width cards (~250px).
- **Dynamic Data**: Load build tools from `data/data.json` with error handling.
- **Timestamp**: Show last updated date in the footer using Moment.js.
- **Code Splitting**: Optimize performance with Webpack code splitting.
- **Linting**: Enforce code quality with ESLint and Prettier.

## Tech Stack

- **Languages**: TypeScript, JavaScript (ES2021), SCSS
- **Build Tools**: Webpack, Webpack Dev Server
- **Libraries**: Moment.js
- **Linting**: ESLint, Prettier
- **Module System**: ES Modules (ESM)
- **Other**: HTML5, CSS3

## Project Structure

```
build-tools-showcase/
├── dist/                    # Build output
├── src/                     # Source files
│   ├── data/                # Data files
│   │   └── data.json        # Build tools data
│   ├── styles/              # SCSS styles
│   │   └── main.scss        # Main stylesheet
│   ├── types/               # TypeScript types
│   │   └── types.ts         # BuildTool, BuildToolsData interfaces
│   └── index.ts             # Main application logic
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── webpack.common.js        # Shared Webpack config
├── webpack.dev.js           # Development Webpack config
├── webpack.prod.js          # Production Webpack config
└── README.md                # Project documentation
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

## Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd build-tools-showcase
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Prepare Data**:
   - Ensure `src/data/data.json` exists with the following structure:
     ```json
     {
       "build_tools": [
         {
           "name": "Webpack",
           "description": "Module bundler",
           "use_cases": ["Bundling"],
           "key_features": ["Code splitting"],
           "website": "https://webpack.js.org",
           "icon_url": "webpack.png",
           "category": "Traditional"
         },
         ...
       ]
     }
     ```

## Usage

1. **Development Server**:
   - Start the app with hot reloading:
     ```bash
     npm run dev
     ```
   - Open `http://localhost:3000` in a browser.

2. **Production Build**:
   - Build the app for production:
     ```bash
     npm run build
     ```
   - Serve the `dist/` folder:
     ```bash
     npx serve dist
     ```

3. **Linting**:
   - Check and fix code style:
     ```bash
     npm run lint -- --fix
     ```

4. **Interacting with the App**:
   - **Filter Tools**: Click tabs (e.g., “All”, “Traditional”, “NextGen”) to filter build tools.
   - **Toggle Theme**: Click the theme toggle button (☀️/🌙) to switch between light and dark modes.
   - **View Details**: Click “Learn More” links to visit tool websites.

## Development

- **Adding Tools**: Update `src/data/data.json` with new `build_tools` entries. Categories are automatically detected.
- **Styling**: Modify `src/styles/main.scss` for CSS changes. Card widths are fixed (~250px) via CSS Grid`.
- **TypeScript**: Define new interfaces in `src/types.ts` for type safety.
- **Webpack**: Configure `webpack.*.js` for build optimizations (e.g., code splitting, minification).
- **Error Handling**: Errors during data fetch display a message in the UI.

## Known Limitations

- **Static Data**: Cards are not sorted alphabetically by default (uncomment sorting in `index.ts` if needed).
- **No Search**: Search functionality is not implemented but could be added.
- **Testing**: Unit tests are planned but not implemented.

## Future Enhancements

- Implement a search bar to filter tools by name or description.
- Add unit tests with Jest and Testing Library.
- Enable alphabetical sorting of cards.
- Set up CI/CD pipelines for automated builds and deployment.
- Add pagination for large datasets.

## Contact

For questions or issues, contact the maintainers at `<your-email>` or open an issue on the repository.