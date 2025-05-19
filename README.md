# Tax Loss Harvesting React Application

This is a README file for the Tax Loss Harvesting tool, a React application that allows users to visualize and optimize their capital gains through tax loss harvesting.

## Features

- Display capital gains (pre and post harvesting)
- View holdings with detailed information
- Select assets to see how tax loss harvesting affects your portfolio
- Real-time calculation of potential tax savings
- Responsive design for all device sizes

## Setup Instructions

1. Navigate to the project directory:
   ```
   cd tax_loss_harvesting_project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Build for production:
   ```
   npm run build
   ```

## Implementation Details

The application uses React for the UI and includes mock API implementations to simulate data fetching. The UI closely follows the provided design specifications with a dark theme and responsive layout.

### Key Components

- **CapitalGainsCards**: Displays pre and post harvesting capital gains information
- **HoldingsTable**: Shows the user's holdings with selection capability
- **API Mocking**: Simulates backend data with realistic response times

### Technologies Used

- React
- CSS for styling
- JavaScript for logic and calculations

## Assumptions

- The application uses mock data that matches the provided API response format
- Currency is displayed in INR format
- The "View All" functionality shows all holdings when clicked
- Sorting is implemented for the Short-Term column as shown in the design
