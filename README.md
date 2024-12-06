# FireCrawl MCP Server

A Model Context Protocol (MCP) server implementation that integrates with FireCrawl for advanced web scraping capabilities.

## Features

- **JavaScript Rendering**: Extract content from JavaScript-heavy websites
- **Mobile/Desktop Views**: Support for different viewport configurations
- **Smart Rate Limiting**: Built-in rate limit handling
- **Multiple Formats**: Support for HTML, Markdown, and raw text extraction
- **Batch Processing**: Efficient handling of multiple URLs
- **PDF Support**: Extract content from PDF files

## Tools

### fire_crawl_scrape

Scrapes content from a single URL with customizable options.

- Inputs:
  - `url` (string): Target URL to scrape
  - `formats` (array): Output formats (`markdown`, `html`, `rawHtml`)
  - `waitFor` (number, optional): Wait time in milliseconds
  - `onlyMainContent` (boolean, optional): Extract main content only
  - `mobile` (boolean, optional): Use mobile viewport
  - `skipTlsVerification` (boolean, optional): Skip TLS verification

### fire_crawl_batch_scrape

Initiates a batch scraping job for multiple URLs.

- Inputs:
  - `urls` (array): List of URLs to scrape
  - `options` (object): Scraping options (same as single scrape)

### fire_crawl_check_batch_status

Checks the status of a batch scraping job.

- Inputs:
  - `id` (string): Batch job ID to check

## Installation

```bash
npm install @vrknetha/mcp-server-firecrawl
```

## Configuration

### Getting an API Key

1. Sign up for a [FireCrawl account](https://firecrawl.dev)
2. Generate your API key from the dashboard
3. Set the API key in your environment

### Usage with Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "@vrknetha/mcp-server-firecrawl"],
      "env": {
        "FIRE_CRAWL_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch

# Run tests
npm test
```

## Rate Limits

- 3 requests per minute on free tier
- 25-second cooldown after hitting rate limit
- Higher limits available on paid plans

## License

MIT License - see LICENSE file for details
