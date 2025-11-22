# ODOP Software Test Plan

## 1. Introduction
ODOP is an open-source web application for design optimization workflows. 
This test plan works to ensure correctness, reliability, usability, and performance across core features, demos, 
and optional persistence/authentication.  

- **Objectives:** Validate correctness, stability, and usability of optimization workflows (Search, Seek, Trade), 
tutor/demo/execute scripts, core UI/menus, Help/Lookup, optional auth and persistence, 
and release-to-release performance tracking. 
Emphasize demo-based numerical fidelity and error messaging for blocking conditions.
- **Scope:** Web client SPA (React/Redux), Node/Express server, optional MySQL persistence, Spring Design scenarios, 
Help content (menus, tooltips, alerts), release metrics.
- **Out of scope:** Formal [WCAG](https://en.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines) certification, 
multi-user performance (given heavy-client architecture), non-core experiments unless prioritized.  

See [Introductory Pages Overview](https://odop.springdesignsoftware.org/docs/About/introPagesOverview.html) for background and scope.  

---

## 2. System Architecture
- **Client:** Heavy-client SPA (React/Redux).
- **Server:** Node/Express backend.
- **Persistence:** Optional MySQL database (designs, authentication, usage logging).
- **Deployment:** Heroku-hosted production; self-hosted options supported.
- **Feature flags:** Analytics and JAWSDB environment variables for privacy/self-hosting modes.

See [Issue #1065](https://github.com/thegrumpys/odop/issues/1065) for architectural notes 
and [Issue #1064](https://github.com/thegrumpys/odop/issues/1064) 
plus [Release Procedures](https://odop.springdesignsoftware.org/docs/procedures/release.html) for Analytics and JAWSDB environment variables.  

---

## 3. Critical Features & User Journeys
- **Optimization workflows:** Search, Seek, Trade. 
- **Tutor/Demo/Execute macros:** Script execution and reproducibility. 
- **Spring Design demos:** Based on textbook/handbook examples. 
  References: [Spring Design References](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/references.html). 
- **Help system:** Indexed Help Lookup, tooltips, alerts, tutorials. 

---

## 4. Existing Test Coverage
- Current automation in `/ODOP/client/src/__test__`. 
- Coverage limited; primarily Piston-Cylinder case based basic functionality plus spring design case based demo scripts with Objective Value checks. 
- This test plan expands beyond automation to higher-level functional, performance, and usability testing. 

---

## 5. Target Platforms
- **Browsers:** Chrome (macOS), Edge (Windows) primary; Safari/Firefox secondary. 
- **Devices:** Desktop/laptop and tablets fully supported; smartphones possible but compromised by scrolling. 
  See [Requirements](https://odop.springdesignsoftware.org/docs/About/requirements.html). 

---

## 6. Quality Criteria
- **Performance:** Heavy-client architecture minimizes multi-user concerns; focus on single-user performance. 
  Performance statistics collected per release ([Release Procedures](https://odop.springdesignsoftware.org/docs/procedures/release.html)). 
- **Security:** Current authentication and data protection practices considered adequate for the target user base; privacy modes available. 
- **Usability:** Tooltips, Online Help, Help Lookup, alerts, tutorials; Further development of context-sensitive help may improve UI navigation. 
- **Accessibility:** WCAG compliance not currently targeted. 

---

## 7. Release & Maintenance Strategy
- **Cadence:** Releases occur when milestone issues are closed and testing passes; no fixed dates. 
  See [Message of the Day](https://thegrumpys.github.io/odop/About/messageOfTheDay.html) for release history. 
- **Testing:** Regression via automation; focused manual testing on changed areas. 
- **Responsibilities:** Developers and QA overlap; release procedures executed jointly. 
  See [Post Development](https://odop.springdesignsoftware.org/docs/procedures/postDevelopment.html) 
  and [Release Procedures](https://odop.springdesignsoftware.org/docs/procedures/release.html). 

---

## 8. Test Strategy

### Functional Testing
- **Optimization workflows:** Verify Search, Seek, Trade correctness and constraint handling. 
- **Tutor/Demo/Execute macros:** Validate reproducibility and UI transitions. 
- **Menus/UI:** Navigation, tooltips, alerts, Help Lookup. 
- **Persistence/Auth:** CRUD operations, degraded modes when DB disabled. 
- **Recent changes** Manual testing focused on areas impacted by recent code changes. 

### Regression Testing
- Expand automation in `/ODOP/client/src/__test__`.
- Manual tests for DB/analytics permutations. 

### Compatibility Testing
- Chrome/Edge primary; Safari/Firefox secondary. 
- Desktop/laptop and tablets prioritized. 

### Performance Testing
- Benchmarks for Search, Seek, Trade. 
- Release-to-release metrics comparison. 

### Security & Privacy Testing
- Authentication flows, session handling, design storage. 
- Verify analytics-off and DB-off modes. 

### Usability & Accessibility
- Tooltips, Help Lookup, alerts, demo/tutorial guidance. 
- Baseline accessibility checks. 

---

## 9. Test Environment
- **Client:** Chrome, Edge, Safari, Firefox. 
- **Server/DB:** Node/Express, optional MySQL. 
- **Config matrix:** DB on/off, analytics on/off, extension spring CAD_VIEW_MODEL on/off.
- **Data seeds:** Compression, extension, torsion designs; constraint-violating inputs. 

---

## 10. Performance Thresholds

| Interaction Type                          | Threshold (90% of cases) |
|-------------------------------------------|--------------------------|
| Trivial UI interactions (inputs, prefs)   | < 1 second               |
| Online Help / Help Lookup access          | < 2 seconds              |
| Database operations (Open, Save, Delete)  | < 3 seconds              |
| Export / Import transactions              | < 3 seconds              |
| Authentication transactions               | < 3 seconds              |
| Search operations                         | < 2 seconds              |
| Seek operations                           | < 3 seconds              |
| Trade operations                          | < 3 seconds              |

---

## 11. Deliverables
- Test plan and risk log. 
- Test cases mapped to Help sections and demos. 
- Automated suites and performance scripts. 
- Reports: execution summaries, defects (open new issues as appropriate), coverage, performance deltas. 

---

## 12. Entry & Exit Criteria
- **Entry:** Clean builds, unit tests pass, environment configured. 
- **Exit:** All critical demos pass within tolerance; no high/critical defects; performance thresholds met. 

---

## 13. Risks
- Limited automation coverage → prioritize demos and critical flows. 
- Browser-specific issues → targeted Safari/Firefox checks. 
- Performance drift → standardized benchmarks per release. 
- Config variance → systematic DB/analytics permutations. 

---

# First Batch of Test Cases

## Demo1 – Compression Spring
- **Case:** SMI HANDBOOK of SPRING DESIGN - Refer to page 15 of the second printing (1983). 
- **Interactive execution:** Load [Demo1](https://odop.springdesignsoftware.org/?type=Spring%2FCompression&view=Advanced&execute=demo1). 
- **Interactive Steps:** Step through script. Confirm that narrative text matches observed results. 
- **Test Automation Expected Result:** Matches expected value to 7 significant figures; each interactive step completes in < 2 seconds. 

## Demo2 – Compression Spring with Constraints
- **Case:** SMI HANDBOOK of SPRING DESIGN - Refer to page 15 of the second printing (1983). 
- **Interactive execution:** Load [Demo2](https://odop.springdesignsoftware.org/?type=Spring%2FCompression&view=Advanced&execute=demo2). 
- **Interactive Steps:** Step through script. Confirm that narrative text matches observed results. 
- **Test Automation Expected Result:** Objective Value matches within 7 significant figures; each interactive step completes in < 3 seconds. 

## Demo3 – Compression Spring
- **Objective:** Confirm Trade operation produces reproducible results and respects constraints. 
- **Preconditions:** Load [Demo3](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/demo3.html). 
- **Steps:** Run Trade → Compare outputs to expected reference. 
- **Expected Result:** Objective Value matches within tolerance; constraints enforced; completes in < 3 seconds. 

## Demo6 – Extension Spring
- **Objective:** Validate Search across multiple independent variables. 
- **Preconditions:** Load [Demo6](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/demo6.html). 
- **Steps:** Run Search → Observe convergence. 
- **Expected Result:** Converges within expected iterations; Objective Value matches within 7 significant figures; completes in < 2 seconds. 

## Demo7 – Extension Spring
- **Objective:** Ensure blocking constraints are detected and communicated. 
- **Preconditions:** Load [Demo7](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/demo7.html). 
- **Steps:** Run Seek. 
- **Expected Result:** Pop-up/message bar shows blocking condition; no design applied; completes in < 3 seconds. 

## Demo14 – Torsion Spring
- **Objective:** Validate end-to-end optimization with multiple steps. 
- **Preconditions:** Load [Demo14](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/demo14.html). 
- **Steps:** Run Search → Seek → Trade sequentially. 
- **Expected Result:** Each step produces expected Objective Value within tolerance; performance thresholds met; no UI desyncs. 

## Demo15 – Torsion Spring
- **Objective:** Confirm Import/Export transactions meet performance and integrity requirements. 
- **Preconditions:** Load [Demo15](https://odop.springdesignsoftware.org/docs/Help/SpringDesign/demo15.html). 
- **Steps:** Export design → Import design → Compare. 
- **Expected Result:** Round-trip integrity preserved; operations complete in < 3 seconds; Objective Value matches within tolerance. 
