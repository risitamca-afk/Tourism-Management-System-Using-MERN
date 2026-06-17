import cardimg2 from "../assets/Offers-pic/bank.jpeg";
import cardimg3 from "../assets/Offers-pic/Instantvouchersave.jpg";
import cardimg4 from "../assets/Offers-pic/flight.jpg";
import cardimg5 from "../assets/Offers-pic/American-Airlines.jpg";
import cardimg6 from "../assets/Offers-pic/h1.jpg";
import cardimg7 from "../assets/Offers-pic/h2.jpg";
import cardimg8 from "../assets/Offers-pic/images.jpeg";
import cardimg9 from "../assets/Offers-pic/images (1).jpeg";
import cardimg10 from "../assets/Offers-pic/train.jpeg";
import cardimg11 from "../assets/Offers-pic/train2.jpg";
import cardimg12 from "../assets/Offers-pic/cab1.jpg";
import cardimg13 from "../assets/Offers-pic/cab2.jpeg";
import cardimg14 from "../assets/Offers-pic/bus1.jpg";
import cardimg15 from "../assets/Offers-pic/bus2.jpg";

// Sample data for the offers card
export const offersDataset = [
  {
    category: "YES BANK",
    title: "Grab Up to 40% OFF",
    description: "YES Bank Credit Card - No cost EMI",
    imgSrc: cardimg2,
    tags: ["Bank Offers"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% instant discount on select categories.",
          "No cost EMI on purchases above ₹3,000 using YES Bank Credit Cards.",
          "Exclusive partner brand discounts for YES Bank cardholders.",
          "Access to flash deals every Friday through YES Bank's shopping portal.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Select your desired product from the eligible categories.",
          "Choose YES Bank Credit Card as your payment option at checkout.",
          "If eligible, the No Cost EMI option will appear automatically.",
          "Complete the payment using your YES Bank Credit Card to avail the offer.",
          "You may receive a confirmation email with redemption details post-purchase.",
        ],
      },
      {
        head: "Additional Perks",
        passage: [
          "Complimentary access to lifestyle apps for 3 months.",
          "Earn reward points on EMI transactions as well.",
          "Extended warranty on select electronics purchased under the offer.",
          "Priority customer service for EMI-related queries.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "If the order is cancelled, the EMI will be automatically reversed within 7–10 business days.",
          "Discounts availed will not be refunded if the product is returned.",
          "Partial cancellations may impact the eligibility of the discount.",
          "Bank processing charges (if any) will be non-refundable.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid only on select merchants and product categories.",
          "YES Bank reserves the right to withdraw or modify the offer without prior notice.",
          "The offer cannot be clubbed with other ongoing promotions.",
          "Customer must ensure the card is active and in good standing at the time of transaction.",
          "Offer valid once per card per merchant per month unless otherwise specified.",
        ],
      },
    ],
  },
  {
    category: "AXIS BANK",
    title: "Grab FLAT 12% OFF* on Domestic Flights.",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg3,
    tags: ["Bank Offers"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Flat or percentage-based discount on eligible bookings.",
          "Offer applicable only on select platforms or apps.",
          "Multiple payment options supported including EMI for credit cards.",
          "Instant savings reflected at checkout when criteria are met.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Visit the respective booking platform or app.",
          "Select eligible product/service (flight, hotel, cab, etc.).",
          "Enter promo code if required at checkout.",
          "Choose applicable bank/card during payment to activate the offer.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "In case of full cancellation, only the net paid amount is refunded.",
          "Discount value is non-refundable in case of cancellations.",
          "EMI processing fees may not be refunded by the bank.",
          "Cancellation policies of individual service providers apply.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid for a limited time and may vary by location.",
          "Only applicable on minimum booking value as specified.",
          "Cannot be combined with any other promotional offer.",
          "The service provider reserves the right to withdraw the offer anytime.",
        ],
      },
    ],
  },
  {
    category: "AIR INDIA",
    title: "Grab Up to 40% OFF* on Your Trips!",
    description: "on Flights, Stays, Packages, Buses, Cabs & Trains.",
    imgSrc: cardimg4,
    tags: ["Flights"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% discount on select flights, hotels, and travel packages.",
          "Offers available across multiple categories including trains and buses.",
          "Special rates exclusive to Air India partner platforms.",
          "Earn additional reward points on select bookings.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Log in to the official Air India website or partner platform.",
          "Select your desired travel service (flight, hotel, etc.).",
          "Apply the promo code at checkout if required.",
          "Ensure payment is made using an eligible payment method.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Offer amount will not be refunded upon cancellation.",
          "Standard Air India and partner cancellation charges apply.",
          "Partial cancellations may void the offer.",
          "Refunds processed will exclude the discount value.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid for a limited time and subject to availability.",
          "Blackout dates may apply on select routes and services.",
          "Cannot be combined with other offers or corporate fares.",
          "Air India reserves the right to modify or withdraw the offer at any time.",
        ],
      },
    ],
  },
  {
    category: "INTL FLIGHTS",
    title: "LIVE NOW: Unmissable Deals for your Int'l Trips",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg5,
    tags: ["Flights"],
  },
  {
    category: "DOM HOTELS",
    title: "Grab Up to 90% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg6,
    tags: ["Hotels"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 90% discount on select hotel bookings across India.",
          "Offers valid during the August long weekend only.",
          "Choose from a wide range of 3-star to 5-star properties.",
          "Includes complimentary breakfast on select stays.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Log in to the booking platform offering the discount.",
          "Search and select hotels available for your travel dates.",
          "Promo code may be auto-applied or entered manually.",
          "Pay using eligible bank cards or digital wallets to activate the offer.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Refundable bookings will exclude the discount amount in refunds.",
          "Non-refundable hotels will not return any amount post-cancellation.",
          "Booking modifications may result in loss of offer benefits.",
          "Standard hotel and platform cancellation rules apply.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Valid only on domestic hotels booked during the promotional window.",
          "Limited rooms available under the offer—first come, first served.",
          "Not applicable on pay-at-hotel or offline bookings.",
          "The platform or hotel partner reserves the right to withdraw or change the offer without notice.",
        ],
      },
    ],
  },
  {
    category: "HOTEL GRAND",
    title: "LIVE NOW: Unmissable Deals for your Int'l Trips",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg7,
    tags: ["Hotels"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Exclusive discounted rates on luxury international hotels.",
          "Access to premium rooms and early check-in/late checkout perks.",
          "Complimentary Wi-Fi, breakfast, or spa vouchers on select bookings.",
          "Up to 20% cashback on using eligible credit cards.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Visit the hotel’s official site or supported travel partners.",
          "Select your destination and travel dates.",
          "Apply the relevant promo code or select the deal banner.",
          "Pay with a qualifying credit card to complete the booking.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Refunds subject to hotel cancellation policies.",
          "Discounts or perks are not refundable upon cancellation.",
          "Booking changes may invalidate the offer.",
          "Processing fees may apply for cancellations within 24 hours of check-in.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid on select international properties only.",
          "Credit card offers subject to bank approval and terms.",
          "Cannot be combined with other promotional rates or coupons.",
          "Offer period and room availability may vary by destination.",
        ],
      },
    ],
  },
  {
    category: "SEA OFFERS",
    title: "Grab Up to 40% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg8,
    tags: ["Holidays"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% discount on sea-facing and coastal hotels across India.",
          "Handpicked properties near popular beaches and holiday spots.",
          "Additional perks like welcome drinks or early check-in on select stays.",
          "Special weekend packages for couples and families.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Search for properties under the 'SEA OFFERS' tag on the booking platform.",
          "Select eligible dates and rooms marked with discounted pricing.",
          "Apply any listed promo codes if needed.",
          "Complete payment using eligible methods to confirm the discount.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Discounted bookings may be non-refundable depending on the hotel.",
          "Refunds (if any) will not include the value of the offer.",
          "Booking amendments might lead to price revision or loss of benefits.",
          "Standard platform and property cancellation policies apply.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid only on selected hotels near sea or coastal locations.",
          "Limited availability first come, first served basis.",
          "Cannot be used with other promo codes or loyalty credits.",
          "Organizer reserves the right to change or withdraw the offer anytime.",
        ],
      },
    ],
  },
  {
    category: "MOUNTAIN OFFERS",
    title: "LIVE NOW: Unmissable Deals for your Int'l Trips",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg9,
    tags: ["Holidays"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Special discounts on mountain getaways and hill station stays.",
          "Offers include premium cottages, resorts, and eco-lodges.",
          "Up to 35% off on select bookings during off-peak dates.",
          "Enjoy scenic views and complimentary meals on selected packages.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Visit the holiday deals section and select the 'Mountain Offers' tab.",
          "Choose your preferred destination and hotel.",
          "Use the promo code displayed during checkout or auto-applied for eligible bookings.",
          "Make payment using eligible credit cards to confirm the offer.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Standard cancellation charges apply based on hotel policies.",
          "Discounted portion of the booking is non-refundable.",
          "Rescheduling may not guarantee the same offer.",
          "Some bookings may be fully non-cancellable or non-amendable.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Applicable only on mountain and hill station properties.",
          "Valid only for bookings made during the promotional period.",
          "Not valid for group bookings or corporate rates.",
          "The offer is subject to change or early closure without prior notice.",
        ],
      },
    ],
  },

  {
    category: "VANDE BHARAT",
    title: "Grab Up to 40% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg10,
    tags: ["Trains"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% discount on hotel bookings near major train stations.",
          "Exclusive offers on select properties with proximity to Vande Bharat routes.",
          "Special weekend getaway packages for train travelers.",
          "Additional benefits like free cancellation and flexible check-in times.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Search for hotels near Vande Bharat train stations during the offer period.",
          "Select your desired stay and proceed to checkout.",
          "Use the promo code provided or have it automatically applied.",
          "Pay via eligible credit cards to avail the discount.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Refundable bookings are subject to cancellation policies of the hotel.",
          "Non-refundable rooms will not offer a refund on the discounted rate.",
          "Bookings cannot be amended without loss of offer value.",
          "Late cancellations may incur additional penalties.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid only on properties near Vande Bharat train routes.",
          "Only applicable for bookings made during the promotional period.",
          "Cannot be combined with other discounts or loyalty rewards.",
          "Subject to availability, blackout dates may apply.",
        ],
      },
    ],
  },
  {
    category: "SATABDHI",
    title: "LIVE NOW: Unmissable Deals for your Int'l Trips",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg11,
    tags: ["Trains"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Exclusive discounts on train travel across India, including Satabdi trains.",
          "Up to 25% off on bookings for premium seats in select trains.",
          "Special family packages with free meal upgrades.",
          "Priority boarding and reserved seats on select Satabdi trains.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Visit the official railway booking website or partner apps.",
          "Choose your Satabdi train route and seat preference.",
          "Apply the promo code at checkout or use the automatic discount.",
          "Make payment via eligible credit cards to finalize the offer.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Cancellation may incur partial refund or complete loss of the discount amount.",
          "Changes to train tickets may void the offer and result in full fare charges.",
          "Standard train cancellation policy applies for refundable tickets.",
          "Offer cannot be re-applied after cancellation.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer is valid only for Satabdi trains and specific routes.",
          "The promo code is applicable only during the promotional window.",
          "Cannot be combined with other discounts or offer codes.",
          "Limited availability of discounted seats; first come, first served.",
        ],
      },
    ],
  },
  {
    category: "OLA",
    title: "Grab Up to 40% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg12,
    tags: ["Cabs"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% off on OLA rides and hotel bookings combined.",
          "Exclusive discounts for users booking OLA rides and stays together.",
          "Priority booking for high-demand travel periods.",
          "Additional cashback offers when using OLA app with eligible payment methods.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Book an OLA ride to your selected destination for your weekend break.",
          "Choose a participating hotel and apply the OLA promo code during booking.",
          "Payment made through OLA wallet or partner cards ensures offer activation.",
          "Instant savings applied on your ride and hotel booking at checkout.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Hotel bookings are subject to cancellation and hotel-specific fees.",
          "Rides may be refunded based on the fare and ride cancellation terms.",
          "Offer benefits are void if the booking or ride is canceled after confirmation.",
          "Booking changes may result in loss of offer eligibility.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer is valid on OLA rides and selected hotel stays across India.",
          "Not valid on cash payments for rides or hotel stays.",
          "Offer valid only when both the ride and stay are booked through the OLA platform.",
          "Subject to availability, blackout periods, and terms of the partner properties.",
        ],
      },
    ],
  },
  {
    category: "UBER",
    title: "LIVE NOW: Unmissable Deals for your Int'l Trips",
    description: "on the Widest Range of Credit Cards.",
    imgSrc: cardimg13,
    tags: ["Cabs"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 30% off on Uber rides to and from select airports and hotels.",
          "Exclusive offers on Uber rides for international trips, including airport transfers.",
          "Discounts on long-distance rides for tourists and business travelers.",
          "Bonus points for Uber rewards members using eligible credit cards.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Download the Uber app and link your eligible credit card.",
          "Select the airport or hotel as your pickup or drop-off location.",
          "Promo codes are automatically applied or can be entered manually during payment.",
          "Ride with an eligible payment method to confirm the discount.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Uber ride cancellations are subject to cancellation fees.",
          "Discounted fares are not refundable upon cancellation or no-show.",
          "Partial cancellations may lead to the forfeiture of discount benefits.",
          "Refunds are processed based on Uber’s refund policies.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Valid for Uber rides booked during the promotional period.",
          "Offer applies only to rides made to and from selected locations.",
          "Cannot be combined with other Uber offers or discounts.",
          "Subject to availability and pricing changes due to demand fluctuations.",
        ],
      },
    ],
  },
  {
    category: "VOLVO BUS",
    title: "Grab Up to 40% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg14,
    tags: ["Bus"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% off on Volvo bus tickets for long-distance travel.",
          "Exclusive discounts on Volvo bus bookings for group travelers.",
          "Complimentary snacks and beverages on select Volvo routes.",
          "Additional perks such as free Wi-Fi and charging points for passengers.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Book your Volvo bus ticket on the partner travel site or app.",
          "Select the travel route and apply the promo code during checkout.",
          "Choose your preferred seating and payment option for the discount.",
          "Pay using an eligible credit card or wallet to ensure offer activation.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Volvo bus tickets are non-refundable or may incur cancellation charges.",
          "Discounted tickets are not eligible for refund once purchased.",
          "Changes to the booking may result in a revised ticket price without the offer.",
          "Cancellation charges vary depending on the travel operator’s policy.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid only on Volvo bus services and routes covered under the promotion.",
          "Limited seats available under this offer – first come, first served.",
          "Cannot be combined with other travel or accommodation discounts.",
          "Subject to availability, blackout dates, and terms from the travel operator.",
        ],
      },
    ],
  },
  {
    category: "SHYAMALI",
    title: "Grab Up to 40% OFF",
    description: "on hotels in India for your August long weekend break.",
    imgSrc: cardimg15,
    tags: ["Bus"],
    details: [
      {
        head: "What do you get?",
        passage: [
          "Up to 40% off on Shyamali bus services for weekend and holiday travel.",
          "Exclusive offers on group bookings and family travel packages.",
          "Complimentary water bottles and snacks during your journey.",
          "Special discounts for senior citizens and students traveling on Shyamali buses.",
        ],
      },
      {
        head: "How do you Redeem the Offer?",
        passage: [
          "Select the Shyamali bus service for your desired travel route and dates.",
          "Use the promo code provided during the booking process on the travel platform.",
          "Choose the payment method that qualifies for the discount offer.",
          "Once payment is confirmed, the discount will be automatically applied.",
        ],
      },
      {
        head: "Conditions in case of cancellation",
        passage: [
          "Refunds will be processed as per Shyamali’s cancellation policy.",
          "Discounted tickets are non-refundable once the booking is confirmed.",
          "Amendments or changes to the travel date may affect the offer eligibility.",
          "Late cancellations may incur charges depending on the operator’s terms.",
        ],
      },
      {
        head: "Terms & Conditions",
        passage: [
          "Offer valid on Shyamali bus services only for the specified routes.",
          "Limited availability – first come, first served.",
          "Cannot be combined with other offers or discounts on bus tickets.",
          "Subject to availability and changes in schedules or terms from the service provider.",
        ],
      },
    ],
  },
];
