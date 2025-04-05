INSERT INTO `design` (`created_at`, `updated_at`, `user`, `type`, `name`, `value`) VALUES 
('2024-11-24 21:16:39','2024-11-24 21:16:39',NULL,'Piston-Cylinder','Startup','{\"result\":{\"objective_value\":0.5605106434805028,\"termination_condition\":\"\",\"search_completed\":false},\"system_controls\":{\"ioopt\":3,\"maxit\":600,\"weapon\":1,\"nmerit\":1,\"fix_wt\":1.5,\"con_wt\":1,\"zero_wt\":10,\"viol_wt\":1,\"mfn_wt\":0.01,\"objmin\":0.00001,\"del\":1,\"delmin\":0.0001,\"tol\":0.0001,\"smallnum\":1e-7,\"show_units\":1,\"show_violations\":1,\"enable_auto_fix\":1},\"symbol_table\":[{\"input\":true,\"name\":\"PRESSURE\",\"value\":500,\"units\":\"LB/SQ-IN\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":1500,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"<Table><tr><td>Gas PRESSURE applied to piston AREA</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/PRESSURE.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1,\"smax\":1500.0000001,\"vmin\":0,\"vmax\":-0.6666666666222222},{\"input\":true,\"name\":\"RADIUS\",\"value\":0.4,\"units\":\"INCH\",\"lmin\":1,\"lmax\":1,\"cmin\":0.04,\"cmax\":0.5,\"validmin\":5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.01,\"tooltip\":\"<Table><tr><td>Piston dimension; creates AREA where PRESSURE is applied</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/RADIUS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.040000100000000004,\"smax\":0.5000001,\"vmin\":-8.99997750005625,\"vmax\":-0.19999996000000797},{\"input\":true,\"name\":\"THICKNESS\",\"value\":0.04,\"units\":\"INCH\",\"lmin\":1,\"lmax\":1,\"cmin\":0.002,\"cmax\":0.05,\"validmin\":5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.001,\"tooltip\":\"<Table><tr><td>Dimension of cylinder wall providing containment for PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/THICKNESS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.0020001,\"smax\":0.050000100000000006,\"vmin\":-18.999050047497626,\"vmax\":-0.19999960000080003},{\"input\":false,\"name\":\"FORCE\",\"value\":251.32741228718348,\"units\":\"LBS.\",\"lmin\":1,\"lmax\":0,\"cmin\":1000,\"cmax\":10000,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"<Table><tr><td>Push generated by PRESSURE acting on piston AREA</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/FORCE.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1000.0000001,\"smax\":10000.0000001,\"vmin\":0.7486725876379493,\"vmax\":0},{\"input\":false,\"name\":\"AREA\",\"value\":0.5026548245743669,\"units\":\"SQ.-IN.\",\"lmin\":0,\"lmax\":0,\"cmin\":0,\"cmax\":10,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"<Table><tr><td>Effective amount of piston surface exposed to PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/AREA.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.1,\"smax\":10.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"STRESS\",\"value\":2500,\"units\":\"PSI\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":3000,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":10,\"tooltip\":\"<Table><tr><td>Force per unit area within cylinder wall; created by PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/STRESS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":10,\"smax\":3000.0000001,\"vmin\":0,\"vmax\":-0.16666666666111113}],\"labels\":[{\"name\":\"COMMENT\",\"value\":\"PCYL default start point - US units ...\"}],\"version\":\"7\",\"jsontype\":\"ODOP\",\"units\":\"US\"}'),
('2024-11-24 21:16:42','2024-11-24 21:16:42',NULL,'Piston-Cylinder','Startup_Metric','{\"result\":{\"objective_value\":0.5586562189359155,\"termination_condition\":\"\",\"search_completed\":false},\"system_controls\":{\"ioopt\":3,\"maxit\":600,\"weapon\":1,\"nmerit\":1,\"fix_wt\":1.5,\"con_wt\":1,\"zero_wt\":10,\"viol_wt\":1,\"mfn_wt\":0.01,\"objmin\":0.00001,\"del\":1,\"delmin\":0.0001,\"tol\":0.0001,\"smallnum\":1e-7,\"show_units\":1,\"show_violations\":1,\"enable_auto_fix\":1},\"symbol_table\":[{\"input\":true,\"name\":\"PRESSURE\",\"value\":3.4,\"units\":\"MPa\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":10.3,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"<Table><tr><td>Gas PRESSURE applied to piston AREA</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/PRESSURE.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1,\"smax\":10.3000001,\"vmin\":0,\"vmax\":-0.6699029061174475},{\"input\":true,\"name\":\"RADIUS\",\"value\":10.2,\"units\":\"mm\",\"lmin\":1,\"lmax\":1,\"cmin\":1,\"cmax\":12.7,\"validmin\":5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":1,\"tooltip\":\"<Table><tr><td>Piston dimension; creates AREA where PRESSURE is applied</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/RADIUS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1.0000001,\"smax\":12.700000099999999,\"vmin\":-9.19999908000009,\"vmax\":-0.19685039215078434},{\"input\":true,\"name\":\"THICKNESS\",\"value\":1.02,\"units\":\"mm\",\"lmin\":1,\"lmax\":1,\"cmin\":0.1,\"cmax\":1.27,\"validmin\":5e-324,\"validmax\":1.7976931348623157e+308,\"sdlim\":0.1,\"tooltip\":\"<Table><tr><td>Dimension of cylinder wall providing containment for PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/THICKNESS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":0.10000010000000001,\"smax\":1.2700001,\"vmin\":-9.1999908000092,\"vmax\":-0.1968503782007576},{\"input\":false,\"name\":\"FORCE\",\"value\":1111.2944189102388,\"units\":\"newtons\",\"lmin\":1,\"lmax\":0,\"cmin\":4400,\"cmax\":44500,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":1000,\"tooltip\":\"<Table><tr><td>Push generated by PRESSURE acting on piston AREA</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/FORCE.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":4400.0000001,\"smax\":44500.0000001,\"vmin\":0.7474330865943222,\"vmax\":0},{\"input\":false,\"name\":\"AREA\",\"value\":326.851299679482,\"units\":\"sq-mm\",\"lmin\":0,\"lmax\":0,\"cmin\":0,\"cmax\":6450,\"validmin\":0,\"validmax\":1.7976931348623157e+308,\"sdlim\":1000,\"tooltip\":\"<Table><tr><td>Effective amount of piston surface exposed to PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/AREA.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":1000,\"smax\":6450.0000001,\"vmin\":0,\"vmax\":0},{\"input\":false,\"name\":\"STRESS\",\"value\":17,\"units\":\"MPa\",\"lmin\":0,\"lmax\":1,\"cmin\":0,\"cmax\":21,\"validmin\":-1.7976931348623157e+308,\"validmax\":1.7976931348623157e+308,\"sdlim\":5,\"tooltip\":\"<Table><tr><td>Force per unit area within cylinder wall; created by PRESSURE</td></tr><tr><td><Image fluid src=\\\"/designtypes/Piston-Cylinder/tooltips/STRESS.png\\\"/></td></tr></Table>\",\"type\":\"equationset\",\"hidden\":false,\"smin\":5,\"smax\":21.0000001,\"vmin\":0,\"vmax\":-0.190476189569161}],\"labels\":[{\"name\":\"COMMENT\",\"value\":\"PCYL default start point - Metric units ...\"}],\"version\":\"7\",\"jsontype\":\"ODOP\",\"units\":\"Metric\"}');
