const { withFaust } = require("@faustwp/core");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "focus.pusingkoding.xyz",
      },
    ],
  },
  trailingSlash: true,
});
