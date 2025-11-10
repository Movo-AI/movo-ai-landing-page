export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-movo-plum text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-movo-plum via-movo-plum to-[#150a28] opacity-90" />

      <div className="container max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Product</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                  Features
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                  Integrations
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Pricing</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Resources</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                  Documentation
                </span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Blog</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Support</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Company</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">About</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Careers</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Contact</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Legal</h3>
            <ul className="space-y-4">
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Privacy</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">Terms</span>
              </li>
              <li>
                <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                  Security
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="text-3xl font-bold text-white tracking-tight">movo</div>
            </div>
            <div className="flex gap-8">
              <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer font-medium">
                Twitter
              </span>
              <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer font-medium">
                LinkedIn
              </span>
              <span className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer font-medium">
                Instagram
              </span>
            </div>
          </div>
          <p className="text-sm text-white/50 text-center md:text-left leading-relaxed">
            © 2025 Movo. Powering AI phone representatives for the next generation of sports academies.
          </p>
        </div>
      </div>
    </footer>
  )
}
