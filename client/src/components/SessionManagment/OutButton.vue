<script lang="ts" setup>
import { useAttrs, ref } from "vue";
import notify from "@/helpers/notify";
import sessionHttpRepository from "../../api/session.http.repository";
import { useLoadingStore } from "../../stores/loading.store";
import { ServiceResponse } from "@/types/ServiceResponse.interface";
import { useSessionStore } from "../../stores/session.store";
const loadingStore = useLoadingStore();
const sessionStore = useSessionStore();
const dialog = ref(false);
const attrs = useAttrs();

const agree = async () => {
  loadingStore.setLoading(true);
  const response = (await sessionHttpRepository.checkOut(
    () => (loadingStore.isLoading = false)
  )) as ServiceResponse<boolean>;
  dialog.value = false;

  if (!response.isSuccessful) {
    notify({
      title: "Uyarı",
      text: "Çıkış başarısız",
      type: "error",
    });
    sessionStore.setStatus(true);
    return;
  }
  sessionStore.setStatus(false);
  notify({
    title: "Bilgilendirme",
    text: "Çıkış başarılı",
    type: "info",
  });
};
const disagree = () => {
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" persistent>
    <template v-slot:activator="{ props }">
      <v-btn
        :disabled="!sessionStore.status"
        class="bg-red"
        block
        v-bind:class="attrs.class"
        v-bind="props"
        >Check Out</v-btn
      >
    </template>
    <template v-slot:default>
      <v-card>
        <v-toolbar title="Çıkmak istediğinize emin misiniz?"></v-toolbar>
        <v-card-text> Lab'dan çıkmak istediğinize emin misiniz? </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="green-darken-1" variant="text" @click="disagree">
            Disagree
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="agree">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
