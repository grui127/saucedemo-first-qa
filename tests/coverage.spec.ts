import { test, expect } from '@playwright/test';

test.describe('Medición de Cobertura de Código Frontend (V8 Coverage)', () => {

    test('1. Medir cobertura de JavaScript ejecutado durante el flujo de Login', async ({ page, browserName }) => {
        test.skip(browserName !== 'chromium', 'La API V8 Coverage solo está disponible en Chromium');

        // 1. Iniciar la recolección de cobertura V8 permitiendo reportes detallados
        await page.coverage.startJSCoverage({
            resetOnNavigation: false,
            reportAnonymousScripts: true
        });

        // 2. NAVEGACIÓN Y ACCIONES DEL TEST
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(/inventory.html/);

        // 3. Detener la recolección
        const coverage = await page.coverage.stopJSCoverage();

        // 4. CALCULAR COBERTURA DE BYTES REALES
        let totalBytes = 0;
        let usedBytes = 0;

        for (const entry of coverage) {
            const scriptText = entry.source || '';
            totalBytes += scriptText.length;

            // En la API V8 de Playwright, los rangos ejecutados están dentro de entry.functions
            if (entry.functions) {
                for (const func of entry.functions) {
                    for (const range of func.ranges) {
                        // Si el rango se ejecutó al menos 1 vez (count > 0)
                        if (range.count > 0) {
                            usedBytes += (range.endOffset - range.startOffset);
                        }
                    }
                }
            }
        }

        const percentageNum = totalBytes > 0 ? (usedBytes / totalBytes) * 100 : 0;
        const percentageStr = percentageNum.toFixed(2);

        console.log(`\n==================================================`);
        console.log(`📊 REPORTE DE COBERTURA FRONTEND (V8):`);
        console.log(`   - Total JS cargado: ${totalBytes} bytes`);
        console.log(`   - JS ejecutado por el test: ${usedBytes} bytes`);
        console.log(`   - Porcentaje de Cobertura: ${percentageStr}%`);
        console.log(`==================================================\n`);

        // Aserción de Calidad: ahora que medimos range.startOffset / range.endOffset debe ser > 0
        expect(percentageNum).toBeGreaterThan(0);
    });

});