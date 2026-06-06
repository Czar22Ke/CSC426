<template>
  <div class="login-wrapper">
    <div v-if="isLoggedIn" class="dashboard-container">
      <div class="dashboard-header">
        <h2>Emmanuel's & Co. Administration Portal</h2>
        <span class="status-badge">Authenticated</span>
      </div>

      <div class="dashboard-content">
        <p>
          Welcome back, <strong>{{ username }}</strong
          >. Your session is active.
        </p>

        <div class="quick-stats">
          <div class="stat-card">
            <h3>400 level Initiatives</h3>
            <p>Active</p>
          </div>
          <div class="stat-card">
            <h3>Byterr Deployments</h3>
            <p>System's are Optimal</p>
          </div>
        </div>
      </div>

      <button @click="handleLogout" class="btn btn-secondary logout-btn">
        Log Out
      </button>
    </div>

    <div v-else class="login-container">
      <h2>System Login</h2>

      <div v-if="message" :class="['alert', messageType]">
        {{ message }}
      </div>

      <form @submit.prevent="handleLogin" @reset="handleReset">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            {{ isLoading ? "Authenticating..." : "Login" }}
          </button>
          <button type="reset" class="btn btn-secondary">Reset</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
const message = ref("");
const messageType = ref("");
const isLoading = ref(false);
const isLoggedIn = ref(false); // New state to track auth status

const handleLogin = async () => {
  isLoading.value = true;
  message.value = "";

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // If successful, switch the view to the dashboard
      isLoggedIn.value = true;
      password.value = ""; // Clear password for security
    } else {
      message.value = data.message;
      messageType.value = "error";
    }
  } catch (error) {
    message.value = "Server connection failed. Is Node.js running?";
    messageType.value = "error";
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = () => {
  isLoggedIn.value = false;
  username.value = "";
  message.value = "You have been successfully logged out.";
  messageType.value = "success";
};

const handleReset = () => {
  username.value = "";
  password.value = "";
  message.value = "";
  messageType.value = "";
};
</script>

<style scoped>
/* Previous Login Styles */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin: -8px;
}
.login-container {
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}
h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #1a1a1a;
  font-weight: 600;
}
.form-group {
  margin-bottom: 20px;
  text-align: left;
}
.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #4a4a4a;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 15px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}
.form-group input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
.button-group {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}
.btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s;
}
.btn-primary {
  background-color: #3b82f6;
  color: white;
}
.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
}
.btn-primary:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #4b5563;
}
.btn-secondary:hover {
  background-color: #d1d5db;
}
.alert {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}
.error {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}
.success {
  background-color: #dcfce3;
  color: #166534;
  border: 1px solid #bbf7d0;
}

/* New Dashboard Styles */
.dashboard-container {
  background: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  text-align: left;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 15px;
  margin-bottom: 20px;
}
.dashboard-header h2 {
  margin: 0;
  font-size: 22px;
}
.status-badge {
  background-color: #dcfce3;
  color: #166534;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}
.dashboard-content p {
  color: #4b5563;
  margin-bottom: 25px;
  font-size: 16px;
}
.quick-stats {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}
.stat-card {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
}
.stat-card h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.stat-card p {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
}
.logout-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
