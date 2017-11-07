import {environment} from '../environments/environment'
export var GLOBAL = {
    apiUrl: environment.apiUrl,
    socketUrl: environment.socketURL,
    country: 'Colombia',
    company: 'Unigas',
    regionName: 'Departamento', // Region
    cityName: 'Municipio', // Comuna
    maxItemsOrder: 4,
    reasonsCancelOrder: ['Aún tiene suministro',
        'Cilindro de otra compañía',
        'Dirección errada',
        'El usuario cancela pedido',
        'El usuario no se encuentra',
        'El usuario no tiene dinero',
        'Pedido duplicado',
        'Zona de difícil acceso',
        'Gas Natural',
        'Tanque o instalación no Aptos para suministro'
    ]
}
