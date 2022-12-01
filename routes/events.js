const {Router}=require('express')
const {check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const{isDate}=require('../helpers/isDate')
const {validarJWT}=require('../middlewares/validar-jwt')
const {getEventos,crearEvento,actualizarEvento,eliminarEvento}=require('../controllers/events')


/*
    Rutas de los eventos/ events
    host+/api/events
*/
//Todos tienen que pasar por la validación del JWT
//Obtener eventos
const router=Router()
router.use(validarJWT)
router.get('/',getEventos)

//Crear un nuevo evento
router.post(
        '/',
        [
            check('title','El título es obligatorio').not().isEmpty(),
            check('start','Fecha de inicio es obligatoria').custom(isDate),
            check('end','Fecha de finalización es obligatoria').custom(isDate),
            validarCampos
        ],
        crearEvento
    )

//Actualizar evento
router.put(
            '/:id',
            [
                check('title','El título es obligatorio').not().isEmpty(),
                check('start','Fecha de inicio es obligatoria').custom(isDate),
                check('end','Fecha de finalización es obligatoria').custom(isDate),
                validarCampos
            ],
        actualizarEvento)

//Borrar evento
router.delete('/:id',validarCampos,eliminarEvento)

module.exports=router