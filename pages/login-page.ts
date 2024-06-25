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
    readonly pageTitle: RegExp;
    readonly automationText: Locator;
    readonly errorMessage: Locator; //expecting to have a general id for any (popup) message
    readonly invalidCredentialsErrorMessage: RegExp;
    readonly missingUsernameMessage: RegExp;
    readonly missingPasswordMessage: RegExp;
    readonly missingUsernameAndPasswordMessage: RegExp;

    constructor(page: Page){
        this.page = page;
        this.email_field = page.locator('#email');
        this.password_field = page.locator('#password');
        this.loginButton = page.getByRole('button');
        this.pageTitle = /Single Page Application/;
        this.automationText = page.locator('//h1');
        //these error messages are not yet in place, but they could be something that comes out of
        //refinement sessions
        this.errorMessage = page.locator('#message');
        this.invalidCredentialsErrorMessage = /Wrong username or password/;
        this.missingUsernameMessage = /Username is missing/;
        this.missingPasswordMessage = /Password is missing/;
        this.missingUsernameAndPasswordMessage = /Username and password are missing/;
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
        }
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async assertAutomationText() {
        await expect(this.automationText).toHaveText("Automation doesn't stop at testing, it's just a beginning!");
    }

    async loginSingleUser(){
        await this.email_field.fill('biancunha@gmail.com');
        await this.password_field.fill('123456');
        await this.loginButton.click();
    }

    async loginMissingUsername(){
        await this.password_field.fill('123456');
        await this.loginButton.click();
    }

    async loginMissingPassword(){
        await this.email_field.fill('biancunha@gmail.com');
        await this.loginButton.click();
    }

    async loginMissingUsernameAndPassword(){
        await this.password_field.fill('123456');
        await this.loginButton.click();
    }
}

export default LoginPage;