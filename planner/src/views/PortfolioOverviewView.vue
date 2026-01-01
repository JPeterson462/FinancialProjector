<template>
  <div class="mx-auto mt-5" style="max-width: 900px">
    <h1 style="padding-bottom: 20px; width: 100%; border-bottom: 1px solid blue">Overview</h1>
    <br>
    <div class="container">
      <div class="row">
        <div style="width: 160px">
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == ACCOUNTS }" @click="selectTab(ACCOUNTS)">Accounts</span>
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == BALANCES }" @click="selectTab(BALANCES)">Balances</span>
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == TAX_FORMS }" @click="selectTab(TAX_FORMS)">Tax Forms</span>
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == BUDGET }" @click="selectTab(BUDGET)">Budget</span>
        </div>
        <div class="col">
          <span class="tab-content" :class="{ 'tab-hidden': selectedTab != ACCOUNTS }">
            <h2>Accounts</h2>
          </span>
          <span class="tab-content" :class="{ 'tab-hidden': selectedTab != BALANCES }">
            <h2>Balances</h2>
          </span>
          <span class="tab-content" :class="{ 'tab-hidden': selectedTab != TAX_FORMS }">
            <h2>Tax Forms</h2>
          </span>
          <span class="tab-content" :class="{ 'tab-hidden': selectedTab != BUDGET }">
            <h2>Budget</h2>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['portfolioJson'],
  data() {
    return {
      selectedTab: null,

      ACCOUNTS: 0,
      BALANCES: 1,
      TAX_FORMS: 2,
      BUDGET: 3
    };
  },
  mounted() {
    this.selectTab(this.ACCOUNTS)
    var portfolio = JSON.parse(window.history.state.portfolioJson);
    console.log(portfolio);
  },
  methods: {
    selectTab(tabId) {
      console.log("selecting tab " + tabId);
      this.selectedTab = tabId;
    }
  }
};
</script>
