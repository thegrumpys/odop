import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { logUsage } from '../../logUsage';
import { CONSTRAINED, FIXED } from '../../store/actionTypes';

export default function ViewObjectiveValue() {
//  console.log('ViewObjectiveValue - Mounting...');

  const model_symbol_table = useSelector((state) => state.model.symbol_table);
  const model_objective_value = useSelector((state) => state.model.result.objective_value);
  const [show, setShow] = useState(false);

  const toggle = () => {
//        console.log('ViewObjectiveValue.toggle');
    setShow(!show);
    if (show) logUsage('event', 'ViewObjectiveValue', { event_label: 'ViewObjectiveValue' });
  }

  const renderElementHeader = () => {
    return (
      <tr key="table-head-row">
        <th>#</th>
        <th>name</th>
        <th>viol_sum</th>
        <th>invalid</th>
        <th>infeasible</th>
        <th>%vf_vmin**2</th>
        <th>%vf_vmax**2</th>
        <th>validity_vmin</th>
        <th>validity_vmax</th>
        <th>feasibility_vmin</th>
        <th>feasibility_vmax</th>
        <th>value</th>
        <th>validmin</th>
        <th>validmax</th>
        <th>lmin</th>
        <th>lmax</th>
        <th>cmin</th>
        <th>cmax</th>
        <th>vmin</th>
        <th>vmax</th>
        <th>sdlim</th>
        <th>smin</th>
        <th>smax</th>
      </tr>
    );
  }

  const renderElement = (viol_sum, element, i) => {
    var flags = ['', 'CONSTRAINED', 'FIXED', 'CONSTRAINED|FIXED', 'FDCL', 'CONSTRAINED|FDCL', 'FIXED|FDCL', 'CONSTRAINED|FIXED|FDCL']
    var validity_vmin;
    var validity_vmax;
    var feasibility_vmin;
    var feasibility_vmax;
    var invalid = false;
    var infeasible = false;
    if (element.type === "equationset" && element.input) { // Independent Variable
      if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
        validity_vmin = (-element.value + element.validmin) / element.smin;
        validity_vmax = (element.value - element.validmax) / element.smax;
      } else {
        validity_vmin = 0.0;
        validity_vmax = 0.0;
      }
      if (element.lmin & CONSTRAINED) {
        feasibility_vmin = (-element.value + element.cmin) / element.smin;
      } else {
        feasibility_vmin = 0.0;
      }
      if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
        viol_sum.value = viol_sum.value + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);
        invalid |= true; infeasible |= true;
      } else if (validity_vmin > 0.0) {
        feasibility_vmin = 0.0;
        viol_sum.value = viol_sum.value + validity_vmin * validity_vmin;
        invalid |= true;
      } else if (feasibility_vmin > 0.0) {
        validity_vmin = 0.0;
        viol_sum.value = viol_sum.value + feasibility_vmin * feasibility_vmin;
        infeasible |= true;
      } else {
        feasibility_vmin = 0.0;
        validity_vmin = 0.0;
      }
      if (element.lmax & CONSTRAINED) {
        feasibility_vmax = (element.value - element.cmax) / element.smax;
      } else {
        feasibility_vmax = 0.0;
      }
      if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
        viol_sum.value = viol_sum.value + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
        invalid |= true; infeasible |= true;
      } else if (validity_vmax > 0.0) {
        feasibility_vmax = 0.0;
        viol_sum.value = viol_sum.value + validity_vmax * validity_vmax;
        invalid |= true;
      } else if (feasibility_vmax > 0.0) {
        validity_vmax = 0.0;
        viol_sum.value = viol_sum.value + feasibility_vmax * feasibility_vmax;
        infeasible |= true;
      } else {
        feasibility_vmax = 0.0;
        validity_vmax = 0.0;
      }
