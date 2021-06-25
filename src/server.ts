import express, { Request } from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { url } from "inspector";
import { Socket } from "net";

export interface AppRouteOptions {}

export interface AppRoute {
  url: string;
  options?: AppRouteOptions;
}

export interface AppConfig {
  port: number;
  hostname?: string;
  routes: Record<string, AppRoute | string>;
}

export const createApp = (config: AppConfig) => {
  const app = express();
  const proxies: Record<string, RequestHandler> = Object.entries(
    config.routes
  ).reduce((acc, entry) => {
    const [pathname, route] = entry;
    const proxy = createProxyMiddleware(pathname, {
      target: typeof route === "string" ? route : route.url,
      ws: true,
    });
    acc[pathname] = proxy;
    return acc;
  }, {} as Record<string, RequestHandler>);
  Object.values(proxies).forEach((proxy) => {
    app.use(proxy);
  });
  return {
    run: () => {
      const { port, hostname } = config;
      console.log(`Will listen port ${hostname ? hostname + ":" : ""}${port}`);
      const server = app.listen(port, hostname!);
    },
  };
};
