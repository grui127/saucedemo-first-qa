import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('#checkout');
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.successMessage = page.locator('.complete-header');
    }

    async iniciarCheckout() {
        await this.checkoutButton.click();
    }

    async completarFormulario(nombre: string, apellido: string, codigoPostal: string) {
        await this.firstNameInput.fill(nombre);
        await this.lastNameInput.fill(apellido);
        await this.postalCodeInput.fill(codigoPostal);
        await this.continueButton.click();
    }

    async finalizarCompra() {
        await this.finishButton.click();
    }
}