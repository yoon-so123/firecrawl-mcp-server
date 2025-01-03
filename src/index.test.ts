// import { Server } from '@modelcontextprotocol/sdk/server/index.js';
// import { CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
// import FirecrawlApp from '@mendable/firecrawl-js';
// import type {
//   SearchResponse,
//   BatchScrapeResponse,
//   BatchScrapeStatusResponse,
//   FirecrawlDocument,
//   SearchParams,
// } from '@mendable/firecrawl-js';
// import {
//   describe,
//   expect,
//   jest,
//   test,
//   beforeEach,
//   afterEach,
// } from '@jest/globals';

// jest.mock('@mendable/firecrawl-js');

// interface RequestParams {
//   method: string;
//   params: {
//     name: string;
//     arguments?: Record<string, any>;
//   };
// }

// interface BatchScrapeArgs {
//   urls: string[];
//   options?: {
//     formats?: string[];
//     [key: string]: any;
//   };
// }

// interface StatusCheckArgs {
//   id: string;
// }

// interface FirecrawlClient {
//   search(
//     query: string,
//     params?: SearchParams | Record<string, any>
//   ): Promise<SearchResponse>;
//   asyncBatchScrapeUrls(
//     urls: string[],
//     options?: any
//   ): Promise<BatchScrapeResponse>;
//   checkBatchScrapeStatus(id: string): Promise<BatchScrapeStatusResponse>;
// }

// function isSearchOptions(args: unknown): args is {
//   query: string;
//   scrapeOptions?: {
//     formats?: string[];
//     onlyMainContent?: boolean;
//   };
// } {
//   return (
//     typeof args === 'object' &&
//     args !== null &&
//     'query' in args &&
//     typeof (args as { query: unknown }).query === 'string'
//   );
// }

// describe('FireCrawl Tool Tests', () => {
//   let mockClient: MockProxy<FirecrawlClient>;
//   let requestHandler: (request: RequestParams) => Promise<any>;

//   beforeEach(() => {
//     jest.clearAllMocks();
//     mockClient = mock<FirecrawlClient>();

//     // Set up mock implementations for the instance methods
//     const mockInstance = new FirecrawlApp({ apiKey: 'test' });
//     mockInstance.search = mockClient.search;
//     mockInstance.asyncBatchScrapeUrls = mockClient.asyncBatchScrapeUrls;
//     mockInstance.checkBatchScrapeStatus = mockClient.checkBatchScrapeStatus;

//     // Create request handler
//     requestHandler = async (request: RequestParams) => {
//       const { name, arguments: args } = request.params;

//       if (!args) {
//         throw new Error('No arguments provided');
//       }

//       switch (name) {
//         case 'fire_crawl_batch_scrape': {
//           const batchArgs = args as BatchScrapeArgs;
//           if (!batchArgs.urls || !Array.isArray(batchArgs.urls)) {
//             throw new Error('Invalid arguments for fire_crawl_batch_scrape');
//           }

//           const response = await mockClient.asyncBatchScrapeUrls(
//             batchArgs.urls,
//             batchArgs.options
//           );
//           if (!response.success) {
//             throw new Error(response.error || 'Failed to start batch scrape');
//           }
//           return response;
//         }

//         case 'fire_crawl_check_status': {
//           const statusArgs = args as StatusCheckArgs;
//           if (!statusArgs.id || typeof statusArgs.id !== 'string') {
//             throw new Error('Invalid arguments for fire_crawl_check_status');
//           }

//           const response = await mockClient.checkBatchScrapeStatus(
//             statusArgs.id
//           );
//           if (!response.success) {
//             throw new Error('Failed to check batch status');
//           }
//           return response;
//         }

//         case 'fire_crawl_search': {
//           if (!isSearchOptions(args)) {
//             throw new Error('Invalid arguments for fire_crawl_search');
//           }

//           const response = await mockClient.search(
//             args.query,
//             args.scrapeOptions
//           );
//           if (!response.success) {
//             throw new Error(response.error || 'Failed to perform search');
//           }
//           return response;
//         }

//         default:
//           throw new Error(`Unknown tool: ${name}`);
//       }
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should handle batch scrape request', async () => {
//     const urls = ['https://example.com'];
//     const options = { formats: ['markdown'] };

//     mockClient.asyncBatchScrapeUrls.mockResolvedValueOnce({
//       success: true,
//       id: 'test-batch-id',
//     });

//     const response = await requestHandler({
//       method: 'call_tool',
//       params: {
//         name: 'fire_crawl_batch_scrape',
//         arguments: { urls, options },
//       },
//     });

//     expect(response).toEqual({
//       success: true,
//       id: 'test-batch-id',
//     });
//     expect(mockClient.asyncBatchScrapeUrls).toHaveBeenCalledWith(urls, options);
//   });

//   test('should handle status check request', async () => {
//     const id = 'test-batch-id';
//     const mockResponse: BatchScrapeStatusResponse = {
//       success: true,
//       status: 'completed',
//       completed: 1,
//       total: 1,
//       creditsUsed: 1,
//       expiresAt: new Date(),
//       data: [
//         {
//           url: 'https://example.com',
//           title: 'Test Page',
//           description: 'Test Description',
//           markdown: '# Test Content',
//           actions: null as never,
//         },
//       ] as FirecrawlDocument<undefined, never>[],
//     };

//     mockClient.checkBatchScrapeStatus.mockResolvedValueOnce(mockResponse);

//     const response = await requestHandler({
//       method: 'call_tool',
//       params: {
//         name: 'fire_crawl_check_status',
//         arguments: { id },
//       },
//     });

//     expect(response).toEqual(mockResponse);
//     expect(mockClient.checkBatchScrapeStatus).toHaveBeenCalledWith(id);
//   });

//   test('should handle search request', async () => {
//     const query = 'test query';
//     const scrapeOptions = { formats: ['markdown'] };
//     const mockResponse: SearchResponse = {
//       success: true,
//       data: [
//         {
//           url: 'https://example.com',
//           title: 'Test Page',
//           description: 'Test Description',
//           markdown: '# Test Content',
//           actions: null as never,
//         },
//       ] as FirecrawlDocument<undefined, never>[],
//     };

//     mockClient.search.mockResolvedValueOnce(mockResponse);

//     const response = await requestHandler({
//       method: 'call_tool',
//       params: {
//         name: 'fire_crawl_search',
//         arguments: { query, scrapeOptions },
//       },
//     });

//     expect(response).toEqual(mockResponse);
//     expect(mockClient.search).toHaveBeenCalledWith(query, scrapeOptions);
//   });
// });
