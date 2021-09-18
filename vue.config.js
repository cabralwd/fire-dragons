module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/variables.scss";
        `,
      },
    },
  },
};
