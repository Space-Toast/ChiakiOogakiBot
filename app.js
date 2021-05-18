require("dotenv").config('./.env');
const { TwitterClient } = require("twitter-api-client");
const fs = require("fs");

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const images = fs.readdirSync("./images/");

const imageToTweet = images[Math.floor(Math.random() * images.length)];

const b64image = fs.readFileSync("./images/" + imageToTweet, { encoding: "base64" });

twitterClient.media.mediaUpload({
    media: b64image
}).then(res => {
    console.log("image uploaded", res);
    console.log(res.media_id_string);

    twitterClient.tweets.statusesUpdate({
        status: "",
        media_ids: res.media_id_string
    }).then(res => {
        console.log("image tweeted", res);
    }).catch(err => {
        console.log(err);
    });

}).catch(err => {
    console.log(err);
});
