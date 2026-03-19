const https = require("https");

const KEYAUTH_BASE_URL = "https://keyauth.win/api/1.3/";

const keyAuthConfig = {
    name: process.env.KEYAUTH_APP_NAME || "SilentAim-Max",
    ownerid: process.env.KEYAUTH_OWNER_ID || "X9lEcfrIZa",
    version: process.env.KEYAUTH_APP_VERSION || "1.0",
    secret: process.env.KEYAUTH_SECRET || ""
};

function keyAuthRequest(params) {
    const url = new URL(KEYAUTH_BASE_URL);

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    });

    return new Promise((resolve, reject) => {
        https
            .get(
                url,
                {
                    headers: {
                        "User-Agent": "SpectraX-Vercel-Auth"
                    }
                },
                (response) => {
                    let body = "";

                    response.on("data", (chunk) => {
                        body += chunk;
                    });

                    response.on("end", () => {
                        if (response.statusCode < 200 || response.statusCode >= 300) {
                            reject(new Error(`KeyAuth request failed with status ${response.statusCode}`));
                            return;
                        }

                        try {
                            resolve(JSON.parse(body));
                        } catch (error) {
                            reject(new Error(`Invalid KeyAuth response: ${error.message}`));
                        }
                    });
                }
            )
            .on("error", reject);
    });
}

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed."
        });
    }

    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required."
        });
    }

    try {
        const initResult = await keyAuthRequest({
            type: "init",
            ver: keyAuthConfig.version,
            name: keyAuthConfig.name,
            ownerid: keyAuthConfig.ownerid,
            hash: "",
            token: "",
            thash: ""
        });

        if (!initResult.success || !initResult.sessionid) {
            return res.status(401).json({
                success: false,
                message: initResult.message || "KeyAuth initialization failed."
            });
        }

        const loginResult = await keyAuthRequest({
            type: "login",
            username,
            pass: password,
            sessionid: initResult.sessionid,
            name: keyAuthConfig.name,
            ownerid: keyAuthConfig.ownerid,
            hwid: "spectrax-web-client-001",
            code: ""
        });

        if (!loginResult.success) {
            return res.status(401).json({
                success: false,
                message: loginResult.message || "Invalid credentials."
            });
        }

        return res.status(200).json({
            success: true,
            message: loginResult.message || "Logged in successfully.",
            user: loginResult.info || null
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to contact KeyAuth right now.",
            error: error.message
        });
    }
};
