import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import path from 'path';
import url from 'url';

export interface TestOptions {
  mcpBrowser: string | undefined;
}

type TestFixtures = {
  client: Client;
  startClient: (options?: { clientName?: string, args?: string[] }) => Promise<{ client: Client, stderr: () => string }>;
};

export const test = baseTest.extend<TestFixtures & TestOptions>({
  client: async ({ startClient }, use) => {
    const { client } = await startClient();
    await use(client);
  },

  startClient: async ({ mcpBrowser }, use, testInfo) => {
    let client: Client | undefined;

    await use(async options => {
      const args: string[] = [];
      if (process.env.CI && process.platform === 'linux')
        args.push('--no-sandbox');
      args.push('--headless');
      if (mcpBrowser)
        args.push(`--browser=${mcpBrowser}`);
      if (options?.args)
        args.push(...options.args);

      client = new Client({ name: options?.clientName ?? 'test', version: '1.0.0' });
      
      const transport = new StdioClientTransport({
        command: 'npx',
        args: ['@playwright/mcp@latest', ...args],
        stderr: 'pipe',
        env: {
          ...process.env,
          DEBUG: 'pw:mcp:test',
          DEBUG_COLORS: '0',
          DEBUG_HIDE_DATE: '1',
        },
      });

      let stderrBuffer = '';
      transport.stderr?.on('data', data => {
        if (process.env.PWMCP_DEBUG)
          process.stderr.write(data);
        stderrBuffer += data.toString();
      });

      await client.connect(transport);
      await client.ping();
      return { client, stderr: () => stderrBuffer };
    });

    await client?.close();
  },

  mcpBrowser: ['chrome', { option: true }],
});

type Response = Awaited<ReturnType<Client['callTool']>>;

export const expect = baseExpect.extend({
  toHaveTextContent(response: Response, content: string | RegExp) {
    const isNot = this.isNot;
    try {
      const text = (response.content as any)[0].text;
      if (typeof content === 'string') {
        if (isNot)
          baseExpect(text.trim()).not.toBe(content.trim());
        else
          baseExpect(text.trim()).toBe(content.trim());
      } else {
        if (isNot)
          baseExpect(text).not.toMatch(content);
        else
          baseExpect(text).toMatch(content);
      }
    } catch (e: any) {
      return {
        pass: isNot,
        message: () => e.message || 'Unknown error',
      };
    }
    return {
      pass: !isNot,
      message: () => ``,
    };
  },

  toContainTextContent(response: Response, content: string) {
    const isNot = this.isNot;
    try {
      const texts = (response.content as any).map((c: any) => c.text).join('\n');
      if (isNot)
        expect(texts).not.toContain(content);
      else
        expect(texts).toContain(content);
    } catch (e: any) {
      return {
        pass: isNot,
        message: () => e.message || 'Unknown error',
      };
    }
    return {
      pass: !isNot,
      message: () => ``,
    };
  },
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> {
      toContainTextContent(expected: string): R;
      toHaveTextContent(expected: string | RegExp): R;
    }
  }
}
