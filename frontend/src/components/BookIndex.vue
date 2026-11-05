<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <div v-if="message" class="notice">{{message}}</div>
     <table class="u-full-width"><thead>
       <tr>
        <th>Título</th>
        <th>Autor</th>
        <th>Editorial</th>
        <th>Edición</th>
        <th class="text-center">Acciones</th>
       </tr>
       </thead><tbody>
       <tr v-for='book in books' :key="book.id">
       <td>{{book.title}}</td>
       <td>{{book.author}}</td>
       <td>{{book.publisher}}</td>
       <td>{{book.edition}}</td>
       <td>
       <router-link class="button"
         :to="'/book/show/'+book.id">Ver</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/book/edit/'+book.id">Editar</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteBook(book.id)">Eliminar</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary"
       to="/book/create">Nuevo</router-link>
     &nbsp;
     <a class="button" v-on:click="runTasks()">Procesar lista (bookTasks)</a>
     &nbsp;
     <a class="button" v-on:click="allBooks()">Refrescar</a>
   </div>
  </div>
</template>

<script>

export default {
  name: "Book Index",
  data() {
    return {
      title: 'Lista de libros',
      books: [],
      message: this.$route.query.queued ?
        'La solicitud de ' +
        ({insert: 'inserción', update: 'actualización'}[this.$route.query.queued] || this.$route.query.queued) +
        ' se agregó a la lista bookstore. Se aplicará cuando se ejecute bookTasks.' : ''
    };
  },
  mounted() {
    this.allBooks()
  },
  methods: {
    allBooks() {
      fetch(this.url+'/.netlify/functions/bookFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.books = items;
        })
     },
     deleteBook(id) {
       fetch(this.url+'/.netlify/functions/bookDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((response) => {
            this.message = response.ok ?
              'La solicitud de eliminación se agregó a la lista bookstore. ' +
              'Se aplicará cuando se ejecute bookTasks.' :
              'Error al enviar la solicitud de eliminación.';
            this.allBooks();
          }
        )
     },
     runTasks() {
       fetch(this.url+'/.netlify/functions/bookTasks')
         .then((response) => response.json())
         .then((result) => {
           this.message = 'bookTasks procesó ' + result.processed + ' actualización(es).';
           this.allBooks();
         })
     }
  }
};
</script>
