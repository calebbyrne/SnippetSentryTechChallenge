// pages/user-list.js

const { time } = require("console");

class UserList {
    constructor(page) {
        this.page = page;
        // User List Page Locators
        this.LoAddUserButton = page.locator("//button[@id='button-addNewUser']");
        this.LoUserCreatedLoadingModal = page.locator("//*[@data-testid='toast-body']");  

        // User add button Drawer Locators
        this.LoEnterUserFirstNameField = page.locator("//input[@id='textfield-adduser-firstname']");
        this.LoEnterUserLastNameField = page.locator("//input[@id='textfield-adduser-lastname']");
        this.LoEnterUserEmailField = page.locator("//input[@id='textfield-adduser-email']");
        this.LoEnterUserPhoneField = page.locator("//input[@placeholder='Enter Mobile Number']");
        this.LoAdminCheckBox = page.locator("//input[@id='checkbox-adduser-admin']");
        this.LoSendEmailCheckBox = page.locator("//input[@aria-label='Send email invite']");
        this.LoSaveButton = page.locator("//*[@data-testid='save-user']");
        this.LoCancelButton = page.locator("//*[@data-testid='cancel-user-drawer']");
        this.LoCloseDrawerButton = page.locator("//button[@id='btn-closeAddUser']");
    }

    async executeWithResult(asyncFn) {
        try {
            await asyncFn();
            return '[Pass]';  
        } catch (error) {
            console.error('Error:', error);
            return '[Fail]';
        }
    }

    async validateCreationLoadingModalExistsAndCompletes() {
        await this.LoUserCreatedLoadingModal.waitFor({ state: 'visible' });
        await this.LoUserCreatedLoadingModal.waitFor({ state: 'hidden' });
        return this.LoUserCreatedLoadingModal;

    }

    async validateAdminRoleExists(firstName, lastName) {
        const adminEmailLocator = this.page.locator(`//span[text()='${firstName} ${lastName}']/ancestor::tr//td[@class="admin-icon"]`);
        await adminEmailLocator.waitFor({ state: 'visible' }); 
        return adminEmailLocator; 
    }

    // added an increased timeout to 20 seconds to allow for the loading modal to complete
    async validateUserCreatedExists(firstName, lastName) {
        const userLocator = this.page.locator(`//td//span[text()='${firstName} ${lastName}']`);
        await userLocator.waitFor({ state: 'visible', timeout: 20000 });
        return userLocator; 
    }

    // This takes in an enum of "Active", "Pending", or "Invited". There's a space in the Locator so you don't need to enter one.
    async validateNewUsersStatus(status) {
        const statusLocator = this.page.locator(`(//div[text()='${status} '])[1]`);
        await statusLocator.waitFor({ state: 'visible' }); 
        return statusLocator; 
    }
    
    async validateNewUsersPhoneExists(email) {
        const phoneLocator = this.page.locator(`//td[.//span[text()='${email}']]/following-sibling::td[contains(text(),'+15154569876')]`);
        await phoneLocator.waitFor({ state: 'visible' }); 
        return phoneLocator; 
    }
   
    async validateNewUsersEmailExists(email) {
        const emailLocator = this.page.locator(`//span[contains(text(),'${email}')]`);
        await emailLocator.waitFor({ state: 'visible' }); 
        return emailLocator; 
    }

    async validateEmailSent() {
        const adminEmailLocator = this.page.locator(`//td[@class='admin-icon']/following-sibling::td//span[text()='${firstName} ${lastName}']`);
        await adminEmailLocator.waitFor({ state: 'visible' }); 
        return adminEmailLocator; 
    }

    async clickAddUserButton() {
            await this.LoAddUserButton.waitFor({ state: 'visible' });
            await this.LoAddUserButton.click();
    }

    async enterUserFirstName(firstName) {
        return this.executeWithResult(async () => {
            await this.LoEnterUserFirstNameField.waitFor({ state: 'visible' });
            await this.LoEnterUserFirstNameField.fill(firstName);
        });
    }

    async enterUserLastName(lastName) {
        return this.executeWithResult(async () => {
            await this.LoEnterUserLastNameField.waitFor({ state: 'visible' });
            await this.LoEnterUserLastNameField.fill(lastName);
        });
    }   
   
    async enterUserEmail(email) {
        return this.executeWithResult(async () => {
            await this.LoEnterUserEmailField.waitFor({ state: 'visible' });
            await this.LoEnterUserEmailField.fill(email);
        });     
    }

    async enterUserPhone(phone) {
        return this.executeWithResult(async () => {
            await this.LoEnterUserPhoneField.waitFor({ state: 'visible' });
            await this.LoEnterUserPhoneField.fill(phone);
        });     
    }
    
    async clickAdminCheckBox() {
        return this.executeWithResult(async () => {
            await this.LoAdminCheckBox.waitFor({ state: 'visible' });
            await this.LoAdminCheckBox.click();
        });
    }
    
    async clickSendEmailCheckBox() {
        return this.executeWithResult(async () => {
            await this.LoSendEmailCheckBox.waitFor({ state: 'visible' });
            await this.LoSendEmailCheckBox.click();
        });
    }
    
    async clickSaveButton() {
        return this.executeWithResult(async () => {
            await this.LoSaveButton.waitFor({ state: 'visible' });
            await this.LoSaveButton.click();
        });
    }
    
    async clickCancelButton() {
        return this.executeWithResult(async () => {
            await this.LoCancelButton.waitFor({ state: 'visible' });
            await this.LoCancelButton.click();
        });
    }

    async clickCloseDrawerButton() {
        return this.executeWithResult(async () => {
            await this.LoCloseDrawerButton.waitFor({ state: 'visible' });
            await this.LoCloseDrawerButton.click();
        });
    }
};

module.exports = { UserList };