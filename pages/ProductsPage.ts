import { Locator, Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly inventoryList: Locator;
    readonly shoppingCartBadge: Locator;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryList = page.locator('.inventory_list');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
    }

    // Método para agregar un producto al carrito usando su nombre técnico en el botón
    async agregarProductoAlCarrito(nombreProducto: string) {
        // Convierte "Sauce Labs Backpack" en "sauce-labs-backpack" para armar el ID del botón
        const idBoton = nombreProducto.toLowerCase().replace(/ /g, '-');
        await this.page.locator(`#add-to-cart-${idBoton}`).click();
    }

    async irAlCarrito() {
        await this.shoppingCartLink.click();
    }
}