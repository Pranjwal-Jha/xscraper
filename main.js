import { Scraper } from "agent-twitter-client";
const scrapeTweets = async () => {
  try {
    const scraper = new Scraper();
    // Basic login
    await scraper.login("your-username", "your-password");
    // Get tweets as an AsyncGenerator
    const tweetsGenerator = await scraper.getTweets("elonmusk", 10);
    console.log("OUTPUT ---->\n");
    // Iterate through the AsyncGenerator
    let tweetCount = 0;
    for await (const tweet of tweetsGenerator) {
      tweetCount++;
      console.log(`Tweet ${tweetCount}:`);
      if (tweet.text) {
        console.log(tweet.text);
      } else if (tweet.quotedStatus?.text) {
        console.log(tweet.quotedStatus.text);
      } else {
        console.log("Tweet content:", tweet);
      }
      console.log("-------------------");

      // Stop after 10 tweets
      if (tweetCount >= 10) break;
    }
    if (tweetCount === 0) {
      console.log("No tweets were found");
    }
  } catch (error) {
    console.error("Error scraping tweets:", error);
  }
};
// Execute the function
scrapeTweets();
