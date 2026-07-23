import { test, expect } from '@playwright/test';

test.describe('Pruebas de Regresión Visual', () => {

    test('Validar estado visual de la página de Login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        // Toma o compara la captura pixel a pixel contra la foto base
        await expect(page).toHaveScreenshot('login-baseline.png', {
            maxDiffPixelRatio: 0.02, // Tolerancia del 2% para ligeras variaciones de renderizado
        });
    });

    test('Validar componente aislado (Botón de Login)', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        
        // Compara únicamente el botón de login
        const loginButton = page.locator('#login-button');
        await expect(loginButton).toHaveScreenshot('boton-login.png');
    });

});

test('Validar pantalla tapando elementos dinámicos', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Localizamos los elementos que cambian o varían
    const elementoDinamico1 = page.locator('.login_logo'); // Ejemplo: logo o banner
    const elementoDinamico2 = page.locator('.login_credentials'); // Ejemplo: textos aleatorios

    // Tomamos la captura enmascarando esos elementos
    await expect(page).toHaveScreenshot('login-con-mask.png', {
        mask: [elementoDinamico1, elementoDinamico2], // Oculta estos elementos bajo un bloque de color

        
    });  
    await page.locator('.login_password').evaluate(el => el.style.visibility = 'hidden');
    await expect(page).toHaveScreenshot('sin-password.png');
});

