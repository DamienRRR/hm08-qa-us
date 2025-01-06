module.exports = {
    // All previous selectors stay the same
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cardCodeField: '#code',
    messageField: '#comment',
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: '.tcard-icon img[alt="Supportive"]',
    paymentMethodButton: '.pp-text',
    addCardButton: '.pp-plus',
    linkCardButton: '.button.full',
    orderButton: '.smart-button',
    phoneNumberModal: '.modal',
    blanketSwitch: '.r-sw-label*=Blanket and handkerchiefs',
    iceCreamPlusButton: '.counter-plus',
    searchModal: '.order-body',
    driverModal: '#root > div > div.order.shown > div.order-body',

    // Keep all previous functions the same
    fillAddresses: async function (from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },

    fillPhoneNumber: async function (phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },

    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code;
        await codeField.setValue(code);
        await $(this.confirmButton).click();
    },

    addPaymentMethod: async function (cardNumber, cardCode) {
        // Click payment method button
        const paymentButton = await $('.pp-text');
        await paymentButton.waitForDisplayed({ timeout: 10000 });
        await paymentButton.waitForClickable({ timeout: 10000 });
        await paymentButton.click();
        await browser.pause(2000);

        // Click add card button
        const plusButton = await $('.pp-plus');
        await plusButton.waitForDisplayed({ timeout: 10000 });
        await plusButton.waitForClickable({ timeout: 10000 });
        await plusButton.click();
        await browser.pause(2000);

        // Fill card details
        const cardNumberInput = await $('.card-input#number');
        await cardNumberInput.waitForDisplayed({ timeout: 10000 });
        await cardNumberInput.setValue(cardNumber);
        await browser.pause(1000);

        // Fill CVV
        const codeInput = await $('.card-input#code');
        await codeInput.waitForDisplayed({ timeout: 10000 });
        await codeInput.setValue(cardCode);
        await browser.pause(1000);

        // Move focus from CVV field
        await browser.keys(['Tab']);
        await browser.pause(3000);

        // Find specifically the Link button by text content
        const buttons = await $$('.button.full');
        let linkButton;

        for (const button of buttons) {
            const text = await button.getText();
            if (text === 'Link') {
                linkButton = button;
                break;
            }
        }

        if (!linkButton) {
            throw new Error('Link button not found');
        }

        // Click the Link button
        await linkButton.waitForClickable({ timeout: 10000 });
        await linkButton.click();
        await browser.pause(2000);

        // Find all close buttons and click the first visible one
        const closeButtons = await $$('button.close-button.section-close');

        for (const button of closeButtons) {
            const isDisplayed = await button.isDisplayed();
            const isClickable = await button.isClickable();

            if (isDisplayed && isClickable) {
                await button.click();
                break;
            }
        }

        await browser.pause(2000); // Wait for modal to close fully
    },

    handleRequirements: async function () {
        // First find the label by text
        const blanketLabel = await $(this.blanketSwitch);
        await blanketLabel.waitForDisplayed({ timeout: 10000 });
        await blanketLabel.scrollIntoView();
        await browser.pause(1000);

        // Now find the switch container within this section
        const switchElement = await blanketLabel.$('..//div[@class="switch"]');
        await switchElement.waitForDisplayed({ timeout: 10000 });
        await switchElement.click();
        await browser.pause(1000);

        // Get the input element and verify its checked state
        const input = await switchElement.$('input.switch-input');
        const isChecked = await input.isSelected();
        await expect(isChecked).toBe(true);
    },

    waitForDriver: async function () {
        // First wait for and verify the search modal
        const searchModal = await $(this.searchModal);
        await searchModal.waitForDisplayed({ timeout: 10000 });

        // Wait for enough time for the search countdown (36 seconds + buffer)
        await browser.pause(40000);  // 40 seconds total wait

        // Now wait for driver info modal
        const driverInfoModal = await $(this.driverModal);
        await driverInfoModal.waitForDisplayed({ timeout: 10000 }); // Additional timeout after the countdown
        await expect(driverInfoModal).toBeDisplayed();

        // Verify the modal has content
        const hasContent = await driverInfoModal.isExisting();
        await expect(hasContent).toBe(true);
    }
};