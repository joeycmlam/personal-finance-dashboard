import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Main Navigation and UI', () => {
  test('should display main dashboard elements', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Personal Finance Dashboard');
    expect(response).toContainTextContent('Add Entry');
    expect(response).toContainTextContent('Financial Overview');
    expect(response).toContainTextContent('Amount Changes');
    expect(response).toContainTextContent('Percentage Changes');
    expect(response).toContainTextContent('Asset Allocation');
  });

  test('should have proper page title and meta information', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('v0 App');
  });

  test('should display financial overview table with correct headers', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Date');
    expect(response).toContainTextContent('Liabilities');
    expect(response).toContainTextContent('Available Cash');
    expect(response).toContainTextContent('Cash MMF');
    expect(response).toContainTextContent('Stock + Bitcoin');
    expect(response).toContainTextContent('Bond / ELI');
    expect(response).toContainTextContent('Fund');
    expect(response).toContainTextContent('Fixed Asset');
    expect(response).toContainTextContent('P-fund');
    expect(response).toContainTextContent('Watch');
    expect(response).toContainTextContent('Liquidity');
    expect(response).toContainTextContent('NAV ex Fixed Asset, P-fund, Watch');
    expect(response).toContainTextContent('NAV ex Fixed Asset, Watch');
    expect(response).toContainTextContent('Net Asset Value');
    expect(response).toContainTextContent('Total Asset');
  });

  test('should display summary cards with financial metrics', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Cash+MMF:');
    expect(response).toContainTextContent('Liquidity:');
    expect(response).toContainTextContent('Net Asset:');
    expect(response).toContainTextContent('Total Asset:');
    expect(response).toContainTextContent('Cash %:');
    expect(response).toContainTextContent('Stock & Fund & Bond %:');
    expect(response).toContainTextContent('Fixed Asset %:');
  });

  test('should have Add Entry button visible and clickable', async ({ client }) => {
    const navResponse = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(navResponse).toContainTextContent('Add Entry');

    const clickResponse = await client.callTool({
      name: 'browser_click',
      arguments: { 
        element: 'Add Entry',
        ref: 'e5'
      }
    });

    expect(clickResponse).toContainTextContent('Add New Financial Entry');
  });
});
