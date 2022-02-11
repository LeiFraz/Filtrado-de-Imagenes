/* ECMA SCRIPT */
const grid = new Muuri('.grid', {
    layout: {
        /*fillGaps: true,
        horizontal: true,
        alignRight: true,
        alignBottom: true,*/
        rounding: false 
        /* lo medimos con porcentajes cuando es verdadero, su valor por defecto es false*/
      }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    /* refresco los items que tenemos, cada vez que carga la pagina o cuando 
    se modifica el tamaño (este ultimo no estoy seguro)*/
    document.getElementById('grid').classList.add('imagenes-cargadas');
    /* añado esa clase a la seccion con el id grid, para que cuando las imagenes carguen por completo
    su opacidad cambie de 0 a 1. */

    const enlaces = document.querySelectorAll('#categorias a');
    /* accedo a todas las categorias (las cuales tienen el id="categorias") y traigo los enlaces.
    Esto seria ir al DIV con ese id y obtener las etiquetas a*/

    //FILTRADO DE LAS IMAGENES, SEGUN SU CATEGORIA (CLICK EN LOS ENLACES)
    enlaces.forEach( (enlace) => {
        //console.log(enlace);

        enlace.addEventListener('click', (evento) => {
            evento.preventDefault();
            /* evitamos que haga las cosas por defecto, en este caso seria que no ponga # al enlace, en otros
            casos creo que no dejaria que haya redirecciones, si es que su funcion era ir a otra pagina */

            const activo = document.querySelector('#categorias a.activo');
            activo.classList.remove('activo');
            /* eliminamos el enlace que tiene la clase activo */

            //console.log(evento.target);
            evento.target.classList.add('activo');

            /* FILTRADO */
            const categoria = evento.target.innerHTML.toLowerCase();
            //console.log(categoria);

            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
            /* if ternario... si la categoria es igual a TODOS muestra todas las imagenes, de lo contrario muestra
            las imagenes de acuerdo a la categoria que se eligio.*/
        });
        /*- añadimos un evento al enlace.
          - cuando le hacen click ejecuta la funcion.
          - borramos la clase activo de quien lo tenga.
          - si le hacen click le añado la clase activo, esto corresponde con el archivo css donde le pusimos
          que cuando un enlace tenga la clase activo, se ponga en negro... "a.activo" linea 79 del css.
          - luego obtenemos la categoria del enlace
          - filtramos de acuerdo con esa categoria*/

        
        
    });
    /* por cada enlace se realiza el codigo */

    //FILTRADO DE LAS IMAGENES, CON LA BARRA (INPUT)
    /* se le añade un evento a la barra de busqueda, y la palabra input... eso significa que cuando
    el usuario escribe algo se activa el evento*/
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {

        // accedemos al elemento (barra) y obtenemos el valor
        const busqueda = evento.target.value; 
        //console.log(busqueda);

        /* accedemos a cada uno de los items que tenemos y le decimos que traiga los items que 
           sean de tipo data, al agregar luego de dataset el ".etiquetas", 
           le decimos que queremos obtener el item que es tipo data y que se llama etiquetas.
           (data-nombre/data-categorias/data-etiquetas, los que son tipo data) 
           al añadir ".includes" le decimos que al buscar las etiquetas traiga solamente lo que
           corresponde con lo que se escribió en la barra de busqueda*/
        //grid.filter((item) => console.log(item.getElement().dataset.etiquetas) );
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));

        /* De por si la funcion GRID.FILTER muestra los elementos que cumplan con las caracteristicas
        que se mencionen, en este caso de la funcion anonima. 
        - Le pasamos el parametro ITEM, y por cada uno de los items (imagenes dentro del DIV) 
        ejecuta dicha funcion.
        - se accede a la imagen, se obtiene el elemento de la imagen, luego se accede al dataset de las 
        etiquetas y si las etiquetas incluyen lo que se escribió en la busqueda, muestra las imagenes */
    })
})