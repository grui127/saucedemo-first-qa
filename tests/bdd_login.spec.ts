import { test, expect } from '@playwright/test';

test.describe('Feature: Autenticación de Usuarios en la Tienda', () => {

    test('Escenario: Inicio de sesión exitoso con credenciales estándar', async ({ page }) => {
        
        // GIVEN (Dado que)
        await test.step('Dado que el usuario navega a la página de login', async () => {
            await page.goto('https://www.saucedemo.com/');
            await expect(page).toHaveTitle(/Swag Labs/);
        });

        // WHEN (Cuando)
        await test.step('Cuando el usuario ingresa usuario y contraseña válidos', async () => {
            await page.locator('#user-name').fill('standard_user');
            await page.locator('#password').fill('secret_sauce');
            await page.locator('#login-button').click();
        });

        // THEN (Entonces)
        await test.step('Entonces debería ser redirigido al inventario de productos', async () => {
            await expect(page).toHaveURL(/inventory.html/);
            const title = page.locator('.title');
            await expect(title).toHaveText('Products');
        });

    });

});