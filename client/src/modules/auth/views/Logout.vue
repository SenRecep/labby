<script setup lang="ts">
import localStorageService from "@/stores/localstorages/localstorage.service";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../../stores/auth.store";
const store = useAuthStore();

localStorageService.clear();
store.$reset();

const router = useRouter();
router.replace({ name: "login" });
</script>
