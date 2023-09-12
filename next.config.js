/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
    },
    env:{
        CLIENT_ID:"9439963268-sa3ivrhi98ojv5s95e298as4nqinmk4c.apps.googleusercontent.com",
        CLIENT_SECRET:"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",
    },
    
}

module.exports = nextConfig
