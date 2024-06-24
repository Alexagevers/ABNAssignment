import { type Locator, type Page, expect } from '@playwright/test';
import {LandingPage} from '../pages/landing-page.ts';

let landingPage: LandingPage

interface Credentials{
    username: string;
    password: string;
}

const validCredentials: Credentials[] = [
    {username: 'admin@admin.com', password: '2020'},
    {username: 'biancunha@gmail.com', password: '123456'},
    {username: 'growdev@growdev.com.br', password: 'growdev123'}
];


const invalidCredentials: Credentials [] = [
    {username: 'Test', password: 'Test'},
    {username: 'Test', password: '2020'},
    {username: 'admin@admin.com', password: 'Test'}
];


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

    async inputValidCredentials(){
        for (const validCredential of validCredentials){
            const username = validCredential.username;
            const password = validCredential.password;
        await this.email_field.fill(username);
        await this.password_field.fill(password);
        await this.loginButton.click();
        landingPage = new LandingPage(this.page);
        await landingPage.logOut();
        };
    }

    async inputInvalidCredentials(){
        for (const invalidCredential of invalidCredentials){
            const username = invalidCredential.username;
            const password = invalidCredential.password;
        await this.email_field.fill(username);
        await this.password_field.fill(password);
        await this.loginButton.click();
        };


    }

    async inputEmail(){
        await this.email_field.fill(validCredentials.forEach.name);
    }

    //async inputPassword(){
    //    await this.password_field.fill();
    //}

    //async clickLogin(){
    //    await this.loginButton.click();
    //}

    async login(){
        await this.inputEmail();
        //await this.inputPassword();
        //await this.clickLogin();
    }

}

export default LoginPage;