get '/' do

  erb :index

end

post '/' do
	@geocoded_tweets = []
  
  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['TWITTER_KEY']
    config.consumer_secret     = ENV['TWITTER_SECRET']
    config.access_token        = params[:token]
    config.access_token_secret = params[:secret]
  end

	client.search(params[:twitter_tags]).take(50).collect do |tweet|
    if tweet.geo?
      @geocoded_tweets << tweet 
    end
  end
  
  return @geocoded_tweets.to_json

end
