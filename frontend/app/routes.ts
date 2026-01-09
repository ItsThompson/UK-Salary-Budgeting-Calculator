import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home/App.tsx"),
  route("/budget-calculator", "routes/BudgetCalculator/App.tsx", {
    ssr: false
  })
] satisfies RouteConfig;
