import { test, expect } from '@playwright/test';

test('Validar control y aserciones en múltiples pestañas simultáneas', async ({ page, context }) => {
    // 1. Navegamos a la página principal del escenario
    await page.goto('https://the-internet.herokuapp.com/windows');

    // 2. CONFIGURAMOS EL PROMISE PARA CAPTURAR LA NUEVA PESTAÑA
    // Le decimos al contexto del navegador que se prepare para recibir una nueva página (pestaña)
    const nuevaPestanaPromise = context.waitForEvent('page');

    // 3. HACEMOS CLIC EN EL LINK QUE ABRE LA NUEVA PESTAÑA
    await page.locator('text=Click Here').click();

    // 4. ASIGNAMOS LA NUEVA PESTAÑA A UNA VARIABLE
    // El 'await' acá espera a que la promesa se resuelva y nos dé el control de la pestaña nueva
    const nuevaPestana = await nuevaPestanaPromise;

    // 5. TRABAJAMOS EN LA NUEVA PESTAÑA
    // Validamos que el texto dentro de la nueva pestaña sea el esperado
    const tituloNuevaPestana = nuevaPestana.locator('h3');
    await expect(tituloNuevaPestana).toHaveText('New Window');

    // 6. VOLVEMOS A LA PESTAÑA ORIGINAL
    // Para demostrar que seguimos teniendo el control de la primera, validamos su título
    const tituloOriginal = page.locator('h3');
    await expect(tituloOriginal).toHaveText('Opening a new window');
});