// demo-data.js - FICTIONAL sample land records for the MCL-LRMS demonstration.
// Every village, name, plot, area, date, reference and coordinate here is MADE UP.
// Boundaries are drawn on a synthetic grid; they are NOT real parcels or real MCL land.

var DEMO = (function () {
  var TAHASIL = "Kaniha (DEMO)", DISTRICT = "Angul (DEMO)";
  // Synthetic grid origin (not a surveyed location)
  var ORIGIN = { "Demopur (DEMO)": [21.0950, 85.1050], "Sampleguda (DEMO)": [21.0905, 85.1135] };
  var CELL_LAT = 0.00052, CELL_LNG = 0.00056; // about 58 m x 58 m (~0.83 acre)

  // Deterministic small jitter so plots look hand-drawn rather than a perfect grid
  function jit(seed) { var x = Math.sin(seed * 12.9898) * 43758.5453; return (x - Math.floor(x) - 0.5) * 0.00005; }
  function cell(village, r, c, seed) {
    var o = ORIGIN[village], la = o[0] - r * CELL_LAT, ln = o[1] + c * CELL_LNG;
    return [
      [la + jit(seed + 1), ln + jit(seed + 2)],
      [la + jit(seed + 3), ln + CELL_LNG + jit(seed + 4)],
      [la - CELL_LAT + jit(seed + 5), ln + CELL_LNG + jit(seed + 6)],
      [la - CELL_LAT + jit(seed + 7), ln + jit(seed + 8)]
    ];
  }

  // r/c = grid position; poly:false = location could not be reconstructed
  var raw = [
    { id: "DP-145-234", v: "Demopur (DEMO)", khata: "145", plot: "234", areaAcq: 0.82, areaRec: 0.81, acquired: 0.82, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Alpha", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Orange", conf: 92, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "234", khata: "145", name: "DEMO Owner Alpha" },
                { doc: "Land record extract (DEMO)", plot: "234", khata: "145", name: "DEMO Ownr Alfa" }],
      landmarks: "About 120 m south-east of Sample Pond; east of Sample Village Road" },
    { id: "DP-145-235", v: "Demopur (DEMO)", khata: "145", plot: "235", areaAcq: 0.64, areaRec: 0.64, acquired: 0.64, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Alpha", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 88, r: 0, c: 2,
      sources: [{ doc: "Award statement (DEMO)", plot: "235", khata: "145", name: "DEMO Owner Alpha" }], landmarks: "Next to Plot 234" },
    { id: "DP-121-124", v: "Demopur (DEMO)", khata: "121", plot: "124", areaAcq: 1.10, areaRec: 1.10, acquired: 1.10, type: "Homestead (Gharabari)",
      owner: "DEMO Owner Beta", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Under process", emp: "Cash compensation (CC)",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Orange", conf: 71, r: 1, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "124/356", khata: "121", name: "DEMO Owner Beta" }],
      landmarks: "Near Sample Primary School (DEMO)" },
    { id: "DP-121-125", v: "Demopur (DEMO)", khata: "121", plot: "125", areaAcq: 0.45, areaRec: 0.45, acquired: 0.45, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Beta", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Not applicable",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 84, r: 1, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "125", khata: "121", name: "DEMO Owner Beta" }], landmarks: "West of Sample Village Road" },
    { id: "DP-121-126", v: "Demopur (DEMO)", khata: "121", plot: "126", areaAcq: 0.38, areaRec: 0.38, acquired: 0.38, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Gamma", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Blue", conf: 90, r: 1, c: 2,
      sources: [{ doc: "Award statement (DEMO)", plot: "126", khata: "121", name: "DEMO Owner Gamma" }], landmarks: "-" },
    { id: "DP-150-240", v: "Demopur (DEMO)", khata: "150", plot: "240", areaAcq: 0.95, areaRec: 0.95, acquired: 0.95, type: "Uncultivable (Anabadi)",
      owner: "DEMO Owner Delta", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Not applicable", emp: "Not applicable",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 95, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "240", khata: "150", name: "DEMO Owner Delta" }], landmarks: "Adjoining Sample Pond" },
    { id: "DP-150-241", v: "Demopur (DEMO)", khata: "150", plot: "241", areaAcq: 0.30, areaRec: 0.30, acquired: 0.30, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Delta", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Pending", demarcation: "Not started", map: "Map sheet damaged - plot line unclear", status: "Red", conf: null, r: null, c: null,
      sources: [{ doc: "Award statement (DEMO)", plot: "241", khata: "150", name: "DEMO Owner Delta" }], landmarks: "Reported near Sample Nala (unconfirmed)" },
    { id: "SG-032-011", v: "Sampleguda (DEMO)", khata: "32", plot: "11", areaAcq: 0.70, areaRec: 0.72, acquired: 0.70, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Epsilon", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 68, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "11", khata: "32", name: "DEMO Owner Epsilon" }], landmarks: "North of Sample Temple (DEMO)" },
    { id: "SG-032-012", v: "Sampleguda (DEMO)", khata: "32", plot: "12", areaAcq: 0.55, areaRec: 0.55, acquired: 0.55, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Epsilon", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Cash compensation (CC)",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 91, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "12", khata: "32", name: "DEMO Owner Epsilon" }], landmarks: "-" },
    { id: "SG-040-019", v: "Sampleguda (DEMO)", khata: "40", plot: "19", areaAcq: 1.25, areaRec: 1.25, acquired: 1.00, type: "Homestead (Gharabari)",
      owner: "DEMO Owner Zeta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Partly paid", rr: "Under process", emp: "Under process",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 55, r: 1, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "19", khata: "40", name: "DEMO Owner Zeta" }], landmarks: "Near Sample Road junction" },
    { id: "SG-040-020", v: "Sampleguda (DEMO)", khata: "40", plot: "20", areaAcq: 0.40, areaRec: 0.40, acquired: 0.40, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Zeta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Pending", demarcation: "Not started", map: "Not available", status: "Red", conf: null, r: null, c: null,
      sources: [{ doc: "Land record extract (DEMO)", plot: "20", khata: "40", name: "DEMO Owner Zeta" }], landmarks: "-" },
    { id: "SG-041-021", v: "Sampleguda (DEMO)", khata: "41", plot: "21", areaAcq: 0.62, areaRec: 0.62, acquired: 0.62, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Eta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Blue", conf: 87, r: 1, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "21", khata: "41", name: "DEMO Owner Eta" }], landmarks: "-" }
  ];

  var plots = raw.map(function (p, i) {
    return {
      id: p.id, village: p.v, tahasil: TAHASIL, district: DISTRICT, khata: p.khata, plot: p.plot,
      areaAcq: p.areaAcq, areaRec: p.areaRec, acquired: p.acquired, landType: p.type, owner: p.owner,
      notif: p.notif, acqDate: p.acqDate, comp: p.comp, rr: p.rr, emp: p.emp, possession: p.possession,
      demarcation: p.demarcation, map: p.map, status: p.status, confidence: p.conf,
      fieldStatus: p.status === "Blue" || p.status === "Green" ? "Completed" : "Pending",
      polygon: p.r == null ? null : cell(p.v, p.r, p.c, (i + 1) * 17),
      polygonSource: p.r == null ? null : "AI reconstruction from scanned map (DEMO)",
      sources: p.sources, landmarks: p.landmarks,
      documents: ["Award statement (DEMO).pdf", "Acquisition map sheet 3 (DEMO).jpg", "Land record extract (DEMO).pdf"],
      remarks: "DEMO record", lastUpdatedBy: "DEMO-LRO-01", lastUpdated: "2026-06-30"
    };
  });

  function box(village, rows, cols, pad) {
    var o = ORIGIN[village];
    return [[o[0] + pad, o[1] - pad], [o[0] + pad, o[1] + cols * CELL_LNG + pad],
            [o[0] - rows * CELL_LAT - pad, o[1] + cols * CELL_LNG + pad], [o[0] - rows * CELL_LAT - pad, o[1] - pad]];
  }
  var villages = [
    { name: "Demopur (DEMO)", boundary: box("Demopur (DEMO)", 3, 4, 0.0012) },
    { name: "Sampleguda (DEMO)", boundary: box("Sampleguda (DEMO)", 3, 3, 0.0012) }
  ];
  var mclLand = [box("Demopur (DEMO)", 2, 3, 0.0002), box("Sampleguda (DEMO)", 2, 2, 0.0002)];
  var landmarks = [
    { name: "Sample Pond (DEMO)", at: [21.0955, 85.1046] },
    { name: "Sample Primary School (DEMO)", at: [21.0937, 85.1046] },
    { name: "Sample Village Road (DEMO)", at: [21.0945, 85.1070] },
    { name: "Sample Temple (DEMO)", at: [21.0899, 85.1138] },
    { name: "Sample Road junction (DEMO)", at: [21.0892, 85.1133] }
  ];
  // Ground control points used by the (simulated) georeferencing step
  var controlPoints = [
    { name: "GCP-1 Road culvert (DEMO)", at: [21.0953, 85.1049] },
    { name: "GCP-2 Pond corner (DEMO)", at: [21.0950, 85.1046] },
    { name: "GCP-3 Survey pillar (DEMO)", at: [21.0939, 85.1064] }
  ];

  // Text an OCR engine could return for the sample old map (used by "Try the sample map")
  var sampleOcrText =
    "GOVT. OF ODISHA (DEMO)  ACQUISITION MAP - SHEET 3\n" +
    "Mouza: Demopur (DEMO)   Tahasil: Kaniha   Dist: Angul\n" +
    "Notification No. DEMO/LA/CBA/2009/017  Dated 15-03-2010\n" +
    "Khata No. 145   Plot No. 234   Area 0.82 Ac.\n" +
    "Khata No. 145   Plot No. 235   Area 0.64 Ac.\n" +
    "Khata No. 121   Plot No. 124/356   Area 1.10 Ac.\n" +
    "Recorded tenant: DEMO Owner Alpha\n" +
    "Scale 1:4000   Land acquired for Coal Block (DEMO)";

  return { plots: plots, villages: villages, mclLand: mclLand, landmarks: landmarks, controlPoints: controlPoints,
           sampleOcrText: sampleOcrText, CELL_LAT: CELL_LAT, CELL_LNG: CELL_LNG };
})();
