$:.push File.expand_path("../lib", __FILE__)

require "esphinx/rails/ui/version"

Gem::Specification.new do |s|
  s.name        = "esphinx-rails-ui"
  s.version     = ESphinx::Rails::UI::VERSION
  s.authors     = ["Home Labs"]
  s.email       = ["home-labs@outlook.com"]
  s.homepage    = "https://rubygems.org/gems/esphinx-rails-ui"
  s.summary     = "Summary of ESphinx UI."
  s.description = "User Interface Module to ESphinx."
  s.license     = "MIT"
  s.test_files = Dir["test/**/*"]

  s.files = Dir["{bin,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc", "esphinx_ui.gemspec"]
  s.require_paths = %w{bin lib}

  s.add_dependency 'jquery-rails', "~> 4.0"
  s.add_dependency 'esphinx-rails', '~> 0.0'

end
