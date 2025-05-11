class Login {
    constructor(page) {
        this.LologinButton = page.locator("//button[@type='submit']");
        this.LoUsernameInput = page.locator("//input[@id='input-v-2']");
        this.LoPasswordInput = page.locator("//input[@type='password']");
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

    async enterUserName(username) {
        return this.executeWithResult(async () => {
            await this.LoUsernameInput.waitFor({ state: 'visible' });
            await this.LoUsernameInput.fill(username);
        });
    }

    async enterUserPassword(password) {
        return this.executeWithResult(async () => {
            await this.LoPasswordInput.waitFor({ state: 'visible' });
            await this.LoPasswordInput.fill(password);
        });
    }

    async clickLoginButton() {
        return this.executeWithResult(async () => {
            await this.LologinButton.waitFor({ state: 'visible' });
            await this.LologinButton.click();
        });
    }
}

module.exports = { Login };