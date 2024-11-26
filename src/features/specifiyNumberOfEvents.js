const { loadFeature, defineFeature } = require('jest-cucumber');

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {});
