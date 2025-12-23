<template>
  <div class="mx-auto mt-5" style="max-width: 900px">
    <h1 style="padding-bottom: 20px; width: 100%; border-bottom: 1px solid blue">Overview</h1>
    <br>
    <div class="container">
      <div style="width: 140px">
        <span class="portfolio-tab selected-tab">Accounts</span>
        <span class="portfolio-tab">Balances</span>
        <span class="portfolio-tab">Tax Forms</span>
        <span class="portfolio-tab">Budget</span>
      </div>
      <div class="col">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['portfolioJson'],
  mounted() {
    this.selectedTab = 'accounts';
    var portfolio = JSON.parse(window.history.state.portfolioJson);
    console.log(portfolio);
  }
};
</script>
