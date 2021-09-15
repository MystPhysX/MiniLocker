<template>
    <div class="swap">
        <Swapper />
    </div>
</template>

<script>
// @ is an alias to /src
import Swapper from "@/components/Swapper.vue";

export default {
    name: "Swap",
    components: {
        Swapper,
    },
};
</script>
