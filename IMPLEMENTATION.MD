# FireCrawl MCP Server Implementation Guide

## Overview

The FireCrawl MCP server provides web scraping capabilities through the Model Context Protocol. It integrates with the FireCrawl API to offer JavaScript rendering, batch processing, and rate limiting features.

## Project Structure

```
mcp-server-firecrawl/
├── src/
│   └── firecrawl/
│       ├── index.ts       # Main implementation
│       └── index.test.ts  # Tests
├── package.json
├── tsconfig.json
└── README.md
```

## Core Dependencies

- `@modelcontextprotocol/sdk`: ^0.5.0 - MCP server framework
- `@mendable/firecrawl-js`: ^1.0.0 - FireCrawl API client
- TypeScript and testing utilities

## Implementation Details

### 1. Tool Definitions

#### fire_crawl_scrape

```typescript
{
  name: "fire_crawl_scrape",
  description: "Scrapes content from a URL with JavaScript rendering support",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string" },
      formats: {
        type: "array",
        items: {
          type: "string",
          enum: ["markdown", "html", "rawHtml"]
        }
      },
      waitFor: { type: "number" },
      onlyMainContent: { type: "boolean" },
      mobile: { type: "boolean" },
      skipTlsVerification: { type: "boolean" }
    },
    required: ["url", "formats"]
  }
}
```

#### fire_crawl_batch_scrape

```typescript
{
  name: "fire_crawl_batch_scrape",
  description: "Start a batch scraping job for multiple URLs",
  inputSchema: {
    type: "object",
    properties: {
      urls: {
        type: "array",
        items: { type: "string" }
      },
      options: {
        type: "object",
        properties: {
          formats: {
            type: "array",
            items: {
              type: "string",
              enum: ["markdown", "html", "rawHtml"]
            }
          },
          waitFor: { type: "number" },
          onlyMainContent: { type: "boolean" },
          mobile: { type: "boolean" },
          skipTlsVerification: { type: "boolean" }
        },
        required: ["formats"]
      }
    },
    required: ["urls", "options"]
  }
}
```

#### fire_crawl_check_batch_status

```typescript
{
  name: "fire_crawl_check_batch_status",
  description: "Check the status of a batch scraping job",
  inputSchema: {
    type: "object",
    properties: {
      id: { type: "string" }
    },
    required: ["id"]
  }
}
```

### 2. Rate Limiting Implementation

```typescript
const RATE_LIMIT = {
  perMinute: 3,
  waitTime: 25000, // 25 seconds
};

let requestCount = {
  minute: 0,
  lastReset: Date.now(),
  nextAllowedTime: Date.now(),
};
```

Rate limit checks should:

- Reset counter after 60 seconds
- Enforce 3 requests per minute limit
- Enforce 25-second cooldown when limit is hit
- Return user-friendly error messages with wait times

### 3. Error Handling

- Implement proper error handling for API responses
- Return structured error messages
- Include rate limit information in errors
- Handle network and API errors gracefully

### 4. Response Formatting

- Format batch results consistently
- Handle missing content gracefully
- Support multiple output formats
- Provide clear status information

### 5. Configuration

Required environment variables:

- `FIRE_CRAWL_API_KEY`: API key for FireCrawl service

### 6. Testing Requirements

- Mock FireCrawl API responses
- Test rate limiting logic
- Test error handling
- Test input validation
- Test response formatting

## Usage Example

```json
// Claude Desktop configuration
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "@vrknetha/mcp-server-firecrawl"],
      "env": {
        "FIRE_CRAWL_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

## Type Guards

Implement type guards for validating input:

```typescript
function isScrapeOptions(args: unknown): args is {
  url: string;
  formats: string[];
  waitFor?: number;
  onlyMainContent?: boolean;
  mobile?: boolean;
  skipTlsVerification?: boolean;
} {
  return (
    typeof args === 'object' &&
    args !== null &&
    'url' in args &&
    typeof (args as any).url === 'string' &&
    'formats' in args &&
    Array.isArray((args as any).formats)
  );
}
```

## Response Handling

Format responses consistently:

```typescript
{
  content: [{
    type: "text",
    text: content // markdown/html content or status message
  }],
  isError: false // or true for errors
}
```

## Rate Limit Error Messages

Provide clear error messages:

```typescript
`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds before trying again.`;
```