//            console.log('ViewObjectiveValue.renderElement IV    element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'viol_sum.value=',viol_sum.value,'invalid=',invalid,'infeasible=',infeasible);
    } else if (element.type === "equationset" && !element.input) { // Dependent Variable
      /* State variable fix levels. */
      /*
       * The fix_wt's are automatically incorporated in the scaling denominators
       * S(I+N) by the main routine.
       *
       * This version reduces penalty of large fix violations.
       */
      if (element.format === undefined && typeof element.value === 'number') { // Only number, skip string and table
        validity_vmin = (-element.value + element.validmin) / element.smin;
        validity_vmax = (element.value - element.validmax) / element.smax;
      } else {
        validity_vmin = 0.0;
        validity_vmax = 0.0;
      }
      if (element.lmin & FIXED) {
        feasibility_vmin = (-element.value + element.cmin) / element.smin;
        if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
          var vmin_sum = feasibility_vmin + validity_vmin;
          if (vmin_sum > 1.0) {
            viol_sum.value = viol_sum.value + vmin_sum;
          } else {
            viol_sum.value = viol_sum.value + vmin_sum * vmin_sum;
          }
          invalid |= true; infeasible |= true;
        } else if (validity_vmin > 0.0) {
          feasibility_vmin = 0.0;
          viol_sum.value = viol_sum.value + validity_vmin * validity_vmin;
          invalid |= true;
        } else if (feasibility_vmin > 0.0) {
          validity_vmin = 0.0;
          if (feasibility_vmin > 1.0) {
            viol_sum.value = viol_sum.value + feasibility_vmin;
          } else if (feasibility_vmin < -1.0) {
            viol_sum.value = viol_sum.value - feasibility_vmin;
          } else {
            viol_sum.value = viol_sum.value + feasibility_vmin * feasibility_vmin;
          }
          infeasible |= true;
        } else {
          feasibility_vmin = 0.0;
          validity_vmin = 0.0;
        }
        feasibility_vmax = -feasibility_vmin;
        if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
          var vmax_sum = feasibility_vmax + validity_vmax;
          if (vmax_sum > 1.0) {
            viol_sum.value = viol_sum.value + vmax_sum;
          } else {
            viol_sum.value = viol_sum.value + vmax_sum * vmax_sum;
          }
          invalid |= true; infeasible |= true;
        } else if (validity_vmax > 0.0) {
          feasibility_vmax = 0.0;
          viol_sum.value = viol_sum.value + validity_vmax * validity_vmax;
          invalid |= true;
        } else if (feasibility_vmax > 0.0) {
          validity_vmax = 0.0;
          if (feasibility_vmax > 1.0) {
            viol_sum.value = viol_sum.value + feasibility_vmax;
          } else if (feasibility_vmax < -1.0) {
            viol_sum.value = viol_sum.value - feasibility_vmax;
          } else {
            viol_sum.value = viol_sum.value + feasibility_vmax * feasibility_vmax;
          }
          infeasible |= true;
        } else {
          feasibility_vmax = 0.0;
          validity_vmax = 0.0;
        }
      } else {
        if (element.lmin & CONSTRAINED) {
          feasibility_vmin = (-element.value + element.cmin) / element.smin;
        } else {
          feasibility_vmin = 0.0;
        }
        if (validity_vmin > 0.0 && feasibility_vmin > 0.0) {
          viol_sum.value = viol_sum.value + (feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin);;
          invalid |= true; infeasible |= true;
        } else if (validity_vmin > 0.0) {
          feasibility_vmin = 0.0;
          viol_sum.value = viol_sum.value + validity_vmin * validity_vmin;
          invalid |= true;
        } else if (feasibility_vmin > 0.0) {
          validity_vmin = 0.0;
          viol_sum.value = viol_sum.value + feasibility_vmin * feasibility_vmin;
          infeasible |= true;
        } else {
          feasibility_vmin = 0.0;
          validity_vmin = 0.0;
        }
        if (element.lmax & CONSTRAINED) {
          feasibility_vmax = (element.value - element.cmax) / element.smax;
        } else {
          feasibility_vmax = 0.0;
        }
        if (validity_vmax > 0.0 && feasibility_vmax > 0.0) {
          viol_sum.value = viol_sum.value + (feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax);
          invalid |= true; infeasible |= true;
        } else if (validity_vmax > 0.0) {
          feasibility_vmax = 0.0;
          viol_sum.value = viol_sum.value + validity_vmax * validity_vmax;
          invalid |= true;
        } else if (feasibility_vmax > 0.0) {
          validity_vmax = 0.0;
          viol_sum.value = viol_sum.value + feasibility_vmax * feasibility_vmax;
          infeasible |= true;
        } else {
          feasibility_vmax = 0.0;
          validity_vmax = 0.0;
        }
      }
