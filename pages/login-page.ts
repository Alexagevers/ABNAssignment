import { type Locator, type Page, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    email_field: Locator;
    password_field: Locator;
    readonly loginButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.email_field = page.locator('#email');
        this.password_field = page.locator('#password');
        this.loginButton = page.getByRole('button');
    }

    async inputEmail(){
        await this.email_field.fill('admin@admin.com');
    }

    async inputPassword(){
        await this.password_field.fill('2020');
    }

    async clickLogin(){
        await this.loginButton.click();
    }

    async login(){
        await this.inputEmail();
        await this.inputPassword();
        await this.clickLogin();
    }

}

export default LoginPage;