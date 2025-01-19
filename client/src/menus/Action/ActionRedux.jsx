import { NavDropdown } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { loadInitialState, changeName } from '../../store/actions';

export default function ActionRedux() {
//  console.log('ActionRedux - Mounting...');
  const model_user = useSelector((state) => state.user);
  const model_name = useSelector((state) => state.name);

  const toggle = () => {
//      console.log('ActionRedux starting');
      fetch('/api/v1/redux', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + model_user,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loadInitialState('Spring/Compression'))
      })
      .then(res => {
        if (!res.ok) {
          console.error('ActionRedux not OK res.statusText=',res.statusText);
          throw Error(res.statusText);
        }
//        console.log('ActionRedux OK res.json=',res.json);

//        console.log('ActionRedux starting');
        fetch('/api/v1/redux', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + model_user,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(changeName(model_name))
        })
        .then(res => {
          if (!res.ok) {
            console.error('ActionRedux not OK res.statusText=',res.statusText);
            throw Error(res.statusText);
          }
//          console.log('ActionRedux OK res.json=',res.json);
          return res.json()
        })
        .catch(error => {
          console.log('ActionRedux failed with message: \'' + error.message + '\'');
        })
        .finally(() => {
//          console.log('ActionRedux ended');
        });

        return res.json()
      })
      .catch(error => {
        console.log('ActionRedux failed with message: \'' + error.message + '\'');
      })
      .finally(() => {
//        console.log('ActionRedux ended');
      });
  }

  return (
    <>
      <NavDropdown.Item onClick={toggle}>
        Redux
      </NavDropdown.Item>
    </>
  );
}
