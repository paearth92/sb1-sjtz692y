import React, { useState, useMemo } from 'react';
import { X, Search, Info, CreditCard, Smartphone, Gift, Package, Zap, Shield, Receipt, Phone, Calendar } from 'lucide-react';
import { phones } from './data/phones';
import { stateTaxRates } from './data/taxRates';
import { useAuth } from './contexts/AuthContext';
import UserProfile from './components/UserProfile';
import { Watermark } from './components/Watermark';
import { phoneSpecifications } from './data/specifications';

// Constants for pricing calculations
const DEVICE_SETUP_CHARGE = 35;
const PLANS = {
  "$25": 25,
  "$40": 40,
  "$50": 50,
  "$60": 60
};

const ALL_PLANS = ["$25", "$50", "$60"];

// Utility functions for price calculations
const calculateTax = (amount, taxRate) => amount * taxRate;

const calculatePayNowTotal = (phonePrice, planPrice, boostProtect, bundlePrice = 0, taxRate) => {
  // Calculate taxable subtotal (excluding connection fee)
  const taxableSubtotal = phonePrice + DEVICE_SETUP_CHARGE + bundlePrice + boostProtect + planPrice;
  const subtotal = taxableSubtotal;
  const tax = calculateTax(subtotal, taxRate);
  return {
    devicePrice: phonePrice,
    setupCharge: DEVICE_SETUP_CHARGE,
    bundlePrice,
    boostProtect,
    subtotal,
    tax,
    total: subtotal + tax,
    planPrice
  };
};

const calculatePayLaterTotal = (monthlyPrice, boostProtect, selectedPlan, taxRate) => {
  const planPrice = PLANS[selectedPlan];
  return {
    deviceOnly: monthlyPrice,
    boostProtect,
    planPrice,
    tax: calculateTax(monthlyPrice * 24, taxRate) / 24,
    total: monthlyPrice + boostProtect + planPrice + (calculateTax(monthlyPrice * 24, taxRate) / 24)
  };
};

const calculatePayLaterDueToday = (monthlyPrice, srp, bundlePrice = 0, taxRate) => {
  const deviceTax = calculateTax(srp, taxRate);
  const bundleTax = calculateTax(bundlePrice, taxRate);
  const taxableTotal = monthlyPrice + DEVICE_SETUP_CHARGE + bundlePrice;
  
  return {
    deviceFinancePrice: monthlyPrice,
    setupCharge: DEVICE_SETUP_CHARGE,
    deviceTax,
    bundlePrice,
    bundleTax,
    total: taxableTotal + deviceTax + bundleTax
  };
};

