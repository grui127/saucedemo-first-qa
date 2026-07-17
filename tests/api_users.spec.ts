import { test, expect } from '@playwright/test';

// Cambiamos a esta API pública que no bloquea por IP ni exige tokens
const URL_BASE = 'https://jsonplaceholder.typicode.com';

test('Validar obtención de lista de usuarios vía API', async ({ request }) => {
    // 1. Enviamos la petición GET a /users
    const response = await request.get(`${URL_BASE}/users`);

    // Imprimimos para asegurar que ahora sí dé 200
    console.log("CÓDIGO DE ESTADO REAL:", response.status());

    // 2. Validamos que el Status Code sea 200 OK
    expect(response.status()).toBe(200);

    // 3. Convertimos la respuesta a JSON
    const responseBody = await response.json();

    // 4. Validamos que nos devuelva una lista (array) y que tenga elementos
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    // 5. Validamos que el primer usuario tenga el campo 'id' igual a 1
    expect(responseBody[0].id).toBe(1);
});