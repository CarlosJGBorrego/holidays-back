const routes = [
  {
    method: "GET",
    path: "/holidays/user/:email",
    handler: "holiday.getHolidaysByUserEmail",
  },
];

module.exports = { routes };
