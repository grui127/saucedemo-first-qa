import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'; // Importamos nuestra clase

test('Login exitoso con POM', async ({ page }) => {
    const loginPage = new LoginPage(page); // Instanciamos el objeto

    await loginPage.navegar();
    await loginPage.iniciarSesion('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Login fallido con usuario bloqueado con POM', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navegar();
    await loginPage.iniciarSesion('locked_out_user', 'secret_sauce');

    // Validamos usando el localizador que guardamos en la clase
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});