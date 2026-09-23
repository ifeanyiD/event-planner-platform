const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "John",
  "Jane",
  "James",
  "Ifeanyi"
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Davis",
  "Doe",
  "David",
  "Tobe",
  "Chidera"
];

const eventCategories = [
  "Wedding",
  "Corporate",
  "Birthday",
  "Conference",
  "Private"
];

const eventLocations = [
  "Grand Hall",
  "Conference Room",
  "City Arena",
  "Beachside Venue",
  "Private Hall"
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItem(array) {
  return array[getRandomInt(0, array.length - 1)];
}


// =========================
// GENERATE USERS
// =========================

export function generateUsers(count) {
  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const name = `${firstName} ${lastName}`;

    users.push({
      name,
      email: `${firstName.toLowerCase()}${i}@gmail.com`,
      password: "password123",
      role: "user"
    });
  }

  return users;
}


// =========================
// GENERATE MESSAGES
// =========================

export function generateMessage(i, eventIds = []) {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const name = `${firstName} ${lastName}`;

  const linkedEvent = eventIds.length
    ? getRandomItem(eventIds)
    : null;

  return {
    name,
    email: `${firstName.toLowerCase()}${i}@example.com`,
    subject: `Subject for message #${i}`,
    message: `This is the content of message #${i}.`,
    isRead: Math.random() > 0.5,

    // Add this only if your Message schema
    // has an event/eventId field.
    // event: linkedEvent
  };
}


// =========================
// GENERATE EVENTS
// =========================

export function generateEvent(i) {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552"
    },
    {
      url: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d2"
    },
    {
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
    }
  ];

  return {
    title: `${getRandomItem(firstNames)} Event #${i}`,
    category: getRandomItem(eventCategories),
    location: getRandomItem(eventLocations),
    year: getRandomInt(2023, 2026),
    description: `This is a description for event #${i}.`,
    images,
    featured: Math.random() > 0.7
  };
}