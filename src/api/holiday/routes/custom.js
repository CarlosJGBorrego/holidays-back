const routes = [
  {
    method: "GET",
    path: "/holidays/user/:email",
    handler: "holiday.getHolidaysByUserEmail",
  },
  {
    method: "GET",
    path: "/holidays/group/:id",
    handler: "holiday.getHolidaysByGroup",
  },
];

module.exports = { routes };
