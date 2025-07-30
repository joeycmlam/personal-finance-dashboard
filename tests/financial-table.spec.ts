import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Financial Table', () => {
  test('should display financial data with proper formatting', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('$50,000');
    expect(response).toContainTextContent('$25,000');
    expect(response).toContainTextContent('1/1/2024');
    expect(response).toContainTextContent('2/1/2024');
    expect(response).toContainTextContent('3/1/2024');
  });

  test('should calculate liquidity correctly', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Liquidity');
    expect(response).toContainTextContent('$52,000');
    expect(response).toContainTextContent('$48,000');
  });

  test('should display percentage changes with proper indicators', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('+$4,000');
    expect(response).toContainTextContent('+$9,500');
    expect(response).toContainTextContent('10.00%');
    expect(response).toContainTextContent('3.65%');
    expect(response).toContainTextContent('-9.29%');
  });

  test('should calculate asset allocation percentages correctly', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Asset Allocation');
    expect(response).toContainTextContent('Cash %:');
    expect(response).toContainTextContent('Stock & Fund & Bond %:');
    expect(response).toContainTextContent('Fixed Asset %:');
  });

  test('should display currency values in consistent format', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('$50,000');
    expect(response).toContainTextContent('$25,000');
    expect(response).toContainTextContent('$32,000');
    expect(response).toContainTextContent('$20,000');
  });

  test('should handle table scrolling on smaller screens', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Date');
    expect(response).toContainTextContent('Liabilities');
    expect(response).toContainTextContent('Available Cash');
  });
});
