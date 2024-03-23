import { test as it, expect } from '@playwright/test';
import en from '../../i18n/en/common.json';
import fin from '../../i18n/fin/common.json';

const { beforeEach, describe } = it;

describe('default locale', () => {
  it('allows access to public pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en');
    await expect(page.getByText(en.Navbar.name)).toBeVisible();
    await expect(
      page.getByRole('heading', { name: en.Home.title }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: en.Home.titleSkills }),
    ).toBeVisible();
    expect(
      page.getByRole('link', { name: en.Navbar.Login.login }),
    ).toBeVisible();
  });

  it('prevents access to protected pages', async ({ page }) => {
    await page.goto('/en/admin');
    await expect(page).toHaveURL('en/login?callbackUrl=/en/admin');
  });

  it('fails with wrong credentials', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('random');
    await page.getByRole('textbox', { name: 'Password' }).fill('random');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('/en/login');
    page.getByRole('paragraph', {
      name: 'Invalid username or password.',
    });
  });

  describe('logged in as a user', () => {
    beforeEach(async ({ page }) => {
      await page.goto('/en');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByRole('textbox', { name: 'Username' }).fill('testuser');
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('testpassword');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByLabel('Username')).not.toBeVisible();
    });

    it('redirects to the home page', async ({ page }) => {
      await expect(page).toHaveURL('/en');
      await expect(page.getByText(en.Navbar.name)).toBeVisible();
      await expect(
        page.getByRole('heading', { name: en.Home.title }),
      ).toBeVisible();
      await expect(
        page.getByRole('heading', { name: en.Home.titleSkills }),
      ).toBeVisible();
      await expect(
        page.getByRole('link', { name: en.Navbar.Login.logout }),
      ).toBeVisible();
    });

    it('shows 404 not found for unknown translated pages', async ({ page }) => {
      await page.goto('/en/unknown');
      await expect(page.getByText(en.Common.notFound)).toBeVisible();
      await expect(page.getByText(en.Navbar.name)).toBeVisible();
    });

    it('can logout', async ({ page }) => {
      await page.getByRole('link', { name: 'Logout' }).click();
      // LOGOUT page
      await expect(page).toHaveURL('/en/logout');
      await expect(page.getByRole('heading', { name: 'Logout' })).toBeVisible();
      page.getByRole('button', { name: 'Logout' }).click();
      await expect(
        page.getByRole('heading', { name: 'Logout' }),
      ).not.toBeVisible();
      await expect(
        page.getByRole('link', { name: en.Navbar.Login.login }),
      ).toBeVisible();
    });
  });

  describe('logged in as an admin', () => {
    beforeEach(async ({ page }) => {
      await page.goto('/en');
      await page.getByRole('link', { name: 'Login' }).click();
      await page.getByRole('textbox', { name: 'Username' }).fill('adminuser');
      await page
        .getByRole('textbox', { name: 'Password' })
        .fill('adminpassword');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByLabel('Username')).not.toBeVisible();
    });

    it('redirects to the home page', async ({ page }) => {
      await expect(page).toHaveURL('/en');
      await expect(
        page.getByRole('link', { name: en.Navbar.Login.logout }),
      ).toBeVisible();
    });

    it('allows access to admin page', async ({ page }) => {
      await page.goto('/en/admin');
      await expect(page).toHaveURL('/en/admin');
      // TODO admin dashboard
    });

    it('can logout', async ({ page }) => {
      await page.getByRole('link', { name: 'Logout' }).click();
      // LOGOUT page
      await expect(page).toHaveURL('/en/logout');
      await expect(page.getByRole('heading', { name: 'Logout' })).toBeVisible();
      page.getByRole('button', { name: 'Logout' }).click();
      await expect(
        page.getByRole('heading', { name: 'Logout' }),
      ).not.toBeVisible();
      await expect(
        page.getByRole('link', { name: en.Navbar.Login.login }),
      ).toBeVisible();
    });
  });
});

describe('secondary locale', () => {
  it('allows access to public pages', async ({ page }) => {
    await page.goto('/fin');

    await expect(page).toHaveURL('/fin');
    await expect(page.getByText(fin.Navbar.name)).toBeVisible();
    expect(page.getByRole('heading', { name: fin.Home.title })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: fin.Home.titleSkills }),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: fin.Navbar.Login.login }),
    ).toBeVisible();
  });

  it('prevents access to protected pages', async ({ page }) => {
    await page.goto('/fin/admin');
    await expect(page).toHaveURL('/fin/login?callbackUrl=/fin/admin');
  });
});
