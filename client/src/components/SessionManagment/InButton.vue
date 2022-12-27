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
const rules = [
  "Laboratuvara yiyecek veya içecekle (su hariç) girmek yasaktır.",
  "Laboratuvardaki ekipmanları dikkatli kullanın. Çalıştığınız alanı dağınık bırakmayın.",
  "Laboratuvarı temiz tutmaya özen gösterin, etrafta çöp bırakmayın.",
  "Yüksek sesle konuşmayın ve ortak çalışma alanı kurallarına uyun.",
];
const agree = async () => {
  loadingStore.setLoading(true);
  const response = (await sessionHttpRepository.checkIn(
    () => (loadingStore.isLoading = false)
  )) as ServiceResponse<boolean>;
  dialog.value = false;

  if (!response.isSuccessful) {
    notify({
      title: "Uyarı",
      text: "Giriş başarısız",
      type: "error",
    });
    sessionStore.setStatus(false);
    return;
  }
  sessionStore.setStatus(true);
  notify({
    title: "Bilgilendirme",
    text: "Giriş başarılı",
    type: "info",
  });
};
const disagree = () => {
  sessionStore.setStatus(false);
  dialog.value = false;
  notify({
    title: "Uyarı",
    text: "Kurraları kabul etmeden giriş yapamazsınız.",
    type: "warn",
  });
};
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" persistent>
    <template v-slot:activator="{ props }">
      <v-btn
        :disabled="sessionStore.status"
        class="bg-green"
        block
        v-bind:class="attrs.class"
        v-bind="props"
        >Check In</v-btn
      >
    </template>
    <template v-slot:default>
      <v-card>
        <v-toolbar title="Dikkat edilmesi gereken kurallar!"></v-toolbar>
        <v-card-text>
          <ul>
            <li class="mb-1" v-for="rule in rules">{{ rule }}</li>
          </ul>
        </v-card-text>
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
