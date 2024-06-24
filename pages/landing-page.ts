import { type Locator, type Page, expect } from '@playwright/test';

export class LandingPage{

    readonly page: Page;
    readonly content: Locator;
    readonly userInfo: Locator;
    readonly signOut: Locator; 

    constructor(page: Page){
        this.page = page;
        this.content = page.locator('#content');
        this.userInfo = page.locator('#user');
        this.signOut = page.locator('#logout');
    }

    async checkContent(){
        await expect(this.content).toContainText('Lorem ipsum egestas');
    }

    async logOut(){
        await this.userInfo.click();
        await this.signOut.click();
    }

}