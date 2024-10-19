import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import * as sto from '../../designtypes/Spring/Extension/symbol_table_offsets';

export default function ViewCADModel() {
//  console.log('ViewCADModel - Mounting...');

  const model_type = useSelector((state) => state.model.type);
  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const [show, setShow] = useState(false);

  useEffect(() => {
//    console.log('ViewCADModel - Mounted','model_type=',model_type);
    return () => {};
  }, [model_type]);

  const toggle = () => {
//    console.log('In ViewCADModel.toggle');
    setShow(!show);
    logUsage('event', 'ViewCADModel', { event_label: 'ViewCADModel' });
  }

  var od_free = model_symbol_table[sto.OD_Free];
//  console.log('In ViewCADModel OD_Free=',od_free);
  var wire_dia = model_symbol_table[sto.Wire_Dia];
//  console.log('In ViewCADModel Wire_Dia=',wire_dia);
  var coils_t = model_symbol_table[sto.Coils_T];
//  console.log('In ViewCADModel Coils_T=',coils_t);
//        var l_free = model_symbol_table[14];
////        console.log('In ViewCADModel L_Free=',l_free);
//
//        var l_free_value = l_free.value;
//        var l_free_table = [
//            1.250,
//            1.375,
//            1.500,
//            1.625,
//            1.750,
//            1.875,
//            2.000,
//            2.125,
//            2.250,
//            2.375,
//            2.500,
//            2.750,
//            3.000,
//            3.250,
//            3.500,
//            3.750,
//            4.000,
//            4.250,
//            4.500,
//            4.750,
//            5.000,
//        ];
////        console.log('In ViewCADModel l_free_table=',l_free_table);
//        var l_free_fudged = l_free_table[l_free_table.length-1];
////        console.log('In ViewCADModel l_free_fudged=',l_free_fudged);
//        for (let i = 0; i < l_free_table.length; i++) {
////            console.log('i=',i,'l_free_value=',l_free_value,'l_free_table=',l_free_table[i]);
//            if (l_free_value < l_free_table[i]) {
//                var prev_diff = l_free_value-l_free_table[i-1];
//                var next_diff = l_free_table[i]-l_free_value;
////                console.log('i=',i,'prev_diff=',prev_diff,'next_diff=',next_diff);
//                if (prev_diff < next_diff) {
//                    l_free_fudged = l_free_table[i-1];
//                } else {
//                    l_free_fudged = l_free_table[i];
//                }
//                break;
//            }
//        }
////        console.log('In ViewCADModel l_free_fudged=',l_free_fudged);
// Original URL to SAE Extension Spring
//        var prefix = "https://sae-embedded.qa.partcommunity.com/3d-cad-models/?info=sae%2Fmodeling%2Fsprings%2Fas24586a.prj";
//        var varset = "varset={MAT=" + (material_type.value === 2 ? 'MW' : 'CRES') + '},{OD=' + (od_free.value) + '},{DD=' + (wire_dia.value) + '},{L=' + (l_free_fudged) + '}';
//        https://psdev-embedded.qa.partcommunity.com/3d-cad-models/?info=usa_demo%2Fs%2Fspring_analysis_software%2Fspring_220mm_ss.prj
//          &varset=%7bOD=12%7d,%7bWD=3%7d,%7bNOC=24%7d&hidePortlets=navigation
//          varset={OD=12},{WD=3},{NOC=24}&hidePortlets=navigation
  var prefix = "https://psdev-embedded.qa.partcommunity.com/3d-cad-models/?info=usa_demo%2Fs%2Fspring_analysis_software%2Fspring_220mm_ss.prj";
//  console.log('In ViewCADModel prefix=',prefix);

  var varset = 'varset={OD=' + (od_free.value.toFixed(2)) + '},{WD=' + (wire_dia.value.toFixed(3)) + '},{NOC=' + (coils_t.value.toFixed(0)) + '}';
//  console.log('In ViewCADModel varset=',varset);

  var src = prefix + '&' + encodeURI(varset) + '&hidePortlets=navigation';
//  console.log('In ViewCADModel src=',src);

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        CAD Model (Pre-alpha)
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : CAD Model (Pre-alpha)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe title="CADModel" id="pcomiframe" src={src} width="100%" height="750px" sandbox="allow-forms allow-scripts allow-same-origin allow-popups" referrerPolicy="origin-when-cross-origin"></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
