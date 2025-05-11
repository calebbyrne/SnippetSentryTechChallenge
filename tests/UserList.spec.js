// tests/login.spec.js

const { test, expect } = require('@playwright/test');
const { UserList } = require('../pages/UserList');
const { Login } = require('../pages/Login');
const { RandomGenerator } = require('../helpers/RandomGenerator');

test('TC01: Can add a user with no Admin Role, no invite sent, and no phone number', async ({ page }) => {
  const firstName = await RandomGenerator.randomString(7);
  const lastName = await RandomGenerator.randomString(7);
  const randomEmail = await RandomGenerator.randomEmail(7);

  // Navigate to the login page and log in
  const login = new Login(page);
  await page.goto('https://beta.snippetsentry.com/app/client/users');
  await login.enterUserName('calebmbyrne@gmail.com');
  await login.enterUserPassword('Elizabeth2!');
  await login.clickLoginButton();
  await expect(page).toHaveURL('https://beta.snippetsentry.com/app/client/users');

  //Add a new user with Admin role
  const userList = new UserList(page);
  await expect(userList.LoAddUserButton).toBeVisible();
  await userList.clickAddUserButton();
  await userList.enterUserFirstName(firstName);
  await userList.enterUserLastName(lastName);
  await userList.enterUserEmail(randomEmail);
  await userList.clickSaveButton();
  await userList.validateCreationLoadingModalExistsAndCompletes();
  await userList.validateUserCreatedExists(firstName,lastName);
  await userList.validateNewUsersStatus('Pending');
  await userList.validateNewUsersEmailExists(randomEmail);
});

test('TC02: Can add a user with Admin Role, Email Sent and', async ({ page }) => {
  const firstName = await RandomGenerator.randomString(7);
  const lastName = await RandomGenerator.randomString(7);
  const randomEmail = await RandomGenerator.randomEmail(7);
  const phoneNumber = "+15154569876";

  // Navigate to the login page and log in
  const login = new Login(page);
  await page.goto('https://beta.snippetsentry.com/app/client/users');
  await login.enterUserName('calebmbyrne@gmail.com');
  await login.enterUserPassword('Elizabeth2!');
  await login.clickLoginButton();
  await expect(page).toHaveURL('https://beta.snippetsentry.com/app/client/users');

  //Add a new user with an Admin role, email sent, and a phone number
  const userList = new UserList(page);
  await expect(userList.LoAddUserButton).toBeVisible();
  await userList.clickAddUserButton();
  await userList.enterUserFirstName(firstName);
  await userList.enterUserLastName(lastName);
  await userList.enterUserEmail(randomEmail);
  await userList.enterUserPhone(phoneNumber);
  await userList.clickAdminCheckBox();
  await userList.clickSendEmailCheckBox();
  await userList.clickSaveButton();
  await userList.validateCreationLoadingModalExistsAndCompletes();
  await userList.validateUserCreatedExists(firstName,lastName);
  await userList.validateAdminRoleExists(firstName,lastName);
  await userList.validateNewUsersStatus('Invited');
  await userList.validateNewUsersEmailExists(randomEmail);
  await userList.validateNewUsersPhoneExists(randomEmail);
});

test('TC03: Close drawer and Close button work', async ({ page }) => {
  const firstName = await RandomGenerator.randomString(7);
  const lastName = await RandomGenerator.randomString(7);
  const randomEmail = await RandomGenerator.randomEmail(7);
  const phoneNumber = "+15154569876";

  // Navigate to the login page and log in
  const login = new Login(page);
  await page.goto('https://beta.snippetsentry.com/app/client/users');
  await login.enterUserName('calebmbyrne@gmail.com');
  await login.enterUserPassword('Elizabeth2!');
  await login.clickLoginButton();
  await expect(page).toHaveURL('https://beta.snippetsentry.com/app/client/users');

  //Add a new user list page and close the drawer
  const userList = new UserList(page);
  await expect(userList.LoAddUserButton).toBeVisible();
  await userList.clickAddUserButton();
  await userList.clickCancelButton();
  await expect(userList.LoSaveButton).not.toBeVisible();
  await userList.clickAddUserButton();
  await userList.clickCloseDrawerButton();
  await expect(userList.LoSaveButton).not.toBeVisible();
});