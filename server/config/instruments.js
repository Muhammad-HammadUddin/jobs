import * as Sentry from "@sentry/node"



Sentry.init({
    dsn: "https://e460cb13fbbcf8d5f11b28c1b2d3861a@o4510682465894400.ingest.us.sentry.io/4510682478739456",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
});