//            console.log('ViewObjectiveValue.renderElement DV/CI element=',element,'validity_vmin=',validity_vmin,'validity_vmax=',validity_vmax,'feasibility_vmin=',feasibility_vmin,'feasibility_vmax=',feasibility_vmax,'viol_sum.value=',viol_sum.value,'invalid=',invalid,'infeasible=',infeasible);
    } else { // Calculation Input
      validity_vmin = 0.0;
      validity_vmax = 0.0;
      feasibility_vmin = 0.0;
      feasibility_vmax = 0.0;
      invalid = false;
      infeasible = false;
    }
    return (
      <tr key={element.name}>
        <td>{i}</td>
        <td>{element.name}</td>
        <td>{viol_sum.value}</td>
        <td>{invalid ? 'true' : ''}</td>
        <td>{infeasible ? 'true' : ''}</td>
        <td>{(model_objective_value === 0.0 || (feasibility_vmin <= 0.0 && validity_vmin <= 0.0)) ? '' : String((feasibility_vmin + validity_vmin) * (feasibility_vmin + validity_vmin) * 100 / model_objective_value)}</td>
        <td>{(model_objective_value === 0.0 || (feasibility_vmax <= 0.0 && validity_vmax <= 0.0)) ? '' : String((feasibility_vmax + validity_vmax) * (feasibility_vmax + validity_vmax) * 100 / model_objective_value)}</td>
        <td>{validity_vmin <= 0.0 ? '' : String(validity_vmin)}</td>
        <td>{validity_vmax <= 0.0 ? '' : String(validity_vmax)}</td>
        <td>{feasibility_vmin <= 0.0 ? '' : String(feasibility_vmin)}</td>
        <td>{feasibility_vmax <= 0.0 ? '' : String(feasibility_vmax)}</td>
        <td>{String(element.value)}</td>
        <td>{String(element.validmin)}</td>
        <td>{String(element.validmax)}</td>
        <td>{String(element.lmin) + '=' + flags[element.lmin]}</td>
        <td>{String(element.lmax) + '=' + flags[element.lmax]}</td>
        <td>{String(element.cmin)}</td>
        <td>{String(element.cmax)}</td>
        <td>{String(element.vmin)}</td>
        <td>{String(element.vmax)}</td>
        <td>{element.sdlim}</td>
        <td>{String(element.smin)}</td>
        <td>{String(element.smax)}</td>
      </tr>
    );
  }

  var viol_sum = { value: 0.0 };
  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        ObjectiveValue
      </NavDropdown.Item>
      {show && <Modal show={show} onHide={toggle} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon" /> &nbsp; View : ObjectiveValue = {model_objective_value}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre className="view-table-fixed-2-columns">
            <table className="report-table-borders">
              <thead>
                {renderElementHeader()}
              </thead>
              <tbody>
                {model_symbol_table.map((element, i) => renderElement(viol_sum, element, i))}
              </tbody>
            </table>
          </pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toggle}>Close</Button>
        </Modal.Footer>
      </Modal>}
    </>
  );
}
