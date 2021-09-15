<template>
    <div class="locker">
        <MiniLocker />
    </div>
</template>

<script>
// @ is an alias to /src
import MiniLocker from "@/components/MiniLocker.vue";

export default {
    name: "Locker",
    components: {
        MiniLocker,
    },
};
</script>
