/*
 * MakerCart starter catalogue.
 * Replace these sample products, descriptions, prices and image paths with your real catalogue.
 * Categories: boards, sensors, kits.
 */
window.MAKER_CART_PRODUCTS = [
  {
    id: "1",
    name: "Arduino Uno R3 Compatible Board",
    shortName: "Uno R3 Compatible Board",
    category: "boards",
    categoryLabel: "Development board",
    price: 699,
    tag: "A GOOD FIRST BOARD",
    image: "images/board-uno.svg",
    imageAlt: "Illustrated blue Uno R3 compatible microcontroller development board",
    summary: "A friendly starting point for learning electronics and bringing sensor-based projects to life.",
    description: "A versatile Uno-format microcontroller board for classroom builds, prototypes and weekend experiments. The familiar layout makes it easy to follow along with beginner tutorials and connect common modules.",
    specs: ["ATmega328P-compatible board layout", "14 digital I/O pins and 6 analog inputs", "USB connection for programming", "Works with common Uno-format shields"]
  },
  {
    id: "2",
    name: "ESP32 Wi-Fi + Bluetooth Dev Board",
    shortName: "ESP32 Dev Board",
    category: "boards",
    categoryLabel: "Development board",
    price: 499,
    tag: "CONNECT YOUR PROJECT",
    image: "images/board-esp32.svg",
    imageAlt: "Illustrated compact ESP32 Wi-Fi and Bluetooth development board",
    summary: "A compact board for connected builds, sensor dashboards and wireless prototypes.",
    description: "Bring wireless features to your ideas with a compact ESP32 development board. It is a popular choice for IoT experiments, connected sensors and learning how devices communicate.",
    specs: ["ESP32 family microcontroller", "Wi-Fi and Bluetooth connectivity", "USB programming connection", "Check pinout and voltage before connecting modules"]
  },
  {
    id: "3",
    name: "HC-SR04 Ultrasonic Distance Sensor",
    shortName: "Ultrasonic Distance Sensor",
    category: "sensors",
    categoryLabel: "Sensor",
    price: 99,
    tag: "MEASURE THE WORLD",
    image: "images/sensor-ultrasonic.svg",
    imageAlt: "Illustrated ultrasonic distance sensor module with two round transducers",
    summary: "Explore distance measurement for obstacle alerts, robotics and interactive projects.",
    description: "This ultrasonic module estimates distance by sending a sound pulse and reading its echo. It is a useful, hands-on sensor for learning about timing, measurement and simple robotics.",
    specs: ["Four-pin trigger and echo interface", "Commonly used for short-range distance experiments", "Pairs with many 5 V microcontroller boards", "Use a level shifter with 3.3 V-only input pins"]
  },
  {
    id: "4",
    name: "DHT22 Temperature + Humidity Sensor",
    shortName: "DHT22 Sensor Module",
    category: "sensors",
    categoryLabel: "Sensor",
    price: 249,
    tag: "SENSE YOUR SPACE",
    image: "images/sensor-dht22.svg",
    imageAlt: "Illustrated white DHT22 temperature and humidity sensor module",
    summary: "Add temperature and humidity readings to a room monitor or environment project.",
    description: "Read temperature and relative humidity with a compact digital sensor. Use it to learn about environmental monitoring and build a simple display or data-logging project.",
    specs: ["Digital temperature and humidity output", "Three-pin module layout", "Suitable for periodic readings", "Confirm library and voltage compatibility with your board"]
  },
  {
    id: "5",
    name: "37-in-1 Sensor Module Starter Kit",
    shortName: "37-in-1 Sensor Starter Kit",
    category: "kits",
    categoryLabel: "Starter kit",
    price: 849,
    tag: "A WHOLE LOT TO TRY",
    image: "images/kit-sensors.svg",
    imageAlt: "Illustrated starter set of small sensors and electronic modules",
    summary: "A varied collection of modules for trying new inputs and building small experiments.",
    description: "Try a range of common sensor and input modules in one starter collection. It is a handy way to explore different signals and discover which ideas you want to develop further.",
    specs: ["Assorted sensor and input modules", "Useful for guided learning and experiments", "Module selection can vary by batch", "Ask us for the exact in-box list before ordering"]
  },
  {
    id: "6",
    name: "Breadboard + Jumper Wire Set",
    shortName: "Breadboard + Jumper Set",
    category: "kits",
    categoryLabel: "Project essential",
    price: 349,
    tag: "PROTOTYPE WITHOUT SOLDERING",
    image: "images/kit-breadboard.svg",
    imageAlt: "Illustrated white solderless breadboard with colourful jumper wires",
    summary: "Connect components and test a circuit before committing to a permanent build.",
    description: "A reusable solderless breadboard and jumper wires make it easier to test circuit ideas and rearrange parts as you learn. A useful companion for development boards and sensor modules.",
    specs: ["Solderless prototype breadboard", "Assorted jumper wires", "For low-voltage learning and prototype circuits", "Check current and voltage limits for your components"]
  }
];
