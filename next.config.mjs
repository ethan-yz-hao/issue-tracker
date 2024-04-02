/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {key: 'referer-policy', value: 'no-referer'},
                ]
            }
        ]
    }
};

export default nextConfig;
