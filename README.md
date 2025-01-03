# FireCrawl MCP Server

A Model Context Protocol (MCP) server for FireCrawl, providing web scraping, crawling, and search capabilities.

## Features

- Web scraping with JavaScript rendering
- Batch scraping with async processing
- URL discovery and crawling
- Web search with content extraction
- Rate limiting and error handling
- Support for cloud and self-hosted FireCrawl instances

## Installation

```bash
npm install -g @mendable/mcp-server-firecrawl
```

## Configuration

### Environment Variables

- `FIRE_CRAWL_API_KEY` (Required): Your FireCrawl API key
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

### Rate Limits

The server implements rate limiting to prevent API abuse:

- 3 requests per minute
- 25-second cooldown when limit is reached

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
    "onlyMainContent": true
  }
}
```

### 3. Batch Scrape Tool (`fire_crawl_batch_scrape`)

Scrape multiple URLs asynchronously.

```json
{
  "name": "fire_crawl_batch_scrape",
  "arguments": {
    "urls": ["https://example1.com", "https://example2.com"],
    "options": {
      "formats": ["markdown"]
    }
  }
}
```

### 4. Map Tool (`fire_crawl_map`)

Discover URLs from a starting point.

```json
{
  "name": "fire_crawl_map",
  "arguments": {
    "url": "https://example.com",
    "includeSubdomains": true
  }
}
```

### 5. Crawl Tool (`fire_crawl_crawl`)

Start an asynchronous crawl from a URL.

```json
{
  "name": "fire_crawl_crawl",
  "arguments": {
    "url": "https://example.com",
    "maxDepth": 2,
    "limit": 100
  }
}
```

## Error Handling

The server provides detailed error messages for:

- Invalid inputs
- Rate limit exceeded
- API errors
- Network issues

Example error response:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error: Rate limit exceeded. Please wait 25 seconds."
    }
  ],
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

## License

MIT
