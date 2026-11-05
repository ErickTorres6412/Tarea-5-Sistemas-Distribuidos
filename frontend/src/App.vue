<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary"
      to="/">Inicio</router-link>
    <router-link class="three columns button button-primary"
      to="/book">Libros</router-link>
    <router-link class="three columns button button-primary"
      to="/author">Autores</router-link>
    <router-link class="three columns button button-primary"
      to="/publisher">Editoriales</router-link>
  </div>
 <router-view :key="$route.fullPath" />
</div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.notice {
  padding: 10px 15px;
  margin-bottom: 15px;
  border-left: 4px solid #33C3F0;
  background: #eef9fd;
}
</style>
