import { db } from './prisma/db.ts';
import { getProductsService, createProductService } from './services/product.service.js';

const productosParaInsertar = [
  {
    nombre: 'Auriculares Inalámbricos Pro',
    precio: 149.99,
    cantidad: 25,
    descripcion: 'Auriculares bluetooth con cancelación activa de ruido híbrida, audio espacial y estuche de carga rápida con 35 horas de batería.',
  },
  {
    nombre: 'Teclado Mecánico RGB 60%',
    precio: 89.50,
    cantidad: 40,
    descripcion: 'Teclado mecánico switches ópticos lineales, diseño compacto sin teclado numérico, teclas PBT de doble inyección para gaming.',
  },
  {
    nombre: 'Mouse Ergonómico Vertical',
    precio: 39.99,
    cantidad: 30,
    descripcion: 'Mouse inalámbrico vertical con conectividad dual Bluetooth y 2.4GHz, sensor óptico de 4000 DPI para reducir tensión en la muñeca.',
  },
  {
    nombre: 'Monitor Curvo Gaming 34" UltraWide',
    precio: 450.00,
    cantidad: 12,
    descripcion: 'Pantalla curva resolución WQHD 3440x1440 con panel VA, tasa de refresco 165Hz, tiempo de respuesta 1ms y compatibilidad FreeSync.',
  },
  {
    nombre: 'Silla Ergonómica de Oficina',
    precio: 199.00,
    cantidad: 15,
    descripcion: 'Silla con soporte lumbar ajustable, malla transpirable de alta densidad, reposabrazos 3D y reclinación hasta 135 grados para largas jornadas.',
  },
  {
    nombre: 'Micrófono de Condensador USB',
    precio: 69.90,
    cantidad: 20,
    descripcion: 'Micrófono cardioide profesional para podcast y streaming, salida de auriculares para monitoreo sin latencia y filtro antipop integrado.',
  },
  {
    nombre: 'Webcam 4K con Autoenfoque',
    precio: 110.00,
    cantidad: 18,
    descripcion: 'Cámara web resolución Ultra HD 4K a 60fps con sensor avanzado, corrección automática de poca luz y micrófonos estéreo con cancelación de ruido.',
  },
  {
    nombre: 'Disco Sólido Externo SSD 1TB',
    precio: 105.00,
    cantidad: 50,
    descripcion: 'Unidad SSD portátil ultrarrápida con velocidad de transferencia NVMe de hasta 1050 MB/s, carcasa resistente a caídas y puerto USB-C 3.2.',
  },
  {
    nombre: 'Hub USB-C 8 en 1 Multipuerto',
    precio: 45.00,
    cantidad: 60,
    descripcion: 'Adaptador USB-C con salida HDMI 4K a 60Hz, lector de tarjetas SD y TF, puerto Ethernet Gigabit RJ45 y carga rápida Power Delivery de 100W.',
  },
  {
    nombre: 'Barra de Luz LED para Monitor Screenbar',
    precio: 49.99,
    cantidad: 35,
    descripcion: 'Lámpara de monitor con iluminación asimétrica sin reflejos en pantalla, control táctil de temperatura de color y brillo regulable.',
  },
  {
    nombre: 'Altavoz Bluetooth Portátil Resistente al Agua',
    precio: 59.95,
    cantidad: 28,
    descripcion: 'Altavoz inalámbrico compacto con sonido envolvente 360 grados, bajos reforzados, certificación contra agua IP67 y 20 horas de reproducción.',
  },
  {
    nombre: 'Mochila Antirrobo para Portátil 15.6"',
    precio: 34.90,
    cantidad: 45,
    descripcion: 'Mochila impermeable para transporte de laptops con cremalleras ocultas, candado TSA integrado y puerto exterior de carga USB.',
  },
];


async function seed() {
  let insertados = 0;
  let omitidos = 0;
  let fallidos = 0;

  try {
    // Comprueba los nombres existentes antes de generar embeddings o insertar.
    const resultado = await getProductsService();

    if (resultado.status !== 200) {
      throw new Error('No se pudieron consultar los productos existentes.');
    }

    const nombresExistentes = new Set(
      resultado.data.map((producto) => producto.nombre.trim().toLowerCase()),
    );

    for (const producto of productosParaInsertar) {
      const nombre = producto.nombre.trim().toLowerCase();

      if (nombresExistentes.has(nombre)) {
        omitidos++;
        console.log(`Omitido: ${producto.nombre}`);
        continue;
      }

      const respuesta = await createProductService(producto);

      if (respuesta.status === 201) {
        insertados++;
        nombresExistentes.add(nombre);
        console.log(`Insertado: ${producto.nombre}`);
      } else {
        fallidos++;
        process.exitCode = 1;
        console.error(`Fallido: ${producto.nombre} (estado ${respuesta.status}).`);
      }
    }
  } catch {
    fallidos = productosParaInsertar.length - insertados - omitidos;
    process.exitCode = 1;
    console.error('No se pudo completar el seed. Comprueba la conexión y los permisos de lectura.');
  } finally {
    // Cierra las conexiones incluso si ocurre un error.
    try {
      await db.close();
    } catch {
      process.exitCode = 1;
      console.error('No se pudo cerrar el cliente de base de datos correctamente.');
    }

    console.log(`Insertados: ${insertados}. Omitidos: ${omitidos}. Fallidos: ${fallidos}.`);
  }
}

await seed();

