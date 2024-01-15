require "standard/rake"

task default: :fmt

desc "format this repository"
task fmt: :"standard:fix" do
  sh <<~SHELL
    find . \\( -not -path '*node_modules*' \\) -and \\( -not -path '*target*' \\) -and \\( -name '*.json' -o -name '*.md' \\) -and \\( -not -name 'project.json' \\) -and \\( -not -name personal.json \\) -and -type f | xargs deno fmt
  SHELL
end

desc "build npm sub-projects"
task :build_npm do
  ["share-location", "photo-gallery", "chikorita"].each do |i|
    sh "mkdir -pv ./dist/#{i}"
    sh "pnpm run -C ./#{i} build"
    sh "cp -rv ./#{i}/dist/* ./dist/#{i}"
  end
end

desc "build markdown writeups"
task :build_md do
  sh "./writeups/compile"
end

desc "copy static files to dist"
task :cp_static do
  sh "cp -rv ./static/* ./dist"
end

desc "build project to ./dist"
task build: [:build_npm, :build_md, :cp_static]

desc "deploy the static web server"
task :deploy do
  unix_time = Time.now.to_i
  sh "sudo cp -rv ./dist/* /var/www/html"
  sh "sudo cp -rv /etc/caddy/Caddyfile /etc/caddy/.Caddyfile#{unix_time}"
  sh "sudo cp -rv ./Caddyfile /etc/caddy"
  sh "sudo systemctl restart caddy"
end

desc "run the development web server"
task :dev do
  sh "cd ./dist; python3 -m http.server 50000;"
end
