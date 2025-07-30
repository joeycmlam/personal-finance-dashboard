# Personal Finance Dashboard - Test Suite

This repository includes a comprehensive test suite built with Playwright MCP for end-to-end testing of the personal finance dashboard application.

## Test Coverage

The test suite covers the following areas:

### 1. Dashboard Navigation and UI (`tests/dashboard.spec.ts`)
- Main dashboard element rendering
- Page title and meta information
- Financial overview table headers
- Summary cards with financial metrics
- Add Entry button functionality

### 2. Financial Table Testing (`tests/financial-table.spec.ts`)
- Financial data display with proper formatting
- Liquidity calculations
- Percentage changes with indicators
- Asset allocation percentage calculations
- Currency formatting consistency
- Table scrolling on smaller screens

### 3. Add Entry Form Testing (`tests/add-entry-form.spec.ts`)
- Form opening and closing
- All required form fields display
- Form validation for required fields
- Numeric input acceptance
- Form submission handling
- Form clearing on cancel

### 4. Accessibility Testing (`tests/accessibility.spec.ts`)
- Proper heading structure
- Keyboard navigation support
- Accessible form labels
- ARIA roles and attributes
- Color contrast compliance
- Screen reader compatibility
- Focus management in modals

### 5. Responsiveness Testing (`tests/responsiveness.spec.ts`)
- Multiple viewport sizes (mobile, tablet, desktop)
- Table overflow handling on mobile
- Summary cards layout adaptation
- Readability at different zoom levels
- Form layout on mobile devices
- Touch target size compliance

### 6. Data Validation Testing (`tests/data-validation.spec.ts`)
- Liquidity calculation accuracy
- NAV (Net Asset Value) calculations
- Total asset calculations
- Percentage change calculations
- Asset allocation percentage validation
- Currency formatting consistency
- Date formatting validation
- Edge case handling (zero values)

## Setup and Installation

1. Install dependencies:
```bash
pnpm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

3. Start the development server:
```bash
pnpm dev
```

4. Run tests:
```bash
# Run all tests
pnpm test

# Run tests with browser UI
pnpm test:headed

# Run tests in debug mode
pnpm test:debug
```

## Test Configuration

The test suite uses Playwright MCP with the following configuration:

- **Test Directory**: `./tests`
- **Base URL**: `http://localhost:3000`
- **Browsers**: WebKit, Mobile Chrome
- **Parallel Execution**: Enabled for faster test runs
- **Retries**: 2 retries in CI environment
- **Trace**: Enabled on first retry for debugging

## Playwright MCP Integration

This test suite uses Playwright MCP (Model Context Protocol) which provides:

- Browser automation capabilities through structured commands
- Accessibility tree inspection
- Custom expect matchers for content validation
- Enhanced debugging and reporting features

## Financial Calculations Tested

The test suite validates the following financial calculations:

1. **Liquidity** = Available Cash + Cash MMF
2. **NAV ex Fixed Asset** = Available Cash + Cash MMF + Stock + Bitcoin + Bond/FD + Fund - Liabilities
3. **Total Asset** = Sum of all asset categories
4. **Asset Allocation Percentages** = Individual asset categories as percentage of total
5. **Percentage Changes** = Period-over-period changes in financial metrics

## Accessibility Standards

Tests ensure compliance with WCAG 2.1 AA standards including:

- Keyboard navigation support
- Screen reader compatibility
- Proper heading hierarchy
- Accessible form labels
- Sufficient color contrast
- Touch target size requirements (44px minimum)

## Browser Support

Tests run on:
- Desktop: Safari (WebKit)
- Mobile: Chrome (Pixel 5)
- Various viewport sizes from 375px to 1920px

## Continuous Integration

The test suite is configured to run in CI environments with:
- Automatic retry on failure
- Parallel execution disabled for stability
- HTML reporting for test results
- Trace collection for debugging failures
