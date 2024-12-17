require "peppermint/rake"

task default: :fmt

desc "build npm sub-projects"
task :build_npm do
  %w[share-location photo-gallery chikorita freebee].each do |i|
    sh "mkdir", "-pv", File.join("dist", i)
    sh "bun", "i", "--cwd", File.join(__dir__, i)
    sh "bun", "run", "--cwd", File.join(__dir__, i), "build"
    sh "rsync", "-rv", "--delete", File.join(__dir__, i, "dist") + "/", File.join(__dir__, "dist", i) + "/"
  end
  sh "rsync", "-rv", "--delete", File.join(__dir__, "freebee", "api") + "/", File.join(__dir__, "dist", "freebee", "api") + "/"
end

desc "build markdown writeups"
task :build_md do
  sh File.join(__dir__, "writeups", "compile")
end

desc "copy static files to dist"
task :cp_static do
  sh "rsync", "-rv", File.join(__dir__, "static") + "/", File.join(__dir__, "dist") + "/"
end

desc "build project to ./dist"
task build: %i[build_npm build_md cp_static]

desc "deploy the static web server (dry run)"
task :deploy_test do
  ENV["ANSIBLE_CONFIG"] = File.join(__dir__, "ansible", "ansible.cfg")
  sh "ansible-playbook", "--ask-vault-pass", "--diff", "--check", "-v",
    File.join(__dir__, "ansible", "playbooks", "deploy.json")
end

desc "deploy the static web server"
task deploy: :build do
  ENV["ANSIBLE_CONFIG"] = File.join(__dir__, "ansible", "ansible.cfg")
  sh "ansible-playbook", "--ask-vault-pass",
    File.join(__dir__, "ansible", "playbooks", "deploy.json")
end

desc "run the development web server"
task :dev do
  sh "python3", "-m", "http.server", "-d", File.join(__dir__, "dist"), "50000"
end
