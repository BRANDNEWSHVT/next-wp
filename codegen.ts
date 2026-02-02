import { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";
import { existsSync } from "fs";

const envFiles = [
  ".env.local",
  ".env.development",
  ".env.staging",
  ".env.production",
  ".env",
];
for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    dotenvConfig({ path: envFile });
    break;
  }
}

const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

if (!wordpressUrl) {
  throw new Error("NEXT_PUBLIC_WORDPRESS_URL environment variable is required");
}

const config: CodegenConfig = {
  schema: `${wordpressUrl}/graphql`,
  documents: ["src/**/*.{tsx,ts}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
