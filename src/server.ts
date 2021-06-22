import express, { Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
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
  const proxies = Object.entries(config.routes).map(([pathname, route]) => {
    return createProxyMiddleware(pathname, {
      target: typeof route === "string" ? route : route.url,
      ws: true,
    });
  });
  proxies.forEach((proxy) => {
    app.use(proxy);
  });
  return {
    run: () => {
      const { port, hostname } = config;
      console.log(`Will listen port ${hostname ? hostname + ":" : ""}${port}`);
      const server = app.listen(port, hostname!);
      server.on("upgrade", (req: Request, socket: Socket, head: any) => {
        console.log("amir", req.hostname);
        proxies[0].upgrade?.(req, socket, head);
      });
    },
  };
};
