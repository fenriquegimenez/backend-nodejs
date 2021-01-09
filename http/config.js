module.exports = {
  port: process.env.PORT || 8000,
  stats: {
    ok: 200,
    created: 201,
    badRequest: 400,
    notFound: 404,
    internalError: 500,
  },
};
