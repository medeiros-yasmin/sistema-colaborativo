<template>
    <v-btn :class="[
        'botao-agradecer',
        { 'btnselec-agradecer': jaAgradeceu }
    ]" rounded @click="toggleAgradecimento">
        <v-icon :class="{ 'selected-icon': jaAgradeceu }" size="30px" class="material-symbols-rounded" color="#E6E7E9">
            handshake
        </v-icon>
        <span style="margin-left: 6px; color:#E6E7E9; font-size: 16px;">
            {{ totalAgradecimentos }}
        </span>
    </v-btn>
</template>

<script>
export default {
    props: {
        publicacaoId: {
            type: String,
            required: true,
        },
        jaAgradeceu: {
            type: Boolean,
            required: true,
        },
        totalAgradecimentos: {
            type: Number,
            required: true,
        },
    },
    methods: {
        toggleAgradecimento() {
            this.$emit('atualizar-agradecimento', this.publicacaoId);
        },
    },
};
</script>

<style scoped>
.botao-agradecer {
    outline-width: 1px;
    outline-style: solid;
    outline-color: white;
    background-color: transparent !important;
}

.btnselec-agradecer {
    outline-style: solid;
    outline-color: #D2A8E7 !important;
    background-color: #D2A8E7 !important;
}

.selected-icon {
    color: white !important;
    font-variation-settings: 'wght' 410 !important;
}
</style>