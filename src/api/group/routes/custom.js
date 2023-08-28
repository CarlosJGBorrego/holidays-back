const routes = [
  {
    method: "GET",
    path: "/groups/user/:id",
    handler: "group.findGroupsByUser",
  },
];

module.exports = { routes };
