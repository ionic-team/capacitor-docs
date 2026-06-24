import React from "react";
import { Pill, Search, ShoppingCart, User } from "lucide-react";

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 bg-white border-b border-[var(--brand-border)]"
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "var(--brand-primary)" }}
          >
            <Pill className="w-5 h-5 text-white" />
          </div>
          <span
            className="font-bold text-xl"
            style={{ color: "var(--brand-primary)" }}
          >
            MediCart
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search medicines, wellness products..."
            className="w-full pl-10 pr-4 py-2 border border-[var(--brand-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <a href="/">Home</a>
          <a href="/medicines">Medicines</a>
          <a href="/wellness">Wellness</a>
          <a href="/devices">Devices</a>
          <a href="/offers">Offers</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              0
            </span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--brand-border)]">
            <User className="w-4 h-4" />
            <span className="hidden md:inline">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
};
