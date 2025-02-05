# FireCrawl MCP Server

[![smithery badge](https://smithery.ai/badge/mcp-server-firecrawl)](https://smithery.ai/server/mcp-server-firecrawl)

A Model Context Protocol (MCP) server implementation that integrates with FireCrawl for advanced web scraping capabilities.

<a href="https://glama.ai/mcp/servers/57mideuljt"><img width="380" height="200" src="https://glama.ai/mcp/servers/57mideuljt/badge" alt="mcp-server-firecrawl MCP server" /></a>

## Features

- Web scraping with JavaScript rendering
- Batch scraping with parallel processing and queuing
- URL discovery and crawling
- Web search with content extraction
- Automatic retries with exponential backoff
- Credit usage monitoring for cloud API
- Comprehensive logging system
- Support for cloud and self-hosted FireCrawl instances
- Mobile/Desktop viewport support
- Smart content filtering with tag inclusion/exclusion

## Installation

### Installing via Smithery

To install FireCrawl for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-server-firecrawl):

```bash
npx -y @smithery/cli install mcp-server-firecrawl --client claude
```

### Manual Installation

```bash
npm install -g mcp-server-firecrawl
```

## Configuration

### Environment Variables

- `FIRE_CRAWL_API_KEY`: Your FireCrawl API key
  - Required when using cloud API (default)
  - Optional when using self-hosted instance with `FIRE_CRAWL_API_URL`
- `FIRE_CRAWL_API_URL` (Optional): Custom API endpoint for self-hosted instances
  - Example: `https://firecrawl.your-domain.com`
  - If not provided, the cloud API will be used (requires API key)

### Configuration Examples

For cloud API usage (default):

```bash
export FIRE_CRAWL_API_KEY=your-api-key
```

For self-hosted instance without authentication:

```bash
export FIRE_CRAWL_API_URL=https://firecrawl.your-domain.com
```

For self-hosted instance with authentication:

```bash
export FIRE_CRAWL_API_URL=https://firecrawl.your-domain.com
export FIRE_CRAWL_API_KEY=your-api-key  # Optional for authenticated self-hosted instances
```

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-server-firecrawl": {
      "command": "npx",
      "args": ["-y", "mcp-server-firecrawl"],
      "env": {
        "FIRE_CRAWL_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### System Configuration

The server includes several configurable parameters:

```typescript
const CONFIG = {
  retry: {
    maxAttempts: 3,
    initialDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffFactor: 2,
  },
  batch: {
    delayBetweenRequests: 2000, // 2 seconds
    maxParallelOperations: 3,
  },
  credit: {
    warningThreshold: 1000,
    criticalThreshold: 100,
  },
};
```

### Rate Limits

The server implements rate limiting to prevent API abuse:

- 3 requests per minute on free tier
- Automatic retries with exponential backoff
- Parallel processing for batch operations
- Higher limits available on paid plans

## Available Tools

### 1. Scrape Tool (`fire_crawl_scrape`)

Scrape content from a single URL with advanced options.

```json
{
  "name": "fire_crawl_scrape",
  "arguments": {
    "url": "https://example.com",
    "formats": ["markdown"],
    "onlyMainContent": true,
    "waitFor": 1000,
    "timeout": 30000,
    "mobile": false,
    "includeTags": ["article", "main"],
    "excludeTags": ["nav", "footer"],
    "skipTlsVerification": false
  }
}
```

### 2. Batch Scrape Tool (`fire_crawl_batch_scrape`)

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
  "content": [
    {
      "type": "text",
      "text": "Batch operation queued with ID: batch_1. Use fire_crawl_check_batch_status to check progress."
    }
  ],
  "isError": false
}
```

### 3. Check Batch Status (`fire_crawl_check_batch_status`)

Check the status of a batch operation.

```json
{
  "name": "fire_crawl_check_batch_status",
  "arguments": {
    "id": "batch_1"
  }
}
```

### 4. Search Tool (`fire_crawl_search`)

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

### 6. Extract Tool (`fire_crawl_extract`)

Extract structured information from web pages using LLM capabilities. Supports both cloud AI and self-hosted LLM extraction.

```json
{
  "name": "fire_crawl_extract",
  "arguments": {
    "urls": ["https://example.com/page1", "https://example.com/page2"],
    "prompt": "Extract product information including name, price, and description",
    "systemPrompt": "You are a helpful assistant that extracts product information",
    "schema": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "price": { "type": "number" },
        "description": { "type": "string" }
      },
      "required": ["name", "price"]
    },
    "allowExternalLinks": false,
    "enableWebSearch": false,
    "includeSubdomains": false
  }
}
```

Example response:

```json
{
  "content": [
    {
      "type": "text",
      "text": {
        "name": "Example Product",
        "price": 99.99,
        "description": "This is an example product description"
      }
    }
  ],
  "isError": false
}
```

#### Extract Tool Options:

- `urls`: Array of URLs to extract information from
- `prompt`: Custom prompt for the LLM extraction
- `systemPrompt`: System prompt to guide the LLM
- `schema`: JSON schema for structured data extraction
- `allowExternalLinks`: Allow extraction from external links
- `enableWebSearch`: Enable web search for additional context
- `includeSubdomains`: Include subdomains in extraction

When using a self-hosted instance, the extraction will use your configured LLM. For cloud API, it uses FireCrawl's managed LLM service.

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
  "content": [
    {
      "type": "text",
      "text": "Error: Rate limit exceeded. Retrying in 2 seconds..."
    }
  ],
  "isError": true
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm test`
4. Submit a pull request

## License

MIT License - see LICENSE file for details
