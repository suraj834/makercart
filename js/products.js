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
  },
  {
    id: "7",
    name: "MPU6050 6-Axis Motion Tracking Sensor Module",
    shortName: "MPU6050 Motion Sensor",
    category: "sensors",
    categoryLabel: "Electronics component",
    price: 149,
    tag: "TRACK MOTION",
    image: "images/mpu6050-sensor-1.jpeg",
    gallery: ["images/mpu6050-sensor-1.jpeg", "images/mpu6050-sensor-2.jpeg", "images/mpu6050-sensor-3.jpeg"],
    imageAlt: "MPU6050 GY-521 six-axis motion tracking sensor module",
    summary: "Measure movement and orientation for Arduino, robotics and drone projects.",
    description: "The GY-521 module combines a 3-axis gyroscope, 3-axis accelerometer and Digital Motion Processor (DMP) for motion-tracking projects. It is a practical module for Arduino builds, robotics, balancing systems and drone stabilization experiments.",
    stock: 85,
    specs: ["3-axis gyroscope and 3-axis accelerometer", "Built-in Digital Motion Processor (DMP)", "I2C serial communication interface", "VCC, GND, SCL, SDA, XDA, XCL, AD0 and INT pins"]
  }
];

// PDF catalogue items. Prices and stock quantities will be filled from the user's spreadsheet later.
const GENERATED_SENSOR_IMAGES = { ultrasonic: "images/ultrasonic-sensor-realistic.png", dht: "images/dht11-sensor-realistic.png", pir: "images/pir-motion-sensor-realistic.png", ldr: "images/ldr-sensor-realistic.png", soil: "images/soil-moisture-sensor-realistic.png", rain: "images/rain-drop-sensor-realistic.png", mq: "images/mq-gas-sensor-realistic.png", accelerometer: "images/accelerometer-sensor-realistic.png", rfid: "images/rfid-reader-realistic.png", pulse: "images/pulse-heart-sensor-realistic.png" };
const PDF_CATALOG_NAMES = ["Arduino UNO, Cable", "Arduino Nano", "Arduino Mega", "Raspberry Pi 3, Micro SD Card, USB Cable, HDMI VGA Cable, Case Shell", "Solderless 400 pin breadboard", "Solderless 800 pin breadboard", "Self Adhesive Proto Shield", "General Purpose Board (Small)", "General Purpose Board (Big)", "Female Berg Strip 40 pins", "Male Berg Strip 40 pins", "16x2 LCD display", "USB Cables A to B", "USB Cables Mini", "Battery HW 9V-12V Rechargeable", "Rechargeable Battery Charger", "Resistor Box", "Capacitor Box", "Linear Voltage Regulator: 7805", "Linear Voltage Regulator: 7812", "Linear Voltage Regulator: 7809", "Water Pump module", "Piezoelectric Plate", "8x8 LED Matrix Module", "Bluetooth Module HC-05", "7 Segment LED Display (4 digit)", "GSM Module", "GPS Module", "Laser Diode", "LDR Module", "16 Key Switch Keypad", "2-axis Joystick Module", "Active Buzzer Small", "Active Buzzer Big", "L293D Motor Driver IC", "Sound Playback Module", "12V 150 RPM Motor With Wheel", "Node MCU / Wemos D1", "WeMos D1 R2", "Vibrating Motor", "Alligator Connectors (12 inches)", "Battery Clips with DC Jack", "Hookup Wire Red 100 Mtr", "Hookup Wire Black 100 Mtr", "Jumper Cable Male-Male", "Jumper Cable Male-Female", "Jumper Cable Female-Female", "RGB LEDs", "LEDs Red", "LEDs Green", "LEDs Blue", "LEDs Yellow", "LEDs White", "555 Timer IC", "ATmega16A PU", "Diode & Transistor Kit", "Button Switch Set 100 Qty", "MPR121 Capacitive Touch Module", "Capacitive Touch Switch", "IR Obstacle Avoider Sensor", "Triple Axis Magnetometer", "Humidity Sensor", "Methane Natural Gas Sensor", "Alcohol Ethanol Sensor", "High Sensitivity CO Carbon Monoxide Sensor", "Smoke Detection Sensor", "Air Quality Sensor", "Methane Liquified Gas Sensor", "Liquified Petroleum Gas Sensor", "Hydrogen Gas Sensor", "IR Transmitter Receiver TSOP1738", "Ultrasonic Sensor", "Triple Axis Accelerometer", "PIR Motion Detector Module", "Pulse Rate Heart Sensor", "Relay Module 2-channel", "Relay Module 1-channel", "Big Sound Microphone Module", "Soil Moisture Sensor", "Capacitive Touch Sensor Module", "Metal Touch Sensor Module", "Rain Drop Sensor", "Flex Sensor", "Temperature Sensor", "DHT11", "Force Pressure Sensor", "Color Recognition Sensor", "Water Flow Sensor", "Sound Sensor", "IR Sensor Array for Line Following", "RFID Reader with Tags", "RF Modules Tx & Rx 315 MHz ASK", "Stepper Motor with Driver Board", "DC Motor 12V 150 RPM", "Position Servo Metal Gear", "Small Servo Metal Gear", "Continuous Metal Gear Servo 360", "Small Servo Plastic Gear", "150 RPM BO Motor", "L298P Motor Driver", "Servo Motor Tester", "Robotics DIY Kit 2/4 Wheel", "Drone Kit", "3D Printer Kit and Tools", "Filament for 3D Printer"];

