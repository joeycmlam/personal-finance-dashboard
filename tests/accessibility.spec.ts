import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Accessibility', () => {
  test('should have proper heading structure', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Personal Finance Dashboard');
    expect(response).toContainTextContent('Financial Overview');
    expect(response).toContainTextContent('Amount Changes');
  });

  test('should support keyboard navigation', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Add Entry');
    
    const clickResponse = await client.callTool({
      name: 'browser_click',
      arguments: { 
        element: 'Add Entry',
        ref: 'e5'
      }
    });

    expect(clickResponse).toContainTextContent('Add New Financial Entry');
  });

  test('should have accessible form labels', async ({ client }) => {
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

    expect(formResponse).toContainTextContent('Date');
    expect(formResponse).toContainTextContent('Liabilities');
    expect(formResponse).toContainTextContent('Available Cash');
    expect(formResponse).toContainTextContent('Cash MMF');
  });

  test('should have proper ARIA roles and attributes', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Date');
    expect(response).toContainTextContent('Liabilities');
    expect(response).toContainTextContent('Add Entry');
  });

  test('should have sufficient color contrast', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Personal Finance Dashboard');
    expect(response).toContainTextContent('Financial Overview');
  });

  test('should be navigable with screen reader', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Personal Finance Dashboard');
    expect(response).toContainTextContent('Add Entry');
    expect(response).toContainTextContent('Date');
  });

  test('should handle focus management in modal', async ({ client }) => {
    await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    const modalResponse = await client.callTool({
      name: 'browser_click',
      arguments: { 
        element: 'Add Entry',
        ref: 'e5'
      }
    });

    expect(modalResponse).toContainTextContent('Add New Financial Entry');
    expect(modalResponse).toContainTextContent('Date');
    expect(modalResponse).toContainTextContent('Cancel');
  });
});
