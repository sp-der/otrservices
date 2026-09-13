export type ApprovedReview = {
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  clientName: string;
};

// Reviews are intentionally curated here instead of publishing form submissions
// automatically. Add a review only after OTR has received and approved it.
export const approvedReviews: Partial<Record<string, ApprovedReview>> = {};
