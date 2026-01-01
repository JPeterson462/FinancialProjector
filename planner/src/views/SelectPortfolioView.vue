<template>
  <div class="mx-auto mt-5" style="width: 400px">
    <h1>Select a Portfolio</h1>
    <br>
    <input class="form-control" type="file" ref="portfolioSelector" @change="onPortfolioSelected">
  </div>
</template>

<script>
import router from '../router';

export default {
  methods: {
    onPortfolioSelected(event) {
      const selectedFiles = event.target.files;
      if (selectedFiles.length > 0) {
        const file = selectedFiles[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          //console.log(e.target.result);
          router.push({
            name: 'PortfolioOverview',
            state: { portfolioJson: e.target.result }
          })
        };
        reader.readAsText(file);
      }
    }
  }
}
</script>
