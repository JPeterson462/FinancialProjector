<script setup>
import { ref } from 'vue';

const props = defineProps({ isOpen: Boolean });
const emit = defineEmits(['close', 'submit']);

// Create reactive variables for the two text fields
const name = ref('');
const balance = ref('');

const onOpen = (data) => {
  console.log(data);
  name.value = data.name;
  balance.value = data.balance;
}

const handleSubmit = () => {
  // Pass the current values back to the parent
  emit('submit', { name: name.value, balance: balance.value });
  close();
};

const close = () => {
  name.value = ''; // Reset fields on close
  balance.value = '';
  emit('close');
};

defineExpose({ onOpen })
</script>

<template>
  <Teleport to="body">
  <div
    class="modal fade"
    :class="{ 'show d-block': isOpen }"
    tabindex="-1"
    role="dialog"
    :style="{ backgroundColor: isOpen ? 'rgba(0,0,0,0.5)' : '' }"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add/Update Account</h5>
          <button type="button" class="btn btn-close" @click="close" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Account Name</label>
            <input v-model="name" class="form-control" type="text" placeholder="e.g. Savings" />
          </div>
          <div class="mb-3">
            <label class="form-label">Initial Balance</label>
            <input v-model="balance" class="form-control" type="number" placeholder="0.00" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="close">Cancel</button>
          <button type="button" class="btn btn-success" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </div>
  </div>
  </Teleport>
</template>
