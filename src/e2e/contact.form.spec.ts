import { test as it, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import en from '../../i18n/en/common.json';

const { describe } = it;

describe('contact form,', () => {
  describe('as a modal', () => {
    it('opens normally', async ({ page }) => {
      await page.goto('/en');

      await page.getByRole('link', { name: /contact/i }).click();
      await page.waitForSelector('#skeletonModal', { state: 'visible' });

      // Header
      await expect(
        page.getByRole('heading', { name: en.Footer.form.title }),
      ).toBeVisible();

      // Form fields
      expect(page.getByLabel(/Name/i)).toBeVisible();
      expect(page.getByLabel(/Company/i)).toBeVisible();
      expect(page.getByLabel(/Email/i)).toBeVisible();
      expect(page.getByLabel(/Message/i)).toBeVisible();

      // Buttons
      await expect(page.getByRole('button', { name: /reset/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /return/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /send/i })).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });

  describe('as a page', () => {
    it('opens normally', async ({ page }) => {
      await page.goto('/en/contact');

      // Header
      await expect(
        page.getByRole('heading', { name: en.Footer.form.title }),
      ).toBeVisible();

      // Form fields
      expect(page.getByLabel(/Name/i)).toBeVisible();
      expect(page.getByLabel(/Company/i)).toBeVisible();
      expect(page.getByLabel(/Email/i)).toBeVisible();
      expect(page.getByLabel(/Message/i)).toBeVisible();

      // Buttons
      expect(page.getByRole('button', { name: /reset/i })).toBeVisible();
      expect(page.getByRole('button', { name: /return/i })).toBeVisible();
      expect(page.getByRole('button', { name: /send/i })).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    it('validates errors correctly', async ({ page }) => {
      await page.goto('/en/contact');

      // Header
      await expect(
        page.getByRole('heading', { name: en.Footer.form.title }),
      ).toBeVisible();

      // Form fields
      const nameField = page.getByLabel(/Name/i);
      const companyField = page.getByLabel(/Company/i);
      const emailField = page.getByLabel(/Email/i);
      const messageField = page.getByLabel(/Message/i);

      await nameField.fill('NotCorrect');
      await companyField.fill('1');
      await emailField.fill('email@email');
      await messageField.fill('e');

      await page.getByRole('button', { name: /send/i }).click();

      await expect(page.getByText(en.Footer.form.fullName)).toBeVisible();
      expect(page.getByText(en.Footer.form.validEmail)).toBeVisible();
      expect(page.getByText(en.Footer.form.companyName)).toBeVisible();
      expect(page.getByText(en.Footer.form.messageLength)).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });

    it('validates error and sends after correction', async ({ page }) => {
      await page.goto('/en/contact');

      // Header
      await expect(
        page.getByRole('heading', { name: en.Footer.form.title }),
      ).toBeVisible();

      // Form fields
      const nameField = page.getByLabel(/Name/i);
      const companyField = page.getByLabel(/Company/i);
      const emailField = page.getByLabel(/Email/i);
      const messageField = page.getByLabel(/Message/i);

      await nameField.fill('NotCorrect');
      await companyField.fill('Company');
      await emailField.fill('email@email.com');
      await messageField.fill('This is a test message');

      await page.getByRole('button', { name: /send/i }).click();

      await expect(page.getByText(en.Footer.form.fullName)).toBeVisible();

      await nameField.fill('Correct Fullname');
      await page.getByRole('button', { name: /send/i }).click();
      await expect(page.getByText(en.Footer.form.fullName)).not.toBeVisible();
      await expect(
        page.getByText(en.Footer.form.thankYouSuccess),
      ).toBeVisible();

      const accessibilityScanResults = await new AxeBuilder({
        page,
      }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
