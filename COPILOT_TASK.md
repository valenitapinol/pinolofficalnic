# Tarea global: Revisar y arreglar completamente el proyecto PinolApp Delivery para que compile la APK y la web funcione

El proyecto actual no logra compilar la APK en GitHub Actions debido a errores de versión de Java y posiblemente otras configuraciones. Tu misión es revisar TODO el repositorio y aplicar las correcciones necesarias para que el workflow `Build APK` (`.github/workflows/main.yml`) termine exitosamente y genere el archivo `app-debug.apk`. Además, debes asegurar que la aplicación web funcione correctamente localmente (con `npm run dev`).

## Problemas conocidos
- Error recurrente: `invalid source release: 21` al compilar el módulo Android.
- El proyecto parece estar configurado con Java 17 en algunos lugares y con Java 21 en otros.
- Pueden existir problemas adicionales de dependencias o de sintaxis en los archivos de Gradle.

## Objetivos específicos
1. **Unificar la versión de Java a 21** en todo el proyecto Android:
   - En `android/build.gradle` (raíz) debe forzarse `sourceCompatibility = JavaVersion.VERSION_21` y `targetCompatibility = JavaVersion.VERSION_21` para todos los subproyectos.
   - En `android/app/build.gradle` también debe estar `compileOptions` con Java 21.
   - El workflow `.github/workflows/main.yml` debe usar `java-version: '21'`.

2. **Verificar que el workflow de Actions esté bien escrito**:
   - Debe incluir pasos para eliminar `capacitor.config.ts` y la carpeta `android` antes de `npx cap add android`.
   - Debe usar `npx cap` en lugar de `npm cap`.
   - Debe usar `npm ci` o `npm install` según convenga.

3. **Resolver cualquier error de sintaxis en los archivos TypeScript** que pueda impedir el `npm run build`. Ya hay correcciones parciales, pero asegúrate de que no haya errores.

4. **Probar la compilación localmente (si es posible)** o al menos verificar que el workflow se ejecuta sin errores.

5. **Generar la APK exitosamente** y dejar el artefacto disponible.

6. **Desplegar la web en Vercel** (si se proporcionan credenciales, o al menos dejar el proyecto listo para desplegar con `vercel --prod`).

## Entorno
- Repositorio: `https://github.com/valenitapinol/pinolofficalnic`
- Rama: `main`
- Workflow existente: `.github/workflows/main.yml`
- Secrets de Supabase ya configurados en el repositorio (no necesitas modificarlos).

## Acciones esperadas por tu parte
- Ejecuta `git pull` para obtener la última versión.
- Examina los archivos de Gradle y YAML.
- Realiza las modificaciones necesarias.
- Ejecuta el workflow de Actions (puedes activarlo vía API o esperar a que se ejecute con el push).
- Si el workflow falla, analiza los logs y corrige iterativamente hasta que sea exitoso.
- Una vez exitoso, confirma que el artefacto `app-debug.apk` se genera.
- Opcionalmente, despliega en Vercel usando `vercel --prod` (necesitarás loguearte).

¡Comienza cuando estés listo!
