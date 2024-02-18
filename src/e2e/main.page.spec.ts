import { test as it, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import en from '../../i18n/en/common.json';

const { beforeEach, describe } = it;

describe('default locale', () => {
  describe('when not logged in', () => {
    it('has correct home page', async ({ page }) => {
      await page.goto('/en');
      // Nav
      await expect(page.getByText(en.Navbar.name)).toBeVisible();
      await expect(page.getByLabel(en.Navbar.LangSwitch.label)).toBeVisible();
      expect(
        page.getByRole('link', { name: en.Navbar.Login.login }),
      ).toBeVisible();

      // Main
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(
        page.getByRole('heading', { name: en.Home.titleSkills }),
      ).toBeVisible();

      // Footer
      expect(page.getByRole('link', { name: /github/i })).toBeVisible();
      expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
      expect(page.getByRole('link', { name: /contact/i })).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    describe('navbar', () => {
      it('can skip to main content', async ({ page }) => {
        await page.goto('/en');

        expect(page.getByText(en.Navbar.name)).toBeVisible();

        const skipLink = await page.waitForSelector('text=Skip to content');
        await skipLink.press('Enter');

        await expect(page).toHaveURL('/en#main');
      });
      it('can switch language', async ({ page }) => {
        await page.goto('/en');

        expect(page.getByText(en.Navbar.name)).toBeVisible();
        expect(page.getByLabel(en.Navbar.LangSwitch.label)).toBeVisible();

        await page.getByLabel(en.Navbar.LangSwitch.label).selectOption({
          value: 'fin',
        });

        const languages = await page.locator('#languageSwitch').textContent();
        await expect(languages?.includes('Suomeksi')).toBeTruthy;
        await expect(page).toHaveURL('/fin');
      });

      it('can log in', async ({ page }) => {
        await page.goto('/en');
        await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
      });
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

    it('has correct home page', async ({ page }) => {
      // Nav
      await expect(page.getByText(en.Navbar.name)).toBeVisible();
      await expect(page.getByLabel(en.Navbar.LangSwitch.label)).toBeVisible();
      expect(
        page.getByRole('link', { name: en.Navbar.Login.logout }),
      ).toBeVisible();

      // Main
      expect(page.getByRole('heading', { name: en.Home.title })).toBeVisible();
      expect(
        page.getByRole('heading', { name: en.Home.titleSkills }),
      ).toBeVisible();

      // Footer
      expect(page.getByRole('link', { name: /github/i })).toBeVisible();
      expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
      expect(page.getByRole('link', { name: /contact/i })).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
