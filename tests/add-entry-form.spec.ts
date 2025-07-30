import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Add Entry Form', () => {
  test('should open and close add entry form', async ({ client }) => {
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
    expect(formResponse).toContainTextContent('Available Cash');

    const closedResponse = await client.callTool({
      name: 'browser_click',
      arguments: { element: 'Cancel' }
    });

    expect(closedResponse).not.toContainTextContent('Add New Entry');
  });

  test('should display all required form fields', async ({ client }) => {
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

    const expectedFields = [
      'Date',
      'Liabilities',
      'Available Cash',
      'Cash MMF',
      'Stock + Bitcoin',
      'Bond / ELI',
      'Fund',
      'Fixed Asset',
      'P-fund',
      'Watch'
    ];

    expectedFields.forEach(field => {
      expect(formResponse).toContainTextContent(field);
    });
  });

  test('should validate required fields', async ({ client }) => {
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

  test('should accept valid numeric input', async ({ client }) => {
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
    expect(formResponse).toContainTextContent('Available Cash');
  });

  test('should handle form submission', async ({ client }) => {
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

  test('should clear form on cancel', async ({ client }) => {
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
    expect(formResponse).toContainTextContent('Cancel');
  });
});
