require "rubygems"
require 'open-uri'
require "json"

comics = Array.new

open('http://xkcd.com/info.0.json') do |first|
	JSON.parse(first.read)['num'].downto(1) do |i|
		unless i == 404
			open('http://xkcd.com/' + i.to_s + '/info.0.json') do |f|
				c = JSON.parse(f.read)
				comics << {'num' => c['num'], 'img' => c['img'], 'transcript' => c['transcript']} unless c['transcript'] == ''
			end
		end
	end
end

File.open("pexeso.json","w") do |file|
	file.write(comics.to_json)
end
