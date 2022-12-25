<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useLoadingStore } from "../../../stores/loading.store";
import { ServiceResponse } from "../../../types/ServiceResponse.interface";
import { useAuthStore } from "../../../stores/auth.store";
import { useRouter } from "vue-router";
import notify from "@/helpers/notify";
import forgotPasswordHttpRepository from "../../../api/forgotpassword.http.repository";
import { NoContentResponse } from "../../../types/NoContentResponse.interface";
const loadingStore = useLoadingStore();
const authStore = useAuthStore();
const router = useRouter();
const step = ref(0);

const formState = reactive({
  email: "",
  password: "",
  repassword: "",
  verifycode: "",
});

const apiErrors = reactive({
  errors: [] as string[],
});

const rules = computed(() => ({
  email: { required, email },
  password: { required, minLength: minLength(6) },
  verifycode: { required },
  repassword: { required, sameAsPassword: sameAs(formState.password) },
}));

const validator = useVuelidate(rules, formState);

const stepOne = async () => {
  const validateResult = await validator.value.email.$validate();
  if (!validateResult) return false;
  loadingStore.beginLoading();
  apiErrors.errors = [];
  const response = (await forgotPasswordHttpRepository.sendEmail(
    {
      email: formState.email,
    },
    () => loadingStore.endLoading()
  )) as ServiceResponse<NoContentResponse>;

  if (!response.isSuccessful) {
    if (response.error) apiErrors.errors = response.error!.errors;
    return false;
  }

  notify({
    title: "Information",
    text: "Check your email for verification code",
    type: "information",
  });
  return true;
};

const stepTwo = async () => {
  const validateResult = await validator.value.verifycode.$validate();
  if (!validateResult) return false;
  loadingStore.beginLoading();
  apiErrors.errors = [];
  const response = (await forgotPasswordHttpRepository.sendCode(
    {
      email: formState.email,
      code: formState.verifycode,
    },
    () => loadingStore.endLoading()
  )) as ServiceResponse<NoContentResponse>;

  if (!response.isSuccessful) {
    if (response.error) apiErrors.errors = response.error!.errors;
    return false;
  }

  return true;
};
const stepThree = async () => {
  const validateResultPassword = await validator.value.password.$validate();
  const validateResultRePassword = await validator.value.repassword.$validate();
  if (!validateResultPassword || !validateResultRePassword) return false;

  loadingStore.beginLoading();
  apiErrors.errors = [];
  const response = (await forgotPasswordHttpRepository.sendPassword(
    {
      email: formState.email,
      code: formState.verifycode,
      password: formState.password,
    },
    () => loadingStore.endLoading()
  )) as ServiceResponse<NoContentResponse>;

  if (!response.isSuccessful) {
    if (response.error) apiErrors.errors = response.error!.errors;
    return false;
  }

  notify({
    title: "Successful",
    text: "Password has changed",
    type: "success",
  });
  router.push({ name: "login" });
  return true;
};

const steps = [stepOne, stepTwo, stepThree];

const handleStep = async () => {
  const action = steps[step.value];
  const result = await action();
  if (result) step.value++;
};
</script>

<template>
  <v-row no-gutters class="justify-center align-center h-100">
    <v-col lg="5" md="8" sm="12">
      <v-card>
        <v-toolbar class="pl-4">
          <v-icon icon="mdi-lock"></v-icon>
          <v-toolbar-title>Forgot Password</v-toolbar-title>
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
          <v-form>
            <v-text-field
              v-if="step == 0"
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
            <v-fade-transition>
              <v-text-field
                v-if="step == 1"
                class="mb-4"
                id="verifycode"
                prepend-icon="mdi-key"
                name="verifycode"
                label="Verify Code"
                type="number"
                clearable
                v-model="formState.verifycode"
                :error-messages="
                  validator.verifycode.$errors.map((x) => x.$message.toString())
                "
              ></v-text-field>
            </v-fade-transition>
            <v-fade-transition>
              <v-text-field
                v-if="step == 2"
                id="password"
                class="mb-4"
                prepend-icon="mdi-form-textbox-password"
                name="password"
                label="Password"
                type="password"
                clearable
                v-model="formState.password"
                :error-messages="
                  validator.password.$errors.map((x) => x.$message.toString())
                "
              ></v-text-field>
            </v-fade-transition>
            <v-fade-transition>
              <v-text-field
                v-if="step == 2"
                id="repassword"
                prepend-icon="mdi-form-textbox-password"
                name="repassword"
                label="Re-Enter Password"
                type="password"
                clearable
                v-model="formState.repassword"
                :error-messages="
                  validator.repassword.$errors.map((x) => x.$message.toString())
                "
              ></v-text-field>
            </v-fade-transition>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="handleStep"
                :prepend-icon="step < 2 ? 'mdi-redo' : 'mdi-check'"
                type="button"
                variant="outlined"
                >{{ step < 2 ? "Next" : "Donne" }}</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