window.MAKER_CART_PRODUCTS.push(...PDF_CATALOG_NAMES.map((name, index) => ({
  id: `pdf-${index + 1}`, name, shortName: name,
  category: /sensor|ultrasonic|accelerometer|magnetometer|humidity|therm|dht|ldr|gas|smoke|motion|moisture|touch|rain|flex|force|sound|flow|rfid|laser|color|pulse|ir /.test(name.toLowerCase()) ? "sensors" : /arduino|raspberry|node mcu|wemos|bluetooth|gsm|gps/.test(name.toLowerCase()) ? "boards" : /motor|robotics|drone|3d printer|filament|breadboard|proto|berg|jumper|wire|cable|battery|resistor|capacitor|led|buzzer|relay|switch|keypad|regulator|diode|transistor|555|lcd|display|charger|pump|piezo|alligator|servo|driver|joystick/.test(name.toLowerCase()) ? "kits" : "components",
  categoryLabel: "Electronic component", price: 0, priceOnRequest: true, stock: "Available", tag: "PRICE ON REQUEST",
  image: (() => { const n = name.toLowerCase(); if (n.includes("ultrasonic")) return GENERATED_SENSOR_IMAGES.ultrasonic; if (n.includes("dht")) return GENERATED_SENSOR_IMAGES.dht; if (n.includes("pir")) return GENERATED_SENSOR_IMAGES.pir; if (n.includes("ldr")) return GENERATED_SENSOR_IMAGES.ldr; if (n.includes("soil")) return GENERATED_SENSOR_IMAGES.soil; if (n.includes("rain")) return GENERATED_SENSOR_IMAGES.rain; if (n.includes("gas") || n.includes("smoke") || n.includes("alcohol") || n.includes("air quality")) return GENERATED_SENSOR_IMAGES.mq; if (n.includes("accelerometer")) return GENERATED_SENSOR_IMAGES.accelerometer; if (n.includes("rfid")) return GENERATED_SENSOR_IMAGES.rfid; if (n.includes("pulse")) return GENERATED_SENSOR_IMAGES.pulse; return n.includes("sensor") ? "images/sensor-ultrasonic.svg" : n.includes("motor") ? "images/kit-breadboard.svg" : "images/board-uno.svg"; })(),
  imageAlt: `${name} electronic component`, summary: `${name} for electronics, Arduino, robotics and maker projects.`,
  description: `${name} is available for project development, learning and prototyping. Contact MakerCart for current price, stock and compatibility details.`,
  specs: ["Price on request", "Stock: Available", "Suitable for maker and prototype projects", "Confirm exact variant before ordering"]
})));
