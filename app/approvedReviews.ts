export type ApprovedReview = {
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  clientName: string;
};

// Reviews are intentionally curated here instead of publishing form submissions
// automatically. Add a review only after OTR has received and approved it.
export const approvedReviews: Partial<Record<string, ApprovedReview>> = {
  "Pacific Stay Properties": {
    rating: 5,
    quote:
      "Working with OTR was fantastic. He built my website the exact same way that I envisioned and he made the whole process super smooth. He’s responsive, easy to work with, and goes above and beyond. Highly recommend if you want someone reliable, knowledgeable, and genuinely invested in your success. Amazing!",
    clientName: "Jami Jimenez",
  },
  "JMB 2 Creations": {
    rating: 5,
    quote:
      "I had a website built from scratch for my new business. They were so quick and professional! Reyman listened to what I was asking for in a layout for my site. They made it easy for me to add or edit stuff myself. There continuing to give me support when needed when I have something I need help with! I cant wait to work more with them in the future.",
    clientName: "Meghan Borbon",
  },
};
