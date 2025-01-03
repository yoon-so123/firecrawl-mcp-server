# Changelog

## [1.2.0] - 2024-03-14

### Added

- New search tool (`fire_crawl_search`) for web search with content extraction
- Support for self-hosted FireCrawl instances via optional API URL configuration
  - New `FIRE_CRAWL_API_URL` environment variable
  - Automatic fallback to cloud API
  - Improved error messages for self-hosted instances
- Comprehensive documentation in IMPLEMENTATION.md
- Additional test coverage for search functionality and API configuration

### Changed

- Updated package name to `@mendable/mcp-server-firecrawl`
- Improved error handling and response formatting
- Enhanced rate limiting implementation
- Updated README.md with new features and examples
- Added detailed self-hosted configuration guide

### Fixed

- Type definitions for search responses
- Error handling for invalid search queries
- Rate limit error messages
- API configuration validation

## [1.1.0] - 2024-03-07

### Added

- Initial release with basic scraping functionality
- Support for batch scraping
- URL discovery and crawling capabilities
- Rate limiting implementation