const PhoneSVG = ({ model, className }) => {
  const getPromotionalBanner = (modelId) => {
    if (!modelId) return null;
    
    // BOGO offer for Moto Edge 2023
    if (modelId === 'moto-edge-2023') {
      return (
        <>
          <defs>
            <linearGradient id={`promo-${modelId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="##2196F3" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
            <filter id={`glow-${modelId}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(100, 180)">
            <circle
              cx="0"
              cy="0"
              r="80"
              fill={`url(#promo-${modelId})`}
              filter={`url(#glow-${modelId})`}
              opacity="0.95"
            />
            <text 
              x="0" 
              y="-10"
              textAnchor="middle" 
              fill="white" 
              filter={`url(#glow-${modelId})`}
              style={{
                fontSize: '36px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              BOGO
            </text>
            <text 
              x="0" 
              y="20"
              textAnchor="middle" 
              fill="white" 
              filter={`url(#glow-${modelId})`}
              style={{
                fontSize: '18px',
                fontWeight: '600',
                fontFamily: 'sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              Buy One Get One
            </text>
          </g>
        </>
      );
    }

    // Special offers from phones data
    const deviceData = phones.find(p => p.id === modelId);
    if (deviceData?.promotion) {
      const promotionText = deviceData.promotion.text.split('*').pop();
      const isLongText = promotionText.length > 25;

      return (
        <>
          <defs>
            <linearGradient id={`promo-${modelId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2196F3" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
            <filter id={`glow-${modelId}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g transform="translate(100, 180)">
            <rect 
              x={isLongText ? "-240" : "-180"}
              y="-45" 
              width={isLongText ? "480" : "360"}
              height="90" 
              fill={`url(#promo-${modelId})`}
              rx="8"
              filter={`url(#glow-${modelId})`}
              opacity="0.95"
            />
            <text 
              x="0" 
              y="0"
              textAnchor="middle" 
              fill="white" 
              style={{
                fontSize: isLongText ? '20px' : '24px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}
            >
              {promotionText}
            </text>
          </g>
        </>
      );
    }

    return null;
  };

  const svgs = {
    'iphone': (
      <svg viewBox="0 0 200 400" className={className}>
        <rect x="10" y="10" width="180" height="380" rx="30" fill="#f1f1f1" stroke="#333" strokeWidth="2"/>
        <rect x="85" y="20" width="30" height="15" rx="5" fill="#333"/>
        <circle cx="100" cy="350" r="15" stroke="#333" strokeWidth="2" fill="none"/>
        <rect x="20" y="45" width="160" height="290" rx="5" fill="#fff" stroke="#ddd"/>
        {getPromotionalBanner(model)}
      </svg>
    ),
    'samsung': (
      <svg viewBox="0 0 200 400" className={className}>
        <rect x="10" y="10" width="180" height="380" rx="20" fill="#f5f5f5" stroke="#333" strokeWidth="2"/>
        <circle cx="100" cy="25" r="5" fill="#333"/>
        <rect x="20" y="45" width="160" height="290" rx="5" fill="#fff" stroke="#ddd"/>
        {getPromotionalBanner(model)}
      </svg>
    ),
    'motorola': (
      <svg viewBox="0 0 200 400" className={className}>
        <rect x="10" y="10" width="180" height="380" rx="25" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
        <circle cx="100" cy="25" r="5" fill="#333"/>
        <rect x="20" y="45" width="160" height="290" rx="5" fill="#fff" stroke="#ddd"/>
        <path d="M 170 80 C 180 100, 180 120, 170 140" stroke="#444" fill="none" strokeWidth="3"/>
        {getPromotionalBanner(model)}
      </svg>
    ),
    'other': (
      <svg viewBox="0 0 200 400" className={className}>
        <rect x="10" y="10" width="180" height="380" rx="15" fill="#f8f8f8" stroke="#333" strokeWidth="2"/>
        <rect x="20" y="45" width="160" height="290" rx="5" fill="#fff" stroke="#ddd"/>
        {getPromotionalBanner(model)}
      </svg>
    )
  };

  const getDeviceSVG = (model) => {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('iphone')) return svgs['iphone'];
    if (modelLower.includes('samsung')) return svgs['samsung'];
    if (modelLower.includes('moto')) return svgs['motorola'];
    return svgs['other'];
  };

  return getDeviceSVG(model);
};

const PriceTag = ({ portPrice, monthlyPrice }) => (
  <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full px-4 py-2 inline-block">
    <p className="font-bold text-black">
      Starting at {portPrice === 0 ? 'FREE' : 
        `$${Math.min(portPrice, monthlyPrice).toFixed(2)}/mo`}
    </p>
  </div>
);

const StateSelector = ({ selectedState, onStateSelect }) => (
  <div className="mb-3 bg-white p-3 rounded-lg">
    <label className="text-[#ff6900] text-sm mb-1 block">Select State:</label>
    <select 
      value={selectedState}
      onChange={(e) => onStateSelect(e.target.value)}
      className="w-full p-2 rounded border text-[#ff6900]"
    >
      {Object.keys(stateTaxRates).map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>
  </div>
);

const bundles = {
  tier1: { name: "Tier 1", price: 35, items: ["Charging Block", "Screen Protector"] },
  tier2: { name: "Tier 2", price: 45, items: ["Case", "Screen Protector"] },
  tier3: { name: "Tier 3", price: 60, items: ["Screen Protector", "Case", "Power Block"] },
  tier4: { name: "Tier 4", price: 100, items: ["Screen Protector", "Case", "Power Block", "Base Audio Headphone/Speaker"] }
};

const BundleSelector = ({ selectedBundle, onBundleSelect }) => (
  <div className="mb-3 bg-white p-3 rounded-lg">
    <label className="text-[#ff6900] text-sm mb-1 block">Select Accessory Bundle:</label>
    <select 
      value={selectedBundle || ''}
      onChange={(e) => onBundleSelect(e.target.value || null)}
      className="w-full p-2 rounded border text-[#ff6900]"
    >
      <option value="">No Bundle</option>
      {Object.entries(bundles).map(([key, bundle]) => (
        <option key={key} value={key}>
          {bundle.name} (${bundle.price.toFixed(2)})
        </option>
      ))}
    </select>
  </div>
);

const DetailedPriceBreakdown = ({ breakdown }) => (
  <div className="text-xs text-[#ff6900] mt-2 space-y-2">
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
      <div className="flex items-center gap-2">
        <Smartphone className="w-4 h-4" />
      <span>Device Price:</span>
      </div>
      <span>{breakdown.devicePrice !== null ? `$${breakdown.devicePrice.toFixed(2)}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4" />
      <span>Boost Protect:</span>
      </div>
      <span>{breakdown.boostProtect !== null ? `$${breakdown.boostProtect.toFixed(2)}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4" />
      <span>Device Setup Charge:</span>
      </div>
      <span>{breakdown.setupCharge !== null ? `$${breakdown.setupCharge.toFixed(2)}` : 'N/A'}</span>
    </div>
    {breakdown.bundlePrice > 0 && (
      <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4" />
        <span>Bundle Price:</span>
        </div>
        <span>{breakdown.bundlePrice !== null ? `$${breakdown.bundlePrice.toFixed(2)}` : 'N/A'}</span>
      </div>
    )}
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors">
      <div className="flex items-center gap-2">
        <Receipt className="w-4 h-4" />
      <span>Monthly Plan:</span>
      </div>
      <span>{breakdown.planPrice !== null ? `$${breakdown.planPrice.toFixed(2)}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors bg-gray-50">
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
      <span>Subtotal:</span>
      </div>
      <span>{breakdown.subtotal !== null ? `$${breakdown.subtotal.toFixed(2)}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors bg-gray-50">
      <div className="flex items-center gap-2">
        <Receipt className="w-4 h-4" />
      <span>Tax:</span>
      </div>
      <span>{breakdown.tax !== null ? `$${breakdown.tax.toFixed(2)}` : 'N/A'}</span>
    </div>
    <div className="flex justify-between items-center p-2 bg-[#ff6900] bg-opacity-5 rounded-lg font-bold">
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
      <span>Total Due Today:</span>
      </div>
      <span>{breakdown.total !== null ? `$${breakdown.total.toFixed(2)}` : 'N/A'}</span>
    </div>
  </div>
);

const StandardPricing = ({ phone, taxRate }) => (
  <div className="space-y-4">
    {phone.promotion && (
      <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 p-4 rounded-lg mb-4 transform hover:-translate-y-1 transition-all duration-300">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#ff6900]" />
              <span className="text-sm font-bold text-[#ff6900]">Special Offer!</span>
            </div>
            <span className="text-xs text-gray-600">
              <Calendar className="w-4 h-4 inline mr-1" />
              {new Date(phone.promotion.validFrom).toLocaleDateString()} - {new Date(phone.promotion.validTo).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-[#ff6900] mt-1">{phone.promotion.text}</p>
        </div>
      </div>
    )}
    <div className="bg-gradient-to-r from-[#ff6900] to-yellow-400 p-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <h3 className="text-sm font-semibold mb-3 text-white flex items-center gap-2">
        <CreditCard className="w-5 h-5" />
        Pay Now Options
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded-lg col-span-2 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#ff6900]" />
              <span className="text-sm font-medium text-[#ff6900]">Port-In</span>
            </div>
            <span className="text-sm font-bold text-[#ff6900]">
              {phone.payNow.port.price !== null ? `$${phone.payNow.port.price.toFixed(2)}` : 'N/A'}
            </span>
          </div>
          <p className="text-xs text-[#ff6900] mt-2 flex items-center gap-1">
            <Receipt className="w-3 h-3" />
            Plans: {phone.payNow.port.plans.length > 0 ? phone.payNow.port.plans.join(", ") : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#ff6900]" />
              <span className="text-sm font-medium text-[#ff6900]">Non-Port</span>
            </div>
            <span className="text-sm font-bold text-[#ff6900]">
              {phone.payNow.nonPort.price !== null ? `$${phone.payNow.nonPort.price.toFixed(2)}` : 'N/A'}
            </span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ff6900]" />
              <span className="text-sm font-medium text-[#ff6900]">Upgrade</span>
            </div>
            <span className="text-sm font-bold text-[#ff6900]">
              {phone.payNow.upgrade !== null ? `$${phone.payNow.upgrade.toFixed(2)}` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gradient-to-r from-yellow-300 to-[#ff6900] p-4 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Package className="w-5 h-5" />
          Pay Later Options
        </h3>
        <span className="text-xs font-medium text-white">
          <Shield className="w-4 h-4 inline mr-1" />
          ${phone.payLater.monthlyPrice.toFixed(2)}/month
        </span>
      </div>
      <div className="grid gap-2">
        {Object.entries(phone.payLater.plans).map(([plan, details]) => (
          <div key={plan} className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#ff6900]" />
                <span className="text-sm text-[#ff6900]">{plan} Plan</span>
              </div>
              <span className="text-sm font-medium text-[#ff6900]">
                ${(details.total + calculateTax(details.total, taxRate)).toFixed(2)}/mo total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PayNowBundle = ({ phone, taxRate }) => {
  // Set default plan based on available plans
  const defaultPlan = useMemo(() => {
    const availablePlans = phone.payNow.port.plans;
    if (availablePlans.includes("$50")) return "$50";
    return availablePlans[0] || "$60";
  }, [phone.payNow.port.plans]);

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const planPrice = PLANS[selectedPlan];
  const bundle = selectedBundle ? bundles[selectedBundle] : null;

  const portInBreakdown = calculatePayNowTotal(
    phone.payNow.port.price,
    planPrice,
    phone.payLater.boostProtect,
    bundle?.price || 0,
    taxRate
  );

  const nonPortBreakdown = calculatePayNowTotal(
    phone.payNow.nonPort.price,
    planPrice,
    phone.payLater.boostProtect,
    bundle?.price || 0,
    taxRate
  );

  return (
    <div className="space-y-3">
      <div className="mb-3 bg-white p-3 rounded-lg">
        <label className="text-[#ff6900] text-sm mb-1 block">Select Plan:</label>
        <select 
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="w-full p-2 rounded border text-[#ff6900]"
        >
          {phone.payNow.port.plans.map(plan => (
            <option key={plan} value={plan}>{plan} Plan</option>
          ))}
        </select>
      </div>

      <BundleSelector 
        selectedBundle={selectedBundle}
        onBundleSelect={setSelectedBundle}
      />

      <div className="bg-gradient-to-r from-[#ff6900] to-yellow-400 p-3 rounded-lg">
        {bundle && (
          <div className="bg-white p-2 rounded-lg mb-2">
            <div className="text-sm text-[#ff6900]">
              <div className="font-medium mb-1">Bundle Includes:</div>
              <ul className="list-disc pl-4 text-xs">
                {bundle.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="grid gap-2">
          <div className="bg-white p-2 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#ff6900]">Port-In Price Breakdown</span>
            </div>
            <DetailedPriceBreakdown breakdown={portInBreakdown} />
          </div>
          <div className="bg-white p-2 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#ff6900]">Non-Port Price Breakdown</span>
            </div>
            <DetailedPriceBreakdown breakdown={nonPortBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PayLaterBundle = ({ phone, taxRate }) => {
  // Set default plan to $50 if available, otherwise first available plan
  const defaultPlan = useMemo(() => {
    const availablePlans = Object.keys(phone.payLater.plans);
    if (availablePlans.includes("$50")) return "$50";
    return availablePlans[0] || "$60";
  }, [phone.payLater.plans]);

  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const bundle = selectedBundle ? bundles[selectedBundle] : null;
  const payLaterBreakdown = calculatePayLaterTotal(
    phone.payLater.monthlyPrice,
    phone.payLater.boostProtect,
    selectedPlan,
    taxRate
  );

  const dueToday = calculatePayLaterDueToday(
    phone.payLater.monthlyPrice,
    phone.srp,
    bundle?.price || 0,
    taxRate
  );

  return (
    <div className="space-y-3">
      <div className="mb-3 bg-white p-3 rounded-lg">
        <label className="text-[#ff6900] text-sm mb-1 block">Select Plan:</label>
        <select 
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="w-full p-2 rounded border text-[#ff6900]"
        >
          {Object.keys(phone.payLater.plans).map(plan => (
            <option key={plan} value={plan}>{plan} Plan</option>
          ))}
        </select>
      </div>

      <BundleSelector 
        selectedBundle={selectedBundle}
        onBundleSelect={setSelectedBundle}
      />

      <div className="bg-gradient-to-r from-yellow-300 to-[#ff6900] p-3 rounded-lg">
        {bundle && (
          <div className="bg-white p-2 rounded-lg mb-2">
            <div className="text-sm text-[#ff6900]">
              <div className="font-medium mb-1">Bundle Includes:</div>
              <ul className="list-disc pl-4 text-xs">
                {bundle.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="bg-white p-2 rounded-lg">
          <div className="text-sm text-[#ff6900] mb-2">Monthly Payment:</div>
          <div className="text-xs text-[#ff6900] space-y-1">
            <div className="flex justify-between">
              <span>Device:</span>
              <span>${payLaterBreakdown.deviceOnly.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Boost Protect:</span>
              <span>${payLaterBreakdown.boostProtect.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Plan ({selectedPlan}):</span>
              <span>${payLaterBreakdown.planPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${payLaterBreakdown.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Monthly:</span>
              <span>${payLaterBreakdown.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg mt-2">
          <div className="text-sm text-[#ff6900] mb-2">Due Today:</div>
          <div className="text-xs text-[#ff6900] space-y-1">
            <div className="flex justify-between">
              <span>Device Finance Payment:</span>
              <span>${dueToday.deviceFinancePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Device Setup Charge:</span>
              <span>${dueToday.setupCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (on device SRP):</span>
              <span>${dueToday.deviceTax.toFixed(2)}</span>
            </div>
            {bundle && (
              <>
                <div className="flex justify-between">
                  <span>Bundle Price:</span>
                  <span>${dueToday.bundlePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bundle Tax:</span>
                  <span>{dueToday.bundleTax.toFixed(2)}</span>
                </div>
              </>
            )}
            <div className="flex justify-between font-bold">
              <span>Total Due Today:</span>
              <span>${dueToday.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecificationsModal = ({ phone, onClose }) => {
  const specs = phone?.id ? phoneSpecifications[phone.id] : null;
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <Watermark />
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12">
                <PhoneSVG model={phone.id} className="w-full h-full" />
              </div>
              <h2 className="text-2xl font-bold text-[#ff6900]">{phone.name}</h2>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close specifications"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveSection('overview')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === 'overview'
                  ? 'bg-[#ff6900] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection('details')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === 'details'
                  ? 'bg-[#ff6900] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              Technical Details
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto">
        {specs ? (
          activeSection === 'overview' ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#ff6900]">
                    <path d="M2.25 3h19.5A1.75 1.75 0 0 1 23.5 4.75v14.5A1.75 1.75 0 0 1 21.75 21H2.25A1.75 1.75 0 0 1 .5 19.25V4.75A1.75 1.75 0 0 1 2.25 3Z"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2 flex items-center gap-2">
                  Display
                </h3>
                <p className="text-sm text-gray-700 relative z-10">{specs.display}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#ff6900]">
                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path d="M20 4h-3.17l-1.24-1.35A1.99 1.99 0 0 0 14.12 2H9.88c-.56 0-1.1.24-1.47.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2 flex items-center gap-2">
                  Camera
                </h3>
                <p className="text-sm text-gray-700 relative z-10">{specs.camera}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#ff6900]">
                    <path d="M17 4h-3V2h-4v2H7v18h10V4zm-6 16v-5.5H9L13 7v5.5h2L11 20z"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2 flex items-center gap-2">
                  Battery
                </h3>
                <p className="text-sm text-gray-700 relative z-10">{specs.battery}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#ff6900]">
                    <path d="M17 20H7V4h10m0-2H7c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h10c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2m-1 10h-3V5h-2v3H8v2h3v3h2v-3h3v-2z"/>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2 flex items-center gap-2">
                  Memory
                </h3>
                <p className="text-sm text-gray-700 relative z-10">{specs.memory}</p>
              </div>
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg relative overflow-hidden">
                <h3 className="text-sm font-semibold text-[#ff6900] mb-4">Key Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specs.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                        selectedFeature === index
                          ? 'border-[#ff6900] bg-[#ff6900] bg-opacity-5'
                          : 'border-gray-200 hover:border-[#ff6900] hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          selectedFeature === index ? 'bg-[#ff6900]' : 'bg-gray-400'
                        }`} />
                        <span className={`${
                          selectedFeature === index ? 'text-[#ff6900] font-medium' : 'text-gray-700'
                        }`}>
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2">Physical Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Dimensions</p>
                    <p className="text-sm text-gray-700">{specs.body}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Display</p>
                    <p className="text-sm text-gray-700">{specs.display}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2">Performance</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Processor</p>
                    <p className="text-sm text-gray-700">{specs.processor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Memory</p>
                    <p className="text-sm text-gray-700">{specs.memory}</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2">Camera System</h3>
                <p className="text-sm text-gray-700">{specs.camera}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <h3 className="text-sm font-semibold text-[#ff6900] mb-2">Power & Battery</h3>
                <p className="text-sm text-gray-700">{specs.battery}</p>
              </div>
            </div>
          )
        ) : (
          <p className="text-gray-600">
            Detailed specifications for {phone.name} are not available at this time.
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

const Modal = ({ phone, onClose, taxRate }) => {
  const [activeTab, setActiveTab] = useState('standard');
  
  if (!phone) return null;

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const tabs = [
    { id: 'standard', label: 'Standard Pricing' },
    { id: 'paynow', label: 'Pay Now + Bundle' },
    { id: 'paylater', label: 'Pay Later + Bundle' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-white rounded-lg p-3 max-w-md w-full my-2 max-h-[70vh] overflow-y-auto relative mx-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b pb-2 mb-3">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-[#ff6900]">
              {phone.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>SRP: ${phone.srp.toFixed(2)}</span>
              <span className="text-xs">•</span>
              <span>Boost Protect: ${phone.payLater.boostProtect.toFixed(2)}/mo</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex space-x-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#ff6900] text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === 'standard' && <StandardPricing phone={phone} taxRate={taxRate} />}
        {activeTab === 'paynow' && <PayNowBundle phone={phone} taxRate={taxRate} />}
        {activeTab === 'paylater' && <PayLaterBundle phone={phone} taxRate={taxRate} />}
      </div>
    </div>
  );
};

const App = () => {
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [showSpecs, setShowSpecs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedState, setSelectedState] = useState('OH');
  const [selectedPromotion, setSelectedPromotion] = useState('ALL');
  const { user, loading } = useAuth();

  // Promotion filter options
  const promotionTypes = {
    ALL: 'All Phones',
    SPECIAL: 'Special Offers',
    BOGO: 'BOGO Offers'
  };

  const categories = {
    IPHONE: 'iPhones',
    SAMSUNG: 'Samsung',
    MOTOROLA: 'Motorola',
    OTHER: 'Other Phones'
  };

  const filteredPhones = useMemo(() => {
    return phones.filter(phone => {
      const searchString = `${phone.name} ${phone.brand}`.toLowerCase();
      const matchesSearch = searchString.includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || phone.category === selectedCategory;
      
      const matchesPromotion = 
        selectedPromotion === 'ALL' ? true :
        selectedPromotion === 'SPECIAL' ? phone.promotion !== undefined :
        selectedPromotion === 'BOGO' ? phone.id === 'moto-edge-2023' :
        true;
      
      return matchesSearch && matchesCategory && matchesPromotion;
    });
  }, [searchTerm, selectedCategory, selectedPromotion]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-24 top-24 w-96 h-96 rounded-full bg-[#ff6900] opacity-[0.02] blur-3xl" />
        <div className="absolute -left-24 top-48 w-96 h-96 rounded-full bg-yellow-400 opacity-[0.02] blur-3xl" />
        <div className="absolute right-48 top-96 w-64 h-64 rounded-full bg-[#ff6900] opacity-[0.02] blur-2xl" />
        <div className="absolute -left-12 bottom-48 w-72 h-72 rounded-full bg-yellow-500 opacity-[0.02] blur-2xl" />
        <svg className="absolute right-0 top-1/3 w-96 h-96 text-[#ff6900] opacity-[0.02]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
        </svg>
        <svg className="absolute left-24 bottom-1/4 w-72 h-72 text-yellow-400 opacity-[0.02]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
        </svg>
      </div>
      <header className="bg-gradient-to-r from-[#ff6900] to-yellow-500 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <h1 className="text-3xl font-bold">RB FIRST CONNECT</h1>
            <span className="text-2xl font-light">|</span>
            <h2 className="text-2xl">Device Hotsheet</h2>
          </div>
          <div className="flex items-center gap-4 relative">
            <StateSelector
              selectedState={selectedState}
              onStateSelect={setSelectedState}
            />
            {!loading && user && <UserProfile />}
          </div>
        </div>
      </header>
      
      <main className="flex-grow p-6 relative">
        <Watermark />
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 space-y-4 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px] relative">
                <input
                  type="text"
                  placeholder="Search devices..."
                  className="w-full pl-10 pr-4 py-2 border rounded focus:ring-1 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search devices"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Phone categories">
                {Object.entries(promotionTypes).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPromotion(key)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedPromotion === key 
                      ? 'bg-[#ff6900] text-white shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <div className="w-full border-t my-2"></div>
                {Object.entries(categories).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      selectedCategory === key 
                      ? 'bg-[#ff6900] text-white shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                    aria-pressed={selectedCategory === key}
                    role="radio"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPhones.map((phone) => (
              <div 
                key={phone.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#ff6900] transform hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  setSelectedPhone(phone);
                  setShowSpecs(false);
                }}
              >
                <div className="bg-gradient-to-r from-[#ff6900] to-yellow-500 text-white p-2 text-center">
                  <h2 className="text-lg font-semibold">{phone.name}</h2>
                </div>
                <div className="p-4">
                  <div className="flex justify-center transform hover: scale-110 transition-transform duration-300">
                    <PhoneSVG 
                      model={phone.id}
                      className="w-48 h-48 p-2 drop-shadow-lg"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-center">
                      <PriceTag 
                        portPrice={phone.payNow.port.price}
                        monthlyPrice={phone.payLater.monthlyPrice}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhone(phone);
                        setShowSpecs(true);
                      }}
                      className="w-full bg-gradient-to-r from-[#ff6900] to-yellow-400 text-white py-2 px-4 rounded-lg hover:from-[#ff8533] hover:to-yellow-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <Info size={16} />
                      <span>Specifications</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-[#ff6900] to-yellow-500 text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <p className="text-lg font-bold mb-2">RB FIRST CONNECT</p>
          <p className="text-sm text-white">
            © {new Date().getFullYear()} RB FIRST CONNECT. All rights reserved.
          </p>
          <p className="text-sm text-white mt-2">
            Powered by PARTH
          </p>
        </div>
      </footer>

      {selectedPhone && !showSpecs && (
        <Modal 
          phone={selectedPhone} 
          onClose={() => setSelectedPhone(null)}
          taxRate={stateTaxRates[selectedState]}
        />
      )}

      {selectedPhone && showSpecs && (
        <SpecificationsModal
          phone={selectedPhone}
          onClose={() => {
            setShowSpecs(false);
            setSelectedPhone(null);
          }}
        />
      )}
    </div>
  );
};


export default App
