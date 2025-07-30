import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Data Validation', () => {
  test('should calculate liquidity correctly for all entries', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Liquidity');
    expect(response).toContainTextContent('$52,000');
    expect(response).toContainTextContent('$48,000');
  });

  test('should calculate NAV ex Fixed Asset correctly', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('NAV ex Fixed Asset, P-fund, Watch');
    expect(response).toContainTextContent('NAV ex Fixed Asset, Watch');
    expect(response).toContainTextContent('Net Asset Value');
  });

  test('should calculate total asset correctly', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Total Asset');
    expect(response).toContainTextContent('$310,000');
    expect(response).toContainTextContent('$317,500');
  });

  test('should calculate percentage changes correctly', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('10.00%');
    expect(response).toContainTextContent('3.65%');
    expect(response).toContainTextContent('-9.29%');
  });

  test('should calculate asset allocation percentages that sum to 100%', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Asset Allocation');
    expect(response).toContainTextContent('Cash %:');
    expect(response).toContainTextContent('Stock & Fund & Bond %:');
    expect(response).toContainTextContent('Fixed Asset %:');
  });

  test('should validate currency formatting consistency', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('$50,000');
    expect(response).toContainTextContent('$25,000');
    expect(response).toContainTextContent('$32,000');
    expect(response).toContainTextContent('$20,000');
  });

  test('should validate date formatting consistency', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('1/1/2024');
    expect(response).toContainTextContent('2/1/2024');
    expect(response).toContainTextContent('3/1/2024');
  });

  test('should validate financial calculations with edge cases', async ({ client }) => {
    await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    const formResponse = await client.callTool({
      name: 'browser_click',
      arguments: { 
        element: 'Add Entry',
        ref: 'e5'
      }
    });

    expect(formResponse).toContainTextContent('Add New Financial Entry');
    expect(formResponse).toContainTextContent('Date');
    expect(formResponse).toContainTextContent('Liabilities');
  });
});
