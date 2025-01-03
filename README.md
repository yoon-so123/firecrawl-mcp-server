# FireCrawl MCP Server

A Model Context Protocol (MCP) server for FireCrawl, providing web scraping, crawling, and search capabilities.

## Features

- Web scraping with JavaScript rendering
- Batch scraping with parallel processing and queuing
- URL discovery and crawling
- Web search with content extraction
- Automatic retries with exponential backoff
- Credit usage monitoring for cloud API
- Comprehensive logging system
- Support for cloud and self-hosted FireCrawl instances

## Installation

```bash
npm install -g @mendable/mcp-server-firecrawl
```

## Configuration

### Environment Variables

- `FIRE_CRAWL_API_KEY` (Required for cloud API): Your FireCrawl API key
- `FIRE_CRAWL_API_URL` (Optional): Custom API endpoint for self-hosted instances
  - Example: `https://firecrawl.your-domain.com`
  - If not provided, the cloud API will be used
  - Required only for self-hosted FireCrawl instances

### Self-Hosted Configuration

If you're running your own FireCrawl instance, set both environment variables:

```bash
export FIRE_CRAWL_API_KEY=your-api-key
export FIRE_CRAWL_API_URL=https://firecrawl.your-domain.com
```

For cloud usage, only the API key is required:

```bash
export FIRE_CRAWL_API_KEY=your-api-key
```

### System Configuration

The server includes several configurable parameters:

```typescript
const CONFIG = {
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,  // 1 second
    maxDelay: 10000,     // 10 seconds
    backoffFactor: 2
  },
  batch: {
    delayBetweenRequests: 2000,  // 2 seconds
    maxParallelOperations: 3
  },
  credit: {
    warningThreshold: 1000,
    criticalThreshold: 100
  }
};
```

### Rate Limits

The server implements rate limiting to prevent API abuse:

- 3 requests per minute
- Automatic retries with exponential backoff
- Parallel processing for batch operations

## Available Tools

### 1. Search Tool (`fire_crawl_search`)

Search the web and optionally extract content from search results.

```json
{
  "name": "fire_crawl_search",
  "arguments": {
    "query": "your search query",
    "limit": 5,
    "lang": "en",
    "country": "us",
    "scrapeOptions": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

### 2. Scrape Tool (`fire_crawl_scrape`)

Scrape content from a single URL with advanced options.

```json
{
  "name": "fire_crawl_scrape",
  "arguments": {
    "url": "https://example.com",
    "formats": ["markdown"],
    "onlyMainContent": true,
    "waitFor": 1000,
    "timeout": 30000
  }
}
```

### 3. Batch Scrape Tool (`fire_crawl_batch_scrape`)

Scrape multiple URLs with parallel processing and queuing.

```json
{
  "name": "fire_crawl_batch_scrape",
  "arguments": {
    "urls": ["https://example1.com", "https://example2.com"],
    "options": {
      "formats": ["markdown"],
      "onlyMainContent": true
    }
  }
}
```

Response includes operation ID for status checking:
```json
{
  "content": [{
    "type": "text",
    "text": "Batch operation queued with ID: batch_1. Use fire_crawl_check_batch_status to check progress."
  }],
  "isError": false
}
```

### 4. Check Batch Status (`fire_crawl_check_batch_status`)

Check the status of a batch operation.

```json
{
  "name": "fire_crawl_check_batch_status",
  "arguments": {
    "id": "batch_1"
  }
}
```

### 5. Crawl Tool (`fire_crawl_crawl`)

Start an asynchronous crawl with advanced options.

```json
{
  "name": "fire_crawl_crawl",
  "arguments": {
    "url": "https://example.com",
    "maxDepth": 2,
    "limit": 100,
    "allowExternalLinks": false,
    "deduplicateSimilarURLs": true
  }
}
```

## Logging System

The server includes comprehensive logging:

- Operation status and progress
- Performance metrics
- Credit usage monitoring
- Rate limit tracking
- Error conditions

Example log messages:
```
[INFO] FireCrawl MCP Server initialized successfully
[INFO] Starting scrape for URL: https://example.com
[INFO] Batch operation queued with ID: batch_1
[WARNING] Credit usage has reached warning threshold
[ERROR] Rate limit exceeded, retrying in 2s...
```

## Error Handling

The server provides robust error handling:

- Automatic retries for transient errors
- Rate limit handling with backoff
- Detailed error messages
- Credit usage warnings
- Network resilience

Example error response:

```json
{
  "content": [{
    "type": "text",
    "text": "Error: Rate limit exceeded. Retrying in 2 seconds..."
  }],
  "isError": true
}
```

## Development

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm test`
4. Submit a pull request

## License

MIT
