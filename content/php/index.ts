import type { Cheatcode } from '../types'

export const phpCheatcode: Cheatcode = {
  metadata: {
    id: 'php',
    title: 'PHP',
    language: 'PHP',
    category: 'language',
    tags: ['php', 'backend', 'server-side'],
    version: '8.4',
    description: 'Guía completa de PHP 8.4: Sintaxis moderna, OOP, Arrays, Funciones, PDO y más',
    lastUpdated: '2025-11-26',
    logo: '/logos/php.svg',
    color: '#777BB4',
    difficulty: 'intermediate',
  },
  sections: [
    {
      id: 'sintaxis-basica',
      title: 'Sintaxis Básica',
      type: 'code',
      content: 'Fundamentos de PHP: etiquetas, echo, variables y comentarios',
      code: {
        title: 'Sintaxis básica de PHP',
        language: 'php',
        code: `<?php
// Comentario de una línea
# También comentario de una línea
/* Comentario
   de múltiples líneas */

// Echo y Print
echo "Hola Mundo";
print "Hola Mundo";

// Variables (case-sensitive)
$nombre = "Juan";
$edad = 25;
$activo = true;

// Concatenación
echo "Mi nombre es " . $nombre;
echo "Mi nombre es $nombre"; // Interpolación en comillas dobles

// Constantes
define('SITIO_NOMBRE', 'MiSitio');
const API_KEY = 'abc123'; // PHP 5.3+

echo SITIO_NOMBRE;

// Heredoc (para strings multilínea)
$texto = <<<EOT
Este es un texto
de múltiples líneas
con interpolación: $nombre
EOT;

// Nowdoc (sin interpolación)
$texto = <<<'EOT'
Este texto no interpola
variables: $nombre
EOT;`,
      },
    },
    {
      id: 'tipos-datos',
      title: 'Tipos de Datos',
      type: 'code',
      content: 'Tipos escalares, compuestos y especiales en PHP',
      code: {
        title: 'Tipos de datos en PHP 8.4',
        language: 'php',
        code: `<?php
// Tipos Escalares
$entero = 42;
$flotante = 3.14;
$cadena = "Hola";
$booleano = true;

// Tipos Compuestos
$array = [1, 2, 3];
$objeto = new stdClass();
$callable = function() { return "Hola"; };

// Tipos Especiales
$nulo = null;
$recurso = fopen('archivo.txt', 'r');

// Type Declarations (PHP 7+)
function sumar(int $a, int $b): int {
    return $a + $b;
}

// Strict Types (PHP 7+)
declare(strict_types=1);

// Union Types (PHP 8.0+)
function procesar(int|float $numero): string {
    return "Número: $numero";
}

// Intersection Types (PHP 8.1+)
interface Nombrable {
    public function getNombre(): string;
}

interface Identificable {
    public function getId(): int;
}

function procesar(Nombrable&Identificable $obj) {
    // $obj debe implementar ambas interfaces
}

// Type Casting
$num = "42";
$entero = (int)$num;
$flotante = (float)"3.14";
$cadena = (string)123;
$bool = (bool)1;
$array = (array)"hola";

// Verificación de tipos
var_dump(is_int($entero));
var_dump(is_string($cadena));
var_dump(is_array($array));
var_dump(is_bool($booleano));
var_dump(is_null($nulo));
var_dump(is_numeric("123"));

// gettype()
echo gettype($entero); // "integer"`,
      },
    },
    {
      id: 'operadores',
      title: 'Operadores',
      type: 'code',
      content: 'Operadores aritméticos, lógicos, comparación y más',
      code: {
        title: 'Operadores en PHP',
        language: 'php',
        code: `<?php
// Aritméticos
$suma = 5 + 3;        // 8
$resta = 5 - 3;       // 2
$mult = 5 * 3;        // 15
$div = 5 / 2;         // 2.5
$mod = 5 % 2;         // 1
$exp = 2 ** 3;        // 8 (potencia)

// Asignación
$x = 10;
$x += 5;  // $x = $x + 5
$x -= 3;
$x *= 2;
$x /= 4;
$x %= 3;

// Comparación
$a == $b;   // Igual (valor)
$a === $b;  // Idéntico (valor y tipo)
$a != $b;   // Diferente
$a !== $b;  // No idéntico
$a <> $b;   // Diferente
$a > $b;
$a < $b;
$a >= $b;
$a <= $b;
$a <=> $b;  // Spaceship (retorna -1, 0, o 1)

// Lógicos
$a && $b;   // AND
$a || $b;   // OR
!$a;        // NOT
$a and $b;  // AND (menor precedencia)
$a or $b;   // OR (menor precedencia)
$a xor $b;  // XOR

// Incremento/Decremento
$i++;  // Post-incremento
++$i;  // Pre-incremento
$i--;  // Post-decremento
--$i;  // Pre-decremento

// String
$texto = "Hola" . " Mundo";  // Concatenación

// Array
$union = $array1 + $array2;  // Unión de arrays

// Null Coalescing (PHP 7+)
$nombre = $_GET['nombre'] ?? 'Invitado';

// Null Safe Operator (PHP 8.0+)
$pais = $usuario?->getDireccion()?->getPais();

// Ternario
$mayor = ($a > $b) ? $a : $b;

// Elvis Operator
$nombre = $_GET['nombre'] ?: 'Invitado';`,
      },
    },
    {
      id: 'strings',
      title: 'Strings y Manipulación',
      type: 'code',
      content: 'Funciones para trabajar con cadenas de texto',
      code: {
        title: 'Manipulación de strings',
        language: 'php',
        code: `<?php
$texto = "Hola Mundo";

// Longitud
strlen($texto);  // 10

// Mayúsculas/Minúsculas
strtoupper($texto);  // "HOLA MUNDO"
strtolower($texto);  // "hola mundo"
ucfirst($texto);     // "Hola mundo"
ucwords($texto);     // "Hola Mundo"

// Búsqueda
strpos($texto, "Mundo");     // 5
str_contains($texto, "Hola"); // true (PHP 8.0+)
str_starts_with($texto, "Hola"); // true (PHP 8.0+)
str_ends_with($texto, "Mundo"); // true (PHP 8.0+)

// Reemplazo
str_replace("Mundo", "PHP", $texto);  // "Hola PHP"
str_ireplace("MUNDO", "PHP", $texto); // Case-insensitive

// Substring
substr($texto, 0, 4);   // "Hola"
substr($texto, 5);      // "Mundo"
substr($texto, -5);     // "Mundo"

// Trim (eliminar espacios)
trim("  Hola  ");   // "Hola"
ltrim("  Hola");    // "Hola"
rtrim("Hola  ");    // "Hola"

// Split
explode(" ", $texto);  // ["Hola", "Mundo"]
implode(", ", ["Hola", "Mundo"]);  // "Hola, Mundo"

// String Padding
str_pad("5", 3, "0", STR_PAD_LEFT);  // "005"

// Repetir
str_repeat("*", 5);  // "*****"

// Reverse
strrev($texto);  // "odnuM aloH"

// Formateo
sprintf("Hola %s, tienes %d años", "Juan", 25);

// Number Format
number_format(1234.56, 2, ',', '.');  // "1.234,56"

// Multibyte (UTF-8)
mb_strlen("Español");
mb_strtoupper("ñoño");
mb_substr("Español", 0, 3);`,
      },
    },
    {
      id: 'arrays',
      title: 'Arrays',
      type: 'code',
      content: 'Creación, manipulación y funciones de arrays',
      code: {
        title: 'Trabajando con arrays',
        language: 'php',
        code: `<?php
// Crear arrays
$numeros = [1, 2, 3, 4, 5];
$frutas = array("manzana", "pera", "uva");

// Array asociativo
$persona = [
    'nombre' => 'Juan',
    'edad' => 25,
    'ciudad' => 'Madrid'
];

// Array multidimensional
$matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Acceso
echo $numeros[0];        // 1
echo $persona['nombre']; // "Juan"
echo $matriz[1][2];      // 6

// Agregar elementos
$numeros[] = 6;              // Al final
array_push($numeros, 7, 8);  // Al final (múltiples)
array_unshift($numeros, 0);  // Al inicio

// Eliminar elementos
array_pop($numeros);      // Último
array_shift($numeros);    // Primero
unset($numeros[2]);       // Por índice

// Longitud
count($numeros);

// Verificar existencia
in_array(3, $numeros);           // true
array_key_exists('nombre', $persona); // true
isset($persona['nombre']);        // true

// Búsqueda
array_search('pera', $frutas);  // 1 (índice)

// Slice y Splice
array_slice($numeros, 1, 3);    // Extraer porción
array_splice($numeros, 1, 2);   // Eliminar y retornar

// Merge
$combinado = array_merge($numeros, $frutas);
$spread = [...$numeros, ...$frutas]; // Spread operator (PHP 7.4+)

// Ordenamiento
sort($numeros);          // Ascendente (reindexar)
rsort($numeros);         // Descendente
asort($persona);         // Ascendente (mantener keys)
arsort($persona);        // Descendente (mantener keys)
ksort($persona);         // Por keys ascendente
krsort($persona);        // Por keys descendente
usort($numeros, fn($a, $b) => $a <=> $b); // Custom

// Filtrado
$pares = array_filter($numeros, fn($n) => $n % 2 === 0);

// Map
$dobles = array_map(fn($n) => $n * 2, $numeros);

// Reduce
$suma = array_reduce($numeros, fn($carry, $n) => $carry + $n, 0);

// Keys y Values
$keys = array_keys($persona);      // ['nombre', 'edad', 'ciudad']
$values = array_values($persona);  // ['Juan', 25, 'Madrid']

// Combinar
$combined = array_combine(['a', 'b'], [1, 2]); // ['a' => 1, 'b' => 2]

// Chunk (dividir)
array_chunk($numeros, 2); // [[1,2], [3,4], [5]]

// Unique
array_unique([1, 2, 2, 3, 3]); // [1, 2, 3]

// Flip (intercambiar keys/values)
array_flip(['a' => 1, 'b' => 2]); // [1 => 'a', 2 => 'b']

// Array Destructuring (PHP 7.1+)
[$x, $y, $z] = [1, 2, 3];
['nombre' => $nombre, 'edad' => $edad] = $persona;

// Spread en arrays asociativos (PHP 8.1+)
$datos = [...$persona, 'pais' => 'España'];`,
      },
    },
    {
      id: 'funciones',
      title: 'Funciones',
      type: 'code',
      content: 'Declaración, parámetros, return types y arrow functions',
      code: {
        title: 'Funciones en PHP',
        language: 'php',
        code: `<?php
// Función básica
function saludar() {
    echo "Hola!";
}

// Con parámetros
function suma($a, $b) {
    return $a + $b;
}

// Con tipo de retorno
function dividir(float $a, float $b): float {
    return $a / $b;
}

// Parámetros por defecto
function crear_usuario($nombre, $role = 'usuario') {
    return ['nombre' => $nombre, 'role' => $role];
}

// Type hints
function procesar_array(array $items): void {
    foreach ($items as $item) {
        echo $item;
    }
}

// Nullable types (PHP 7.1+)
function buscar(?string $query): ?array {
    if ($query === null) return null;
    return [];
}

// Union types (PHP 8.0+)
function formatear(int|float $numero): string {
    return number_format($numero, 2);
}

// Mixed type (PHP 8.0+)
function procesar(mixed $valor): mixed {
    return $valor;
}

// Named arguments (PHP 8.0+)
function crear_post(string $titulo, string $contenido, bool $publicado = false) {
    return compact('titulo', 'contenido', 'publicado');
}

$post = crear_post(
    titulo: "Mi Post",
    publicado: true,
    contenido: "Contenido del post"
);

// Variadic functions (...)
function sumar_todos(int ...$numeros): int {
    return array_sum($numeros);
}

sumar_todos(1, 2, 3, 4, 5); // 15

// Pasar por referencia
function incrementar(&$numero) {
    $numero++;
}

$x = 5;
incrementar($x);
echo $x; // 6

// Arrow functions (PHP 7.4+)
$doble = fn($x) => $x * 2;
$suma = fn($a, $b) => $a + $b;

// Closures (funciones anónimas)
$multiplicador = function($n) use ($factor = 2) {
    return $n * $factor;
};

// First-class callable syntax (PHP 8.1+)
$strlen = strlen(...);
echo $strlen("Hola"); // 4

// Callable type
function ejecutar(callable $callback) {
    return $callback();
}

ejecutar(fn() => "Hola");

// Return type never (PHP 8.1+)
function lanzar_error(): never {
    throw new Exception("Error!");
}

// Static return type
class Usuario {
    public static function crear(): static {
        return new static();
    }
}`,
      },
    },
    {
      id: 'clases-objetos',
      title: 'Clases y Objetos (OOP)',
      type: 'code',
      content: 'Programación orientada a objetos: clases, propiedades, métodos',
      code: {
        title: 'Clases y objetos en PHP',
        language: 'php',
        code: `<?php
// Clase básica
class Usuario {
    // Propiedades
    public string $nombre;
    private int $edad;
    protected string $email;

    // Constructor
    public function __construct(string $nombre, int $edad, string $email) {
        $this->nombre = $nombre;
        $this->edad = $edad;
        $this->email = $email;
    }

    // Métodos
    public function saludar(): string {
        return "Hola, soy {$this->nombre}";
    }

    // Getter
    public function getEdad(): int {
        return $this->edad;
    }

    // Setter
    public function setEdad(int $edad): void {
        $this->edad = $edad;
    }

    // Método estático
    public static function crear(string $nombre): self {
        return new self($nombre, 18, 'default@example.com');
    }

    // Constantes
    public const ROLE_ADMIN = 'admin';
    public const ROLE_USER = 'user';
}

// Instanciar
$usuario = new Usuario("Juan", 25, "juan@example.com");
echo $usuario->nombre;
echo $usuario->saludar();

// Constructor Property Promotion (PHP 8.0+)
class Producto {
    public function __construct(
        public string $nombre,
        public float $precio,
        private int $stock = 0
    ) {}
}

$producto = new Producto("Laptop", 999.99, 10);
echo $producto->nombre; // "Laptop"

// Herencia
class Admin extends Usuario {
    public function __construct(
        string $nombre,
        int $edad,
        string $email,
        public array $permisos = []
    ) {
        parent::__construct($nombre, $edad, $email);
    }

    public function saludar(): string {
        return parent::saludar() . " y soy administrador";
    }
}

// Clases abstractas
abstract class Forma {
    abstract public function calcularArea(): float;

    public function describir(): string {
        return "Soy una forma con área: " . $this->calcularArea();
    }
}

class Circulo extends Forma {
    public function __construct(private float $radio) {}

    public function calcularArea(): float {
        return pi() * $this->radio ** 2;
    }
}

// Final (no se puede heredar)
final class ConfiguracionFinal {
    public const VERSION = '1.0';
}

// Métodos mágicos
class Magico {
    private array $datos = [];

    public function __get(string $key) {
        return $this->datos[$key] ?? null;
    }

    public function __set(string $key, $value): void {
        $this->datos[$key] = $value;
    }

    public function __toString(): string {
        return json_encode($this->datos);
    }

    public function __invoke(string $nombre): string {
        return "Invocado con: $nombre";
    }
}

$obj = new Magico();
$obj->nombre = "Juan"; // __set
echo $obj->nombre;     // __get
echo $obj;             // __toString
echo $obj("test");     // __invoke`,
      },
    },
    {
      id: 'traits-interfaces',
      title: 'Traits e Interfaces',
      type: 'code',
      content: 'Reutilización de código con traits e interfaces',
      code: {
        title: 'Traits e interfaces',
        language: 'php',
        code: `<?php
// Interface
interface Notificable {
    public function enviarNotificacion(string $mensaje): void;
}

interface Autenticable {
    public function autenticar(string $usuario, string $password): bool;
}

// Múltiples interfaces
class Usuario implements Notificable, Autenticable {
    public function enviarNotificacion(string $mensaje): void {
        echo "Notificación: $mensaje";
    }

    public function autenticar(string $usuario, string $password): bool {
        // Lógica de autenticación
        return true;
    }
}

// Traits (reutilización de código)
trait Timestampable {
    protected string $createdAt;
    protected string $updatedAt;

    public function setTimestamps(): void {
        $now = date('Y-m-d H:i:s');
        $this->createdAt ??= $now;
        $this->updatedAt = $now;
    }

    public function getCreatedAt(): string {
        return $this->createdAt;
    }
}

trait SoftDelete {
    protected ?string $deletedAt = null;

    public function delete(): void {
        $this->deletedAt = date('Y-m-d H:i:s');
    }

    public function restore(): void {
        $this->deletedAt = null;
    }

    public function isDeleted(): bool {
        return $this->deletedAt !== null;
    }
}

// Usar traits
class Post {
    use Timestampable, SoftDelete;

    public function __construct(
        public string $titulo,
        public string $contenido
    ) {
        $this->setTimestamps();
    }
}

$post = new Post("Mi título", "Contenido");
$post->delete();
echo $post->isDeleted() ? "Eliminado" : "Activo";

// Conflictos de traits
trait A {
    public function saludar() {
        echo "Hola desde A";
    }
}

trait B {
    public function saludar() {
        echo "Hola desde B";
    }
}

class Conflicto {
    use A, B {
        A::saludar insteadof B;  // Usar A
        B::saludar as saludarB;  // Alias para B
    }
}

// Trait con propiedades abstractas
trait Validable {
    abstract protected function reglas(): array;

    public function validar(array $datos): bool {
        $reglas = $this->reglas();
        // Lógica de validación
        return true;
    }
}

class Formulario {
    use Validable;

    protected function reglas(): array {
        return [
            'nombre' => 'required',
            'email' => 'required|email'
        ];
    }
}`,
      },
    },
    {
      id: 'namespaces',
      title: 'Namespaces',
      type: 'code',
      content: 'Organización de código con namespaces',
      code: {
        title: 'Namespaces en PHP',
        language: 'php',
        code: `<?php
// Declarar namespace
namespace App\\Models;

class Usuario {
    public string $nombre;
}

namespace App\\Controllers;

class UsuarioController {
    public function index() {
        // Usar clase del mismo namespace
        $usuario = new Usuario(); // Error!

        // Usar clase de otro namespace (forma completa)
        $usuario = new \\App\\Models\\Usuario();
    }
}

// Use statement
namespace App\\Services;

use App\\Models\\Usuario;
use App\\Models\\Post as PostModel;
use App\\Controllers\\UsuarioController;

class UsuarioService {
    public function crear(string $nombre): Usuario {
        return new Usuario();
    }

    public function crearPost(): PostModel {
        return new PostModel();
    }
}

// Group use (PHP 7+)
use App\\Models\\{Usuario, Post, Comentario};
use App\\Controllers\\{UsuarioController, PostController};

// Function y Const imports
namespace App\\Helpers;

function formatear_fecha(string $fecha): string {
    return date('d/m/Y', strtotime($fecha));
}

const VERSION = '1.0';

// En otro archivo
namespace App\\Services;

use function App\\Helpers\\formatear_fecha;
use const App\\Helpers\\VERSION;

class ServicioFecha {
    public function procesar(): string {
        return formatear_fecha('2025-11-26') . ' - v' . VERSION;
    }
}

// Global namespace
namespace App\\Utils;

class Helper {
    public function usarClaseGlobal() {
        // Clase global (sin namespace)
        $datetime = new \\DateTime();

        // O importar
        use DateTime;
        $dt = new DateTime();
    }
}

// Autoloading (PSR-4)
// composer.json
/*
{
    "autoload": {
        "psr-4": {
            "App\\\\": "src/",
            "Tests\\\\": "tests/"
        }
    }
}
*/

// Estructura de directorios:
// src/
//   Models/
//     Usuario.php (namespace App\\Models)
//   Controllers/
//     UsuarioController.php (namespace App\\Controllers)`,
      },
    },
    {
      id: 'named-arguments',
      title: 'Named Arguments',
      type: 'code',
      content: 'Argumentos nombrados para mayor claridad (PHP 8.0+)',
      code: {
        title: 'Named arguments',
        language: 'php',
        code: `<?php
// Función con muchos parámetros
function crear_usuario(
    string $nombre,
    string $email,
    int $edad,
    string $ciudad = 'Madrid',
    bool $activo = true,
    array $roles = ['user']
) {
    return compact('nombre', 'email', 'edad', 'ciudad', 'activo', 'roles');
}

// Forma tradicional (difícil de leer)
$usuario1 = crear_usuario(
    'Juan',
    'juan@example.com',
    25,
    'Barcelona',
    true,
    ['admin', 'editor']
);

// Con named arguments (más claro)
$usuario2 = crear_usuario(
    nombre: 'María',
    email: 'maria@example.com',
    edad: 30,
    ciudad: 'Valencia',
    roles: ['editor']
);

// Omitir parámetros opcionales fácilmente
$usuario3 = crear_usuario(
    nombre: 'Pedro',
    email: 'pedro@example.com',
    edad: 28,
    roles: ['user', 'moderator']
    // ciudad y activo usan valores por defecto
);

// Cambiar el orden de parámetros
$usuario4 = crear_usuario(
    edad: 35,
    nombre: 'Ana',
    email: 'ana@example.com'
);

// Combinar posicionales y nombrados
// (posicionales deben ir primero)
$usuario5 = crear_usuario(
    'Luis',
    'luis@example.com',
    edad: 40,
    roles: ['admin']
);

// Con arrays
function configurar(
    string $host,
    int $port,
    array $opciones = []
) {
    return compact('host', 'port', 'opciones');
}

$config = configurar(
    host: 'localhost',
    port: 3306,
    opciones: [
        'charset' => 'utf8mb4',
        'timeout' => 30
    ]
);

// Con variadic parameters
function log_evento(string $tipo, string ...$mensajes) {
    echo "$tipo: " . implode(', ', $mensajes);
}

// No se pueden nombrar variadic params
log_evento(tipo: 'ERROR', 'Conexión falló', 'Timeout');`,
      },
    },
    {
      id: 'match-expression',
      title: 'Match Expression',
      type: 'code',
      content: 'Match expression: switch mejorado (PHP 8.0+)',
      code: {
        title: 'Match expression vs switch',
        language: 'php',
        code: `<?php
// Switch tradicional
$role = 'admin';
switch ($role) {
    case 'admin':
        $permisos = ['crear', 'editar', 'eliminar', 'ver'];
        break;
    case 'editor':
        $permisos = ['crear', 'editar', 'ver'];
        break;
    case 'viewer':
        $permisos = ['ver'];
        break;
    default:
        $permisos = [];
}

// Match expression (más conciso y seguro)
$permisos = match ($role) {
    'admin' => ['crear', 'editar', 'eliminar', 'ver'],
    'editor' => ['crear', 'editar', 'ver'],
    'viewer' => ['ver'],
    default => []
};

// Match es una expresión (retorna valor)
$mensaje = match ($status) {
    200, 201 => 'Éxito',
    400, 404 => 'Error del cliente',
    500, 503 => 'Error del servidor',
    default => 'Estado desconocido'
};

// Match usa comparación estricta (===)
$valor = '1';

// Switch (usa ==, entra en case 1)
switch ($valor) {
    case 1:
        echo "Es 1";
        break;
}

// Match (usa ===, no entra en case 1)
echo match ($valor) {
    1 => "Es 1",
    '1' => "Es '1'", // Este es el que coincide
};

// Match sin default lanza UnhandledMatchError
try {
    $resultado = match ($status) {
        200 => 'OK',
        404 => 'Not Found'
        // Si $status no es 200 ni 404, lanza error
    };
} catch (UnhandledMatchError $e) {
    echo "Status no manejado: {$e->getMessage()}";
}

// Match con condiciones complejas
$edad = 25;
$categoria = match (true) {
    $edad < 18 => 'menor',
    $edad >= 18 && $edad < 65 => 'adulto',
    $edad >= 65 => 'senior',
};

// Match con expresiones
$precio = 100;
$descuento = match (true) {
    $precio < 50 => 0,
    $precio >= 50 && $precio < 100 => 0.05,
    $precio >= 100 && $precio < 200 => 0.10,
    $precio >= 200 => 0.15,
};

// Match anidado
$tipo = 'premium';
$duracion = 12;

$precio_final = match ($tipo) {
    'basic' => match ($duracion) {
        1 => 10,
        6 => 50,
        12 => 90,
    },
    'premium' => match ($duracion) {
        1 => 20,
        6 => 100,
        12 => 180,
    },
    default => 0
};`,
      },
    },
    {
      id: 'atributos',
      title: 'Atributos (Attributes)',
      type: 'code',
      content: 'Metadata en código con Attributes (PHP 8.0+)',
      code: {
        title: 'Attributes en PHP 8+',
        language: 'php',
        code: `<?php
// Definir un atributo
#[Attribute]
class Route {
    public function __construct(
        public string $path,
        public string $method = 'GET'
    ) {}
}

#[Attribute]
class Deprecated {
    public function __construct(
        public string $reason = '',
        public ?string $since = null
    ) {}
}

#[Attribute(Attribute::TARGET_PROPERTY)]
class Validate {
    public function __construct(
        public array $rules
    ) {}
}

// Usar atributos en clases
#[Route('/api/usuarios', method: 'GET')]
class UsuarioController {
    #[Route('/api/usuarios/{id}', method: 'GET')]
    public function mostrar(int $id) {
        return ['id' => $id];
    }

    #[Route('/api/usuarios', method: 'POST')]
    public function crear() {
        return ['mensaje' => 'Usuario creado'];
    }

    #[Deprecated(reason: 'Usar crearV2', since: '2.0')]
    public function crearViejo() {
        // Código obsoleto
    }
}

// Atributos en propiedades
class Usuario {
    #[Validate(rules: ['required', 'email'])]
    public string $email;

    #[Validate(rules: ['required', 'min:8'])]
    public string $password;

    public function __construct(string $email, string $password) {
        $this->email = $email;
        $this->password = $password;
    }
}

// Leer atributos con Reflection
function obtenerRutas(string $clase): array {
    $reflection = new ReflectionClass($clase);
    $rutas = [];

    // Atributos de la clase
    $atributos = $reflection->getAttributes(Route::class);
    foreach ($atributos as $atributo) {
        $route = $atributo->newInstance();
        $rutas[] = [
            'path' => $route->path,
            'method' => $route->method,
            'controller' => $clase
        ];
    }

    // Atributos de los métodos
    foreach ($reflection->getMethods() as $metodo) {
        $atributos = $metodo->getAttributes(Route::class);
        foreach ($atributos as $atributo) {
            $route = $atributo->newInstance();
            $rutas[] = [
                'path' => $route->path,
                'method' => $route->method,
                'controller' => $clase,
                'action' => $metodo->getName()
            ];
        }
    }

    return $rutas;
}

$rutas = obtenerRutas(UsuarioController::class);

// Validador usando attributes
function validar(object $objeto): array {
    $reflection = new ReflectionClass($objeto);
    $errores = [];

    foreach ($reflection->getProperties() as $propiedad) {
        $atributos = $propiedad->getAttributes(Validate::class);
        foreach ($atributos as $atributo) {
            $validate = $atributo->newInstance();
            $valor = $propiedad->getValue($objeto);

            foreach ($validate->rules as $regla) {
                if ($regla === 'required' && empty($valor)) {
                    $errores[] = "{$propiedad->getName()} es requerido";
                }
                // Más reglas...
            }
        }
    }

    return $errores;
}

$usuario = new Usuario('', 'abc');
$errores = validar($usuario);

// Múltiples atributos
#[Route('/api/posts', method: 'GET')]
#[Deprecated(reason: 'Usar /api/v2/posts', since: '2.0')]
class PostController {
    // ...
}

// Atributos en parámetros
class ServicioEmail {
    public function enviar(
        #[Email] string $destinatario,
        #[Required] string $asunto,
        string $mensaje
    ) {
        // ...
    }
}`,
      },
    },
    {
      id: 'enums',
      title: 'Enums',
      type: 'code',
      content: 'Enumeraciones nativas en PHP 8.1+',
      code: {
        title: 'Enums en PHP 8.1+',
        language: 'php',
        code: `<?php
// Enum básico (Pure Enum)
enum Estado {
    case PENDIENTE;
    case EN_PROCESO;
    case COMPLETADO;
    case CANCELADO;
}

function procesar(Estado $estado): string {
    return match ($estado) {
        Estado::PENDIENTE => 'Esperando',
        Estado::EN_PROCESO => 'Procesando',
        Estado::COMPLETADO => 'Terminado',
        Estado::CANCELADO => 'Cancelado',
    };
}

$estado = Estado::PENDIENTE;
echo procesar($estado);

// Backed Enum (con valores)
enum TipoUsuario: string {
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case VIEWER = 'viewer';
    case GUEST = 'guest';
}

// Obtener valor
echo TipoUsuario::ADMIN->value; // 'admin'

// Desde valor
$tipo = TipoUsuario::from('editor'); // TipoUsuario::EDITOR
$tipo = TipoUsuario::tryFrom('invalid'); // null (no lanza error)

// Enum con métodos
enum HttpStatus: int {
    case OK = 200;
    case CREATED = 201;
    case BAD_REQUEST = 400;
    case NOT_FOUND = 404;
    case SERVER_ERROR = 500;

    public function mensaje(): string {
        return match ($this) {
            self::OK => 'Solicitud exitosa',
            self::CREATED => 'Recurso creado',
            self::BAD_REQUEST => 'Solicitud inválida',
            self::NOT_FOUND => 'No encontrado',
            self::SERVER_ERROR => 'Error del servidor',
        };
    }

    public function esError(): bool {
        return $this->value >= 400;
    }

    public function esExito(): bool {
        return $this->value >= 200 && $this->value < 300;
    }
}

$status = HttpStatus::NOT_FOUND;
echo $status->mensaje(); // "No encontrado"
echo $status->esError() ? 'Error' : 'OK'; // "Error"

// Enum con constantes
enum Tamano {
    case PEQUENO;
    case MEDIANO;
    case GRANDE;

    public const UNIDAD = 'cm';

    public function dimensiones(): array {
        return match ($this) {
            self::PEQUENO => ['ancho' => 10, 'alto' => 10],
            self::MEDIANO => ['ancho' => 20, 'alto' => 20],
            self::GRANDE => ['ancho' => 30, 'alto' => 30],
        };
    }
}

// Enum con traits
trait Traducible {
    public function traducir(string $idioma): string {
        return match ($idioma) {
            'es' => $this->nombreEs(),
            'en' => $this->nombreEn(),
            default => $this->name
        };
    }
}

enum Dia: int {
    use Traducible;

    case LUNES = 1;
    case MARTES = 2;
    case MIERCOLES = 3;
    case JUEVES = 4;
    case VIERNES = 5;
    case SABADO = 6;
    case DOMINGO = 7;

    private function nombreEs(): string {
        return match ($this) {
            self::LUNES => 'Lunes',
            self::MARTES => 'Martes',
            self::MIERCOLES => 'Miércoles',
            self::JUEVES => 'Jueves',
            self::VIERNES => 'Viernes',
            self::SABADO => 'Sábado',
            self::DOMINGO => 'Domingo',
        };
    }

    private function nombreEn(): string {
        return match ($this) {
            self::LUNES => 'Monday',
            self::MARTES => 'Tuesday',
            self::MIERCOLES => 'Wednesday',
            self::JUEVES => 'Thursday',
            self::VIERNES => 'Friday',
            self::SABADO => 'Saturday',
            self::DOMINGO => 'Sunday',
        };
    }

    public function esFinDeSemana(): bool {
        return in_array($this, [self::SABADO, self::DOMINGO]);
    }
}

$dia = Dia::LUNES;
echo $dia->traducir('es'); // "Lunes"

// Listar todos los casos
$estados = Estado::cases();
foreach ($estados as $estado) {
    echo $estado->name . "\\n";
}`,
      },
    },
    {
      id: 'types',
      title: 'Union e Intersection Types',
      type: 'code',
      content: 'Tipos avanzados en PHP 8.0+',
      code: {
        title: 'Union e Intersection Types',
        language: 'php',
        code: `<?php
// Union Types (PHP 8.0+)
function procesar_id(int|string $id): void {
    if (is_int($id)) {
        echo "ID numérico: $id";
    } else {
        echo "ID string: $id";
    }
}

procesar_id(123);
procesar_id("abc-456");

// Múltiples tipos
function formatear(int|float|string $valor): string {
    return match (true) {
        is_int($valor) => "Entero: $valor",
        is_float($valor) => "Flotante: $valor",
        is_string($valor) => "String: $valor",
    };
}

// Con null
function buscar(string $query): array|null {
    return $_GET['q'] ?? null;
}

// Nullable type (shorthand)
function obtener_usuario(int $id): ?Usuario {
    return null; // Usuario|null
}

// False en union types (PHP 8.2+)
function leer_archivo(string $path): string|false {
    return file_get_contents($path);
}

// Intersection Types (PHP 8.1+)
interface Persistible {
    public function guardar(): void;
}

interface Validable {
    public function validar(): bool;
}

// El parámetro debe implementar AMBAS interfaces
function procesar(Persistible&Validable $objeto): void {
    if ($objeto->validar()) {
        $objeto->guardar();
    }
}

class Modelo implements Persistible, Validable {
    public function guardar(): void {
        echo "Guardando...";
    }

    public function validar(): bool {
        return true;
    }
}

procesar(new Modelo()); // OK

// DNF Types - Disjunctive Normal Form (PHP 8.2+)
function procesar_complejo((Persistible&Validable)|array $data): void {
    if (is_array($data)) {
        echo "Es array";
    } else {
        // Es objeto que implementa ambas interfaces
        if ($data->validar()) {
            $data->guardar();
        }
    }
}

// Never type (PHP 8.1+)
function lanzar_error(): never {
    throw new Exception("Error!");
    // Nunca retorna
}

function salir(): never {
    exit();
}

function loop_infinito(): never {
    while (true) {
        // código
    }
}

// Void vs Never
function registrar(string $mensaje): void {
    file_put_contents('log.txt', $mensaje);
    // Retorna implícitamente (puede retornar sin valor)
}

// Mixed type (cualquier tipo)
function procesar_cualquiera(mixed $valor): mixed {
    return $valor;
}

// Static return type
class Builder {
    protected array $datos = [];

    public function set(string $key, mixed $value): static {
        $this->datos[$key] = $value;
        return $this; // Permite chaining
    }

    public function get(string $key): mixed {
        return $this->datos[$key] ?? null;
    }
}

class ExtendedBuilder extends Builder {
    public function setMultiple(array $datos): static {
        foreach ($datos as $key => $value) {
            $this->set($key, $value);
        }
        return $this;
    }
}

// static retorna el tipo de la clase que lo llama
$builder = (new ExtendedBuilder())
    ->set('nombre', 'Juan')
    ->setMultiple(['edad' => 25, 'ciudad' => 'Madrid']);`,
      },
    },
    {
      id: 'readonly',
      title: 'Readonly Properties y Classes',
      type: 'code',
      content: 'Inmutabilidad con readonly (PHP 8.1+)',
      code: {
        title: 'Readonly properties y classes',
        language: 'php',
        code: `<?php
// Readonly properties (PHP 8.1+)
class Usuario {
    public function __construct(
        public readonly string $id,
        public readonly string $nombre,
        public string $email, // No readonly, se puede modificar
    ) {}
}

$usuario = new Usuario('123', 'Juan', 'juan@example.com');

echo $usuario->nombre; // OK
$usuario->email = 'nuevo@example.com'; // OK

// Error: Cannot modify readonly property
// $usuario->nombre = 'Pedro';

// Readonly solo se puede asignar una vez
class Producto {
    public readonly float $precio;

    public function __construct(float $precio) {
        $this->precio = $precio; // OK (primera asignación)
    }

    public function aplicarDescuento(float $descuento): void {
        // Error: Cannot modify readonly property
        // $this->precio = $this->precio * (1 - $descuento);
    }
}

// Readonly classes (PHP 8.2+)
// Todas las propiedades son readonly automáticamente
readonly class Configuracion {
    public function __construct(
        public string $host,
        public int $port,
        public string $database,
        public array $opciones = []
    ) {}
}

$config = new Configuracion('localhost', 3306, 'mydb');
// Error en todas:
// $config->host = 'newhost';
// $config->port = 5432;

// Readonly class no puede tener propiedades dinámicas
// readonly class Config {
//     public string $host;
//     public array $datos; // Error: debe ser readonly
// }

// Readonly class con métodos
readonly class Punto {
    public function __construct(
        public float $x,
        public float $y
    ) {}

    public function distancia(Punto $otro): float {
        $dx = $this->x - $otro->x;
        $dy = $this->y - $otro->y;
        return sqrt($dx ** 2 + $dy ** 2);
    }

    // Métodos que retornan nuevas instancias (inmutabilidad)
    public function mover(float $dx, float $dy): self {
        return new self($this->x + $dx, $this->y + $dy);
    }
}

$p1 = new Punto(0, 0);
$p2 = $p1->mover(3, 4);
echo $p2->x; // 3
echo $p1->x; // 0 (original no cambia)

// Value Objects con readonly
readonly class Email {
    public function __construct(
        public string $valor
    ) {
        if (!filter_var($valor, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidArgumentException("Email inválido");
        }
    }

    public function dominio(): string {
        return substr($this->valor, strpos($this->valor, '@') + 1);
    }

    public function __toString(): string {
        return $this->valor;
    }
}

$email = new Email('usuario@ejemplo.com');
echo $email->dominio(); // "ejemplo.com"

// Readonly con herencia
readonly class EntidadBase {
    public function __construct(
        public string $id,
        public DateTimeImmutable $createdAt
    ) {}
}

// La clase hija también debe ser readonly
readonly class Post extends EntidadBase {
    public function __construct(
        string $id,
        DateTimeImmutable $createdAt,
        public string $titulo,
        public string $contenido
    ) {
        parent::__construct($id, $createdAt);
    }
}`,
      },
    },
    {
      id: 'errores',
      title: 'Manejo de Errores',
      type: 'code',
      content: 'Try-catch, excepciones personalizadas y error handling',
      code: {
        title: 'Manejo de errores y excepciones',
        language: 'php',
        code: `<?php
// Try-catch básico
try {
    $resultado = 10 / 0;
} catch (DivisionByZeroError $e) {
    echo "Error: " . $e->getMessage();
}

// Múltiples catch
try {
    $archivo = file_get_contents('inexistente.txt');
    $json = json_decode($archivo, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo "Error JSON: " . $e->getMessage();
} catch (Exception $e) {
    echo "Error general: " . $e->getMessage();
}

// Catch múltiples tipos (PHP 7.1+)
try {
    // código
} catch (TypeError | ValueError $e) {
    echo "Error de tipo o valor: " . $e->getMessage();
}

// Finally (siempre se ejecuta)
try {
    $file = fopen('archivo.txt', 'r');
    // procesar archivo
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
} finally {
    if (isset($file) && is_resource($file)) {
        fclose($file);
    }
}

// Lanzar excepciones
function dividir(int $a, int $b): float {
    if ($b === 0) {
        throw new InvalidArgumentException("No se puede dividir por cero");
    }
    return $a / $b;
}

// Excepciones personalizadas
class UsuarioNoEncontradoException extends Exception {
    public function __construct(
        public readonly int $userId,
        string $mensaje = "Usuario no encontrado"
    ) {
        parent::__construct($mensaje);
    }
}

class ValidacionException extends Exception {
    public function __construct(
        public readonly array $errores,
        string $mensaje = "Errores de validación"
    ) {
        parent::__construct($mensaje);
    }
}

function buscar_usuario(int $id): array {
    $usuario = null; // simular búsqueda en BD

    if (!$usuario) {
        throw new UsuarioNoEncontradoException($id);
    }

    return $usuario;
}

try {
    $usuario = buscar_usuario(999);
} catch (UsuarioNoEncontradoException $e) {
    echo "Usuario {$e->userId} no existe";
}

// Validación con excepciones
function validar_usuario(array $datos): void {
    $errores = [];

    if (empty($datos['nombre'])) {
        $errores['nombre'] = 'El nombre es requerido';
    }

    if (empty($datos['email']) || !filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
        $errores['email'] = 'Email inválido';
    }

    if (!empty($errores)) {
        throw new ValidacionException($errores);
    }
}

try {
    validar_usuario(['nombre' => '', 'email' => 'invalido']);
} catch (ValidacionException $e) {
    foreach ($e->errores as $campo => $error) {
        echo "$campo: $error\\n";
    }
}

// Error Handler personalizado
set_error_handler(function($nivel, $mensaje, $archivo, $linea) {
    throw new ErrorException($mensaje, 0, $nivel, $archivo, $linea);
});

// Exception Handler global
set_exception_handler(function(Throwable $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Error interno del servidor',
        'mensaje' => $e->getMessage()
    ]);
});

// Assert (desarrollo)
assert_options(ASSERT_ACTIVE, 1);
assert_options(ASSERT_EXCEPTION, 1);

function procesar_edad(int $edad): void {
    assert($edad >= 0, "La edad no puede ser negativa");
    assert($edad <= 150, "La edad no puede ser mayor a 150");

    echo "Edad válida: $edad";
}

// Error vs Exception
// Error: problemas graves (PHP 7+)
// Exception: condiciones excepcionales controlables

// Jerarquía:
// Throwable
//   ├── Error
//   │   ├── ParseError
//   │   ├── TypeError
//   │   ├── ArithmeticError
//   │   │   └── DivisionByZeroError
//   │   └── AssertionError
//   └── Exception
//       ├── LogicException
//       ├── RuntimeException
//       └── ...

try {
    // código
} catch (Throwable $e) {
    // Captura Error y Exception
    echo "Error crítico: " . $e->getMessage();
}`,
      },
    },
    {
      id: 'pdo',
      title: 'PDO - Base de Datos',
      type: 'code',
      content: 'Conexión y operaciones con PDO',
      code: {
        title: 'PDO para bases de datos',
        language: 'php',
        code: `<?php
// Conexión PDO
try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=midb;charset=utf8mb4',
        'usuario',
        'password',
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// SELECT simple
$stmt = $pdo->query("SELECT * FROM usuarios");
$usuarios = $stmt->fetchAll();

// SELECT con parámetros (prepared statements)
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
$stmt->execute([1]);
$usuario = $stmt->fetch();

// Named parameters
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = :email AND activo = :activo");
$stmt->execute([
    'email' => 'juan@example.com',
    'activo' => 1
]);
$usuario = $stmt->fetch();

// INSERT
$stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, edad) VALUES (?, ?, ?)");
$stmt->execute(['Juan', 'juan@example.com', 25]);
$userId = $pdo->lastInsertId();

// INSERT con named parameters
$stmt = $pdo->prepare("
    INSERT INTO usuarios (nombre, email, edad, created_at)
    VALUES (:nombre, :email, :edad, NOW())
");
$stmt->execute([
    'nombre' => 'María',
    'email' => 'maria@example.com',
    'edad' => 30
]);

// UPDATE
$stmt = $pdo->prepare("UPDATE usuarios SET email = ? WHERE id = ?");
$stmt->execute(['nuevo@example.com', 1]);
$filasAfectadas = $stmt->rowCount();

// DELETE
$stmt = $pdo->prepare("DELETE FROM usuarios WHERE id = ?");
$stmt->execute([5]);

// Transacciones
try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("UPDATE cuentas SET saldo = saldo - ? WHERE id = ?");
    $stmt->execute([100, 1]);

    $stmt = $pdo->prepare("UPDATE cuentas SET saldo = saldo + ? WHERE id = ?");
    $stmt->execute([100, 2]);

    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    throw $e;
}

// Fetch modes
$stmt = $pdo->query("SELECT * FROM usuarios");

// Array asociativo (default si se configuró)
$usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Array indexado
$usuarios = $stmt->fetchAll(PDO::FETCH_NUM);

// Ambos
$usuarios = $stmt->fetchAll(PDO::FETCH_BOTH);

// Objeto stdClass
$usuarios = $stmt->fetchAll(PDO::FETCH_OBJ);

// Objeto de clase específica
class Usuario {
    public string $nombre;
    public string $email;
}

$stmt = $pdo->query("SELECT nombre, email FROM usuarios");
$usuarios = $stmt->fetchAll(PDO::FETCH_CLASS, Usuario::class);

// Columna específica
$stmt = $pdo->query("SELECT nombre FROM usuarios");
$nombres = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Key-value pairs
$stmt = $pdo->query("SELECT id, nombre FROM usuarios");
$usuariosMap = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

// Clase de base de datos
class Database {
    private PDO $pdo;

    public function __construct(string $dsn, string $user, string $pass) {
        $this->pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }

    public function query(string $sql, array $params = []): array {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    public function queryOne(string $sql, array $params = []): ?array {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();
        return $result ?: null;
    }

    public function execute(string $sql, array $params = []): int {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        return $stmt->rowCount();
    }

    public function lastInsertId(): string {
        return $this->pdo->lastInsertId();
    }
}

$db = new Database('mysql:host=localhost;dbname=midb', 'user', 'pass');
$usuarios = $db->query("SELECT * FROM usuarios WHERE activo = ?", [1]);
$usuario = $db->queryOne("SELECT * FROM usuarios WHERE id = ?", [1]);`,
      },
    },
    {
      id: 'json-apis',
      title: 'JSON y APIs',
      type: 'code',
      content: 'Trabajar con JSON y consumir/crear APIs',
      code: {
        title: 'JSON y APIs REST',
        language: 'php',
        code: `<?php
// Encode JSON
$datos = [
    'nombre' => 'Juan',
    'edad' => 25,
    'activo' => true,
    'hobbies' => ['programar', 'leer']
];

$json = json_encode($datos);
echo $json; // {"nombre":"Juan","edad":25,"activo":true,"hobbies":["programar","leer"]}

// Pretty print
$json = json_encode($datos, JSON_PRETTY_PRINT);

// Opciones útiles
$json = json_encode($datos,
    JSON_PRETTY_PRINT |
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES
);

// Decode JSON
$json = '{"nombre":"María","edad":30}';
$datos = json_decode($json, true); // Array asociativo
$objeto = json_decode($json);       // stdClass

// Manejo de errores JSON (PHP 7.3+)
try {
    $datos = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
} catch (JsonException $e) {
    echo "Error JSON: " . $e->getMessage();
}

// API Response helper
function jsonResponse(mixed $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_THROW_ON_ERROR);
    exit;
}

// Uso en API
jsonResponse(['mensaje' => 'Éxito', 'datos' => $datos]);
jsonResponse(['error' => 'No encontrado'], 404);

// Consumir API con cURL
function apiRequest(string $url, string $method = 'GET', ?array $data = null): array {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Accept: application/json'
    ]);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'status' => $statusCode,
        'data' => json_decode($response, true)
    ];
}

// Usar la función
$response = apiRequest('https://api.ejemplo.com/usuarios');
if ($response['status'] === 200) {
    $usuarios = $response['data'];
}

// POST request
$nuevoUsuario = [
    'nombre' => 'Pedro',
    'email' => 'pedro@example.com'
];
$response = apiRequest('https://api.ejemplo.com/usuarios', 'POST', $nuevoUsuario);

// file_get_contents para GET simple
$json = file_get_contents('https://api.ejemplo.com/usuarios');
$usuarios = json_decode($json, true);

// Con contexto (headers, POST, etc)
$options = [
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/json',
        'content' => json_encode(['nombre' => 'Ana'])
    ]
];
$context = stream_context_create($options);
$response = file_get_contents('https://api.ejemplo.com/usuarios', false, $context);

// API Router simple
class ApiRouter {
    private array $routes = [];

    public function get(string $path, callable $handler): void {
        $this->routes['GET'][$path] = $handler;
    }

    public function post(string $path, callable $handler): void {
        $this->routes['POST'][$path] = $handler;
    }

    public function handle(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $handler = $this->routes[$method][$path] ?? null;

        if (!$handler) {
            jsonResponse(['error' => 'Ruta no encontrada'], 404);
        }

        $data = json_decode(file_get_contents('php://input'), true);
        jsonResponse($handler($data));
    }
}

// Uso
$router = new ApiRouter();

$router->get('/api/usuarios', function() {
    return ['usuarios' => [/* datos */]];
});

$router->post('/api/usuarios', function($data) {
    // Crear usuario con $data
    return ['mensaje' => 'Usuario creado', 'id' => 123];
});

$router->handle();`,
      },
    },
    {
      id: 'composer',
      title: 'Composer',
      type: 'code',
      content: 'Gestión de dependencias con Composer',
      code: {
        title: 'Composer - Package Manager',
        language: 'php',
        code: `# Instalar Composer
# https://getcomposer.org/

# Inicializar proyecto
composer init

# composer.json básico
{
    "name": "usuario/proyecto",
    "description": "Mi proyecto PHP",
    "type": "project",
    "require": {
        "php": ">=8.4",
        "monolog/monolog": "^3.0",
        "vlucas/phpdotenv": "^5.5"
    },
    "require-dev": {
        "phpunit/phpunit": "^11.0",
        "phpstan/phpstan": "^1.10"
    },
    "autoload": {
        "psr-4": {
            "App\\\\": "src/",
            "Tests\\\\": "tests/"
        }
    }
}

# Instalar dependencias
composer install

# Agregar paquete
composer require guzzlehttp/guzzle

# Agregar paquete dev
composer require --dev phpunit/phpunit

# Actualizar dependencias
composer update

# Actualizar una específica
composer update monolog/monolog

# Remover paquete
composer remove monolog/monolog

# Dump autoload (regenerar autoloader)
composer dump-autoload

# Ver paquetes instalados
composer show

# Ver paquetes desactualizados
composer outdated

# Scripts en composer.json
{
    "scripts": {
        "test": "phpunit",
        "analyse": "phpstan analyse src",
        "dev": "php -S localhost:8000 -t public"
    }
}

# Ejecutar scripts
composer test
composer analyse

# Usar autoloader
<?php
require __DIR__ . '/vendor/autoload.php';

use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

$log = new Logger('app');
$log->pushHandler(new StreamHandler('app.log', Logger::WARNING));

$log->warning('Advertencia');
$log->error('Error');

# PSR-4 Autoloading
# src/Models/Usuario.php
namespace App\\Models;

class Usuario {
    public string $nombre;
}

# Usar la clase
use App\\Models\\Usuario;

$usuario = new Usuario();

# .env con vlucas/phpdotenv
# .env file
DB_HOST=localhost
DB_NAME=midb
DB_USER=usuario
DB_PASS=password

# PHP
use Dotenv\\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];

# Versiones en composer.json
# ^1.2.3 = >=1.2.3 <2.0.0 (recomendado)
# ~1.2.3 = >=1.2.3 <1.3.0
# 1.2.* = >=1.2.0 <1.3.0
# >=1.2.3
# 1.2.3 (versión exacta)

# Optimizaciones producción
composer install --no-dev --optimize-autoloader
composer dump-autoload --optimize --classmap-authoritative`,
      },
    },
    {
      id: 'php84-features',
      title: 'PHP 8.4 Features',
      type: 'code',
      content: 'Características nuevas de PHP 8.4',
      code: {
        title: 'Novedades de PHP 8.4',
        language: 'php',
        code: `<?php
// Property Hooks (PHP 8.4) - El feature más importante
class Usuario {
    // Hook get simple
    public string $nombre {
        get => strtoupper($this->nombre);
    }

    // Hook set con validación
    public string $email {
        set {
            if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                throw new ValueError("Email inválido");
            }
            $this->email = strtolower($value);
        }
    }

    // Hooks get y set
    private float $_precio = 0;
    public float $precio {
        get => $this->_precio;
        set {
            if ($value < 0) {
                throw new ValueError("El precio no puede ser negativo");
            }
            $this->_precio = $value;
        }
    }

    // Propiedad virtual (computed property)
    public string $nombreCompleto {
        get => "{$this->nombre} {$this->apellido}";
    }

    public function __construct(
        public string $nombre,
        public string $apellido,
        string $email
    ) {
        $this->email = $email; // Usa el set hook
    }
}

$usuario = new Usuario("Juan", "Pérez", "JUAN@EXAMPLE.COM");
echo $usuario->nombre;          // "JUAN" (hook get transforma)
echo $usuario->email;           // "juan@example.com" (set normalizó)
echo $usuario->nombreCompleto; // "JUAN Pérez" (propiedad virtual)

// Lazy initialization con hooks
class Cache {
    private ?array $_datos = null;

    public array $datos {
        get {
            if ($this->_datos === null) {
                $this->_datos = $this->cargarDatos();
            }
            return $this->_datos;
        }
    }

    private function cargarDatos(): array {
        // Carga pesada solo cuando se necesita
        return ['key' => 'value'];
    }
}

// Asymmetric Visibility (PHP 8.4)
class Producto {
    // public get, private set
    public private(set) string $id;

    // public get, protected set
    public protected(set) float $precio;

    public function __construct(string $id, float $precio) {
        $this->id = $id;        // OK: dentro de la clase
        $this->precio = $precio; // OK: dentro de la clase
    }
}

$producto = new Producto("P001", 99.99);
echo $producto->id;    // OK: lectura pública
// $producto->id = "P002"; // Error: set es private

class ProductoDescuento extends Producto {
    public function aplicarDescuento(float $porcentaje): void {
        // OK: set es protected
        $this->precio = $this->precio * (1 - $porcentaje);
    }
}

// Combinar hooks con asymmetric visibility
class Cuenta {
    public private(set) float $saldo {
        get => number_format($this->saldo, 2);
        set {
            if ($value < 0) {
                throw new ValueError("Saldo no puede ser negativo");
            }
            $this->saldo = $value;
        }
    }

    public function depositar(float $monto): void {
        $this->saldo += $monto; // OK: private set dentro de la clase
    }
}

// HTML5 support (en htmlspecialchars)
$texto = '<div class="test">Hola & Adiós</div>';
echo htmlspecialchars($texto, ENT_HTML5 | ENT_QUOTES, 'UTF-8');

// New array functions
$numeros = [1, 2, 3, 4, 5];

// array_find - encuentra el primer elemento que cumple condición
$primer_par = array_find($numeros, fn($n) => $n % 2 === 0); // 2

// array_find_key - encuentra la key del primer elemento
$key_par = array_find_key($numeros, fn($n) => $n % 2 === 0); // 1

// array_any - verifica si algún elemento cumple
$tiene_pares = array_any($numeros, fn($n) => $n % 2 === 0); // true

// array_all - verifica si todos cumplen
$todos_positivos = array_all($numeros, fn($n) => $n > 0); // true

// New without parentheses
class Logger {
    public function log(string $msg): void {
        echo $msg;
    }
}

// Antes: (new Logger())->log('test');
// PHP 8.4:
new Logger()->log('test'); // Sin paréntesis!

// Chaining directo
echo new DateTime()->format('Y-m-d');

// Deprecations en PHP 8.4
// - Implicit nullable types (usar ?Type explícitamente)
// - mb_check_encoding sin argumentos
// - session_set_save_handler con flags`,
      },
    },
    {
      id: 'buenas-practicas',
      title: 'Buenas Prácticas',
      type: 'code',
      content: 'Convenciones y mejores prácticas en PHP moderno',
      code: {
        title: 'Buenas prácticas PHP 8.4',
        language: 'php',
        code: `<?php
// 1. Usar declare strict_types
declare(strict_types=1);

// 2. Type hints siempre que sea posible
function calcular(int $a, int $b): int {
    return $a + $b;
}

// 3. Constructor Property Promotion
class Usuario {
    public function __construct(
        public readonly string $id,
        public string $nombre,
        public string $email,
        private string $password
    ) {}
}

// 4. Readonly para inmutabilidad
readonly class Configuracion {
    public function __construct(
        public string $apiKey,
        public string $baseUrl
    ) {}
}

// 5. Named arguments para claridad
function crear_post(
    string $titulo,
    string $contenido,
    bool $publicado = false,
    array $tags = []
) {
    return compact('titulo', 'contenido', 'publicado', 'tags');
}

$post = crear_post(
    titulo: "Mi post",
    contenido: "Contenido...",
    tags: ['php', 'tutorial']
);

// 6. Match en lugar de switch
$status = 404;
$mensaje = match ($status) {
    200 => 'OK',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown'
};

// 7. Arrow functions para callbacks simples
$numeros = [1, 2, 3, 4, 5];
$dobles = array_map(fn($n) => $n * 2, $numeros);

// 8. Null coalescing y null safe
$nombre = $_GET['nombre'] ?? 'Invitado';
$pais = $usuario?->direccion?->pais;

// 9. Enums para constantes relacionadas
enum Estado: string {
    case ACTIVO = 'activo';
    case INACTIVO = 'inactivo';
    case SUSPENDIDO = 'suspendido';
}

// 10. Exceptions específicas
class UsuarioNoEncontradoException extends Exception {}
class ValidacionException extends Exception {}

// 11. PSR-12 Code Style
namespace App\\Services;

use App\\Models\\Usuario;
use App\\Exceptions\\UsuarioNoEncontradoException;

class UsuarioService
{
    public function __construct(
        private Database $db
    ) {}

    public function buscar(int $id): Usuario
    {
        $usuario = $this->db->queryOne(
            "SELECT * FROM usuarios WHERE id = ?",
            [$id]
        );

        if (!$usuario) {
            throw new UsuarioNoEncontradoException("Usuario $id no encontrado");
        }

        return new Usuario(...$usuario);
    }
}

// 12. Dependency Injection
class PostController
{
    public function __construct(
        private PostRepository $posts,
        private Logger $logger
    ) {}

    public function crear(array $datos): Post
    {
        $this->logger->info('Creando post');
        return $this->posts->crear($datos);
    }
}

// 13. Interface Segregation
interface Persistible {
    public function guardar(): void;
}

interface Validable {
    public function validar(): bool;
}

class Post implements Persistible, Validable {
    public function guardar(): void { /* ... */ }
    public function validar(): bool { return true; }
}

// 14. Single Responsibility
// Mal:
class Usuario {
    public function guardar() { /* DB logic */ }
    public function enviarEmail() { /* Email logic */ }
}

// Bien:
class Usuario { /* Solo datos y lógica de negocio */ }
class UsuarioRepository { /* DB logic */ }
class EmailService { /* Email logic */ }

// 15. Evitar valores mágicos
// Mal:
if ($usuario->role === 'admin') { }

// Bien:
enum Role: string {
    case ADMIN = 'admin';
    case USER = 'user';
}

if ($usuario->role === Role::ADMIN) { }

// 16. Documentación con PHPDoc cuando sea necesario
/**
 * Calcula el precio final con descuento
 *
 * @param float $precio Precio base
 * @param float $descuento Descuento decimal (0.1 = 10%)
 * @return float Precio final
 * @throws InvalidArgumentException Si el descuento es inválido
 */
function calcular_precio(float $precio, float $descuento): float
{
    if ($descuento < 0 || $descuento > 1) {
        throw new InvalidArgumentException('Descuento debe estar entre 0 y 1');
    }

    return $precio * (1 - $descuento);
}

// 17. Validación de entrada
function procesar_datos(array $datos): void
{
    $datos_validados = filter_var_array($datos, [
        'email' => FILTER_VALIDATE_EMAIL,
        'edad' => ['filter' => FILTER_VALIDATE_INT, 'options' => ['min_range' => 0]],
        'nombre' => FILTER_SANITIZE_STRING
    ]);

    if (!$datos_validados['email']) {
        throw new ValidacionException('Email inválido');
    }
}

// 18. Logging adecuado
use Psr\\Log\\LoggerInterface;

class ServicioImportante
{
    public function __construct(
        private LoggerInterface $logger
    ) {}

    public function procesar(): void
    {
        $this->logger->info('Iniciando proceso');

        try {
            // lógica
            $this->logger->debug('Paso 1 completado');
        } catch (Exception $e) {
            $this->logger->error('Error en proceso', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
}`,
      },
    },
  ],
}
