import { test, expect , type Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page.ts';

let loginPage: LoginPage;


test('valid credentials', async ({page}) => {
  await page.goto('file://C:/Users/alexa/Desktop/application/index.html');
  loginPage = new LoginPage(page);
  await loginPage.login();
  await expect(page.locator('#content')).toContainText('Lorem ipsum egestas');
}
)

