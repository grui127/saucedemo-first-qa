import { test, expect } from '@playwright/test';

test.describe('Pruebas de Responsive Design & Emulación Móvil', () => {

    test('1. Validar adaptación de interfaz y menú en dispositivo móvil', async ({ page, isMobile }) => {
        await page.goto('https://www.saucedemo.com/');

        // Logueo rápido
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(/inventory.html/);

        // Si el test corre en un proyecto emulado como móvil:
        if (isMobile) {
            console.log('📱 Ejecutando en entorno móvil emulado...');
            
            // Validamos que el menú lateral (hamburguesa) esté visible
            const menuBtn = page.locator('#react-burger-menu-btn');
            await expect(menuBtn).toBeVisible();

            // Simulamos un toque táctil (tap) sobre el botón del menú
            await menuBtn.tap();

            // Verificamos que se despliegue el panel de navegación
            const navMenu = page.locator('.bm-menu-wrap');
            await expect(navMenu).toHaveAttribute('aria-hidden', 'false');        } 
        else {
            console.log('🖥️ Ejecutando en entorno de escritorio...');
        }
    });

    test('2. Validar comportamiento en orientación Horizontal (Landscape)', async ({ page, playwright }) => {
        // Podemos sobreescribir el viewport para probar rotación de pantalla sobre la marcha
        await page.setViewportSize({ width: 844, height: 390 }); // iPhone en Landscape

        await page.goto('https://www.saucedemo.com/');
        
        const loginContainer = page.locator('.login_wrapper');
        await expect(loginContainer).toBeVisible();
    });

});