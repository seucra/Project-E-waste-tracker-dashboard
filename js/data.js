/* ==========================================================================
   STATE DATASETS (SCORECARD, DISTRICTS, RECYCLERS, HOTSPOTS)
   ========================================================================== */

const scorecardData = [
  { id: 1, name: "1.0 Generation & Inventory", weight: 15.0, benchmark: 5.0, achieved: 0.0, score: 0.0, status: "Critical" },
  { id: 2, name: "2.0 Collection Performance", weight: 20.0, benchmark: 1.0, achieved: 0.0, score: 0.0, status: "Critical" },
  { id: 3, name: "3.0 Formal Recycling & Treatment", weight: 20.0, benchmark: 1.0, achieved: 0.0, score: 0.0, status: "Critical" },
  { id: 4, name: "4.0 Regulatory Compliance", weight: 15.0, benchmark: 1.0, achieved: 1.0, score: 15.0, status: "Compliant" },
  { id: 5, name: "5.0 Informal Sector Integration", weight: 10.0, benchmark: 1.0, achieved: 0.0, score: 0.0, status: "Critical" },
  { id: 6, name: "6.0 Environmental & Health Safeguards", weight: 10.0, benchmark: 1.0, achieved: 0.5, score: 5.0, status: "Partial" },
  { id: 7, name: "7.0 Awareness & Outreach", weight: 10.0, benchmark: 20.0, achieved: 1.0, score: 0.5, status: "Lagging" }
];

const districtData = [
  { name: "Prayagraj (Allahabad)", pop: 5954391, gen: 0 },
  { name: "Moradabad", pop: 4772006, gen: 0 },
  { name: "Ghaziabad", pop: 4681645, gen: 0 },
  { name: "Lucknow", pop: 4589838, gen: 0 },
  { name: "Kanpur Nagar", pop: 4581268, gen: 0 },
  { name: "Bareilly", pop: 4448359, gen: 0 },
  { name: "Gorakhpur", pop: 4440895, gen: 0 },
  { name: "Agra", pop: 4418797, gen: 0 },
  { name: "Muzaffarnagar", pop: 4143512, gen: 0 },
  { name: "Varanasi", pop: 3676841, gen: 0 },
  { name: "Aligarh", pop: 3673889, gen: 0 },
  { name: "Saharanpur", pop: 3466382, gen: 0 },
  { name: "Meerut", pop: 3443689, gen: 0 },
  { name: "Mathura", pop: 2547184, gen: 0 },
  { name: "Gautam Buddha Nagar", pop: 1648115, gen: 0 }
];
