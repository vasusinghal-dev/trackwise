import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/favicon.svg" alt="Favicon" width={35} height={35} />
              <span className="text-xl font-bold text-text-primary">
                Trackwise
              </span>
            </div>
            <p className="text-text-secondary text-sm">
              Job tracking, without chaos. Built for serious job seekers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-2 text-text-secondary text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm mb-4 md:mb-0">
            © {currentYear} Trackwise. Built with Next.js & Tailwind CSS.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
