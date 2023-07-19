<template>
  <div class="min-h-screen pt-24">
    <SurveyStepper :steps="steps" :current-step="1" />
    <SurveyPage :questions="questions" />
    <SignaturePad />
  </div>
</template>

<script lang="ts" setup>
import { Question, Validator } from "data/interfaces/survey";

const { t } = useI18n();

useSeoMeta({
  title: t("title"),
  ogTitle: t("title"),
});

const steps = ["Survey Page 1", "Survey Page 2", "Survey Page 3", "Review"];

const questions = <Question[]>[
  {
    name: "FirstName",
    title: "Enter your first name:",
    type: "text",
  },
  {
    name: "LastName",
    title: "Enter your last name:",
    type: "text",
  },
  {
    name: "Age",
    title: "Enter your age:",
    type: "text",
    validators: [
      <Validator>{ type: "numeric", text: "Value must be a number" },
    ],
  },
  {
    type: "file",
    title: "Please upload your files",
    name: "files",
    storeDataAsText: false,
    waitForUpload: true,
    allowMultiple: false,
    maxSize: 102400,
    hideNumber: true,
  },
];
</script>
