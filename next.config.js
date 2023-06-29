/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // redirects: async () => {
  //   return [
  //     {
  //       source: '/:shortURL',
  //       destination: (ctx) => {
  //         const longURL = urlMappings[ctx.params.shortURL];
  //         return longURL || '/404'; // Redirect to a custom 404 page if short URL is not found
  //       },
  //       permanent: false,
  //     },
  //   ]
  // }
}

module.exports = nextConfig
