import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test('Validaciones avanzadas en el catálogo con Soft Assertions y Esperas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navegar();
    await loginPage.iniciarSesion('standard_user', 'secret_sauce');

    // Usamos el método de espera dinámica que armamos
    await productsPage.esperarAQueElCarritoEsteListo();

    // ---- SOFT ASSERTIONS ----
    // Si una de estas aserciones falla, el test NO se detiene. Sigue ejecutando y te avisa al final.
    // Esto sirve para chequear múltiples elementos de la interfaz de un solo tiro.
    
    // 1. Validamos que el título de la página sea el correcto
    await expect.soft(page).toHaveTitle('Swag Labs');

    // 2. Validamos que la URL contenga la palabra 'inventory'
    await expect.soft(page).toHaveURL(/.*inventory/);

    // 3. Agregamos un producto y validamos el estado del botón
    await productsPage.agregarProductoAlCarrito('Sauce Labs Backpack');
    const botonRemover = page.locator('#remove-sauce-labs-backpack');
    await expect.soft(botonRemover).toHaveText('Remove');
});