module.exports = {
  webpack: function (config) {
    config.externals = config.externals || {};
    return config;
  },
  images: {
    loader: "imgix",
  },
  env: {
    apiUrl: "https://wimbiz-server.herokuapp.com/",
  },
};
