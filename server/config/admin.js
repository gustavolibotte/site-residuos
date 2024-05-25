module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '2cfbf2535b5b16d04e818d33cf9860e2'),
  },
});
