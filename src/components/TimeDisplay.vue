<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { addHours, format } from 'date-fns';
import { TZDate } from '@date-fns/tz';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const currentTime = ref(new Date());
const selectedTimezone = ref('UTC');

const currentTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Get all available timezones for the selector
const timezones = Intl.supportedValuesOf('timeZone');

// Specific cities to display
const displayTimezones = [
  { city: 'Amsterdam', zone: 'Europe/Amsterdam' },
  { city: 'California', zone: 'America/Los_Angeles' },
  { city: 'Dubai', zone: 'Asia/Dubai' },
  { city: 'Kyiv', zone: 'Europe/Kiev' },
  { city: 'London', zone: 'Europe/London' },
  { city: 'New York', zone: 'America/New_York' },
  { city: 'Paris', zone: 'Europe/Paris' },
  { city: 'Singapore', zone: 'Asia/Singapore' },
  { city: 'Sydney', zone: 'Australia/Sydney' },
  { city: 'Tokyo', zone: 'Asia/Tokyo' },
].sort((a, b) => a.city.localeCompare(b.city));

const updateTime = () => {
  currentTime.value = new Date();
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

const formatTimeForZone = (date: Date, timezone: string) => {
  return format(new TZDate(date, timezone), 'dd/MM/yyyy HH:mm:ss');
};

const futureTime = (hours: number) => {
  return format(
    addHours(new TZDate(currentTime.value, selectedTimezone.value), hours),
    'dd/MM/yyyy HH:mm:ss'
  );
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        Current Time Across Zones
      </h2>
      <h3 class="text-md font-semibold mb-1 text-gray-900">
        Current timezone: {{ currentTz }}
      </h3>
      <p class="text-lg font-mono mb-4">
        {{ formatTimeForZone(currentTime, currentTz) }}
      </p>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Select Timezone:</label
        >
        <v-select
          v-model="selectedTimezone"
          :options="timezones"
          :searchable="true"
          :filterable="true"
        />
      </div>

      <div class="space-y-4">
        <div class="bg-gray-50 p-4 rounded-md">
          <h3 class="font-semibold text-gray-700">Current Time:</h3>
          <p class="text-lg font-mono">
            {{ formatTimeForZone(currentTime, selectedTimezone) }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-blue-50 p-4 rounded-md">
            <h3 class="font-semibold text-blue-700">In 12 hours:</h3>
            <p class="text-sm font-mono">{{ futureTime(12) }}</p>
          </div>

          <div class="bg-green-50 p-4 rounded-md">
            <h3 class="font-semibold text-green-700">In 24 hours:</h3>
            <p class="text-sm font-mono">{{ futureTime(24) }}</p>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold text-gray-700 mb-2">Major Cities:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div
              v-for="tz in displayTimezones"
              :key="tz.zone"
              class="bg-gray-50 p-3 rounded-md"
            >
              <div class="font-medium text-gray-700 mb-1">{{ tz.city }}</div>
              <div class="font-mono text-sm">
                {{ formatTimeForZone(currentTime, tz.zone) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
