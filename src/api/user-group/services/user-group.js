"use strict";

const { populateBuilder } = require("../../../utils/populate");

/**
 * user-group service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::user-group.user-group",
  ({ strapi }) => ({
    async findMany() {
      return await strapi.db.query("api::user-group.user-group").findMany({
        populate: populateBuilder(strapi, "api::user-group.user-group"),
      });
    },
  })
);
