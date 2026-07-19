import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Validar la subida automatizada de archivos', async ({ page }) => {
    // 1. Creamos un archivo de texto de prueba local dinámicamente
    const rutaArchivo = path.join(__dirname, 'archivo_prueba_gaston.txt');
    fs.writeFileSync(rutaArchivo, 'Este es un archivo de prueba para el framework de automatización.');

    // 2. Navegamos a la página de práctica de subida de archivos
    await page.goto('https://the-internet.herokuapp.com/upload');

    // 3. INYECTAMOS EL ARCHIVO EN EL INPUT
    // Buscamos el elemento de tipo 'file' usando su ID y le pasamos la ruta de nuestro txt
    await page.locator('#file-upload').setInputFiles(rutaArchivo);

    // 4. HACEMOS CLIC EN EL BOTÓN DE SUBIR
    await page.locator('#file-submit').click();

    // 5. ASERCIÓN FINAL
    // Validamos que la página confirme el éxito de la subida y muestre el nombre de nuestro archivo
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toContainText('archivo_prueba_gaston.txt');

    // 6. LIMPIEZA (Opcional)
    // Borramos el archivo de nuestra computadora para no dejar basura local
    fs.unlinkSync(rutaArchivo);
});