// import React from 'react';
// import renderer from "react-test-renderer";

// // import App from './App';
// import Landing from './Landing.js';
// import GameBoard from './GameBoard.js'
// import UserBoards from './UserBoards.js';
// import Login from './Login.js';

// import { ThemeProvider as Theme, defaultTheme} from '@material-ui/core/styles';

// import { BrowserRouter as Router } from 'react-router-dom';
// import { createRender } from '@material-ui/core/test-utils';
// import Adapter from 'enzyme-adapter-react-16';
// import Enzyme from 'enzyme'

// Enzyme.configure({ adapter: new Adapter() })

// export const withMaterial = (Component, props) => {
//   const render = createRender();
//   return render(
//       <Router>
//         <Theme theme={defaultTheme}>
//           <Component {...props} />
//         </Theme>
//       </Router>
//     );
// };

// // test.only('renders App.js correctly', () => {
// //   const MaterialApp = withMaterial(App)
// //   const tree = renderer
// //   .create(<MaterialApp />)
// //   .toJSON();
// //   expect(tree).toMatchSnapshot();
// // });

// test.only('renders Landing.js correctly', () => {
//   const MaterialApp = withMaterial(Landing)
//   const tree = renderer
//   .create(<MaterialApp />)
//   .toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('renders GameBoard.js correctly', () => {
//   const tree = renderer
//   .create(<GameBoard />)
//   .toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test('renders Login.js correctly', () => {
//   const tree = renderer
//   .create(<Login />)
//   .toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test('renders UserBoards.js correctly', () => {
//   const tree = renderer
//   .create(<UserBoards />)
//   .toJSON();
//   expect(tree).toMatchSnapshot();
// });