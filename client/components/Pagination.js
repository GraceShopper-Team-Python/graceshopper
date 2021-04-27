// import React, { Component } from 'react';
// import Pagination from 'react-js-pagination';

// export default class Page extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePage: '',
//     };
//   }

//   handlePageChange(pageNumber) {
//     console.log(`active page is ${pageNumber}`);
//     this.setState({ activePage: pageNumber });
//   }

//   render() {
//     return (
//       <div>
//         <Pagination
//           activePage={this.state.activePage}
//           itemsCountPerPage={5}
//           totalItemsCount={25}
//           pageRangeDisplayed={50}
//           onChange={this.handlePageChange.bind(this)}
//           hideDisabled={true}
//           itemClass={'pagination'}
//           linkClass={'paginationItem'}
//           hideFirstLastPages={true}
//           // linkClassNext={'next'}
//           // linkClassLast={'prev'}
//         />
//       </div>
//     );
//   }
// }
