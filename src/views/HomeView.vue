<template>
    <v-app style="background-color:#391D41;">
        <v-main>
            <v-container>
                <v-card elevation="9" style="background-color: #7F658F; margin-top: 20px;margin-bottom: 20px;">
                    <v-card-title class="custom-title">SOBRE O SISTEMA</v-card-title>


                    <v-divider dark class="mx-4"></v-divider>

                    <v-card-text class="card-informativo">
                        <div style="color: white">O presente sistema tem como objetivo atuar como um espaço centralizado
                            de divulgação de informações acerca da fibomialgia a fim de aproximar e orientar tanto os
                            indivíduos acometidos pela doença quanto aqueles que convivem com tais indivíduos.
                            Inicialmente, as publicações estão divididas em:</div>
                    </v-card-text>

                    <v-card-text>
                        <v-chip-group class="chips-estilo" dark color="deep-purple accent-4" multiple text-color="white" style="padding-bottom: 12px;" active-class="deep-purple accent-4 white--text"
                            column>
                            <v-chip to="artigo">Artigos</v-chip>

                            <v-chip to="auxilio">Apoio</v-chip>

                            <v-chip to="podcast">Podcasts</v-chip>

                            <v-chip to="site">Sites</v-chip>

                            <v-chip to="video">Vídeos</v-chip>

                            <v-chip to="livro">Livros e Revistas</v-chip>


                        </v-chip-group>

                    </v-card-text>
                    <v-card-title class="title-sobre-fibro">SOBRE A FIBROMIALGIA</v-card-title>
                    <v-divider dark class="mx-4"></v-divider>
                    <v-card-text style="color: white" class="card-informativo">A síndrome da fibromialgia (FM) é uma
                        síndrome clínica que se manifesta com dor no corpo todo, principalmente na musculatura. Junto
                        com a dor, a fibromialgia cursa com sintomas de fadiga (cansaço), sono não reparador (a pessoa
                        acorda cansada) e outros sintomas como alterações de memória e atenção, ansiedade, depressão e
                        alterações intestinais. Uma característica da pessoa com FM é a grande sensibilidade ao toque e
                        à compressão da musculatura pelo examinador ou por outras pessoas.</v-card-text>
                    <v-card-text> </v-card-text>




                </v-card>
                <h1 class="white--text text-center text-uppercase mt-10 mb-5"> Selecione a categoria desejada</h1>
                <v-divider dark class="mx-4 my-4"></v-divider>
                <v-row>
                    
                    <v-col v-for="item in items" :key="item.id" cols="4">
                        <router-link :to="`${item.rota}`" class="custom-card-link">

                            <v-card shaped style="margin-top:18px; margin-bottom: 20px; background-color: #5C3C6C;"
                                :elevation="item.elevation - 10" height="330" width="1000"
                                class="overflow-hidden mx-auto white--text">

                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <div style="margin-top:18px; margin-left: 18px; margin-right: 18px">
                                        <v-card-title class="text-h5" v-text="item.title">
                                        </v-card-title>
                                        <v-card-subtitle v-text="item.subtitle"></v-card-subtitle>
                                        <v-card-text class="overflow-hidden text-justify text-h7 font-weight-bold"
                                            v-text="item.title"></v-card-text>
                                    </div>
                                    <v-avatar rounded align="center" class="mt-16 mr-5 " size="170">
                                        <v-img size="150px" :src="item.icone" color="#E6E7E9">
                                            
                                        </v-img>
                                    </v-avatar>
                                </div>
                            </v-card>
                        </router-link>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>

export default {
    
    name: 'HomeView',
    
    data: () => ({

        items: [
            { id: 0, title: 'Artigos', subtitle: 'Subtítulo de artigo', rota: '/artigo', elevation: 2, icone: require("../assets/document.png") },
            { id: 1, title: 'Apoio', subtitle: 'Subtítulo de apoio', rota: '/auxilio', elevation: 3, icone: require('../assets/like.png') },
            { id: 2, title: 'Podcasts', subtitle: 'Subtítulo de podcasts', rota: '/podcast', elevation: 4, icone: require('../assets/podcast.png') },
            { id: 3, title: 'Sites', subtitle: 'Subtítulo de sites', rota: '/site', elevation: 5, icone: require('../assets/vlog.png') },
            { id: 4, title: 'Vídeos', subtitle: 'Subtítulo de vídeos', rota: '/video', elevation: 6, icone: require('../assets/video-camera.png') },
            { id: 5, title: 'Livros e Revistas', subtitle: 'Subtítulo de livros e artigos', rota: '/livro', elevation: 7, icone: require('../assets/contact.png') },
        ],

    }),

    created() {
        this.$store.commit('toggleAppBar', false);
    },


}
</script>

<style scoped>
.custom-card-link {
    display: block;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    transition: background-color 0.4s;
}

.chips-estilo .v-chip{
    background-color: #794A81 !important;
    color:#ffffff !important;
}

.custom-card-link:hover .v-card {
    background-color: #794A81 !important;
    /* Cor mais clara ao passar o mouse */
}

.bg-footer {
    background-color: #5C3C6C !important;
    
}

.custom-title {
    color: #ffffff;
    /* Cor personalizada */
    font-weight: bold;
    /* Aplicar negrito */
    font-size: 32px;
    /* Tamanho personalizado */
    letter-spacing: 5px;
    font-family: 'Roboto', sans-serif;
}

.card-informativo {
    color: #BC89C1;
    font-size: 17px;
    letter-spacing: 2px;
    font-family: 'Roboto', sans-serif;

}

.title-sobre-fibro {
    color: #ffffff;
    font-size: 22px;
    letter-spacing: 2px;
    font-family: 'Roboto', sans-serif;
}
</style>
