
import React from "react";
import { Instagram, Twitter, Linkedin, Facebook, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1">
            <h3 className="text-xl font-bold mb-4">
              <span className="gold-gradient">Steven Bartlett</span>
            </h3>
            <p className="text-white/60 mb-6">
              Entrepreneur, author, speaker, and host of "The Diary of a CEO" podcast.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/60 hover:text-gold transition-colors">About</a>
              </li>
              <li>
                <a href="#events" className="text-white/60 hover:text-gold transition-colors">Events</a>
              </li>
              <li>
                <a href="#gallery" className="text-white/60 hover:text-gold transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#faq" className="text-white/60 hover:text-gold transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#register" className="text-white/60 hover:text-gold transition-colors">Register</a>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-white/60">
                <a href="mailto:support@stevenbartlett.com" className="hover:text-gold transition-colors">
                  support@stevenbartlett.com
                </a>
              </li>
              <li className="text-white/60">
                <a href="tel:+442071234567" className="hover:text-gold transition-colors">
                  +44 20 7123 4567
                </a>
              </li>
              <li className="text-white/60">
                London, UK
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-bold mb-4">Listen to the Podcast</h4>
            <div className="flex flex-col space-y-2">
              <a 
                href="https://podcasts.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors flex items-center"
              >
                <MessageCircle size={16} className="mr-2" />
                Apple Podcasts
              </a>
              <a 
                href="https://open.spotify.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors flex items-center"
              >
                <MessageCircle size={16} className="mr-2" />
                Spotify
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors flex items-center"
              >
                <MessageCircle size={16} className="mr-2" />
                YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-dark-lighter pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Steven Bartlett. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white/40 text-sm hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 text-sm hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/40 text-sm hover:text-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
