const PROXY_CONFIG = [
    {
        context: [
            "/Farmer",
            "/Carcass",
            "/Lamb"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;