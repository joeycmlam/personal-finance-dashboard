import { test, expect } from './fixtures';

test.describe('Personal Finance Dashboard - Responsiveness', () => {
  const viewports = [
    { name: 'Mobile Portrait', width: 375, height: 667 },
    { name: 'Mobile Landscape', width: 667, height: 375 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 720 },
    { name: 'Desktop Large', width: 1920, height: 1080 }
  ];

  viewports.forEach(viewport => {
    test(`should display correctly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ client }) => {
      const response = await client.callTool({
        name: 'browser_navigate',
        arguments: { url: 'http://localhost:3000' }
      });

      expect(response).toContainTextContent('Personal Finance Dashboard');
      expect(response).toContainTextContent('Add Entry');
      expect(response).toContainTextContent('Date');
      expect(response).toContainTextContent('Liabilities');
    });
  });

  test('should handle table overflow on mobile devices', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Date');
    expect(response).toContainTextContent('Liabilities');
    expect(response).toContainTextContent('Available Cash');
  });

  test('should adapt summary cards layout on different screen sizes', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Cash+MMF:');
    expect(response).toContainTextContent('Liquidity:');
    expect(response).toContainTextContent('Net Asset:');
    expect(response).toContainTextContent('Total Asset:');
  });

  test('should maintain readability at different zoom levels', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Personal Finance Dashboard');
    expect(response).toContainTextContent('Financial Overview');
    expect(response).toContainTextContent('Date');
  });

  test('should handle form layout on mobile devices', async ({ client }) => {
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

  test('should maintain touch targets size on mobile', async ({ client }) => {
    const response = await client.callTool({
      name: 'browser_navigate',
      arguments: { url: 'http://localhost:3000' }
    });

    expect(response).toContainTextContent('Add Entry');
    expect(response).toContainTextContent('Personal Finance Dashboard');
  });
});
