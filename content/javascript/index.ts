import type { Cheatcode } from '../types'

export const javascriptCheatcode: Cheatcode = {
  metadata: {
    id: 'javascript',
    title: 'JavaScript',
    language: 'JavaScript',
    category: 'language',
    tags: ['javascript', 'frontend', 'backend'],
    version: 'ES2025',
    description: 'Guía completa de JavaScript: variables, funciones, arrays, objetos, async/await, DOM, ES2025 y más',
    lastUpdated: '2025-11-26',
    logo: '/logos/javascript.svg',
    color: '#F7DF1E',
    difficulty: 'intermediate',
  },
  sections: [
    // ============================================
    // VARIABLES Y TIPOS DE DATOS
    // ============================================
    {
      id: 'variables',
      title: 'Variables y Declaración',
      type: 'code',
      code: {
        title: 'Declaración de Variables',
        language: 'javascript',
        description: 'Tres formas de declarar variables en JavaScript moderno.',
        code: `// let - ámbito de bloque, reasignable
let contador = 0;
contador = 1; // ✅ OK

// const - ámbito de bloque, NO reasignable
const PI = 3.14159;
const usuario = { nombre: 'Juan' };
usuario.nombre = 'María'; // ✅ OK (el objeto es mutable)
// usuario = {};           // ❌ Error (no se puede reasignar)

// var - ámbito de función (evitar usar)
var maneraAntigua = 'obsoleto';

// Declaración múltiple
let a = 1, b = 2, c = 3;
const [x, y] = [10, 20];

// Ámbito de bloque vs función
if (true) {
  let bloqueado = 'solo aquí';
  var escapado = 'visible fuera';
}
// console.log(bloqueado); // ❌ Error
// console.log(escapado);  // ✅ 'visible fuera'`,
      },
    },

    // ============================================
    // TIPOS DE DATOS
    // ============================================
    {
      id: 'data-types',
      title: 'Tipos de Datos Primitivos',
      type: 'table',
      table: {
        title: 'Los 7 Tipos Primitivos de JavaScript',
        headers: ['Tipo', 'Ejemplo', 'Descripción'],
        rows: [
          { Tipo: 'String', Ejemplo: '"hola", \'mundo\', `template`', Descripción: 'Texto, cadenas de caracteres' },
          { Tipo: 'Number', Ejemplo: '42, 3.14, -7, Infinity, NaN', Descripción: 'Números enteros y decimales' },
          { Tipo: 'Boolean', Ejemplo: 'true, false', Descripción: 'Valores lógicos' },
          { Tipo: 'Undefined', Ejemplo: 'undefined', Descripción: 'Variable declarada sin valor' },
          { Tipo: 'Null', Ejemplo: 'null', Descripción: 'Ausencia intencional de valor' },
          { Tipo: 'Symbol', Ejemplo: 'Symbol("id")', Descripción: 'Identificador único e inmutable' },
          { Tipo: 'BigInt', Ejemplo: '9007199254740991n', Descripción: 'Enteros de precisión arbitraria' },
        ],
      },
    },

    // ============================================
    // CONVERSIÓN DE TIPOS
    // ============================================
    {
      id: 'type-conversion',
      title: 'Conversión de Tipos',
      type: 'code',
      code: {
        title: 'Conversión Explícita e Implícita',
        language: 'javascript',
        description: 'Cómo convertir entre diferentes tipos de datos.',
        code: `// A String
String(123);          // "123"
(123).toString();     // "123"
123 + '';             // "123" (coerción)

// A Number
Number('123');        // 123
Number('12.34');      // 12.34
Number('abc');        // NaN
parseInt('123px');    // 123 (ignora no-numérico)
parseFloat('12.34');  // 12.34
+'123';               // 123 (operador unario +)

// A Boolean
Boolean(1);           // true
Boolean(0);           // false
Boolean('');          // false (string vacío)
Boolean('hola');      // true
Boolean(null);        // false
Boolean(undefined);   // false
Boolean([]);          // true (array vacío es truthy)
Boolean({});          // true (objeto vacío es truthy)
!!valor;              // Conversión rápida a boolean

// Valores Falsy (se convierten a false)
// false, 0, -0, 0n, "", null, undefined, NaN

// Valores Truthy (todo lo demás)
// Incluyendo: [], {}, "0", "false", -1, Infinity`,
      },
    },

    // ============================================
    // STRINGS
    // ============================================
    {
      id: 'strings',
      title: 'Métodos de Strings',
      type: 'code',
      code: {
        title: 'Operaciones Comunes con Strings',
        language: 'javascript',
        description: 'Métodos más utilizados para manipular cadenas de texto.',
        code: `const str = 'Hola Mundo';

// Longitud y acceso
str.length;              // 10
str[0];                  // 'H'
str.charAt(0);           // 'H'
str.at(-1);              // 'o' (último carácter)

// Conversión de mayúsculas/minúsculas
str.toLowerCase();       // 'hola mundo'
str.toUpperCase();       // 'HOLA MUNDO'

// Búsqueda
str.includes('Mundo');   // true
str.startsWith('Hola');  // true
str.endsWith('Mundo');   // true
str.indexOf('o');        // 1 (primera ocurrencia)
str.lastIndexOf('o');    // 9 (última ocurrencia)
str.search(/mundo/i);    // 5 (búsqueda con regex)

// Extracción
str.slice(0, 4);         // 'Hola'
str.slice(-5);           // 'Mundo' (desde el final)
str.substring(0, 4);     // 'Hola'

// Modificación (retorna nuevo string)
str.replace('Mundo', 'JS');    // 'Hola JS'
str.replaceAll('o', '0');      // 'H0la Mund0'
str.trim();                    // quita espacios al inicio/final
str.trimStart();               // quita espacios al inicio
str.trimEnd();                 // quita espacios al final
str.padStart(15, '-');         // '-----Hola Mundo'
str.padEnd(15, '-');           // 'Hola Mundo-----'
str.repeat(2);                 // 'Hola MundoHola Mundo'

// División y unión
str.split(' ');                // ['Hola', 'Mundo']
['Hola', 'Mundo'].join(' ');   // 'Hola Mundo'

// Template literals (interpolación)
const nombre = 'Juan';
const saludo = \`Hola, \${nombre}!\`;  // 'Hola, Juan!'
const multi = \`
  Línea 1
  Línea 2
\`;`,
      },
    },

    // ============================================
    // NÚMEROS
    // ============================================
    {
      id: 'numbers',
      title: 'Números y Math',
      type: 'code',
      code: {
        title: 'Operaciones Numéricas y el Objeto Math',
        language: 'javascript',
        description: 'Trabajando con números y funciones matemáticas.',
        code: `// Operadores aritméticos
10 + 5;   // 15 (suma)
10 - 5;   // 5 (resta)
10 * 5;   // 50 (multiplicación)
10 / 5;   // 2 (división)
10 % 3;   // 1 (módulo/resto)
10 ** 2;  // 100 (exponenciación)

// Operadores de asignación
let n = 10;
n += 5;   // n = 15
n -= 3;   // n = 12
n *= 2;   // n = 24
n /= 4;   // n = 6
n++;      // n = 7 (incremento)
n--;      // n = 6 (decremento)

// Métodos de Number
Number.isInteger(42);      // true
Number.isFinite(Infinity); // false
Number.isNaN(NaN);         // true
Number.parseFloat('3.14'); // 3.14
Number.parseInt('42px');   // 42

// Formateo de números
(3.14159).toFixed(2);      // '3.14' (string)
(1234.5).toLocaleString('es-ES'); // '1.234,5'
(0.5).toLocaleString('es-ES', { style: 'percent' }); // '50 %'
(99.99).toLocaleString('es-ES', {
  style: 'currency', currency: 'EUR'
}); // '99,99 €'

// Objeto Math
Math.PI;                   // 3.141592653589793
Math.E;                    // 2.718281828459045
Math.round(4.5);           // 5 (redondeo normal)
Math.floor(4.9);           // 4 (redondeo hacia abajo)
Math.ceil(4.1);            // 5 (redondeo hacia arriba)
Math.trunc(4.9);           // 4 (quita decimales)
Math.abs(-5);              // 5 (valor absoluto)
Math.max(1, 5, 3);         // 5
Math.min(1, 5, 3);         // 1
Math.pow(2, 3);            // 8 (potencia)
Math.sqrt(16);             // 4 (raíz cuadrada)
Math.random();             // 0.0 - 0.999... (aleatorio)

// Número aleatorio entre min y max
const aleatorio = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;`,
      },
    },

    // ============================================
    // ARRAYS
    // ============================================
    {
      id: 'arrays',
      title: 'Arrays: Métodos Esenciales',
      type: 'code',
      code: {
        title: 'Operaciones con Arrays',
        language: 'javascript',
        description: 'Métodos fundamentales para trabajar con arrays.',
        code: `const arr = [1, 2, 3, 4, 5];

// Acceso
arr[0];              // 1
arr.at(-1);          // 5 (último elemento)
arr.length;          // 5

// Agregar/Quitar elementos (mutan el array)
arr.push(6);         // Agrega al final → [1,2,3,4,5,6]
arr.pop();           // Quita del final → [1,2,3,4,5]
arr.unshift(0);      // Agrega al inicio → [0,1,2,3,4,5]
arr.shift();         // Quita del inicio → [1,2,3,4,5]
arr.splice(2, 1);    // Quita 1 desde índice 2 → [1,2,4,5]
arr.splice(2, 0, 3); // Inserta 3 en índice 2 → [1,2,3,4,5]

// Búsqueda
arr.includes(3);     // true
arr.indexOf(3);      // 2
arr.findIndex(x => x > 3); // 3 (índice del primero que cumple)
arr.find(x => x > 3);      // 4 (elemento que cumple)

// Verificación
arr.some(x => x > 3);  // true (alguno cumple)
arr.every(x => x > 0); // true (todos cumplen)
Array.isArray(arr);    // true

// Transformación (retornan nuevo array)
arr.map(x => x * 2);       // [2, 4, 6, 8, 10]
arr.filter(x => x > 2);    // [3, 4, 5]
arr.slice(1, 4);           // [2, 3, 4] (extrae porción)
arr.concat([6, 7]);        // [1, 2, 3, 4, 5, 6, 7]
arr.flat();                // Aplana arrays anidados
arr.flatMap(x => [x, x*2]); // map + flat

// Reducción
arr.reduce((suma, x) => suma + x, 0);  // 15
arr.reduceRight((acc, x) => acc + x, 0); // 15 (desde final)

// Ordenamiento (mutan el array)
arr.sort();              // Ordena como strings
arr.sort((a, b) => a - b); // Ordena números ascendente
arr.sort((a, b) => b - a); // Ordena números descendente
arr.reverse();           // Invierte el orden

// Conversión
arr.join(', ');          // '1, 2, 3, 4, 5'
Array.from('hola');      // ['h', 'o', 'l', 'a']
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
[...new Set([1, 2, 2, 3])]; // [1, 2, 3] (únicos)`,
      },
    },

    // ============================================
    // ARRAYS AVANZADO
    // ============================================
    {
      id: 'arrays-advanced',
      title: 'Arrays: Métodos Avanzados',
      type: 'code',
      code: {
        title: 'Patrones Avanzados con Arrays',
        language: 'javascript',
        description: 'Técnicas avanzadas y patrones comunes.',
        code: `const usuarios = [
  { nombre: 'Ana', edad: 25, activo: true },
  { nombre: 'Luis', edad: 30, activo: false },
  { nombre: 'María', edad: 28, activo: true },
];

// Filtrar y mapear
const activos = usuarios
  .filter(u => u.activo)
  .map(u => u.nombre);  // ['Ana', 'María']

// Agrupar por propiedad (Object.groupBy - ES2024)
const porEstado = Object.groupBy(usuarios, u =>
  u.activo ? 'activos' : 'inactivos'
);

// Encontrar el mayor/menor
const mayor = usuarios.reduce((max, u) =>
  u.edad > max.edad ? u : max
);  // { nombre: 'Luis', edad: 30 }

// Sumar propiedad numérica
const sumaEdades = usuarios.reduce((sum, u) => sum + u.edad, 0);  // 83

// Crear objeto desde array
const porNombre = usuarios.reduce((obj, u) => {
  obj[u.nombre] = u;
  return obj;
}, {});

// Desestructuración en parámetros
usuarios.map(({ nombre, edad }) => \`\${nombre}: \${edad}\`);

// toSorted, toReversed, toSpliced (no mutan - ES2023)
const ordenado = arr.toSorted((a, b) => b - a);
const invertido = arr.toReversed();
const modificado = arr.toSpliced(1, 1, 'nuevo');

// with() - reemplazar elemento sin mutar (ES2023)
const nuevo = arr.with(0, 'primero');

// Spread para copiar y modificar
const copia = [...arr];
const conMas = [...arr, 6, 7];
const combinado = [...arr1, ...arr2];`,
      },
    },

    // ============================================
    // OBJETOS
    // ============================================
    {
      id: 'objects',
      title: 'Objetos',
      type: 'code',
      code: {
        title: 'Operaciones con Objetos',
        language: 'javascript',
        description: 'Crear, acceder y manipular objetos.',
        code: `// Crear objetos
const usuario = {
  nombre: 'Juan',
  edad: 30,
  email: 'juan@email.com',
  direccion: {
    ciudad: 'Madrid',
    pais: 'España'
  },
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }
};

// Acceso a propiedades
usuario.nombre;           // 'Juan'
usuario['nombre'];        // 'Juan'
usuario.direccion.ciudad; // 'Madrid'

// Acceso seguro (optional chaining)
usuario?.direccion?.calle; // undefined (no existe)
usuario?.metodo?.();       // undefined (no existe)

// Modificar propiedades
usuario.edad = 31;
usuario['activo'] = true;  // Agregar nueva propiedad
delete usuario.email;      // Eliminar propiedad

// Verificar propiedad
'nombre' in usuario;       // true
usuario.hasOwnProperty('nombre'); // true

// Métodos de Object
Object.keys(usuario);      // ['nombre', 'edad', ...]
Object.values(usuario);    // ['Juan', 30, ...]
Object.entries(usuario);   // [['nombre', 'Juan'], ...]
Object.fromEntries([['a', 1], ['b', 2]]); // { a: 1, b: 2 }

// Copiar objetos
const copia = { ...usuario };           // Copia superficial
const copiaDeep = structuredClone(usuario); // Copia profunda
const merged = { ...obj1, ...obj2 };    // Fusionar objetos
Object.assign({}, usuario, { edad: 32 }); // Alternativa

// Congelar/Sellar
Object.freeze(usuario);    // No se puede modificar
Object.seal(usuario);      // No se pueden agregar/eliminar
Object.isFrozen(usuario);  // true
Object.isSealed(usuario);  // true`,
      },
    },

    // ============================================
    // DESESTRUCTURACIÓN
    // ============================================
    {
      id: 'destructuring',
      title: 'Desestructuración',
      type: 'code',
      code: {
        title: 'Destructuring de Arrays y Objetos',
        language: 'javascript',
        description: 'Extraer valores de arrays y propiedades de objetos.',
        code: `// Desestructuración de objetos
const persona = { nombre: 'Ana', edad: 25, ciudad: 'Madrid' };

const { nombre, edad } = persona;
console.log(nombre);  // 'Ana'

// Con alias (renombrar)
const { nombre: n, edad: e } = persona;
console.log(n);  // 'Ana'

// Con valor por defecto
const { pais = 'España' } = persona;
console.log(pais);  // 'España'

// Anidado
const usuario = {
  datos: { email: 'a@b.com' },
  permisos: ['leer', 'escribir']
};
const { datos: { email }, permisos } = usuario;

// Rest en objetos
const { nombre: nom, ...resto } = persona;
console.log(resto);  // { edad: 25, ciudad: 'Madrid' }


// Desestructuración de arrays
const colores = ['rojo', 'verde', 'azul'];

const [primero, segundo] = colores;
console.log(primero);  // 'rojo'

// Omitir elementos
const [, , tercero] = colores;
console.log(tercero);  // 'azul'

// Rest en arrays
const [cabeza, ...cola] = colores;
console.log(cola);  // ['verde', 'azul']

// Intercambiar variables
let a = 1, b = 2;
[a, b] = [b, a];  // a = 2, b = 1


// En parámetros de función
function saludar({ nombre, edad = 18 }) {
  return \`\${nombre} tiene \${edad} años\`;
}

function suma([a, b]) {
  return a + b;
}`,
      },
    },

    // ============================================
    // FUNCIONES
    // ============================================
    {
      id: 'functions',
      title: 'Funciones',
      type: 'code',
      code: {
        title: 'Tipos de Funciones',
        language: 'javascript',
        description: 'Diferentes formas de declarar funciones.',
        code: `// Función declarativa (hoisted)
function sumar(a, b) {
  return a + b;
}

// Expresión de función
const restar = function(a, b) {
  return a - b;
};

// Arrow function
const multiplicar = (a, b) => a * b;

// Arrow con un parámetro (paréntesis opcionales)
const doble = x => x * 2;

// Arrow con cuerpo
const dividir = (a, b) => {
  if (b === 0) throw new Error('División por cero');
  return a / b;
};

// Parámetros por defecto
function saludar(nombre = 'Invitado') {
  return \`Hola, \${nombre}\`;
}

// Rest parameters (captura múltiples argumentos)
function sumarTodo(...numeros) {
  return numeros.reduce((sum, n) => sum + n, 0);
}
sumarTodo(1, 2, 3, 4);  // 10

// Spread en llamadas
const nums = [1, 2, 3];
Math.max(...nums);  // 3

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log('Ejecutado inmediatamente');
})();

// Arrow IIFE
(() => {
  console.log('Arrow IIFE');
})();

// Funciones como valores
const operaciones = {
  suma: (a, b) => a + b,
  resta: (a, b) => a - b,
};
operaciones.suma(5, 3);  // 8

// Callback
function procesar(arr, callback) {
  return arr.map(callback);
}
procesar([1, 2, 3], x => x * 2);  // [2, 4, 6]`,
      },
    },

    // ============================================
    // CLOSURES Y SCOPE
    // ============================================
    {
      id: 'closures',
      title: 'Closures y Ámbito',
      type: 'code',
      code: {
        title: 'Closures y Scope en JavaScript',
        language: 'javascript',
        description: 'Entender closures y el ámbito de las variables.',
        code: `// Closure: función que "recuerda" su entorno
function crearContador() {
  let cuenta = 0;  // Variable privada

  return {
    incrementar() { return ++cuenta; },
    decrementar() { return --cuenta; },
    obtener() { return cuenta; }
  };
}

const contador = crearContador();
contador.incrementar();  // 1
contador.incrementar();  // 2
contador.obtener();      // 2
// cuenta no es accesible directamente

// Closure con parámetro
function multiplicador(factor) {
  return function(numero) {
    return numero * factor;
  };
}

const doble = multiplicador(2);
const triple = multiplicador(3);
doble(5);   // 10
triple(5);  // 15

// Problema común con var en loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 3, 3, 3 (var tiene ámbito de función)

// Solución con let (ámbito de bloque)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Imprime: 0, 1, 2

// Solución con closure (antes de let)
for (var i = 0; i < 3; i++) {
  ((j) => {
    setTimeout(() => console.log(j), 100);
  })(i);
}

// Módulo patrón con closure
const modulo = (function() {
  let privado = 'secreto';

  return {
    getPrivado() { return privado; },
    setPrivado(val) { privado = val; }
  };
})();`,
      },
    },

    // ============================================
    // CLASES
    // ============================================
    {
      id: 'classes',
      title: 'Clases (ES6+)',
      type: 'code',
      code: {
        title: 'Programación Orientada a Objetos',
        language: 'javascript',
        description: 'Clases, herencia y propiedades privadas.',
        code: `// Clase básica
class Persona {
  // Propiedades públicas
  nombre;

  // Propiedades privadas (ES2022)
  #edad;

  // Propiedades estáticas
  static especie = 'Humano';

  constructor(nombre, edad) {
    this.nombre = nombre;
    this.#edad = edad;
  }

  // Método de instancia
  saludar() {
    return \`Hola, soy \${this.nombre}\`;
  }

  // Getter
  get edad() {
    return this.#edad;
  }

  // Setter
  set edad(valor) {
    if (valor < 0) throw new Error('Edad inválida');
    this.#edad = valor;
  }

  // Método estático
  static crear(nombre, edad) {
    return new Persona(nombre, edad);
  }
}

const juan = new Persona('Juan', 30);
juan.saludar();        // 'Hola, soy Juan'
juan.edad;             // 30 (getter)
juan.edad = 31;        // (setter)
Persona.especie;       // 'Humano'
Persona.crear('Ana', 25);


// Herencia
class Empleado extends Persona {
  constructor(nombre, edad, puesto) {
    super(nombre, edad);  // Llama al constructor padre
    this.puesto = puesto;
  }

  // Sobrescribir método
  saludar() {
    return \`\${super.saludar()} y trabajo como \${this.puesto}\`;
  }
}

const emp = new Empleado('María', 28, 'Desarrolladora');
emp.saludar();  // 'Hola, soy María y trabajo como Desarrolladora'
emp instanceof Empleado;  // true
emp instanceof Persona;   // true`,
      },
    },

    // ============================================
    // PROMESAS
    // ============================================
    {
      id: 'promises',
      title: 'Promesas',
      type: 'code',
      code: {
        title: 'Trabajando con Promesas',
        language: 'javascript',
        description: 'Crear y manejar código asíncrono con Promesas.',
        code: `// Crear una promesa
const promesa = new Promise((resolve, reject) => {
  const exito = true;

  setTimeout(() => {
    if (exito) {
      resolve('¡Operación exitosa!');
    } else {
      reject(new Error('Algo falló'));
    }
  }, 1000);
});

// Consumir promesa con then/catch
promesa
  .then(resultado => {
    console.log(resultado);  // '¡Operación exitosa!'
    return 'Procesado';
  })
  .then(procesado => {
    console.log(procesado);  // 'Procesado'
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Siempre se ejecuta');
  });

// Promesas estáticas
Promise.resolve('valor');    // Promesa resuelta
Promise.reject('error');     // Promesa rechazada

// Promise.all - espera todas (falla si una falla)
const promesas = [
  fetch('/api/usuarios'),
  fetch('/api/productos'),
  fetch('/api/config')
];
Promise.all(promesas)
  .then(([usuarios, productos, config]) => {
    // Todas completadas
  });

// Promise.allSettled - espera todas (no falla)
Promise.allSettled(promesas)
  .then(resultados => {
    resultados.forEach(r => {
      if (r.status === 'fulfilled') {
        console.log(r.value);
      } else {
        console.log(r.reason);  // Error
      }
    });
  });

// Promise.race - primera en completar
Promise.race(promesas)
  .then(primeraRespuesta => {});

// Promise.any - primera exitosa (ES2021)
Promise.any(promesas)
  .then(primeraExitosa => {});`,
      },
    },

    // ============================================
    // ASYNC/AWAIT
    // ============================================
    {
      id: 'async-await',
      title: 'Async/Await',
      type: 'code',
      code: {
        title: 'JavaScript Asíncrono Moderno',
        language: 'javascript',
        description: 'Sintaxis moderna para código asíncrono.',
        code: `// Función async (siempre retorna una promesa)
async function obtenerUsuario(id) {
  const respuesta = await fetch(\`/api/usuarios/\${id}\`);
  const usuario = await respuesta.json();
  return usuario;
}

// Arrow async
const obtenerProductos = async () => {
  const res = await fetch('/api/productos');
  return res.json();
};

// Manejo de errores con try/catch
async function cargarDatos() {
  try {
    const usuarios = await obtenerUsuario(1);
    const productos = await obtenerProductos();
    return { usuarios, productos };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;  // Re-lanzar si es necesario
  } finally {
    console.log('Carga finalizada');
  }
}

// Ejecución paralela con async/await
async function cargarTodo() {
  // ❌ Secuencial (lento)
  const usuarios = await obtenerUsuario(1);
  const productos = await obtenerProductos();

  // ✅ Paralelo (rápido)
  const [usuariosP, productosP] = await Promise.all([
    obtenerUsuario(1),
    obtenerProductos()
  ]);

  return { usuariosP, productosP };
}

// Top-level await (en módulos ES)
const config = await fetch('/api/config').then(r => r.json());

// Async en métodos de clase
class ApiService {
  async obtener(endpoint) {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  }
}

// Async IIFE
(async () => {
  const datos = await cargarDatos();
  console.log(datos);
})();`,
      },
    },

    // ============================================
    // FETCH API
    // ============================================
    {
      id: 'fetch',
      title: 'Fetch API',
      type: 'code',
      code: {
        title: 'Peticiones HTTP con Fetch',
        language: 'javascript',
        description: 'Hacer peticiones HTTP a APIs.',
        code: `// GET simple
const respuesta = await fetch('/api/usuarios');
const usuarios = await respuesta.json();

// GET con parámetros
const params = new URLSearchParams({ page: 1, limit: 10 });
const res = await fetch(\`/api/usuarios?\${params}\`);

// POST con JSON
const nuevoUsuario = await fetch('/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    nombre: 'Juan',
    email: 'juan@email.com'
  })
});

// PUT (actualizar)
await fetch('/api/usuarios/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nombre: 'Juan Actualizado' })
});

// PATCH (actualización parcial)
await fetch('/api/usuarios/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ activo: false })
});

// DELETE
await fetch('/api/usuarios/1', {
  method: 'DELETE'
});

// Verificar respuesta
const res2 = await fetch('/api/usuarios');
if (!res2.ok) {
  throw new Error(\`Error HTTP: \${res2.status}\`);
}
const datos = await res2.json();

// Diferentes tipos de respuesta
const texto = await (await fetch('/archivo.txt')).text();
const blob = await (await fetch('/imagen.jpg')).blob();
const buffer = await (await fetch('/archivo.bin')).arrayBuffer();

// Abortar petición
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000);  // Timeout 5s

try {
  const res3 = await fetch('/api/lento', {
    signal: controller.signal
  });
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Petición cancelada');
  }
}`,
      },
    },

    // ============================================
    // ES6+ CARACTERÍSTICAS
    // ============================================
    {
      id: 'es6-features',
      title: 'Características ES6+',
      type: 'code',
      code: {
        title: 'Sintaxis Moderna de JavaScript',
        language: 'javascript',
        description: 'Características modernas desde ES6 hasta ES2024.',
        code: `// Template literals (ES6)
const nombre = 'Juan';
const saludo = \`Hola, \${nombre}!\`;
const multilinea = \`
  Línea 1
  Línea 2
\`;

// Optional chaining ?. (ES2020)
const ciudad = usuario?.direccion?.ciudad;
const metodo = objeto?.metodo?.();
const elemento = array?.[0];

// Nullish coalescing ?? (ES2020)
const puerto = config.puerto ?? 3000;
// Diferente de || que usa falsy
const valor = 0 || 10;   // 10 (0 es falsy)
const valor2 = 0 ?? 10;  // 0 (solo null/undefined)

// Logical assignment (ES2021)
let x = null;
x ??= 'default';  // x = 'default' (si es null/undefined)
x ||= 'default';  // x = 'default' (si es falsy)
x &&= 'nuevo';    // x = 'nuevo' (si es truthy)

// Numeric separators (ES2021)
const millon = 1_000_000;
const hex = 0xFF_FF_FF;

// at() para índices negativos (ES2022)
const arr = [1, 2, 3, 4, 5];
arr.at(-1);  // 5 (último)
arr.at(-2);  // 4

// Object.hasOwn() (ES2022)
Object.hasOwn(objeto, 'propiedad');

// Array.findLast() y findLastIndex() (ES2023)
arr.findLast(x => x > 2);      // 5
arr.findLastIndex(x => x > 2); // 4

// toSorted(), toReversed(), toSpliced() (ES2023)
const ordenado = arr.toSorted((a, b) => b - a);  // No muta

// with() - reemplazar sin mutar (ES2023)
const nuevo = arr.with(0, 99);  // [99, 2, 3, 4, 5]

// Object.groupBy() (ES2024)
const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Luis', edad: 30 },
  { nombre: 'María', edad: 25 }
];
const porEdad = Object.groupBy(personas, p => p.edad);
// { 25: [{...}, {...}], 30: [{...}] }

// Promise.withResolvers() (ES2024)
const { promise, resolve, reject } = Promise.withResolvers();

// ============ ES2025 ============

// Set methods (ES2025)
const setA = new Set([1, 2, 3]);
const setB = new Set([2, 3, 4]);

setA.union(setB);              // Set {1, 2, 3, 4}
setA.intersection(setB);       // Set {2, 3}
setA.difference(setB);         // Set {1}
setA.symmetricDifference(setB); // Set {1, 4}
setA.isSubsetOf(setB);         // false
setA.isSupersetOf(setB);       // false
setA.isDisjointFrom(setB);     // false

// Iterator helpers (ES2025)
const iter = [1, 2, 3, 4, 5].values();
iter.map(x => x * 2);          // Iterator de [2, 4, 6, 8, 10]
iter.filter(x => x > 2);       // Iterator de [3, 4, 5]
iter.take(3);                  // Iterator de [1, 2, 3]
iter.drop(2);                  // Iterator de [3, 4, 5]
iter.toArray();                // [1, 2, 3, 4, 5]
iter.forEach(x => console.log(x));
iter.some(x => x > 3);         // true
iter.every(x => x > 0);        // true
iter.find(x => x > 2);         // 3
iter.reduce((a, b) => a + b, 0); // 15

// RegExp.escape() (ES2025)
const userInput = 'hello.*world';
const escaped = RegExp.escape(userInput);
// 'hello\\.\\*world' - seguro para usar en regex

// Import attributes (ES2025)
// import data from './data.json' with { type: 'json' };
// import styles from './styles.css' with { type: 'css' };`,
      },
    },

    // ============================================
    // DOM BÁSICO
    // ============================================
    {
      id: 'dom',
      title: 'Manipulación del DOM',
      type: 'code',
      code: {
        title: 'Seleccionar y Modificar Elementos',
        language: 'javascript',
        description: 'Interactuar con el Document Object Model.',
        code: `// Seleccionar elementos
document.getElementById('mi-id');
document.querySelector('.clase');        // Primero que coincida
document.querySelector('#id .clase');    // Selector CSS
document.querySelectorAll('.clase');     // Todos (NodeList)
document.getElementsByClassName('clase'); // HTMLCollection
document.getElementsByTagName('div');

// Navegar el DOM
elemento.parentElement;          // Padre
elemento.children;               // Hijos (elementos)
elemento.childNodes;             // Hijos (incluye texto)
elemento.firstElementChild;      // Primer hijo elemento
elemento.lastElementChild;       // Último hijo elemento
elemento.nextElementSibling;     // Hermano siguiente
elemento.previousElementSibling; // Hermano anterior
elemento.closest('.clase');      // Ancestro más cercano

// Modificar contenido
elemento.textContent = 'Texto plano';
elemento.innerHTML = '<strong>HTML</strong>';
elemento.innerText = 'Texto visible';

// Atributos
elemento.getAttribute('href');
elemento.setAttribute('href', '/nueva-url');
elemento.removeAttribute('disabled');
elemento.hasAttribute('disabled');
elemento.dataset.id;        // data-id="123"
elemento.dataset.userId;    // data-user-id="456"

// Clases
elemento.classList.add('activo');
elemento.classList.remove('activo');
elemento.classList.toggle('activo');
elemento.classList.contains('activo');
elemento.classList.replace('vieja', 'nueva');
elemento.className = 'clase1 clase2';

// Estilos
elemento.style.color = 'red';
elemento.style.backgroundColor = 'blue';
elemento.style.cssText = 'color: red; font-size: 16px';
getComputedStyle(elemento).color;  // Estilo calculado

// Crear elementos
const div = document.createElement('div');
div.textContent = 'Nuevo elemento';
div.className = 'mi-clase';

// Insertar elementos
padre.appendChild(hijo);           // Al final
padre.insertBefore(nuevo, ref);    // Antes de referencia
padre.prepend(hijo);               // Al inicio
padre.append(hijo1, hijo2);        // Múltiples al final
elemento.before(nuevo);            // Antes del elemento
elemento.after(nuevo);             // Después del elemento
elemento.replaceWith(nuevo);       // Reemplazar

// Eliminar elementos
elemento.remove();
padre.removeChild(hijo);

// Clonar
const clon = elemento.cloneNode(true);  // true = con hijos`,
      },
    },

    // ============================================
    // EVENTOS
    // ============================================
    {
      id: 'events',
      title: 'Eventos',
      type: 'code',
      code: {
        title: 'Manejo de Eventos',
        language: 'javascript',
        description: 'Escuchar y responder a eventos del usuario.',
        code: `// Agregar evento
elemento.addEventListener('click', function(evento) {
  console.log('Clic en:', evento.target);
});

// Arrow function
elemento.addEventListener('click', (e) => {
  e.preventDefault();   // Prevenir comportamiento default
  e.stopPropagation(); // Detener propagación
});

// Eliminar evento (necesita referencia a la función)
function manejador(e) {
  console.log(e);
}
elemento.addEventListener('click', manejador);
elemento.removeEventListener('click', manejador);

// Opciones del listener
elemento.addEventListener('click', manejador, {
  once: true,      // Se ejecuta solo una vez
  capture: true,   // Fase de captura (no bubble)
  passive: true    // No llamará preventDefault
});

// Eventos comunes del mouse
'click'        // Clic
'dblclick'     // Doble clic
'mouseenter'   // Mouse entra (no bubble)
'mouseleave'   // Mouse sale (no bubble)
'mouseover'    // Mouse sobre (bubble)
'mouseout'     // Mouse fuera (bubble)
'mousemove'    // Mouse se mueve
'mousedown'    // Botón presionado
'mouseup'      // Botón liberado

// Eventos del teclado
'keydown'      // Tecla presionada
'keyup'        // Tecla liberada
'keypress'     // Tecla presionada (obsoleto)

document.addEventListener('keydown', (e) => {
  console.log(e.key);       // 'Enter', 'a', 'Escape'
  console.log(e.code);      // 'Enter', 'KeyA', 'Escape'
  console.log(e.ctrlKey);   // true si Ctrl está presionado
  console.log(e.shiftKey);  // true si Shift está presionado
});

// Eventos de formulario
'submit'       // Envío de formulario
'input'        // Valor cambia (en tiempo real)
'change'       // Valor cambia (al perder foco)
'focus'        // Elemento recibe foco
'blur'         // Elemento pierde foco

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const datos = new FormData(e.target);
  console.log(Object.fromEntries(datos));
});

// Event delegation (delegación de eventos)
document.querySelector('.lista').addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    console.log('Item clickeado:', e.target);
  }
});

// Disparar eventos personalizados
const evento = new CustomEvent('miEvento', {
  detail: { datos: 'valor' }
});
elemento.dispatchEvent(evento);`,
      },
    },

    // ============================================
    // LOCAL STORAGE
    // ============================================
    {
      id: 'storage',
      title: 'Web Storage',
      type: 'code',
      code: {
        title: 'localStorage y sessionStorage',
        language: 'javascript',
        description: 'Almacenar datos en el navegador.',
        code: `// localStorage - persiste hasta eliminación manual
localStorage.setItem('usuario', 'Juan');
localStorage.getItem('usuario');      // 'Juan'
localStorage.removeItem('usuario');
localStorage.clear();                 // Elimina todo
localStorage.length;                  // Número de items
localStorage.key(0);                  // Clave en índice 0

// Guardar objetos (JSON)
const usuario = { nombre: 'Ana', edad: 25 };
localStorage.setItem('usuario', JSON.stringify(usuario));
const recuperado = JSON.parse(localStorage.getItem('usuario'));

// sessionStorage - persiste durante la sesión
sessionStorage.setItem('temporal', 'valor');
sessionStorage.getItem('temporal');

// Helper para storage con JSON
const storage = {
  set(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
  },
  get(clave, defecto = null) {
    const valor = localStorage.getItem(clave);
    return valor ? JSON.parse(valor) : defecto;
  },
  remove(clave) {
    localStorage.removeItem(clave);
  }
};

// Uso del helper
storage.set('config', { tema: 'oscuro', idioma: 'es' });
const config = storage.get('config', {});

// Evento storage (detectar cambios en otra pestaña)
window.addEventListener('storage', (e) => {
  console.log('Clave:', e.key);
  console.log('Valor anterior:', e.oldValue);
  console.log('Valor nuevo:', e.newValue);
  console.log('URL:', e.url);
});

// Verificar disponibilidad
function storageDisponible() {
  try {
    const test = '__test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}`,
      },
    },

    // ============================================
    // MÓDULOS ES6
    // ============================================
    {
      id: 'modules',
      title: 'Módulos ES6',
      type: 'code',
      code: {
        title: 'Import y Export',
        language: 'javascript',
        description: 'Sistema de módulos nativo de JavaScript.',
        code: `// ========== archivo: utils.js ==========

// Export nombrado
export const PI = 3.14159;

export function sumar(a, b) {
  return a + b;
}

export const restar = (a, b) => a - b;

// Export nombrado agrupado
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;
export { multiplicar, dividir };

// Export default (solo uno por archivo)
export default class Calculadora {
  static sumar(a, b) { return a + b; }
}

// Re-exportar desde otro módulo
export { algo } from './otro-modulo.js';
export * from './todo-modulo.js';


// ========== archivo: app.js ==========

// Import nombrado
import { sumar, restar } from './utils.js';

// Import con alias
import { sumar as sum, PI } from './utils.js';

// Import default
import Calculadora from './utils.js';

// Import default + nombrados
import Calc, { sumar, PI } from './utils.js';

// Import todo como objeto
import * as Utils from './utils.js';
Utils.sumar(1, 2);
Utils.PI;

// Import dinámico (async)
const modulo = await import('./utils.js');
// o con then
import('./utils.js').then(modulo => {
  modulo.sumar(1, 2);
});

// Import condicional
if (condicion) {
  const { funcion } = await import('./modulo.js');
}


// En HTML
<script type="module" src="app.js"></script>
<script type="module">
  import { algo } from './modulo.js';
</script>`,
      },
    },

    // ============================================
    // MANEJO DE ERRORES
    // ============================================
    {
      id: 'errors',
      title: 'Manejo de Errores',
      type: 'code',
      code: {
        title: 'Try/Catch y Errores Personalizados',
        language: 'javascript',
        description: 'Manejar errores de forma efectiva.',
        code: `// Try/Catch básico
try {
  const datos = JSON.parse(jsonInvalido);
} catch (error) {
  console.error('Error:', error.message);
} finally {
  console.log('Siempre se ejecuta');
}

// Lanzar errores
function dividir(a, b) {
  if (b === 0) {
    throw new Error('No se puede dividir por cero');
  }
  return a / b;
}

// Tipos de errores nativos
throw new Error('Error genérico');
throw new TypeError('Tipo incorrecto');
throw new RangeError('Fuera de rango');
throw new ReferenceError('Referencia no existe');
throw new SyntaxError('Sintaxis inválida');

// Error personalizado
class ValidationError extends Error {
  constructor(campo, mensaje) {
    super(mensaje);
    this.name = 'ValidationError';
    this.campo = campo;
  }
}

function validarUsuario(usuario) {
  if (!usuario.email) {
    throw new ValidationError('email', 'Email es requerido');
  }
  if (!usuario.email.includes('@')) {
    throw new ValidationError('email', 'Email inválido');
  }
}

try {
  validarUsuario({ nombre: 'Juan' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(\`Error en \${error.campo}: \${error.message}\`);
  } else {
    throw error;  // Re-lanzar errores desconocidos
  }
}

// Errores en async/await
async function cargarDatos() {
  try {
    const res = await fetch('/api/datos');
    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}\`);
    }
    return await res.json();
  } catch (error) {
    console.error('Error al cargar:', error);
    return null;  // Valor por defecto
  }
}

// Manejo global de errores
window.addEventListener('error', (event) => {
  console.error('Error global:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Promesa rechazada:', event.reason);
});`,
      },
    },

    // ============================================
    // EXPRESIONES REGULARES
    // ============================================
    {
      id: 'regex',
      title: 'Expresiones Regulares',
      type: 'code',
      code: {
        title: 'Patrones y Búsqueda con Regex',
        language: 'javascript',
        description: 'Buscar y manipular texto con expresiones regulares.',
        code: `// Crear regex
const regex1 = /patron/;           // Literal
const regex2 = new RegExp('patron'); // Constructor

// Flags (modificadores)
/patron/i   // i = ignore case (mayús/minús)
/patron/g   // g = global (todas las coincidencias)
/patron/m   // m = multiline
/patron/s   // s = dotAll (. incluye \\n)
/patron/u   // u = unicode
/patron/gi  // Combinados

// Métodos de RegExp
regex.test('texto');     // true/false
regex.exec('texto');     // Array con info o null

// Métodos de String con regex
'texto'.match(/e/g);     // ['e'] o null
'texto'.matchAll(/e/g);  // Iterator de matches
'texto'.search(/x/);     // Índice o -1
'texto'.replace(/e/, 'a'); // 'taxto'
'texto'.replaceAll(/e/g, 'a'); // 'taxto'
'a,b;c'.split(/[,;]/);   // ['a', 'b', 'c']

// Caracteres especiales
.     // Cualquier carácter (excepto \\n)
\\d    // Dígito [0-9]
\\D    // No dígito
\\w    // Palabra [a-zA-Z0-9_]
\\W    // No palabra
\\s    // Espacio en blanco
\\S    // No espacio
\\b    // Límite de palabra
^     // Inicio de línea
$     // Fin de línea

// Cuantificadores
*     // 0 o más
+     // 1 o más
?     // 0 o 1
{3}   // Exactamente 3
{2,5} // Entre 2 y 5
{2,}  // 2 o más

// Grupos y alternancia
(abc)     // Grupo de captura
(?:abc)   // Grupo sin captura
a|b       // a o b
[abc]     // Cualquiera de: a, b, c
[^abc]    // Ninguno de: a, b, c
[a-z]     // Rango: a hasta z

// Ejemplos prácticos
const emailRegex = /^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$/;
const telefonoRegex = /^\\+?\\d{9,15}$/;
const urlRegex = /^https?:\\/\\/[\\w.-]+\\.[a-z]{2,}/i;

// Grupos de captura
const fecha = '2024-11-25';
const [, año, mes, dia] = fecha.match(/(\\d{4})-(\\d{2})-(\\d{2})/);

// Named groups (ES2018)
const resultado = fecha.match(/(?<año>\\d{4})-(?<mes>\\d{2})-(?<dia>\\d{2})/);
console.log(resultado.groups.año);  // '2024'

// Replace con función
'hola mundo'.replace(/\\b\\w/g, c => c.toUpperCase());
// 'Hola Mundo'`,
      },
    },

    // ============================================
    // BUENAS PRÁCTICAS
    // ============================================
    {
      id: 'best-practices',
      title: 'Buenas Prácticas',
      type: 'list',
      items: [
        'Usar const por defecto, let solo cuando sea necesario reasignar',
        'Evitar var completamente en código moderno',
        'Usar === en lugar de == para comparaciones estrictas',
        'Usar template literals en lugar de concatenación con +',
        'Desestructurar objetos y arrays para código más limpio',
        'Usar arrow functions para callbacks cortos',
        'Manejar errores con try/catch en código async',
        'Usar optional chaining (?.) para acceso seguro a propiedades',
        'Usar nullish coalescing (??) para valores por defecto',
        'Evitar mutaciones, preferir métodos inmutables (map, filter, spread)',
        'Usar nombres descriptivos para variables y funciones',
        'Mantener funciones pequeñas y con una sola responsabilidad',
        'Documentar código complejo con comentarios',
        'Usar módulos ES6 para organizar el código',
        'Evitar variables globales, usar closures o módulos',
        'Validar inputs y manejar casos edge',
        'Usar Promise.all para operaciones paralelas',
        'Limpiar event listeners cuando ya no se necesiten',
      ],
    },
  ],
}
