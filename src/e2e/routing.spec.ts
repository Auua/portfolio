import { test as it, expect } from '@playwright/test';
import en from '../../i18n/en/common.json';
import fin from '../../i18n/fin/common.json';

const { beforeEach, describe } = it;

describe('default locale', () => {
  it('allows access to public pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/en');
    await expect(page.getByText(en.Navbar.name)).toBeVisible();
    expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
    expect(
      page.getByRole('heading', { name: en.Home.titleSkills }),
    ).toBeVisible();
    expect(page.getByRole('option', { name: 'English' })).toBeVisible();
    expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  it('prevents access to protected pages', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(
      '/api/auth/signin?callbackUrl+=https%3A%2F%2Flocalhost%3A3000%2Fadmin',
    );
  });

  it('fails with wrong credentials', async ({ page }) => {
    await page.goto('/api/auth/signin?callbackUrl=%2Fen');
    await page.getByRole('textbox', { name: 'Username' }).fill('random');
    await page.getByRole('textbox', { name: 'Password' }).fill('random');
    await page
      .getByRole('button', { name: 'Sign in with Credentials' })
      .click();
    await expect(page).toHaveURL('/api/auth/signin?error=CredentialsSignin');
    page.getByRole('paragraph', {
      name: ' Sign in failed. Check the details you provided are correct.',
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
      await page
        .getByRole('button', { name: 'Sign in with Credentials' })
        .click();
    });

    it('redirects to the home page', async ({ page }) => {
      await expect(page).toHaveURL('/en');
      expect(page.getByText(en.Navbar.name)).toBeVisible();
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(
        page.getByRole('heading', { name: en.Home.titleSkills }),
      ).toBeVisible();
      expect(page.getByRole('option', { name: 'English' })).toBeVisible();
      expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    });

    it('allows access to protected pages', async ({ page }) => {
      await page
        .getByRole('link', { name: 'Secret page for logged in users' })
        .click();
      await expect(page).toHaveURL('/admin');
      expect(page.getByText(en.Navbar.name)).toBeVisible();
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(
        page.getByRole('heading', { name: en.Home.titleSkills }),
      ).toBeVisible();
      expect(page.getByRole('option', { name: 'English' })).toBeVisible();
      expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    });

    it('shows 404 not found for unknown translated pages', async ({ page }) => {
      await page.goto('/en/unknown');
      await expect(page.getByText(en.Common.notFound)).toBeVisible();
      expect(page.getByText(en.Navbar.name)).toBeVisible();
    });

    it('can logout', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click();
      // LOGOUT page
      await expect(page).toHaveURL('/en');
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
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
      await page
        .getByRole('button', { name: 'Sign in with Credentials' })
        .click();
    });

    it('redirects to the home page', async ({ page }) => {
      await expect(page).toHaveURL('/en');
      expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
    });

    it('allows access to admin page', async ({ page }) => {
      await page.goto('/en/admin');
      await expect(page).toHaveURL('/en/admin');
      // TODO admin dashboard
    });

    it('can logout', async ({ page }) => {
      await page.getByRole('button', { name: 'Logout' }).click();
      // LOGOUT page
      await expect(page).toHaveURL('/en');
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    });
  });
});

describe('secondary locale', () => {
  it('allows access to public pages', async ({ page }) => {
    await expect(page).toHaveURL('/fin');
    await expect(page.getByText(fin.Navbar.name)).toBeVisible();
    expect(page.getByRole('heading', { name: fin.Home.title })).toBeVisible();
    expect(
      page.getByRole('heading', { name: fin.Home.titleSkills }),
    ).toBeVisible();
    expect(page.getByRole('option', { name: 'Suomeksi' })).toBeVisible();
    expect(page.getByRole('button', { name: 'Kirjaudu ulos' })).toBeVisible();
  });

  it('prevents access to protected pages', async ({ page }) => {
    await page.goto('/fin/admin');
    await expect(page).toHaveURL(
      '/api/auth/signin?callbackUrl+=https%3A%2F%2Flocalhost%3A3000%2fin%2Fadmin',
    );
  });
});
