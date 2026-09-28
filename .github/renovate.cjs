const { SECRET_DOMAIN, FORGEJO_ACCESS_TOKEN } = process.env;
if (!SECRET_DOMAIN || !FORGEJO_ACCESS_TOKEN) {
  throw new Error('SECRET_DOMAIN and FORGEJO_ACCESS_TOKEN are required');
}
if (!/^[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?$/.test(SECRET_DOMAIN)) {
  throw new Error('SECRET_DOMAIN must be a hostname without a scheme or path');
}

module.exports = {
  packageRules: [
    {
      matchDatasources: ['forgejo-tags'],
      matchPackageNames: ['christfried.balizou/translator'],
      registryUrls: [`https://git.${SECRET_DOMAIN}`],
    },
  ],
  hostRules: [
    {
      hostType: 'forgejo-tags',
      matchHost: `https://git.${SECRET_DOMAIN}`,
      token: FORGEJO_ACCESS_TOKEN,
      abortOnError: true,
    },
  ],
};
