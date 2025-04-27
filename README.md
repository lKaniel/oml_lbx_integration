# OpenMediaLogic SDK

[![npm version](https://img.shields.io/npm/v/oml_sdk.svg)](https://www.npmjs.com/package/oml_sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A comprehensive TypeScript SDK for interacting with the OpenMediaLogic TV advertising platform API. This SDK provides easy access to projects, orders, mediaplans, and booking functionality for TV advertising campaigns.

## Features

- 🔑 Authentication with JWT tokens
- 📊 Access to all OpenMediaLogic API endpoints
- 📺 Management of TV advertising projects, orders, and mediaplans
- 📋 Booking grid for ad spot placement
- 🔄 TypeScript typings for all API responses

## Installation

```bash
# Using npm
npm install oml_sdk

# Using yarn
yarn add oml_sdk

# Using pnpm
pnpm add oml_sdk
```

## Quick Start

```typescript
import { OpenMediaLogicClient } from 'oml_sdk';

// Create a new client instance
const client = new OpenMediaLogicClient('https://api.example.com');

// Authenticate
const authenticate = async () => {
  try {
    const token = await client.login({
      login: 'your_username',
      password: 'your_password'
    });
    console.log('Authentication successful:', token);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
};

// Start using the API
authenticate();
```

## Usage Examples

### Authentication

```typescript
// Login
const token = await client.login({
  login: 'your_username',
  password: 'your_password'
});

// Or manually set a token if you already have one
client.setToken('your_jwt_token');

// Get current user information
const currentUser = await client.getCurrentUser();

// Refresh token
const newToken = await client.refreshToken();

// Logout
await client.logout();
```

### Projects, Orders, and Mediaplans

```typescript
// Get a list of projects
const projects = await client.getProjects({
  per_page: 10,
  filter: { year_id: 2025 },
  sort: '-id'
});

// Get a list of orders
const orders = await client.getOrders();

// Get mediaplans with included relationships
const mediaplans = await client.getMediaplans({
  include: ['commercials', 'automaticMediaplanPrograms']
});
```

### Booking and Spot Management

```typescript
// Get booking grid for a channel and date range
const bookingGrid = await client.getChannelBooking(
  23,                  // channelId
  '2025-04-01',        // dateStartAt
  '2025-04-06',        // dateEndAt
  1                    // commercialTypeId
);

// Get detailed information about a specific block
const block = await client.getBlockById(619079);

// Add a spot to a block
const updatedBlock = await client.addSpotToBlock(
  619079,              // blockId
  {
    commercial_id: 909,
    mediaplan_id: 101,
    position: null
  }
);

// Remove a spot from a block
const blockAfterRemoval = await client.deleteSpotFromBlock(619079, 12345);
```

### Reference Data

```typescript
// Get advertisers
const advertisers = await client.getAdvertisers();

// Get channels
const channels = await client.getChannels();

// Get commercials (ad spots)
const commercials = await client.getCommercials({
  filter: { advertiser_id: 42 }
});

// Get target audiences
const targetAudiences = await client.getTargetAudiences();
```

## API Reference

The SDK provides access to the following main resource types:

### Projects

Projects are top-level containers for advertising campaigns. Each project can include multiple orders.

```typescript
const projects = await client.getProjects({
  filter: { year_id: 2025 },
  sort: '-id',
  per_page: 20
});
```

### Orders

Orders are part of projects and contain mediaplans. Orders represent contracts for advertising placement.

```typescript
const orders = await client.getOrders({
  filter: { project_id: 981 }
});
```

### Mediaplans

Mediaplans are detailed plans for ad placement, created for a specific channel within a month for a client.

```typescript
const mediaplans = await client.getMediaplans({
  filter: { order_id: 3431 },
  include: ['commercials', 'discounts']
});
```

### Booking Grid

The booking grid provides information about available advertising blocks and time slots on TV channels.

```typescript
const bookingGrid = await client.getChannelBooking(
  23,                  // channelId
  '2025-04-01',        // dateStartAt
  '2025-04-06',        // dateEndAt
  1,                   // commercialTypeId
  undefined,           // blockTypeId
  981,                 // projectId
  3431                 // orderId
);
```

### Spots

Spots represent commercial placements within specific blocks in the booking grid.

```typescript
// Add a spot to a block
const updatedBlock = await client.addSpotToBlock(
  619079,              // blockId
  {
    commercial_id: 909,
    mediaplan_id: 101
  }
);
```

## Pagination, Filtering, and Sorting

Most list endpoints support pagination, filtering, and sorting parameters:

```typescript
const mediaplans = await client.getMediaplans({
  // Pagination
  page: 1,
  per_page: 50,
  
  // Filtering
  filter: {
    channel_id: 23,
    date_from: '2025-04-01',
    date_to: '2025-04-30'
  },
  
  // Sorting (prefix with - for descending order)
  sort: '-id',
  
  // Including related resources
  include: ['commercials', 'discounts']
});
```

## Working with Dates and Times

The API uses two time formats:

1. Integer seconds (e.g., 22200)
2. String "HH:MM:SS" format (e.g., "06:10:00")

For operations and comparisons, it's recommended to use the integer seconds format.

## Typical API Usage Flow

1. Authenticate with the API
2. Retrieve reference data (channels, advertisers, etc.)
3. Work with projects, orders, and mediaplans
4. Use the booking grid to place spots

Example workflow for placing a spot:

```typescript
// 1. Authenticate
await client.login({ login: 'username', password: 'password' });

// 2. Get mediaplan details
const mediaplan = await client.getMediaplans(101);

// 3. Get booking grid for the channel
const grid = await client.getChannelBooking(
  mediaplan.data.channel_id,
  mediaplan.data.date_from,
  mediaplan.data.date_to,
  mediaplan.data.commercial_type_id
);

// 4. Place a spot in a specific block
const updatedBlock = await client.addSpotToBlock(
  619079,
  {
    commercial_id: 909,
    mediaplan_id: 101
  }
);
```

## Error Handling

The SDK throws errors for failed API requests with detailed error messages:

```typescript
try {
  const projects = await client.getProjects();
} catch (error) {
  console.error('Error fetching projects:', error.message);
  // Handle error appropriately
}
```

## TypeScript Support

The SDK is built with TypeScript and provides full type definitions for all API responses and parameters.

```typescript
import { 
  OpenMediaLogicClient, 
  Project, 
  Mediaplan, 
  Block, 
  Channel 
} from 'oml_sdk';

// Type-safe API responses
const projects = await client.getProjects();
const firstProject: Project = projects.data[0];
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.