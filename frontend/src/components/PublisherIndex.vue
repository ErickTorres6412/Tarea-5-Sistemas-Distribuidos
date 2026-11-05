<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <div v-if="message" class="notice">{{message}}</div>
     <table class="u-full-width"><thead>
       <tr>
        <th>Editorial</th>
        <th>País</th>
        <th>Fundación</th>
        <th>Género</th>
        <th class="text-center">Acciones</th>
       </tr>
       </thead><tbody>
       <tr v-for='publisher in publishers' :key="publisher.id">
       <td>{{publisher.publisher}}</td>
       <td>{{publisher.country}}</td>
       <td>{{publisher.founded}}</td>
       <td>{{publisher.genere}}</td>
       <td>
       <router-link class="button"
         :to="'/publisher/show/'+publisher.id">Ver</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/publisher/edit/'+publisher.id">Editar</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deletePublisher(publisher.id)">Eliminar</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary"
       to="/publisher/create">Nuevo</router-link>
     &nbsp;
     <a class="button" v-on:click="runTasks()">Procesar lista (publisherTasks)</a>
     &nbsp;
     <a class="button" v-on:click="allPublishers()">Refrescar</a>
   </div>
  </div>
</template>

<script>

export default {
  name: "Publisher Index",
  data() {
    return {
      title: 'Lista de editoriales',
      publishers: [],
      message: this.$route.query.queued ?
        'La solicitud de ' +
        ({insert: 'inserción', update: 'actualización'}[this.$route.query.queued] || this.$route.query.queued) +
        ' se agregó a la lista bookstore. Se aplicará cuando se ejecute publisherTasks.' : ''
    };
  },
  mounted() {
    this.allPublishers()
  },
  methods: {
    allPublishers() {
      fetch(this.url+'/.netlify/functions/publisherFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.publishers = items;
        })
     },
     deletePublisher(id) {
       fetch(this.url+'/.netlify/functions/publisherDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((response) => {
            this.message = response.ok ?
              'La solicitud de eliminación se agregó a la lista bookstore. ' +
              'Se aplicará cuando se ejecute publisherTasks.' :
              'Error al enviar la solicitud de eliminación.';
            this.allPublishers();
          }
        )
     },
     runTasks() {
       fetch(this.url+'/.netlify/functions/publisherTasks')
         .then((response) => response.json())
         .then((result) => {
           this.message = 'publisherTasks procesó ' + result.processed + ' actualización(es).';
           this.allPublishers();
         })
     }
  }
};
</script>
