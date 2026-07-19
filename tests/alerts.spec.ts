import { test, expect } from '@playwright/test';

test('Validar captura y aceptación de alertas nativas de JavaScript', async ({ page }) => {
    // 1. Navegamos a una página de práctica de alertas
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // 2. CONFIGURAMOS EL ESCUCHADOR (Listener) ANTES DE HACER CLIC
    // Le decimos a Playwright: "Cuando aparezca una alerta, ejecutá este bloque de código"
    page.on('dialog', async dialog => {
        // Validamos que el texto que muestra la alerta sea el esperado
        expect(dialog.message()).toBe('I am a JS Alert');
        
        // Aceptamos la alerta (equivale a hacer clic en "OK" o "Aceptar")
        await dialog.accept();
    });

    // 3. DISPARAMOS LA ALERTA
    // Hacemos clic en el botón que levanta la primera alerta de la página
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    // 4. ASERCIÓN FINAL
    // Validamos que la página muestre el mensaje de que la alerta se procesó con éxito
    const resultado = page.locator('#result');
    await expect(resultado).toHaveText('You successfully clicked an alert');
});