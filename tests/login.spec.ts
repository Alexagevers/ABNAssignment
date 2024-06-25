import { test, expect , type Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page.ts';
import {LandingPage} from '../pages/landing-page.ts';
import exp from 'constants';
import { userInfo } from 'os';

let loginPage: LoginPage;
let landingPage: LandingPage;

test.beforeEach(async({page}) => {
  await page.goto('file://C:/Users/alexa/Desktop/application/index.html');
  loginPage = new LoginPage(page);
  await loginPage.assertPageTitle();
  landingPage = new LandingPage(page);
});

//Logging in with 3 different valid credentials. Expect to be able to continue to the next page
test('valid credentials', async ({page}) => {
  await loginPage.inputValidCredentials();
  landingPage = new LandingPage(page)
  await landingPage.checkContent();
}
)

//Logging in with 3 different invalid credentials. Expected to not be able to continue. Would preferably
//see a userfull error message
test('invalid credentials', async ({page}) => {
  await loginPage.inputInvalidCredentials();
  await expect(landingPage.content).not.toBeVisible();
}
)

//These next 3 test cases are not yet part of the application. Maybe these could be negotiated
//during a refinement session. These will fail for now, unless the last assertion will be disabled.
test('missing username', async({page}) => {
  await loginPage.loginMissingUsername();
  await expect(landingPage.content).not.toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(loginPage.missingUsernameMessage);
}
)

test('missing password', async({page}) => {
  await loginPage.loginMissingPassword();
  await expect(landingPage.content).not.toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(loginPage.missingPasswordMessage);
}
)

test('missing username and password', async({page}) => {
  await loginPage.loginMissingUsernameAndPassword();
  await expect(landingPage.content).not.toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(loginPage.missingUsernameAndPasswordMessage);
}
)

