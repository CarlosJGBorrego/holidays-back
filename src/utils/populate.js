const MEDIA_POPULATION = {
  select: ["id", "url", "width", "height"],
};

const archivedPopulate = {
  populate: {
    user: {
      populate: "*",
    },
    group: {
      populate: "*",
    },
    holiday: {
      populate: "*",
    },
    userGroups: {
      populate: "*",
    },
  },
};
let cache = {};

const populateBuilder = function (strapi, uid) {
  if (cache[uid]) return cache[uid];
  const schema = strapi.getModel(uid);
  const populateObj = Object.keys(schema.attributes).reduce(
    (currentValue, current) => {
      let population;
      const attribute = schema.attributes[current];
      if (attribute.type === "media") {
        population = MEDIA_POPULATION;
      } else if (attribute.type === "component") {
        population = {
          populate: populateBuilder(strapi, attribute.component),
        };
      } else if (
        (attribute.type === "relation" || attribute.type === "datetime") &&
        (attribute.target === "plugin::users-permissions.user" ||
          attribute.target === "api::user-group.user-group" ||
          attribute.target === "api::group.group" ||
          attribute.target === "api::holiday.holiday")
      ) {
        population = archivedPopulate;
      }
      if (population) return { ...currentValue, [current]: population };
      return currentValue;
    },
    {}
  );
  cache[uid] = populateObj;
  return populateObj;
};

module.exports = { populateBuilder };
