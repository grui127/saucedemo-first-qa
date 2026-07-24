# 1. Usamos la versión exacta que coincide con tu package.json
FROM mcr.microsoft.com/playwright:v1.61.1-jammy

# 2. Definimos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de configuración de dependencias
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm ci

# 5. Copiamos el código del proyecto
COPY . .

# 6. Comando por defecto al ejecutar el contenedor
CMD ["npx", "playwright", "test"]