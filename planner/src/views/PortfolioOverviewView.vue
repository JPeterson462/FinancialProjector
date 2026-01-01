<template>
  <div class="mx-auto mt-5" style="max-width: 900px">
    <h1 style="padding-bottom: 20px; width: 100%; border-bottom: 1px solid blue">Overview</h1>
    <br>
    <div class="container">
      <div class="row">
        <div style="width: 160px">
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == ACCOUNTS }" @click="selectTab(ACCOUNTS)">Accounts</span>
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == TAX_FORMS }" @click="selectTab(TAX_FORMS)">Tax Forms</span>
          <span class="portfolio-tab" :class="{ 'selected-tab': selectedTab == BUDGET }" @click="selectTab(BUDGET)">Budget</span>
          <button class="btn btn-dark" @click="downloadPortfolio()">Save Portfolio</button>
        </div>
        <div class="col">
          <span class="tab-content" :class="{ 'tab-hidden': selectedTab != ACCOUNTS }">
            <h2>Accounts</h2>
            <table class="table table-hover padded-rows">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in portfolio.accounts" :key="account.id">
                  <td><button class="btn btn-info" @click="showAddAccountModal(account)">Update</button></td>
                  <td>{{ account.name }}</td>
                  <td>{{ formatCurrency(getAccountBalance(account)) }}</td>
                  <td><button class="btn btn-danger" @click="removeAccount(account)">X</button></td>
                </tr>
                <tr>
                  <td colspan="2">
                    <button class="btn btn-success" @click="showAddAccountModal(null)">Add Account</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <AddAccountDialog ref="addAccountModal" :isOpen="isAddAccountDialogOpen" @close="isAddAccountDialogOpen = false" @submit="addAccount" />
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
import AddAccountDialog from './AddAccountDialog.vue';

export default {
  components: {
    AddAccountDialog
  },
  props: ['portfolioJson'],
  data() {
    return {
      selectedTab: null,
      portfolio: {
        accounts: []
      },
      isAddAccountDialogOpen: false,
      accountToModify: null,

      ACCOUNTS: 0,
      TAX_FORMS: 1,
      BUDGET: 2
    };
  },
  mounted() {
    this.selectTab(this.ACCOUNTS)
    this.portfolio = JSON.parse(window.history.state.portfolioJson);
    if (this.portfolio.accounts == null) {
      this.portfolio.accounts = []
    }
  },
  methods: {
    selectTab(tabId) {
      console.log("selecting tab " + tabId);
      this.selectedTab = tabId;
    },
    showAddAccountModal(account) {
      this.accountToModify = account;
      this.$refs.addAccountModal?.onOpen({
        name: account?.name,
        balance: this.getAccountBalance(account)
      });
      this.isAddAccountDialogOpen = true;
    },
    addAccount(data) {
      if (this.accountToModify == null) {
        this.portfolio.accounts.push({
          id: crypto.randomUUID(),
          name: data.name,
          balances: [{
            lastUpdated: new Date(),
            value: data.balance
          }]
        });
      } else {
        this.accountToModify.name = data.name;
        this.accountToModify.balances.push({
          lastUpdated: new Date(),
          value: data.balance
        });
        this.accountToModify = null;
      }
    },
    removeAccount(account) {
      this.portfolio.accounts = this.portfolio.accounts.filter(a => a.id != account.id);
    },
    getAccountBalance(account) {
      if (account == null) {
        return 0;
      }
      return account.balances[account.balances.length - 1].value;
    },
    formatCurrency(value) {
      if (value == null || typeof value !== 'number') {
        return value;
      }
      return "$" + value.toFixed(2);
    },
    async downloadPortfolio() {
      try {
        const options = {
          suggestedName: 'portfolio.json',
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        };

        const handle = await window.showSaveFilePicker(options);

        const writable = await handle.createWritable();

        await writable.write(JSON.stringify(this.portfolio, null, 2));
        await writable.close();
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Save failed:', err);
        }
      }
    }
  }
};
</script>
