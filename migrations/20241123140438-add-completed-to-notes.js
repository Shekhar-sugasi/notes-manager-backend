"use strict";

/** @type {import('sequelize-cli').Migration} */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Notes", "completed", {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default value is false
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Notes", "completed");
  },
};
