# Trabajo Integrador - Argentina Programa: Portafolio Personal

El Repositorio actual cuenta con mi desarrollo personal del trabajo solicitado para el programa formación ArgentinaPrograma de la 2da Etapa: Yo Programo.

El despliegue del proyecto se realiza en la plataforma **Firebase**, utilizando conexión con GitHub Workflows la automatización. El Sitio puede ser visitado a través del nombre [mi-portafolio-ap.web.app](https://mi-portafolio-ap.web.app/)

## Estructura

El proyecto tiene la siguiente estructura bajo la carpeta [src](src/):

```
├───app
│   ├───auth
│   ├───core
│   │   └───root
│   ├───edit-educaciones
│   ├───edit-experiencias
│   ├───edit-habilidades
│   ├───edit-perfil
│   ├───edit-proyectos
│   ├───error
│   ├───home
│   └───shared
├───assets
│   ├───fonts
│   └───img
└───environments
```

La aplicación principal se divide en submódulos:
 - **AuthModule** : Contiene el proceso de autenticación de los usuarios que desean iniciar la sesión, o registrar un nuevo usuario.
 - **CoreModule** : Se importa unicamente por `AppModule`, contiene los elementos que uso único de la aplicación. Dentro posee `root`, que almacena los servicios con alcance de aplicación, utilizables por todos los módulos y bajo instancia única (Singleton).
 - **Modulos Edit** : Cada uno de estos submódulos contiene la lógica necesaria para las funciones ABMC (Alta, Baja, Modificación y Consulta) de los items que componen el portafolio principal.
 - **ErrorModule** : Contiene submódulos con los componentes de mensajes de errores comunes de la aplicación.
 - **SharedModule** : Elementos compartidos a lo largo de todas los demás módulos, evitando lo mayor posible la repetición de código entre ellos.
 - **HomeModule** : Página principal que contiene el portafolio visible al público.

## Aspectos destacables sobre la implementación

### Combinación de SPA con Lazy Load

Angular es un framework con el que puede crearse aplicaciones de Página Única (Single Page Applications) utilizando su módule `RouterModule`. Sin embargo, si se trabaja bajo el módulo principal de la aplicación, no habrá forma de distinguir que partes de la aplicación serán realmente requeridas por el usuario y en que momento obtenerlas del servidor. Esto hace que la aplicación de descargue completamente y posiblemente sin necesidad alguna.

Para obtener una correcta optimización de las cargas que realiza la aplicación, se implementó la técnica de Lazy Load, que implica bajar cada módulo por separado solo cuando es realmente necesario. La configuración puede verse en el archivo [app-routing.module.ts](src/app/app-routing.module.ts), la variable `routes` contiene el listado de módulos a importar por cada `path` correspondiente:

```
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'edit-perfil', loadChildren: () => import('./edit-perfil/edit-perfil.module').then(m => m.EditPerfilModule), canActivate: [AdminGuard] },
  { path: 'edit-proyectos', loadChildren: () => import('./edit-proyectos/edit-proyectos.module').then(m => m.EditProyectosModule), canActivate: [AdminGuard] },
  { path: 'edit-educaciones', loadChildren: () => import('./edit-educaciones/edit-educaciones.module').then(m => m.EditEducacionesModule), canActivate: [AdminGuard] },
  { path: 'edit-habilidades', loadChildren: () => import('./edit-habilidades/edit-habilidades.module').then(m => m.EditHabilidadesModule), canActivate: [AdminGuard] },
  { path: 'edit-experiencias', loadChildren: () => import('./edit-experiencias/edit-experiencias.module').then(m => m.EditExperienciasModule), canActivate: [AdminGuard] },
  { path: 'forbidden', loadChildren: () => import('./error/forbidden/forbidden.module').then(m => m.ForbiddenModule)},
  { path: 'not-found', loadChildren: () => import('./error/not-found/not-found.module').then(m => m.NotFoundModule)},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' } // 404 NOT FOUND LOGICO 
];
```

### Implementación de Ng-Bootstrap

La aplicación utiliza `NgbModule` del proyecto **Ng-Bootstrap** (en su versión 12.1.2) para interactuar con componentes pre-fabricados del framework Bootstrap (en su versión 5.2.1).

#### Servicio de Modal Spinner

Debido a las limitaciones de las características de las plataformas de despliegue tanto del servidor de BackEnd como de Base de Datos, se hizo evidente un tiempo de espera por respuesta desde el FrontEnd. Para evitar que los usuarios realicen interacciones no permitidas, se optó por inhabilitar las acciones a través de Modals de carga con Spinners visuales, elementos que nos facilita Bootstrap.

 - [loading.interceptor.ts](src/app/core/interceptors/loading.interceptor.ts) se encarga de detectar cualquier Solicitud nueva que requiera acción de BloquearPantalla.
 - [modal-dialog.service.ts](src/app/core/root/modal-dialog.service.ts) es el servicio de alcance de aplicación que posibilita interactuar con los Modals de `NgbModule`.
 - [modal-loading](src/app/core/components/) es el componente a mostrar durante las cargas de espera.

#### Servicio de mensajes de FeedBack con Toasts

A medida que el trabajo iba adquiriendo mayor cantidad de funciones (manejo de sesiones, ABMC de items, listados, etc) fue necesario mejora el FeedBack que los usuarios podían obtener de las acciones que realizaban. Se optó entonces el uso de un servicio de Toasts incluido en `NgbModule`.

 - [toast.service.ts](src/app/core/services/toast.service.ts) es el servicio que posilita el uso de Toasts en la aplicación.
 - [toasts](src/app/core/components/toasts) es el component que actua como contenedor de los mensajes Toast.

### Persistencia de datos

Para el manejo de sesiones de usuario fué necesario mantener la persistencia de los datos más allá de los módulos individuales y los servicios Singleton (estos últimos pierden sus instancias al refrescar una página de la aplicación o al acceder directamente a una aplicación). Para ello se usó **sessionStorage**, una característica de los navegadores más actuales que permiten un conjunto de datos almacenados mientras el proceso del navegador siga vivo.

los ejemplos de su implementación pueden verse en [user.service.ts](src/app/core/root/user.service.ts).

### Autenticación y Control de Acceso

Los usuarios de la aplicación cuentan con un rol determinado, el mismo puede ser de **usuario** o de **administrador**. Solo el administrador de la aplicación es capaz de acceder a las herramientas de edición de ítems, de modo que se implementó el un ***Control de Acceso Basado en Roles*** que permite el acceso a los recursos dependiendo de los roles que posea el usuario solicitante.

En Angular, los componentes que nos permiten controlar el acceso a un recurso se denominan Guardias o **Guards**. Estos se encuentran configurados dentro de [app-routing.module.ts](src/app/app-routing.module.ts), mostrado anteriormente.
