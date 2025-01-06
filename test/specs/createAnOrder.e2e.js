const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
    // Increase timeout to 2 minutes to account for the 36-second wait plus other operations
    it('should complete full taxi order process', async function () {
        this.timeout(120000);  // Set timeout to 120 seconds (2 minutes)

        // 1. Set the address
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        // 2. Select Supportive plan
        const supportiveButton = await $(page.supportivePlanButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();

        // 3. Fill in and verify phone number
        const phoneNumber = '+1 234 567 89 00';
        await page.submitPhoneNumber(phoneNumber);

        // 4. Add credit card with exact format from placeholders
        await page.addPaymentMethod('1234 0000 4321', '12');

        // 5. Write message for driver
        const messageField = await $(page.messageField);
        await messageField.setValue('Please drive carefully');

        // 6. Order blanket and handkerchiefs (now with state verification)
        await page.handleRequirements();

        // 7. Order 2 ice creams
        const iceCreamPlus = await $(page.iceCreamPlusButton);
        await iceCreamPlus.waitForDisplayed();
        await iceCreamPlus.click();
        await iceCreamPlus.click();

        // 8. Submit order
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        // 9. Wait for both searching and driver modals
        await page.waitForDriver();
    });
});