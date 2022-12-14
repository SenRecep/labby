<script setup lang="ts">
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import authHttpRepository from "../../../api/auth.http.repository";
import { useLoadingStore } from "../../../stores/loading.store";
import { ServiceResponse } from "../../../types/ServiceResponse.interface";
import { useAuthStore } from "../../../stores/auth.store";
import { useRouter } from "vue-router";
import { User } from "@/types/User.interface";
const loadingStore = useLoadingStore();
const router = useRouter();
const formState = reactive({
  email: "",
  password: "",
  name: "",
  surname: "",
  studentNumber: "",
});

const apiErrors = reactive({
  errors: [] as string[],
});

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
  name: { required },
  surname: { required },
  studentNumber: { required },
}));

const validator = useVuelidate(rules, formState);

const formSubmit = async () => {
  const validationResults = await validator.value.$validate();
  if (!validationResults) return;
  loadingStore.beginLoading();
  const response = (await authHttpRepository.signUp(formState, () =>
    loadingStore.endLoading()
  )) as ServiceResponse<User>;

  if (!response.isSuccessful) {
    if (response.error) apiErrors.errors = response.error!.errors;
    return;
  }

  router.push({ name: "login" });
};
</script>

<template>
  <v-row no-gutters class="justify-center align-center h-100">
    <v-col lg="5" md="8" sm="12">
      <v-card>
        <v-toolbar class="pl-4">
          <v-icon icon="mdi-account-plus"></v-icon>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-alert
            title="Api Errors"
            type="warning"
            variant="outlined"
            class="mb-4"
            v-if="apiErrors.errors.length > 0"
          >
            <span v-for="error in apiErrors.errors">{{ error }} </span><br />
          </v-alert>
          <v-form @submit.prevent="formSubmit">
            <v-text-field
              class="mb-4"
              prepend-icon="mdi-account"
              placeholder="Your name"
              name="name"
              label="Name"
              type="text"
              clearable
              v-model="formState.name"
              :error-messages="
                validator.name.$errors.map((x) => x.$message.toString())
              "
            ></v-text-field>
            <v-text-field
              class="mb-4"
              prepend-icon="mdi-account"
              placeholder="Your Surname"
              name="surname"
              label="Surname"
              type="text"
              clearable
              v-model="formState.surname"
              :error-messages="
                validator.surname.$errors.map((x) => x.$message.toString())
              "
            ></v-text-field>

            <v-text-field
              class="mb-4"
              prepend-icon="mdi-badge-account-horizontal"
              placeholder="Your Student Number"
              name="studentnumber"
              label="Student Number"
              type="text"
              clearable
              v-model="formState.studentNumber"
              :error-messages="
                validator.studentNumber.$errors.map((x) =>
                  x.$message.toString()
                )
              "
            ></v-text-field>

            <v-text-field
              class="mb-4"
              prepend-icon="mdi-email"
              placeholder="studentnumber@ogr.cbu.edu.tr"
              name="email"
              label="Email"
              type="email"
              clearable
              v-model="formState.email"
              :error-messages="
                validator.email.$errors.map((x) => x.$message.toString())
              "
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              clearable
              v-model="formState.password"
              :error-messages="
                validator.password.$errors.map((x) => x.$message.toString())
              "
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                prepend-icon="mdi-account-plus"
                type="submit"
                variant="outlined"
                >Register</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
