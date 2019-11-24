<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <!-- Image and text -->
            <b-navbar variant="faded" type="light">
                <b-navbar-brand href="#">
                <img src="http://dgm.casadecontenidos.com/assets/images/dgm_logo.png" height="40" class="d-inline-block align-top" alt="Kitten">
                </b-navbar-brand>
            </b-navbar>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" left is-nav>
                <b-navbar-nav>
                    <!-- <b-nav-item><router-link to="/">Encuesta</router-link></b-nav-item>
                    <b-nav-item><router-link to="/about">Acerca de la encuesta</router-link></b-nav-item> -->
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto pl-4 text-left">
                    <!-- <b-nav-item href="#">Home</b-nav-item> -->
                    <b-nav-item href="http://dgm.casadecontenidos.com/index.html">Inicio</b-nav-item>
                    <b-nav-item href="historia_eva.html">La historia de EVA</b-nav-item>
                    <b-nav-item-dropdown text="¿Quieres saber más?" right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                        </template>
                        <b-dropdown-item href="mision_vision_servicios.html#mision">Misión</b-dropdown-item>
                        <b-dropdown-item href="mision_vision_servicios.html#vision">Visión</b-dropdown-item>
                        <b-dropdown-item href="mision_vision_servicios.html#servicios">Servicios</b-dropdown-item>
                        <b-dropdown-item href="mision_vision_servicios.html#info">Informaciçon general</b-dropdown-item>
                        <b-dropdown-item href="mision_vision_servicios.html#contactos">Contacto</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item href="https://dgmblog.casadecontenidos.com/wp/">Blog</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>    
</template>
<style lang="scss" scoped>
$trans_duration: 0.3s;
$primary_color: #4281f8;
nav{
    &.bg-dark {
        background-color: #222222 !important;
        text-transform: uppercase;
        letter-spacing: 2px;
        color:white;
    }

}
</style>
