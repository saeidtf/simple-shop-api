const cornJob = require("node-cron");
const { User, Order, OrderItem } = require("../models");
exports.initScheduledJobs = () => {
  const scheduledJobFunction = cornJob.schedule("*/5 * * * *", () => {
    console.log("I'm executed on a schedule!");
    // delete all order items
    OrderItem.destroy({ truncate: true })
    // delete all orders
    Order.destroy({ truncate: true });
    // delete all users
    User.destroy({ truncate: true });
  });

  scheduledJobFunction.start();
};
