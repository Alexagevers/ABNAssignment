import { test, expect , type Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page.ts';
import {LandingPage} from '../pages/landing-page.ts';
import exp from 'constants';
import { userInfo } from 'os';

let loginPage: LoginPage;
let landingPage: LandingPage;

//Logging in with valid credentials. Expect to be able to continue to the next page
test('valid credentials', async ({page}) => {
  await page.goto('file://C:/Users/alexa/Desktop/application/index.html');
  await expect(page).toHaveTitle('Single Page Application');
  loginPage = new LoginPage(page);
  await loginPage.inputValidCredentials();
  landingPage = new LandingPage(page)
  await landingPage.checkContent();
}
)

//Logging in with invalid credentials. Expect to see an error
test('invalid credentials', async ({page}) => {
  await page.goto('file://C:/Users/alexa/Desktop/application/index.html');
  await expect(page).toHaveTitle('Single Page Application');
  loginPage = new LoginPage(page);
  await loginPage.inputInvalidCredentials();
  await expect(page.locator('#content')).not.toBeVisible();
}
)

