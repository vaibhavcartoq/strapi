'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('persona-picker')
      .service('myService')
      .getWelcomeMessage();
  },
});
