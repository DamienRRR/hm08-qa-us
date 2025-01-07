const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
    it('should complete full taxi order process', async function () {
        this.timeout(120000);

        // 1. Set the address
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');

        // 2. Select Supportive plan
        const supportiveButton = await $(page.supportivePlanButton);
        await supportiveButton.waitForDisplayed();
        await supportiveButton.click();
        await expect(supportiveButton).toBeDisplayed();

        // 3. Fill in and verify phone number
        const phoneNumber = '+1 234 567 89 00';
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();

        // 4. Add credit card
        await page.addPaymentMethod('1234 0000 4321', '12');
        const paymentMethod = await $('.pp-text');
        await expect(paymentMethod).toBeDisplayed();

        // 5. Write message for driver
        const messageField = await $(page.messageField);
        const driverMessage = 'Please drive carefully';
        await messageField.setValue(driverMessage);
        await expect(messageField).toHaveValue(driverMessage);

        // 6. Order blanket and handkerchiefs
        await page.handleRequirements();
        // Verification is inside handleRequirements function

        // 7. Order 2 ice creams
        const iceCreamPlus = await $(page.iceCreamPlusButton);
        await iceCreamPlus.waitForDisplayed();
        await iceCreamPlus.click();
        await iceCreamPlus.click();
        const counterValue = await $('.counter-value');
        await expect(counterValue).toHaveText('2');

        // 8. Submit order
        const orderButton = await $(page.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

        // 9. Wait for driver info
        await page.waitForDriver();
        const driverModal = await $(page.driverModal);
        await expect(driverModal).toBeDisplayed();
    });
});