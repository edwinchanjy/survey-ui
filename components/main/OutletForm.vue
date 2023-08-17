<template>
  <div class="justify-center align-middle text-center">
    <h1
      class="mb-4 text-4xl font-semibold leading-none tracking-tight md:text-3xl lg:text-4xl"
    >
      Outlet Details
    </h1>
    <ElRow justify="center" align="middle">
      <ElForm
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="180px"
      >
        <ElFormItem :label="t('outlet.outletName')" prop="outletName">
          <ElInput
            v-model="ruleForm.outletName"
            :placeholder="t('outlet.outletName')"
            size="large"
            style="width: 480px"
          />
        </ElFormItem>
        <ElFormItem :label="t('outlet.location')" prop="location">
          <ElInput
            v-model="ruleForm.location"
            :placeholder="t('outlet.location')"
            size="large"
            style="width: 480px"
          />
        </ElFormItem>
        <ElFormItem :label="t('outlet.outletType')" prop="outletType">
          <ElSelect
            v-model="ruleForm.outletType"
            :placeholder="t('placeholder.outlet.outletType')"
            size="large"
            style="width: 240px"
          >
            <ElOption
              v-for="outletType in outletTypes"
              :key="outletType"
              :label="outletType"
              :value="outletType"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('outlet.buildingType')" prop="buildingType">
          <ElSelect
            v-model="ruleForm.buildingType"
            :placeholder="t('placeholder.outlet.buildingType')"
            size="large"
            style="width: 240px"
          >
            <ElOption
              v-for="buildingType in buildingTypes"
              :key="buildingType"
              :label="buildingType"
              :value="buildingType"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('outlet.evaluatorName')" prop="evaluatorName">
          <ElInput
            v-model="ruleForm.evaluatorName"
            :placeholder="t('outlet.evaluatorName')"
            size="large"
            style="width: 480px"
            disabled
          />
        </ElFormItem>
        <ElFormItem
          :label="t('outlet.dateOfEvaluation')"
          prop="dateOfEvaluation"
        >
          <ElDatePicker
            v-model="ruleForm.dateOfEvaluation"
            type="date"
            :placeholder="t('outlet.dateOfEvaluation')"
            size="large"
            style="width: 480px"
          />
        </ElFormItem>
        <ElFormItem
          :label="t('outlet.dealerPrincipalName')"
          prop="dealerPrincipalName"
        >
          <ElInput
            v-model="ruleForm.dealerPrincipalName"
            :placeholder="t('outlet.dealerPrincipalName')"
            size="large"
            style="width: 480px"
          />
        </ElFormItem>
        <ElRow justify="end" style="width: 660px">
          <ElFormItem>
            <ElButton
              type="success"
              size="large"
              @click="submitForm(ruleFormRef)"
              >{{ t("save") }}</ElButton
            >
          </ElFormItem>
        </ElRow>
      </ElForm>
    </ElRow>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";
import { useAuthStore } from "~~/stores/auth";
import { OutletRuleForm } from "~~/data/interfaces/outlet";

const { t } = useI18n();

const authStore = useAuthStore();
const localePath = useLocalePath();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<OutletRuleForm>({
  outletName: "",
  location: "",
  outletType: "",
  buildingType: "",
  evaluatorName: authStore.userName ?? "",
  dateOfEvaluation: Date(),
  dealerPrincipalName: "",
});

const rules = reactive<FormRules<OutletRuleForm>>({
  outletName: [
    {
      required: true,
      message: t("errors.outlet.outletName"),
      trigger: ["blur", "change"],
    },
  ],
  location: [
    {
      required: true,
      message: t("errors.outlet.location"),
      trigger: ["blur", "change"],
    },
  ],
  outletType: [
    {
      required: true,
      message: t("errors.outlet.outletType"),
      trigger: "change",
    },
  ],
  buildingType: [
    {
      required: true,
      message: t("errors.outlet.buildingType"),
      trigger: "change",
    },
  ],
  evaluatorName: [
    {
      required: true,
      message: t("errors.outlet.evaluatorName"),
      trigger: ["blur", "change"],
    },
  ],
  dateOfEvaluation: [
    {
      required: true,
      message: t("errors.outlet.dateOfEvaluation"),
      trigger: "change",
    },
  ],
  dealerPrincipalName: [
    {
      required: true,
      message: t("errors.outlet.dealerPrincipalName"),
      trigger: ["blur", "change"],
    },
  ],
});

const outletTypes = ["1S", "2S", "3S"];
const buildingTypes = ["Standalone", "Shoplot"];

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      navigateTo(localePath("/survey"));
    }
  });
};
</script>
