import babelrc from "./.babelrc.js";
import stylexPlugin from "@stylexjs/nextjs-plugin";

const plugins = babelrc.plugins;
const [_name, options] = plugins.find(
  (plugin) => Array.isArray(plugin) && plugin[0] === '@stylexjs/babel-plugin',
);

const rootDir = options.unstable_moduleResolution.rootDir ?? __dirname;
const aliases = options.aliases ?? undefined;
const useCSSLayers = options.useCSSLayers ?? undefined;

const styleX = stylexPlugin({ rootDir, aliases, useCSSLayers })({
    transpilePackages: ['@stylexjs/open-props'],
});

const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    styleX
}
   
  export default nextConfig