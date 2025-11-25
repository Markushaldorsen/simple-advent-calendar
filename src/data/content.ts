export interface DayContent {
  day: number;
  title: string;
  body: string;
  image?: string; // Optional URL for an image
  type: 'text' | 'image' | 'video' | 'coupon';
}

export const adventContent: DayContent[] = [
  { 
    day: 1, 
    title: "December 1st", 
    body: "Welcome to your Advent Calendar! ❤️ I love you so much.", 
    type: 'text',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=400&q=80' // Example image
  },
  { day: 2, title: "December 2nd", body: "Coupon: One free back massage. Valid anytime.", type: 'coupon' },
  { day: 3, title: "December 3rd", body: "Let's watch a Christmas movie tonight. You pick!", type: 'text' },
  { day: 4, title: "December 4th", body: "I made you a playlist of songs that remind me of you.", type: 'text' },
  { day: 5, title: "December 5th", body: "Dinner is on me tonight. Where do you want to go?", type: 'coupon' },
  { day: 6, title: "December 6th", body: "Remember our first date? I was so nervous!", type: 'text' },
  { day: 7, title: "December 7th", body: "Coupon: Breakfast in bed.", type: 'coupon' },
  { day: 8, title: "December 8th", body: "Let's go for a walk and look at Christmas lights.", type: 'text' },
  { day: 9, title: "December 9th", body: "You are the most beautiful person I know.", type: 'text' },
  { day: 10, title: "December 10th", body: "Coupon: One 'Get out of doing dishes' card.", type: 'coupon' },
  { day: 11, title: "December 11th", body: "Let's bake cookies together this weekend.", type: 'text' },
  { day: 12, title: "December 12th", body: "Halfway to Christmas! I got you a small treat (check the kitchen).", type: 'text' },
  { day: 13, title: "December 13th", body: "St. Lucia Day! Let's have some saffron buns.", type: 'text' },
  { day: 14, title: "December 14th", body: "I love your smile.", type: 'text' },
  { day: 15, title: "December 15th", body: "Coupon: Movie night choice (no complaints allowed!).", type: 'coupon' },
  { day: 16, title: "December 16th", body: "Let's wrap presents together tonight.", type: 'text' },
  { day: 17, title: "December 17th", body: "You make every day better just by being in it.", type: 'text' },
  { day: 18, title: "December 18th", body: "Coupon: A long foot massage.", type: 'coupon' },
  { day: 19, title: "December 19th", body: "Let's make some hot cocoa and read.", type: 'text' },
  { day: 20, title: "December 20th", body: "Only 4 days left! I'm so excited to celebrate with you.", type: 'text' },
  { day: 21, title: "December 21st", body: "Winter Solstice. The days get brighter from here, just like my life with you.", type: 'text' },
  { day: 22, title: "December 22nd", body: "Coupon: A date night of your choosing.", type: 'coupon' },
  { day: 23, title: "December 23rd", body: "Let's exchange one small gift early.", type: 'text' },
  { day: 24, title: "Christmas Eve", body: "Merry Christmas Eve, my love! I can't wait for tomorrow. ❤️", type: 'text' },
];
