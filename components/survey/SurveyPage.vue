<template>
  <div class="min-h-screen">
    <div id="survey" />
  </div>
</template>

<script lang="ts" setup>
import "survey-core/defaultV2.min.css";
import { Survey } from "survey-knockout-ui";

const props = defineProps<{
  questions: any;
}>();

onMounted(() => {
  const survey = new Survey(props.questions);
  survey.render("survey");
  survey.onUploadFiles.add((_, options) => {
    let formData = new FormData();
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
              file: file,
              content:
                "https://api.surveyjs.io/private/Surveys/getTempFile?name=" +
                data[file.name],
            };
          })
        );
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  });

  survey.onClearFiles.add((sender, options) => {
    console.log(options.question.id);
    options.callback("success");
  });

  survey.onComplete.add((sender, options) => {
    console.log("onComplete");
    // console.log(JSON.stringify(sender.data, null, 3));
  });
});
</script>
