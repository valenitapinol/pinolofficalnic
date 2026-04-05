import { supabase } from '../src/lib/supabase.js';
import inquirer from 'inquirer';
import chalk from 'chalk';
import FormData from 'form-data';
import fetch from 'node-fetch';

const BUCKET_NAME = 'product-images';

// Obtener el restaurante del usuario actual (asumiendo que la tabla 'restaurants' tiene user_id)
async function getRestaurantId() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No has iniciado sesión. Ejecuta pinol-cli login');
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('user_id', user.id)
    .single();
  if (!restaurant) throw new Error('No se encontró un restaurante asociado a tu usuario');
  return restaurant.id;
}

export async function createProduct() {
  try {
    const restaurantId = await getRestaurantId();
    const answers = await inquirer.prompt([
      { type: 'input', name: 'name', message: 'Nombre del producto:' },
      { type: 'input', name: 'description', message: 'Descripción:' },
      { type: 'number', name: 'price', message: 'Precio:' },
      { type: 'input', name: 'image_url', message: 'URL de la imagen (opcional):' }
    ]);
    const { name, description, price, image_url } = answers;
    const { data, error } = await supabase
      .from('products')
      .insert([{ restaurant_id: restaurantId, name, description, price, image_url }])
      .select();
    if (error) throw error;
    console.log(chalk.green('✅ Producto creado con ID:', data[0].id));
  } catch (err) {
    console.log(chalk.red('Error:', err.message));
  }
}

export async function listProducts() {
  try {
    const restaurantId = await getRestaurantId();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw error;
    if (data.length === 0) {
      console.log(chalk.yellow('No hay productos.'));
      return;
    }
    console.table(data.map(p => ({ ID: p.id, Nombre: p.name, Precio: p.price })));
  } catch (err) {
    console.log(chalk.red('Error:', err.message));
  }
}

export async function updateProduct() {
  try {
    const restaurantId = await getRestaurantId();
    const { data: products } = await supabase
      .from('products')
      .select('id, name')
      .eq('restaurant_id', restaurantId);
    if (!products.length) {
      console.log(chalk.yellow('No hay productos para actualizar.'));
      return;
    }
    const { productId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'productId',
        message: 'Selecciona producto a actualizar:',
        choices: products.map(p => ({ name: p.name, value: p.id }))
      }
    ]);
    const { field } = await inquirer.prompt([
      {
        type: 'list',
        name: 'field',
        message: '¿Qué campo actualizar?',
        choices: ['name', 'description', 'price', 'image_url']
      }
    ]);
    const { value } = await inquirer.prompt([
      { type: 'input', name: 'value', message: `Nuevo valor para ${field}:` }
    ]);
    const { error } = await supabase
      .from('products')
      .update({ [field]: field === 'price' ? parseFloat(value) : value })
      .eq('id', productId);
    if (error) throw error;
    console.log(chalk.green('✅ Producto actualizado'));
  } catch (err) {
    console.log(chalk.red('Error:', err.message));
  }
}

export async function deleteProduct() {
  try {
    const restaurantId = await getRestaurantId();
    const { data: products } = await supabase
      .from('products')
      .select('id, name')
      .eq('restaurant_id', restaurantId);
    if (!products.length) {
      console.log(chalk.yellow('No hay productos para eliminar.'));
      return;
    }
    const { productId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'productId',
        message: 'Selecciona producto a eliminar:',
        choices: products.map(p => ({ name: p.name, value: p.id }))
      }
    ]);
    const { confirm } = await inquirer.prompt([
      { type: 'confirm', name: 'confirm', message: '¿Eliminar permanentemente?' }
    ]);
    if (!confirm) return;
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) throw error;
    console.log(chalk.green('✅ Producto eliminado'));
  } catch (err) {
    console.log(chalk.red('Error:', err.message));
  }
}
