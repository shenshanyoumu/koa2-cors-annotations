/**
 * 在koa框架中，插件编写契约为实现(ctx,next)的接口
 */
module.exports = function crossOrigin(options = {}) {
  /** 该插件默认允许的HTTP动作 */
  const defaultOptions = {
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"]
  };

  // 合并Options配置项
  options = Object.assign({}, defaultOptions, options);

  return async function cors(ctx, next) {
    ctx.vary("Origin");

    let origin;

    /** 如果origin字段为函数，则先执行该函数；否则获取origin字符串表示允许的浏览器referer */
    if (typeof options.origin === "function") {
      origin = options.origin(ctx);
    } else {
      origin = options.origin || ctx.get("Origin") || "*";
    }
    if (!origin) {
      return await next();
    }

    // 设置允许跨域的浏览器referer
    ctx.set("Access-Control-Allow-Origin", origin);

    /** 针对预取动作OPTIONS，则设置下面 */
    if (ctx.method === "OPTIONS") {
      if (!ctx.get("Access-Control-Request-Method")) {
        return await next();
      }

      if (options.maxAge) {
        ctx.set("Access-Control-Max-Age", String(options.maxAge));
      }

      // 当特定的浏览器携带了证书，则设置该浏览器可跨域访问
      if (options.credentials === true) {
        ctx.set("Access-Control-Allow-Credentials", "true");
      }

      // 合并外部传递的HTTP动作Token
      if (options.allowMethods) {
        ctx.set("Access-Control-Allow-Methods", options.allowMethods.join(","));
      }

      // Access-Control-Allow-Headers
      if (options.allowHeaders) {
        ctx.set("Access-Control-Allow-Headers", options.allowHeaders.join(","));
      } else {
        ctx.set(
          "Access-Control-Allow-Headers",
          ctx.get("Access-Control-Request-Headers")
        );
      }

      ctx.status = 204; // No Content
    } else {
      /** 针对非OPTIONS动作，如果插件配置了credentials字段 */
      if (options.credentials === true) {
        if (origin === "*") {
          /** 当koa服务允许任何浏览器的跨域请求，则需要移除下面响应头部 */
          ctx.remove("Access-Control-Allow-Credentials");
        } else {
          ctx.set("Access-Control-Allow-Credentials", "true");
        }
      }

      if (options.exposeHeaders) {
        ctx.set(
          "Access-Control-Expose-Headers",
          options.exposeHeaders.join(",")
        );
      }

      try {
        /** 插件的链式调用一般形式，不管是redux的中间件还是koa插件都是这样的形式 */
        await next();
      } catch (err) {
        throw err;
      }
    }
  };
};
