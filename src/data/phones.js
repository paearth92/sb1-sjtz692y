export const phones = [
  // iPhones
  {
    id: "iphone11-64",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 11 64GB",
    srp: 499.99,
    payNow: {
      port: { price: 0, plans: ["$60"] },
      nonPort: { price: 49.99, plans: ["$60"] },
      upgrade: 49.99
    },
    payLater: {
      monthlyPrice: 13.89,
      plans: {
        "$25": { total: 38.89 },
        "$50": { total: 63.89 },
        "$60": { total: 73.89 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone12-64",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 12 64GB",
    srp: 549.99,
    payNow: {
      port: { price: 0, plans: ["$60"] },
      nonPort: { price: 49.99, plans: ["$60"] },
      upgrade: 49.99
    },
    payLater: {
      monthlyPrice: 15.28,
      plans: {
        "$25": { total: 40.28 },
        "$50": { total: 65.28 },
        "$60": { total: 75.28 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone13-128",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 13 128GB",
    promotion: {
      text: "FREE after bill credits",
      validFrom: "2024-02-18",
      validTo: "2024-04-21"
    },
    srp: 629.99,
    payNow: {
      port: { price: 49.99, plans: ["$60"] },
      nonPort: { price: 149.99, plans: ["$60"] },
      upgrade: 149.99
    },
    payLater: {
      monthlyPrice: 17.50,
      plans: {
        "$25": { total: 42.50 },
        "$50": { total: 67.50 },
        "$60": { total: 77.50 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone15-128",
    brand: "Apple", 
    category: "IPHONE",
    name: "iPhone 15 128GB",
    srp: 729.99,
    payNow: {
      port: { price: 149.99, plans: ["$60"], price2: 349.99, plans2: ["4/$100"] },
      nonPort: { price: 249.99, plans: ["$60"], price2: 449.99, plans2: ["4/$100"] },
      upgrade: 249.99
    },
    payLater: {
      monthlyPrice: 20.28,
      plans: {
        "$25": { total: 45.28 },
        "$50": { total: 70.28 },
        "$60": { total: 80.28 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone15-256",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 15 256GB",
    srp: 829.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: null, plans: [] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 23.06,
      plans: {
        "$25": { total: 48.06 },
        "$50": { total: 73.06 },
        "$60": { total: 83.06 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone15-512",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 15 512GB",
    srp: 1029.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: null, plans: [] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 28.61,
      plans: {
        "$25": { total: 53.61 },
        "$50": { total: 78.61 },
        "$60": { total: 88.61 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone15-plus-256",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 15 Plus 256GB",
    srp: 929.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: null, plans: [] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 25.83,
      plans: {
        "$25": { total: 50.83 },
        "$50": { total: 75.83 },
        "$60": { total: 85.83 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone15-pro-256",
    brand: "Apple",
    category: "IPHONE", 
    name: "iPhone 15 Pro 256GB",
    srp: 1099.99,
    payNow: {
      port: { price: 619.99, plans: ["$60"] },
      nonPort: { price: 719.99, plans: ["$60"] },
      upgrade: 719.99
    },
    payLater: {
      monthlyPrice: 30.56,
      plans: {
        "$25": { total: 55.56 },
        "$50": { total: 80.56 },
        "$60": { total: 90.56 }
      },
      boostProtect: 15.00
    }
  },
  {
    id: "iphone16-128",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 16 128GB",
    promotion: {
      text: "*$429 after $200 in bill credits",
      validFrom: "2024-03-04",
      validTo: "2024-04-21"
    },
    srp: 829.99,
    payNow: {
      port: { price: 449.99, plans: ["$60"] },
      nonPort: { price: 629.99, plans: ["$60"] },
      upgrade: 629.99
    },
    payLater: {
      monthlyPrice: 23.06,
      plans: {
        "$25": { total: 48.06 },
        "$50": { total: 73.06 },
        "$60": { total: 83.06 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "iphone16-pro-max-256",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 16 Pro Max 256GB",
    srp: 1199.99,
    payNow: {
      port: { price: 999.99, plans: ["$60"] },
      nonPort: { price: 999.99, plans: ["$60"] },
      upgrade: 999.99
    },
    payLater: {
      monthlyPrice: 33.33,
      plans: {
        "$25": { total: 58.33 },
        "$50": { total: 83.33 },
        "$60": { total: 93.33 }
      },
      boostProtect: 15.00
    }
  },
  {
    id: "iphone15-pro-max-512",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 15 Pro Max 512GB",
    srp: 1399.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: null, plans: [] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 38.89,
      plans: {
        "$25": { total: 63.89 },
        "$50": { total: 88.89 },
        "$60": { total: 98.89 }
      },
      boostProtect: 15.00
    }
  },
  {
    id: "iphone16e-128",
    brand: "Apple",
    category: "IPHONE",
    name: "iPhone 16e 128GB",
    srp: 599.99,
    payNow: {
      port: { price: 199.99, plans: ["$60"] },
      nonPort: { price: 299.99, plans: ["$60"] },
      upgrade: 299.99
    },
    payLater: {
      monthlyPrice: 16.67,
      plans: {
        "$25": { total: 41.67 },
        "$50": { total: 66.67 },
        "$60": { total: 76.67 }
      },
      boostProtect: 12.00
    }
  },

  // Samsung phones
  {
    id: "samsung-a36",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A36",
    srp: 399.99,
    payNow: {
      port: { price: 69.99, plans: ["$60"] },
      nonPort: { price: 149.99, plans: ["$40", "$50", "$60"] },
      upgrade: 149.99
    },
    payLater: {
      monthlyPrice: 11.11,
      plans: {
        "$25": { total: 36.11 },
        "$50": { total: 61.11 },
        "$60": { total: 71.11 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a03s",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Galaxy A03s",
    srp: 119.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 15.00, plans: ["$40", "$50", "$60"] },
      upgrade: 59.99
    },
    payLater: {
      monthlyPrice: 3.33,
      plans: {
        "$25": { total: 28.33 },
        "$50": { total: 53.33 },
        "$60": { total: 63.33 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a15-64",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A15 5G 64GB",
    promotion: {
      text: "*Non CIP $25 on $50, $60 plans",
      validFrom: "2024-02-18",
      validTo: "2024-04-21"
    },
    srp: 169.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 0, plans: ["$40", "$50", "$60"] },
      upgrade: 15.00
    },
    payLater: {
      monthlyPrice: 4.72,
      plans: {
        "$25": { total: 29.72 },
        "$50": { total: 54.72 },
        "$60": { total: 64.72 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a15-128",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A15 5G 128GB",
    srp: 199.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 15.00, plans: ["$40", "$50", "$60"] },
      upgrade: 15.00
    },
    payLater: {
      monthlyPrice: 5.56,
      plans: {
        "$25": { total: 30.56 },
        "$50": { total: 55.56 },
        "$60": { total: 65.56 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a16",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A16",
    srp: 199.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 25.00, plans: ["$40", "$50", "$60"] },
      upgrade: 25.00
    },
    payLater: {
      monthlyPrice: 5.56,
      plans: {
        "$25": { total: 30.56 },
        "$50": { total: 55.56 },
        "$60": { total: 65.56 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a25",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A25",
    srp: 299.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 79.99, plans: ["$40", "$50", "$60"] },
      upgrade: 79.99
    },
    payLater: {
      monthlyPrice: 8.33,
      plans: {
        "$25": { total: 33.33 },
        "$50": { total: 58.33 },
        "$60": { total: 68.33 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-a35",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung A35",
    srp: 399.99,
    payNow: {
      port: { price: 49.99, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 149.99, plans: ["$40", "$50", "$60"] },
      upgrade: 149.99
    },
    payLater: {
      monthlyPrice: 11.11,
      plans: {
        "$25": { total: 36.11 },
        "$50": { total: 61.11 },
        "$60": { total: 71.11 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "samsung-s23",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Galaxy S23",
    srp: 799.99,
    payNow: {
      port: { price: 349.99, plans: ["$60"] },
      nonPort: { price: 799.99, plans: ["$60"] },
      upgrade: 799.99
    },
    payLater: {
      monthlyPrice: 22.22,
      plans: {
        "$25": { total: 47.22 },
        "$50": { total: 72.22 },
        "$60": { total: 82.22 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "samsung-s24-256",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung Galaxy S24 256GB",
    srp: 859.99,
    payNow: {
      port: { price: 449.99, plans: ["$60"] },
      nonPort: { price: 859.99, plans: ["$60"] },
      upgrade: 859.99
    },
    payLater: {
      monthlyPrice: 23.89,
      plans: {
        "$25": { total: 48.89 },
        "$50": { total: 73.89 },
        "$60": { total: 83.89 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "samsung-s24-ultra-256",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Samsung Galaxy S24 Ultra 256GB",
    srp: 1299.99,
    payNow: {
      port: { price: 699.99, plans: ["$60"] },
      nonPort: { price: 999.99, plans: ["$60"] },
      upgrade: 999.99
    },
    payLater: {
      monthlyPrice: 36.11,
      plans: {
        "$25": { total: 61.11 },
        "$50": { total: 86.11 },
        "$60": { total: 96.11 }
      },
      boostProtect: 15.00
    }
  },
  {
    id: "samsung-s24-plus-256",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Galaxy S24+ 256GB",
    srp: 999.99,
    payNow: {
      port: { price: 399.99, plans: ["$60"], price2: 999.99, plans2: ["4/$100"] },
      nonPort: { price: 399.99, plans: ["$60"] },
      upgrade: 399.99
    },
    payLater: {
      monthlyPrice: 27.78,
      plans: {
        "$25": { total: 52.78 },
        "$50": { total: 77.78 },
        "$60": { total: 87.78 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "samsung-s25",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Galaxy S25 128GB",
    srp: 799.99,
    payNow: {
      port: { price: 299.99, plans: ["$60"] },
      nonPort: { price: 399.99, plans: ["$60"] },
      upgrade: 399.99
    },
    payLater: {
      monthlyPrice: 22.22,
      plans: {
        "$25": { total: 47.22 },
        "$50": { total: 72.22 },
        "$60": { total: 82.22 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "samsung-s25-plus",
    brand: "Samsung", 
    category: "SAMSUNG",
    name: "Galaxy S25+ 256GB",
    srp: 999.99,
    payNow: {
      port: { price: 499.99, plans: ["$60"] },
      nonPort: { price: 599.99, plans: ["$60"] },
      upgrade: 599.99
    },
    payLater: {
      monthlyPrice: 27.78,
      plans: {
        "$25": { total: 52.78 },
        "$50": { total: 77.78 },
        "$60": { total: 87.78 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "samsung-s25-ultra",
    brand: "Samsung",
    category: "SAMSUNG", 
    name: "Galaxy S25 Ultra 256GB",
    srp: 1299.99,
    payNow: {
      port: { price: 599.99, plans: ["$60"] },
      nonPort: { price: 799.99, plans: ["$60"] },
      upgrade: 799.99
    },
    payLater: {
      monthlyPrice: 36.11,
      plans: {
        "$25": { total: 61.11 },
        "$50": { total: 86.11 },
        "$60": { total: 96.11 }
      },
      boostProtect: 15.00
    }
  },
  {
    id: "samsung-z-flip-6",
    brand: "Samsung",
    category: "SAMSUNG",
    name: "Galaxy Z Flip 6 256GB",
    srp: 1099.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: null, plans: [] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 30.56,
      plans: {
        "$25": { total: 55.56 },
        "$50": { total: 80.56 },
        "$60": { total: 90.56 }
      },
      boostProtect: 15.00
    }
  },

  // Motorola phones
  {
    id: "moto-edge-2023",
    brand: "Motorola",
    category: "MOTOROLA",
    name: "Motorola Edge 2023",
    srp: 359.99,
    payNow: {
      port: { price: 49.99, plans: ["$60"] },
      nonPort: { price: 79.99, plans: ["$60"] },
      upgrade: 79.99
    },
    payLater: {
      monthlyPrice: 10.00,
      plans: {
        "$25": { total: 35.00 },
        "$50": { total: 60.00 },
        "$60": { total: 70.00 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "moto-edge-plus-2023",
    brand: "Motorola",
    category: "MOTOROLA",
    name: "Motorola Edge+ 2023",
    srp: 599.99,
    payNow: {
      port: { price: 269.99, plans: ["$50", "$60"] },
      nonPort: { price: 269.99, plans: ["$50", "$60"] },
      upgrade: 269.99
    },
    payLater: {
      monthlyPrice: 16.67,
      plans: {
        "$25": { total: 41.67 },
        "$50": { total: 66.67 },
        "$60": { total: 76.67 }
      },
      boostProtect: 12.00
    }
  },
  {
    id: "moto-g-stylus-5g-2024",
    brand: "Motorola",
    category: "MOTOROLA",
    name: "Moto G Stylus 5G 2024",
    srp: 269.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 49.99, plans: ["$40", "$50", "$60"] },
      upgrade: 25.00
    },
    payLater: {
      monthlyPrice: 7.50,
      plans: {
        "$25": { total: 32.50 },
        "$50": { total: 57.50 },
        "$60": { total: 67.50 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "moto-g-5g-2024",
    brand: "Motorola",
    category: "MOTOROLA",
    name: "Moto G 5G 2024",
    srp: 149.99,
    payNow: {
      port: { price: 0, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 0.99, plans: ["$40", "$50", "$60"] },
      upgrade: 0.99
    },
    payLater: {
      monthlyPrice: 5.00,
      plans: {
        "$25": { total: 30.00 },
        "$50": { total: 55.00 },
        "$60": { total: 65.00 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "moto-razr-2024",
    brand: "Motorola",
    category: "MOTOROLA",
    name: "Motorola Razr 2024",
    srp: 599.99,
    payNow: {
      port: { price: 49.99, plans: ["$60"] },
      nonPort: { price: 149.99, plans: ["$60"] },
      upgrade: 199.99
    },
    payLater: {
      monthlyPrice: 16.67,
      plans: {
        "$25": { total: 41.67 },
        "$50": { total: 66.67 },
        "$60": { total: 76.67 }
      },
      boostProtect: 12.00
    }
  },

  // Other phones
  {
    id: "celero-5g-2024",
    brand: "Celero",
    category: "OTHER",
    name: "Celero 5G 2024",
    srp: 159.99,
    payNow: {
      port: { price: 0, plans: ["$60"] },
      nonPort: { price: 29.99, plans: ["$60"], price2: 39.99, plans2: ["4/$100"] },
      upgrade: 29.99
    },
    payLater: {
      monthlyPrice: 4.44,
      plans: {
        "$25": { total: 29.44 },
        "$50": { total: 54.44 },
        "$60": { total: 64.44 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "celero-5g-plus-2024",
    brand: "Celero",
    category: "OTHER",
    name: "Celero 5G+ 2024",
    srp: 239.99,
    payNow: {
      port: { price: 49.99, plans: ["$40", "$50", "$60"] },
      nonPort: { price: 99.99, plans: ["$40", "$50", "$60"] },
      upgrade: 99.99
    },
    payLater: {
      monthlyPrice: 6.67,
      plans: {
        "$25": { total: 31.67 },
        "$50": { total: 56.67 },
        "$60": { total: 66.67 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "celero-5g-sc",
    brand: "Celero",
    category: "OTHER",
    name: "Celero 5G SC",
    srp: 109.99,
    payNow: {
      port: { price: 0, plans: ["$60"] },
      nonPort: { price: 19.99, plans: ["$60"] },
      upgrade: 19.99
    },
    payLater: {
      monthlyPrice: 3.06,
      plans: {
        "$25": { total: 28.06 },
        "$50": { total: 53.06 },
        "$60": { total: 63.06 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "summit-5g",
    brand: "Summit",
    category: "OTHER",
    name: "Summit 5G",
    srp: 94.99,
    payNow: {
      port: { price: 0, plans: ["$60"] },
      nonPort: { price: 10.00, plans: ["$60"], price2: 19.99, plans2: ["4/$100"] },
      upgrade: 19.99
    },
    payLater: {
      monthlyPrice: 2.64,
      plans: {
        "$25": { total: 27.64 },
        "$50": { total: 52.64 },
        "$60": { total: 62.64 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "summit-flip",
    brand: "Summit",
    category: "OTHER",
    name: "Summit Flip",
    srp: 59.99,
    payNow: {
      port: { price: 29.99, plans: ["$60"] },
      nonPort: { price: 29.99, plans: ["$60"] },
      upgrade: 29.99
    },
    payLater: {
      monthlyPrice: 1.67,
      plans: {
        "$25": { total: 26.67 },
        "$50": { total: 51.67 },
        "$60": { total: 61.67 }
      },
      boostProtect: 8.00
    }
  },
  {
    id: "tcl-tab-lite",
    brand: "TCL",
    category: "OTHER",
    name: "TCL Tab Lite (MBB)",
    srp: 119.99,
    payNow: {
      port: { price: null, plans: [] },
      nonPort: { price: 0, plans: ["$60"] },
      upgrade: null
    },
    payLater: {
      monthlyPrice: 3.33,
      plans: {
        "$25": { total: 28.33 },
        "$50": { total: 53.33 },
        "$60": { total: 63.33 }
      },
      boostProtect: 8.00
    }
  }
];