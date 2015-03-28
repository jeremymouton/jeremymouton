$stdout.sync = true

use Rack::Static,
  :urls => ["assets/css", "assets/js", "assets/images"],
  :root => "."

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'assets, max-age=86400'
    },
    File.open('index.html', File::RDONLY)
  ]
}

