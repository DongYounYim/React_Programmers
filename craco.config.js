const path = requrie("path");

// 상대경로를 사용하지 않고 편안하게 사용하는 방법
// 사용방법은 좀 알아보기

module.exports = {
  babel: {
    presets: ["@emotion/babel-preset-css-prop"],
  },
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
};
