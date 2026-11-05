<template>
  <div>
    <h2 style="margin-top: 15px">Sitio de ejemplo Bookstore</h2>
      <p>Este sitio ofrece información sobre libros, autores y editoriales.</p>
      <p>Los cambios (crear, modificar y eliminar) se procesan en <b>forma diferida</b>:
        cada solicitud se agrega a la lista <i>bookstore</i> de Redis y se aplica a la
        base de datos únicamente cuando se ejecuta la función correspondiente
        (<i>bookTasks</i>, <i>authorTasks</i> o <i>publisherTasks</i>).</p>
    <ul>
      <li><router-link to='/book'>Información de libros</router-link></li>
      <li><router-link to='/author'>Información de autores</router-link></li>
      <li><router-link to='/publisher'>Información de editoriales</router-link></li>
    </ul>
  </div>
</template>
