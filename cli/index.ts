#!/usr/bin/env node
import { program } from 'commander';
import { supabase } from '../src/lib/supabase.js';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { createProduct, listProducts, updateProduct, deleteProduct } from './products.js';

program
  .name('pinol-cli')
  .description('CLI para que restaurantes administren sus productos')
  .version('1.0.0');

program
  .command('login')
  .description('Iniciar sesión como restaurante')
  .action(async () => {
    const { email, password } = await inquirer.prompt([
      { type: 'input', name: 'email', message: 'Email:' },
      { type: 'password', name: 'password', message: 'Contraseña:' }
    ]);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log(chalk.red('Error:', error.message));
    } else {
      console.log(chalk.green('✅ Sesión iniciada como', data.user.email));
      // Guardar sesión en un archivo temporal (opcional)
    }
  });

program
  .command('logout')
  .description('Cerrar sesión')
  .action(() => {
    supabase.auth.signOut();
    console.log(chalk.green('✅ Sesión cerrada'));
  });

program
  .command('add-product')
  .description('Agregar un nuevo producto')
  .action(async () => {
    await createProduct();
  });

program
  .command('list-products')
  .description('Listar productos del restaurante')
  .action(async () => {
    await listProducts();
  });

program
  .command('update-product')
  .description('Actualizar un producto existente')
  .action(async () => {
    await updateProduct();
  });

program
  .command('delete-product')
  .description('Eliminar un producto')
  .action(async () => {
    await deleteProduct();
  });

program.parse();
