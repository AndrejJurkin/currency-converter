import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api/exchange-rates": {
        target: "https://www.cnb.cz",
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(
            /^\/api\/exchange-rates/,
            "/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
          ),
      },
    },
  },
});
