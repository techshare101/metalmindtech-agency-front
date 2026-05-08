export const FORGE_URL = "https://ark.metalmindtech.com";

// Allow the API base to be unset on Vercel (Path B), in which case calls
// fall through to the same-origin /api route handled by Vercel serverless
// functions. In Emergent dev, REACT_APP_BACKEND_URL points at the FastAPI server.
const RAW_BACKEND = (process.env.REACT_APP_BACKEND_URL || "").trim();
export const BACKEND_URL = RAW_BACKEND.replace(/\/+$/, "");
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";
