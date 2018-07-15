class UsersController < ApplicationController
    def index
        # Make the user
        spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
        # Make sure the user stays logged in
        hash = spotify_user.to_hash
        spotify_user = RSpotify::User.new(hash)

        @spotify_user = spotify_user

        # Get user's top played artists and tracks
        @top_artists_short = spotify_user.top_artists(time_range: 'short_term', limit: 16) 
        @top_tracks_short = spotify_user.top_tracks(time_range: 'short_term', limit: 16)

        # Data for drop-down menu for selections of time ranges
        @api_ranges = ["short_term", "medium_term", "long_term"]
        @artists_data = []
        @tracks_data = []
    
        @api_ranges.each do |r| 
            @artists_data << spotify_user.top_artists(time_range: r, limit: 16).to_json
            @tracks_data << @top_tracks = spotify_user.top_tracks(time_range: r, limit: 16).to_json
        end

      end
end
