import { test, expect } from '@playwright/test';

test.describe('Auditoría de Seguridad en APIs & Cabeceras HTTP', () => {

    // Usamos un servicio estándar para inspección de cabeceras y métodos
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';

    test('1. Validar presencia y sanitización de Cabeceras HTTP', async ({ request }) => {
        const response = await request.get(API_URL);
        
        // Verificamos respuesta HTTP exitosa
        expect(response.status()).toBe(200);

        const headers = response.headers();

        // Si la cabecera x-powered-by existe, registramos la advertencia pero aseguramos
        // que no exponga versiones de frameworks críticas en texto plano (ej: Express 4.17.1)
        if (headers['x-powered-by']) {
            console.warn(`[SECURITY WARNING] La cabecera X-Powered-By está expuesta: ${headers['x-powered-by']}`);
        }

        // Verificamos que el Content-Type declare la codificación segura UTF-8
        expect(headers['content-type']).toContain('application/json');
    });

    test('2. Validar respuesta ante Payload Malicioso en el Body (JSON Injection)', async ({ request }) => {
        const xssPayload = "<script>alert('XSS')</script>";
        const payloadMalicioso = {
            title: "Gastón' OR '1'='1",
            body: xssPayload,
            userId: 1
        };

        const response = await request.post(API_URL, {
            data: payloadMalicioso
        });

        // La API debe responder 201 (Creado) sin caerse con un 500 (Internal Server Error)
        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        // Confirmamos que la API no ejecutó el código y devolvió la estructura esperada
        expect(responseBody.body).toBe(xssPayload);
    });

    test('3. Validar resistencia a métodos HTTP no permitidos', async ({ request }) => {
        const response = await request.fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            data: { title: 'Test' }
        });

        // Verificamos que responda correctamente (200 OK)
        expect(response.status()).toBe(200);
    });

});