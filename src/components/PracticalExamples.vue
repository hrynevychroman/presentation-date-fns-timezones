<script setup lang="ts">
import { ref, computed } from 'vue';
import { format, addHours, addDays } from 'date-fns';
import { TZDate } from '@date-fns/tz';

// Current user's timezone
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

// Global Meeting Example
const meetingTime = ref(new Date());
const attendees = [
  { name: 'John (New York)', timezone: 'America/New_York' },
  { name: 'Maria (London)', timezone: 'Europe/London' },
  { name: 'Yuki (Tokyo)', timezone: 'Asia/Tokyo' },
  { name: 'Alex (Kyiv)', timezone: 'Europe/Kiev' },
];

// Flight Booking Example
const departureTime = ref(new Date());
const departure = {
  city: 'New York (JFK)',
  timezone: 'America/New_York',
};
const arrival = {
  city: 'Tokyo (NRT)',
  timezone: 'Asia/Tokyo',
};

// Stock Market Example
const markets = [
  {
    name: 'NYSE (New York)',
    timezone: 'America/New_York',
    opens: '09:30',
    closes: '16:00',
  },
  {
    name: 'LSE (London)',
    timezone: 'Europe/London',
    opens: '08:00',
    closes: '16:30',
  },
  {
    name: 'TSE (Tokyo)',
    timezone: 'Asia/Tokyo',
    opens: '09:00',
    closes: '15:30',
  },
];

// Server Logs Example
const logs = [
  { event: 'Server Start', timestamp: new Date().toISOString() },
  { event: 'User Login', timestamp: addHours(new Date(), -2).toISOString() },
  {
    event: 'Database Backup',
    timestamp: addHours(new Date(), -5).toISOString(),
  },
];

// Calendar Events Example
const events = [
  {
    title: 'Team Standup',
    time: addDays(new Date(), 1),
    attendees: ['New York', 'London', 'Tokyo'],
  },
  {
    title: 'Client Meeting',
    time: addDays(new Date(), 2),
    attendees: ['Kyiv', 'Singapore'],
  },
];

const formatTimeInZone = (date: Date, timezone: string) => {
  return format(new TZDate(date, timezone), 'dd/MM/yyyy HH:mm');
};

const isMarketOpen = (market: (typeof markets)[0]) => {
  const now = new TZDate(new Date(), market.timezone);
  const currentTime = format(now, 'HH:mm');
  return currentTime >= market.opens && currentTime <= market.closes;
};
</script>

<template>
  <div class="space-y-8">
    <!-- Global Meeting Example -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">1. Global Meeting Planner</h2>
      <p class="mb-4">
        Meeting scheduled for: {{ formatTimeInZone(meetingTime, userTimezone) }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="attendee in attendees"
          :key="attendee.name"
          class="bg-gray-50 p-4 rounded"
        >
          <h3 class="font-semibold">{{ attendee.name }}</h3>
          <p class="text-sm">
            {{ formatTimeInZone(meetingTime, attendee.timezone) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Flight Booking Example -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">
        2. Flight Schedule (14 hours flight)
      </h2>
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded">
          <h3 class="font-semibold">Departure: {{ departure.city }}</h3>
          <p>{{ formatTimeInZone(departureTime, departure.timezone) }}</p>
        </div>
        <div class="bg-green-50 p-4 rounded">
          <h3 class="font-semibold">Arrival: {{ arrival.city }}</h3>
          <p>
            {{
              formatTimeInZone(addHours(departureTime, 14), arrival.timezone)
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- Stock Markets Example -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">3. Global Stock Markets</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="market in markets"
          :key="market.name"
          :class="[
            'p-4 rounded',
            isMarketOpen(market) ? 'bg-green-50' : 'bg-red-50',
          ]"
        >
          <h3 class="font-semibold">{{ market.name }}</h3>
          <p>
            Current time: {{ formatTimeInZone(new Date(), market.timezone) }}
          </p>
          <p>Status: {{ isMarketOpen(market) ? 'Open' : 'Closed' }}</p>
          <p class="text-sm">Hours: {{ market.opens }} - {{ market.closes }}</p>
        </div>
      </div>
    </div>

    <!-- Server Logs Example -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">4. Server Logs</h2>
      <div class="space-y-2">
        <div
          v-for="(log, index) in logs"
          :key="index"
          class="bg-gray-50 p-3 rounded"
        >
          <p class="font-semibold">{{ log.event }}</p>
          <p class="text-sm">UTC: {{ log.timestamp }}</p>
          <p class="text-sm">
            Local: {{ formatTimeInZone(new Date(log.timestamp), userTimezone) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Calendar Events Example -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-bold mb-4">5. Calendar Events</h2>
      <div class="space-y-4">
        <div
          v-for="event in events"
          :key="event.title"
          class="bg-gray-50 p-4 rounded"
        >
          <h3 class="font-semibold">{{ event.title }}</h3>
          <p>Your time: {{ formatTimeInZone(event.time, userTimezone) }}</p>
          <div class="text-sm text-gray-600">
            Attendees: {{ event.attendees.join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
