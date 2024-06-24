import { test, expect , type Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page.ts';
import {LandingPage} from '../pages/landing-page.ts';
import {
    BatchInfo,
    Configuration,
    EyesRunner,
    ClassicRunner,
    VisualGridRunner,
    BrowserType,
    DeviceName,
    ScreenOrientation,
    Eyes,
    Target
  } from '@applitools/eyes-playwright';

let loginPage: LoginPage;
let landingPage: LandingPage;  

//Applitools
//toggle between Ultrafast Grid runner and classic runner
export const USE_ULTRAFAST_GRID: boolean = true;
export let Batch: BatchInfo;
export let Config: Configuration;
export let Runner: EyesRunner;
let eyes: Eyes;
// end of Applitools

test.beforeAll(async() => {
    if (USE_ULTRAFAST_GRID){
        Runner = new VisualGridRunner({testConcurrency: 5})
    }
    else{
        Runner = new ClassicRunner();
    }

    Batch = new BatchInfo({name: 'ABN-AMRO Website'});
    Config = new Configuration();
    Config.setBatch(Batch);
    Config.addBrowsers(
        {name: BrowserType.EDGE_CHROMIUM, width: 800, height: 600},
        {name: BrowserType.CHROME, width: 800, height: 600},
        {name: BrowserType.FIREFOX, width: 1600, height: 1200},
        {name: BrowserType.SAFARI, width: 1024, height: 768},
        {chromeEmulationInfo: {deviceName: DeviceName.iPhone_11, screenOrientation: ScreenOrientation.PORTRAIT}},
        {chromeEmulationInfo: {deviceName: DeviceName.Nexus_10, screenOrientation: ScreenOrientation.LANDSCAPE}}
    )
});

test.beforeEach(async({page}) => {
    eyes = new Eyes(Runner, Config);

    //Start Applitools
    //Args: Page, App Name, Test Name, Viewport Size
    await eyes.open(
        page,
        'ABN-AMRO',
        test.info().title,
        {width: 1024, height: 768}
    );

    await page.goto('file://C:/Users/alexa/Desktop/application/index.html');
    loginPage = new LoginPage(page);
    //landingPage = new LandingPage(page);
});

test.afterEach(async() => {
    await eyes.close();
});

test.afterAll(async() => {
    const results = await Runner.getAllTestResults();
    console.log('Visual test results', results);
});

async function login(page: Page){
    await loginPage.loginSingleUser();
    landingPage = new LandingPage(page);
}

test.describe('ABN AMRO', () => {


    //Checking login page on different browsers, OS and devices with visual AI. Note: UGR looks a lot different
    //from Classic runner for both tests
    test('login page', async() => {
        await loginPage.assertPageTitle();
        await eyes.check('Login Page', Target.window().fully());
    });

    //Checking landing page on different browsers, OS and devices with visual AI
    test('landing page', async({page}) => {
        await login(page);
        landingPage.checkContent();
        await eyes.check('Landing Page', Target.window().fully().layout());
    });
});
