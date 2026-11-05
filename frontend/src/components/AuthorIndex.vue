<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <div v-if="message" class="notice">{{message}}</div>
     <table class="u-full-width"><thead>
       <tr>
        <th>Autor</th>
        <th>Nacionalidad</th>
        <th>Año de nacimiento</th>
        <th>Áreas</th>
        <th class="text-center">Acciones</th>
       </tr>
       </thead><tbody>
       <tr v-for='author in authors' :key="author.id">
       <td>{{author.author}}</td>
       <td>{{author.nationality}}</td>
       <td>{{author.birth_year}}</td>
       <td>{{author.fields}}</td>
       <td>
       <router-link class="button"
         :to="'/author/show/'+author.id">Ver</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/author/edit/'+author.id">Editar</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteAuthor(author.id)">Eliminar</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary"
       to="/author/create">Nuevo</router-link>
     &nbsp;
     <a class="button" v-on:click="runTasks()">Procesar lista (authorTasks)</a>
     &nbsp;
     <a class="button" v-on:click="allAuthors()">Refrescar</a>
   </div>
  </div>
</template>

<script>

export default {
  name: "Author Index",
  data() {
    return {
      title: 'Lista de autores',
      authors: [],
      message: this.$route.query.queued ?
        'La solicitud de ' +
        ({insert: 'inserción', update: 'actualización'}[this.$route.query.queued] || this.$route.query.queued) +
        ' se agregó a la lista bookstore. Se aplicará cuando se ejecute authorTasks.' : ''
    };
  },
  mounted() {
    this.allAuthors()
  },
  methods: {
    allAuthors() {
      fetch(this.url+'/.netlify/functions/authorFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.authors = items;
        })
     },
     deleteAuthor(id) {
       fetch(this.url+'/.netlify/functions/authorDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((response) => {
            this.message = response.ok ?
              'La solicitud de eliminación se agregó a la lista bookstore. ' +
              'Se aplicará cuando se ejecute authorTasks.' :
              'Error al enviar la solicitud de eliminación.';
            this.allAuthors();
          }
        )
     },
     runTasks() {
       fetch(this.url+'/.netlify/functions/authorTasks')
         .then((response) => response.json())
         .then((result) => {
           this.message = 'authorTasks procesó ' + result.processed + ' actualización(es).';
           this.allAuthors();
         })
     }
  }
};
</script>
