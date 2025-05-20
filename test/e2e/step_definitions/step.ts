import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import CustomWorld from '../support/world';

Before(async function (this: CustomWorld) {
  await this.openBrowser();
});
After(async function (this: CustomWorld) {
  await this.closeBrowser();
});

// --- Registro & Login ---

Given('que estoy en la página de registro', async function (this: CustomWorld) {
  await this.page.goto('http://localhost:3000/register');
});
Given('que estoy en la página de inicio de sesión', async function (this: CustomWorld) {
  await this.page.goto('http://localhost:3000/login');
});

When('ingreso nombre de usuario {string}', async function (this: CustomWorld, u) {
  await this.page.fill('input[name="username"]', u);
});
When('ingreso correo {string}', async function (this: CustomWorld, e) {
  await this.page.fill('input[name="email"]', e);
});
When('ingreso contraseña {string}', async function (this: CustomWorld, p) {
  await this.page.fill('input[name="password"]', p);
});
When('confirmo la contraseña {string}', async function (this: CustomWorld, p) {
  await this.page.fill('input[name="confirmPassword"]', p);
});
When('hago clic en {string}', async function (this: CustomWorld, btn) {
  await this.page.click(`text=${btn}`);
});

Then('veo el mensaje {string}', async function (this: CustomWorld, msg) {
  await expect(this.page.locator(`text=${msg}`)).toBeVisible();
});
Then('mi cuenta queda creada en el sistema', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/login|\/dashboard/);
});
Then('soy redirigido al dashboard', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/dashboard/);
});
Then('veo un saludo {string}', async function (this: CustomWorld, saludo) {
  await expect(this.page.locator(`text=${saludo}`)).toBeVisible();
});
Then('sigo en la página de login', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/\/login/);
});

// --- Gestión de perfil ---

Given('que estoy autenticado como {string}', async function (this: CustomWorld, user) {
  // login por UI con datos fijos de prueba
  await this.page.goto('http://localhost:3000/login');
  await this.page.fill('input[name="email"]', `${user}@mail.com`);
  await this.page.fill('input[name="password"]', 'Secreto123!');
  await this.page.click('text=Iniciar sesión');
  await expect(this.page).toHaveURL(/\/dashboard/);
});
Given('estoy en la sección {string}', async function (this: CustomWorld, sección) {
  await this.page.click(`text=${sección}`);
});

When('hago clic en "Editar nombre"', async function (this: CustomWorld) {
  await this.page.click('text=Editar nombre');
});
When('cambio el nombre a {string}', async function (this: CustomWorld, nuevo) {
  await this.page.fill('input[name="profileName"]', nuevo);
});
When('guardo los cambios', async function (this: CustomWorld) {
  await this.page.click('text=Guardar');
});
Then('el nombre de perfil muestra {string}', async function (this: CustomWorld, nuevo) {
  await expect(this.page.locator('.profile-name')).toHaveText(nuevo);
});

// --- Gestión de comunidades ---

Given('estoy en la página "Crear comunidad"', async function (this: CustomWorld) {
  await this.page.goto('http://localhost:3000/r/home/create');
});
When('ingreso nombre {string}', async function (this: CustomWorld, name) {
  await this.page.fill('input[name="communityName"]', name);
});
When('escribo descripción {string}', async function (this: CustomWorld, desc) {
  await this.page.fill('textarea[name="description"]', desc);
});
When('hago clic en "Crear"', async function (this: CustomWorld) {
  await this.page.click('text=Crear');
});
Then('soy redirigido a la página de la comunidad {string}', async function (this: CustomWorld, name) {
  await expect(this.page.locator('h1')).toHaveText(name);
});
Then('veo la descripción {string}', async function (this: CustomWorld, desc) {
  await expect(this.page.locator('text=' + desc)).toBeVisible();
});

Given('que soy el moderador de {string}', async function (this: CustomWorld, name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  await this.page.goto(`http://localhost:3000/communities/${slug}`);
});
Given('estoy en la página de la comunidad', async function (this: CustomWorld) {
  await expect(this.page.locator('h1')).toBeVisible();
});
When('hago clic en "Editar descripción"', async function (this: CustomWorld) {
  await this.page.click('text=Editar descripción');
});
When('cambio la descripción a {string}', async function (this: CustomWorld, desc) {
  await this.page.fill('textarea[name="description"]', desc);
});
Then('la descripción muestra {string}', async function (this: CustomWorld, desc) {
  await expect(this.page.locator('.community-description')).toHaveText(desc);
});

// --- Publicaciones y votaciones ---

