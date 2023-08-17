<template>
  <div class="min-h-screen">
    <div id="survey" />
  </div>
</template>

<script lang="ts" setup>
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-knockout-ui";
import Swal from "sweetalert2";

const props = defineProps<{
  questions: any;
}>();

const { t } = useI18n();

onMounted(() => {
  const survey = new Survey(props.questions);
  survey.render("survey");

  survey.sendResultOnPageNext = true;

  const prevData = getSurvey();

  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  function saveSurveyData(survey: any) {
    const data = survey.data;
    data.pageNo = survey.currentPageNo;

    setSurvey(JSON.stringify(data));
  }

  survey.onPartialSend.add((survey) => {
    saveSurveyData(survey);
  });

  survey.onUploadFiles.add((_, options) => {
    const formData = new FormData();
    options.files.forEach((file) => {
      formData.append(file.name, file);
    });

    survey.setCookie();

    fetch("https://api.surveyjs.io/private/Surveys/uploadTempFiles", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        options.callback(
          "success",
          options.files.map((file) => {
            return {
              file,
              content:
                "https://api.surveyjs.io/private/Surveys/getTempFile?name=" +
                data[file.name],
            };
          })
        );
      })
      .catch((error) => {
        Swal.fire(t("errors.uploadFailed"), error.message, "error");
      });
  });

  survey.onClearFiles.add((_, options) => {
    options.callback("success");
  });

  survey.onComplete.add((_, options) => {
    // removeSurvey();
    saveSurveyData(survey);

    const prevData = getSurvey();

    const data = JSON.parse(prevData ?? "");

    options.showDataSavingSuccess(t("survey.dataSaved"));

    //TODO: Implement print to PDF
    const resultData = [];
    for (const key in survey.data) {
      const question = survey.getQuestionByName(key);

      if (!!question) {
        const item = {
          name: key,
          id: question.id,
          title: question.title,
          value: question.value,
          displayValue: question.displayValue,
        };
        resultData.push(item);
      }
    }
  });
});
</script>
