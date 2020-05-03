import { getDesigns } from '../server.js';

//=====================================================================
//search
//=====================================================================

// Use async/await and outer expect
//it('getDesigns', async () => {
//    var designs = await getDesigns(null, 'Spring/Compression');
//    expect(designs).toEqual([
//        {"name": "Carlson_p184Metric", "user": null}, 
//        {"name": "Demo", "user": null}, 
//        {"name": "HotWound", "user": null}, 
//        {"name": "HotWoundMetric", "user": null}, 
//        {"name": "Startup", "user": null}, 
//        {"name": "Startup_Metric", "user": null}
//    ]);
//});

// use then and inner expect
//it('getDesigns', () => {
//    var designs = getDesigns(null, 'Spring/Compression')
//    .then(designs => {
//        expect(designs).toEqual([
//            {"name": "Carlson_p184Metric", "user": null}, 
//            {"name": "Demo", "user": null}, 
//            {"name": "HotWound", "user": null}, 
//            {"name": "HotWoundMetric", "user": null}, 
//            {"name": "Startup", "user": null}, 
//            {"name": "Startup_Metric", "user": null}
//        ]);
//    });
//});

//use no async/await or then and outer expect with resolves
it('getDesigns', () => {
  var designs = getDesigns(null, 'Spring/Compression');
  expect(designs).resolves.toEqual([
      {"name": "Carlson_p184Metric", "user": null}, 
      {"name": "Demo", "user": null}, 
      {"name": "HotWound", "user": null}, 
      {"name": "HotWoundMetric", "user": null}, 
      {"name": "Startup", "user": null}, 
      {"name": "Startup_Metric", "user": null}
  ]);
});

