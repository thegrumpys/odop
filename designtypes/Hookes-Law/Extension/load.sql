INSERT INTO `design` (`created_at`, `updated_at`, `user`, `type`, `name`, `value`) VALUES 
('2023-01-15 15:57:42','2023-01-15 15:57:42',NULL,'Hookes-Law/Extension','Startup','{\"symbol_table\":[{\"input\":true,\"name\":\"L_Free\",\"value\":3.25,\"units\":\"inches\",\"lmin\":0,\"lmax\":0,\"cmin\":0.1,\"cmax\":100,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Length in free (no load) condition\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.10000010000000001,\"smax\":100.0000001,\"vmin\":0,\"vmax\":0},{\"input\":true,\"name\":\"Force_1\",\"value\":10,\"units\":\"pounds\",\"lmin\":0,\"lmax\":0,\"cmin\":0,\"cmax\":50,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"Minimum operating load (Length L_1)\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.01,\"smax\":50.0000001,\"vmin\":0,\"vmax\":0},{\"input\":true,\"name\":\"Force_2\",\"value\":39,\"units\":\"pounds\",\"lmin\":0,\"lmax\":0,\"cmin\":0.01,\"cmax\":1000,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Maximum operating load (Length L_2)\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.1,\"smax\":1000.0000001,\"vmin\":0,\"vmax\":0},{\"input\":true,\"name\":\"Rate\",\"value\":22.6315,\"units\":\"Lb/In\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":200,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Spring rate (spring constant); slope of force-deflection curve\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":200.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"Deflect_1\",\"value\":0.4418620064953715,\"units\":\"inches\",\"lmin\":1,\"lmax\":0,\"cmin\":0,\"cmax\":20,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.001,\"tooltip\":\"Deflection from free to load point 1\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.001,\"smax\":20.0000001,\"vmin\":-441.8620064953715,\"vmax\":0},{\"input\":false,\"name\":\"Deflect_2\",\"value\":1.723261825331949,\"units\":\"inches\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":20,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"Deflection from free to load point 2\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":20.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_1\",\"value\":2.8081379935046287,\"units\":\"inches\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":100,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Spring length at load point 1\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":100.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_2\",\"value\":1.526738174668051,\"units\":\"inches\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":50,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Spring length at load point 2\",\"type\":\"equationset\",\"hidden\":false,\"validminchoices\":[\"L_Solid\"],\"validminchoice\":0,\"smin\":1.0000001,\"smax\":50.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_Stroke\",\"value\":1.2813998188365776,\"units\":\"inches\",\"lmin\":0,\"lmax\":0,\"cmin\":0.01,\"cmax\":100,\"validmin\":-5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"Length of stroke from point 1 to point 2\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.0100001,\"smax\":100.0000001,\"vmin\":0,\"vmax\":0}],\"labels\":[{\"name\":\"COMMENT\",\"value\":\"Hooke\'s Law default start point - US units ...\"},{\"name\":\"Contact person\",\"value\":\"\"},{\"name\":\"Company name\",\"value\":\"\"},{\"name\":\"Street\",\"value\":\"\"},{\"name\":\"City, State & Zip\",\"value\":\"\"},{\"name\":\"Phone & email\",\"value\":\"\"},{\"name\":\"Date\",\"value\":\"\"},{\"name\":\"Part Number\",\"value\":\"\"},{\"name\":\"Data Source\",\"value\":\"print     sample      verbal\"},{\"name\":\"Mandril\",\"value\":\"\"},{\"name\":\"Wind\",\"value\":\"rh lh opt\"},{\"name\":\"Shot peen\",\"value\":\"yes no; details\"},{\"name\":\"Stress relieve/HT\",\"value\":\"\"},{\"name\":\"Pre-set\",\"value\":\"no\"},{\"name\":\"Finish\",\"value\":\"\"},{\"name\":\"Squareness\",\"value\":\"\"},{\"name\":\"End use\",\"value\":\"\"},{\"name\":\"Fits in / Works over\",\"value\":\"\"},{\"name\":\"Operating temp\",\"value\":\"\"},{\"name\":\"Special notes & tol\",\"value\":\"\"},{\"name\":\"Customer approval\",\"value\":\"__________________________ \"},{\"name\":\"Customer date\",\"value\":\" _______ \"},{\"name\":\"Vendor approval\",\"value\":\"__________________________ \"},{\"name\":\"Vendor date\",\"value\":\" _______ \"}],\"version\":\"1\",\"result\":{\"objective_value\":0,\"termination_condition\":\"\"},\"jsontype\":\"ODOP\",\"units\":\"US\",\"system_controls\":{\"ioopt\":3,\"maxit\":600,\"weapon\":1,\"nmerit\":1,\"fix_wt\":1.5,\"con_wt\":1,\"zero_wt\":10,\"viol_wt\":1,\"mfn_wt\":0.01,\"objmin\":0.00001,\"del\":1,\"delmin\":0.0001,\"tol\":0.0001,\"smallnum\":1e-7,\"show_units\":1,\"show_violations\":1,\"enable_auto_fix\":1}}'),
('2023-01-15 15:58:07','2023-01-15 15:58:07',NULL,'Hookes-Law/Extension','Startup_Metric','{\"symbol_table\":[{\"input\":true,\"name\":\"L_Free\",\"value\":80,\"units\":\"mm\",\"lmin\":0,\"lmax\":0,\"cmin\":0.5,\"cmax\":400,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"Length in free (no load) condition\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1,\"smax\":400.0000001,\"vmin\":0,\"vmax\":0},{\"input\":true,\"name\":\"Force_1\",\"value\":50,\"units\":\"newtons\",\"lmin\":0,\"lmax\":0,\"cmin\":0,\"cmax\":100,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"Minimum operating load (Length L_1)\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.01,\"smax\":100.0000001,\"vmin\":0,\"vmax\":0},{\"input\":true,\"name\":\"Force_2\",\"value\":190,\"units\":\"newtons\",\"lmin\":0,\"lmax\":0,\"cmin\":0.05,\"cmax\":4000,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Maximum operating load (Length L_2)\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.1,\"smax\":4000.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"Rate\",\"value\":null,\"units\":\"N/mm\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":200,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"Spring rate (spring constant); slope of force-deflection curve\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":200.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"Deflect_1\",\"value\":null,\"units\":\"mm\",\"lmin\":1,\"lmax\":0,\"cmin\":0,\"cmax\":200,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Deflection from free to load point 1\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.1,\"smax\":200.0000001,\"vmin\":null,\"vmax\":0},{\"input\":false,\"name\":\"Deflect_2\",\"value\":null,\"units\":\"mm\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":400,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"Deflection from free to load point 2\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":400.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_1\",\"value\":null,\"units\":\"mm\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":1000,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"Spring length at load point 1\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":1000.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_2\",\"value\":null,\"units\":\"mm\",\"lmin\":0,\"lmax\":0,\"cmin\":1,\"cmax\":500,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"Spring length at load point 2\",\"type\":\"equationset\",\"hidden\":false,\"validminchoices\":[\"L_Solid\"],\"validminchoice\":0,\"smin\":1.0000001,\"smax\":500.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"L_Stroke\",\"value\":36.88007,\"units\":\"mm\",\"lmin\":0,\"lmax\":0,\"cmin\":0.2,\"cmax\":400,\"validmin\":-5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"Length of stroke from point 1 to point 2\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.20000010000000001,\"smax\":400.0000001,\"vmin\":0,\"vmax\":0}],\"labels\":[{\"name\":\"COMMENT\",\"value\":\"Compression Hooke\'s Law default start point - Metric units ...\"},{\"name\":\"Contact person\",\"value\":\"\"},{\"name\":\"Company name\",\"value\":\"\"},{\"name\":\"Street\",\"value\":\"\"},{\"name\":\"City, State & Zip\",\"value\":\"\"},{\"name\":\"Phone & email\",\"value\":\"\"},{\"name\":\"Date\",\"value\":\"\"},{\"name\":\"Part Number\",\"value\":\"\"},{\"name\":\"Data Source\",\"value\":\"print     sample      verbal\"},{\"name\":\"Mandril\",\"value\":\"\"},{\"name\":\"Wind\",\"value\":\"rh lh opt\"},{\"name\":\"Shot peen\",\"value\":\"yes no; details\"},{\"name\":\"Stress relieve/HT\",\"value\":\"\"},{\"name\":\"Pre-set\",\"value\":\"no\"},{\"name\":\"Finish\",\"value\":\"\"},{\"name\":\"Squareness\",\"value\":\"\"},{\"name\":\"End use\",\"value\":\"\"},{\"name\":\"Fits in / Works over\",\"value\":\"\"},{\"name\":\"Operating temp\",\"value\":\"\"},{\"name\":\"Special notes & tol\",\"value\":\"\"},{\"name\":\"Customer approval\",\"value\":\"__________________________ \"},{\"name\":\"Customer date\",\"value\":\" _______ \"},{\"name\":\"Vendor approval\",\"value\":\"__________________________ \"},{\"name\":\"Vendor date\",\"value\":\" _______ \"}],\"version\":\"1\",\"result\":{\"objective_value\":0,\"termination_condition\":\"\"},\"jsontype\":\"ODOP\",\"units\":\"Metric\",\"system_controls\":{\"ioopt\":3,\"maxit\":600,\"weapon\":1,\"nmerit\":1,\"fix_wt\":1.5,\"con_wt\":1,\"zero_wt\":10,\"viol_wt\":1,\"mfn_wt\":0.01,\"objmin\":0.00001,\"del\":1,\"delmin\":0.0001,\"tol\":0.0001,\"smallnum\":1e-7,\"show_units\":1,\"show_violations\":1,\"enable_auto_fix\":1}}');
