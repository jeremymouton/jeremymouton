use Rack::Static,
  :urls => ["/ico", "/js", "/css", "/components", "/json"],
  :root => "public"

  map "/" do
    run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/index.html', File::RDONLY)
    ]
  }
  end

  map "/work" do
    run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/work.html', File::RDONLY)
    ]
  }
  end

  map "/404" do
    run lambda { |env|
    [
      200, 
      {
        'Content-Type'  => 'text/html', 
        'Cache-Control' => 'public, max-age=86400' 
      },
      File.open('public/404.html', File::RDONLY)
    ]
  }
  end