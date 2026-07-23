import { test, expect } from '@playwright/test';

test('Aislamiento Total - Interceptar red para simular caída del backend (Error 500)', async ({ page }) => {
    
    // 1. INTERCEPTACIÓN: Nos plantamos entre el navegador y el servidor
    // Le decimos a Playwright: "Cualquier petición que vaya a las APIs de la app, atrapala"
    await page.route('**/api/**', async route => {
        // En lugar de dejar que la petición viaje, la respondemos nosotros en caliente
        await route.fulfill({
            status: 500, // Código de error de servidor
            contentType: 'application/json',
            body: JSON.stringify({ error: 'Internal Server Error', message: 'Conexión con la base de datos fallida' })
        });
    });

    // 2. ACCIÓN: Navegamos a la aplicación (Cambiá por la URL de práctica que uses o Saucedemo si maneja API interna)
    await page.goto('https://www.saucedemo.com/');

    // 3. ASERCIÓN DE ROBUSTEZ:
    // Acá validarías que la interfaz maneje la crisis con gracia (un cartel de "Servidor no disponible", etc.)
    // Como Saucedemo es estática en su login, si corrés esto vas a ver que las peticiones backend fallan en la pestaña de Network de la consola de desarrollador (F12)
    
    console.log('Ruta interceptada con éxito. El backend real ya no puede afectar nuestro test.');
});