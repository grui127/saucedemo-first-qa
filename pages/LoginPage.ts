import { Locator, Page } from '@playwright/test';

export class LoginPage {
    // Definimos los atributos de la clase (los elementos de la pantalla)
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        // Inicializamos los selectores en el constructor
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('.error-message-container');
    }

    // Definimos los métodos (las acciones que se pueden hacer en el Login)
    async navegar() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async iniciarSesion(usuario: string, clave: string) {
        await this.usernameInput.fill(usuario);
        await this.passwordInput.fill(clave);
        await this.loginButton.click();
    }
}