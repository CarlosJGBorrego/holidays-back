"use strict";

const { populateBuilder } = require("../../../utils/populate");

/**
 * group service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::group.group", ({ strapi }) => ({
  async findGroupsByUser(ctx) {
    const groups = await strapi.db.query("api::group.group").findMany({
      where: {
        users: {
          id: {
            $eq: ctx?.params?.id,
          },
        },
      },
      populate: populateBuilder(strapi, "api::group.group"),
    });

    return groups;
  },
  async findMany() {
    return await strapi.db.query("api::group.group").findMany({
      populate: populateBuilder(strapi, "api::group.group"),
    });
  },
}));
