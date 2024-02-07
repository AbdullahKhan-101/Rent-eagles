/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: ['renteagles.s3.us-east-1.amazonaws.com', 'renteaglespub.s3.us-east-1.amazonaws.com' , 'renteaglespub.s3.us-east-1.amazonaws.com'],
    }

    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'renteagles.s3.us-east-1.amazonaws.com',
    //         pathname: '**',
    //       },
    //       {
    //         protocol: 'https',
    //         hostname: 'renteaglespub.s3.us-east-1.amazonaws.com',
    //         pathname: '**',
    //       },
    //     ],
    //   },
}

module.exports = nextConfig
