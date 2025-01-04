# Changelog

## [1.2.0] - 2024-01-03

### Added

- Implemented automatic retries with exponential backoff for rate limits
- Added queue system for batch operations with parallel processing
- Integrated credit usage monitoring with warning thresholds
- Enhanced content validation with configurable criteria
- Added comprehensive logging system for operations and errors
- New search tool (`fire_crawl_search`) for web search with content extraction
- Support for self-hosted FireCrawl instances via optional API URL configuration
  - New `FIRE_CRAWL_API_URL` environment variable
  - Automatic fallback to cloud API
  - Improved error messages for self-hosted instances

### Changed

- Improved error handling for HTTP errors including 404s
- Enhanced URL validation before scraping
- Updated configuration with new retry and batch processing options
- Optimized rate limiting with automatic backoff strategy
- Improved documentation with new features and examples
- Added detailed self-hosted configuration guide

### Fixed

- Rate limit handling in batch operations
- Error response formatting
- Type definitions for response handlers
- Test suite mock responses
- Error handling for invalid search queries
- API configuration validation

## [1.0.1] - 2023-12-03

### Added

- Initial release with basic scraping functionality
- Support for batch scraping
- URL discovery and crawling capabilities
- Rate limiting implementation
