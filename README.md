# Automated testing for the Urban Routes app

## Description
This project implements automated testing for the Urban.Routes taxi ordering application. Using WebdriverIO with Mocha framework, the tests verify the complete taxi ordering process from address entry to driver assignment.

## Technologies and Techniques Used
- **WebDriverIO**: Main test automation framework
- **Mocha**: Test runner and framework
- **Page Object Pattern**: For better test organization and maintenance
- **Visual Studio Code**: IDE for development and test execution
- **JavaScript**: Programming language used
- **Git**: Version control system

## Development Environment Setup

### Prerequisites
1. Install Node.js (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node -v`

2. Install npm (comes with Node.js)
   - Verify installation: `npm -v`

3. Install Visual Studio Code
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Setting Up WebDriverIO
1. Create project directory:
   ```bash
   mkdir hm08-qa-us
   cd hm08-qa-us
   ```

2. Initialize npm:
   ```bash
   npm init -y
   ```

3. Install WebDriverIO CLI:
   ```bash
   npm install @wdio/cli
   ```

4. Set up WebDriverIO configuration:
   ```bash
   npx wdio config
   ```

5. Install additional dependencies:
   ```bash
   npm install @wdio/mocha-framework @wdio/spec-reporter
   ```

## Project Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:username/hm08-qa-us.git
   ```

2. Navigate to project directory:
   ```bash
   cd hm08-qa-us
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests in Visual Studio Code
1. Open the project:
   ```bash
   code .
   ```

2. Open Terminal in VS Code:
   - Use `` Ctrl + ` `` or
   - Navigate to "Terminal → New Terminal"

3. Run the test:
   ```bash
   npx wdio run ./wdio.conf.js --spec ./test/specs/createAnOrder.e2e.js
   ```

## Project Structure
- `test/specs/`
  - `createAnOrder.e2e.js`: Main test file containing the end-to-end test
- `page.js`: Page object containing selectors and methods
- `helper.js`: Helper functions
- `wdio.conf.js`: WebDriverIO configuration
- `package.json`: Project dependencies

## Test Coverage
The automated test verifies:
1. Setting pickup and dropoff addresses
2. Selecting Supportive plan
3. Phone number verification
4. Credit card payment method
5. Driver message functionality
6. Additional services (blanket and ice cream)
7. Search modal verification
8. Driver assignment confirmation

## Troubleshooting
If encountering chromedriver issues:
1. Download the replacement files archive
2. Replace package.json and wdio.conf.js
3. Run `npm install`

VS Code-specific issues:
- For PowerShell script execution:
  ```powershell
  Set-ExecutionPolicy RemoteSigned
  ```
- If terminal doesn't recognize commands:
  1. Close VS Code
  2. Reopen as administrator

## Notes
- The test includes necessary wait times for elements
- Implements state verification for interactive elements
- Handles both immediate interactions and longer waits (36-second countdown)
- Uses proper error handling
- Follows page object pattern best practices