Given('que estoy en la página de la comunidad {string}', async function (this: CustomWorld, name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  await this.page.goto(`http://localhost:3000/communities/${slug}`);
});
When('hago clic en "Nuevo post"', async function (this: CustomWorld) {
  await this.page.click('text=Nuevo post');
});
When('ingreso título {string}', async function (this: CustomWorld, t) {
  await this.page.fill('input[name="title"]', t);
});
When('escribo contenido {string}', async function (this: CustomWorld, c) {
  await this.page.fill('textarea[name="content"]', c);
});
When('publico el post', async function (this: CustomWorld) {
  await this.page.click('text=Publicar');
});
Then('veo el post con título {string}', async function (this: CustomWorld, t) {
  await expect(this.page.locator(`text=${t}`)).toBeVisible();
});
Then('el contenido aparece debajo', async function (this: CustomWorld) {
  await expect(this.page.locator('.post-content').last()).toBeVisible();
});
Given('que veo un post titulado {string}', async function (this: CustomWorld, t) {
  await expect(this.page.locator(`text=${t}`)).toBeVisible();
});
When('hago clic en el botón "Me gusta"', async function (this: CustomWorld) {
  await this.page.click('button[aria-label="Me gusta"]');
});
Then('el contador de votos sube en {int}', async function (this: CustomWorld, v) {
  await expect(this.page.locator('.vote-count')).toHaveText(v.toString());
});

// --- Sistema de recompensas ---

Given('voy a "Configuración > Wallet"', async function (this: CustomWorld) {
  await this.page.click('text=Configuración');
  await this.page.click('text=Wallet');
});
When('ingreso dirección de wallet {string}', async function (this: CustomWorld, addr) {
  await this.page.fill('input[name="walletAddress"]', addr);
});
When('confirmo la inscripción', async function (this: CustomWorld) {
  await this.page.click('text=Conectar wallet');
});
Then('veo "Wallet conectada: {string}"', async function (this: CustomWorld, addr) {
  await expect(this.page.locator(`text=Wallet conectada: ${addr}`)).toBeVisible();
});
Then('la opción de ver saldo de recompensas', async function (this: CustomWorld) {
  await expect(this.page.locator('text=Saldo de recompensas')).toBeVisible();
});
Given('que he votado en un post', async function (this: CustomWorld) {
  await this.page.click('button[aria-label="Me gusta"]');
});
Given('mi wallet está inscrita', async function () {
  /* ya se hizo arriba */
});
When('finaliza el proceso de validación', async function (this: CustomWorld) {
  await this.page.waitForTimeout(3000);
});
Then('recibo notificación {string}', async function (this: CustomWorld, msg) {
  await expect(this.page.locator(`text=${msg}`)).toBeVisible();
});
Then('mi saldo de recompensas aumenta en {int}', async function (this: CustomWorld, pts) {
  await expect(this.page.locator(`text=${pts}`)).toBeVisible();
});

// --- Acceso multiplataforma ---

Given('que abro la app en un dispositivo móvil', async function (this: CustomWorld) {
  await this.page.setViewportSize({ width: 375, height: 812 });
  await this.page.goto('http://localhost:3000');
});
Given('que abro la app en un ordenador', async function (this: CustomWorld) {
  await this.page.setViewportSize({ width: 1280, height: 800 });
  await this.page.goto('http://localhost:3000');
});
When('navego al dashboard', async function (this: CustomWorld) {
  await this.page.click('text=Dashboard');
});
Then('todos los menús y botones se adaptan a la pantalla pequeña', async function (this: CustomWorld) {
  const sw = await this.page.evaluate(() => document.documentElement.scrollWidth);
  const cw = await this.page.evaluate(() => document.documentElement.clientWidth);
  expect(sw).toBeLessThanOrEqual(cw);
});
Then('no hay barras de desplazamiento horizontales', async function (this: CustomWorld) {
  const sw = await this.page.evaluate(() => document.documentElement.scrollWidth);
  const cw = await this.page.evaluate(() => document.documentElement.clientWidth);
  expect(sw).toBeLessThanOrEqual(cw);
});
Then('el menú lateral está siempre visible', async function (this: CustomWorld) {
  await expect(this.page.locator('#sidebar')).toBeVisible();
});
Then('el contenido ocupa todo el ancho disponible', async function (this: CustomWorld) {
  const sw = await this.page.evaluate(() => document.documentElement.scrollWidth);
  const cw = await this.page.evaluate(() => document.documentElement.clientWidth);
  expect(sw).toBeLessThanOrEqual(cw);
});
