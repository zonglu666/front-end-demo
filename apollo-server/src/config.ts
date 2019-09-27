function getConfig() {
  const ENVIRONMENT = process.env.ENVIRONMENT;
  if (!ENVIRONMENT) throw "Missing env.ENVIRONMENT";

  return {
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 4000,
    ENVIRONMENT: ENVIRONMENT
  };
}

export default getConfig();
