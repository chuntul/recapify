require 'rspotify/oauth'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, "1fd9e4a26b7a4db0aed179b258b65e7d", "f219571d0e5c476f8c0b2bed28cb823d", scope: 'playlist-modify-public user-library-read user-library-modify user-read-recently-played user-top-read'
end