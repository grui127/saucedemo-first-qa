import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('Flujo completo de compra exitosa (E2E) con POM', async ({ page }) => {
    // Instanciamos todas las páginas que vamos a usar
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1. Login
    await loginPage.navegar();
    await loginPage.iniciarSesion('standard_user', 'secret_sauce');

    // 2. Agregar productos al carrito
    await productsPage.agregarProductoAlCarrito('Sauce Labs Backpack');
    await productsPage.agregarProductoAlCarrito('Sauce Labs Bike Light');
    
    // Validamos que el contador del carrito marque "2" antes de avanzar
    await expect(productsPage.shoppingCartBadge).toHaveText('2');
    await productsPage.irAlCarrito();

    // 3. Proceso de Checkout
    await checkoutPage.iniciarCheckout();
    await checkoutPage.completarFormulario('Gaston', 'QA', '1900'); // Código postal de La Plata
    await checkoutPage.finalizarCompra();

    // 4. Aserción final: Validar el mensaje de éxito en pantalla
    await expect(checkoutPage.successMessage).toHaveText('Thank you for your order!');
});