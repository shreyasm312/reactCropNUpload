import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Fileload from './fileLoad';
export class Dashboard extends Component {
  state = {
    fileLoadData: {}
  };
  render() {
    console.log(this.state);
    return (
      <>
        <Header />
        <Fileload
          fileLoadData={fileLoadData =>
            this.setState({
              fileLoadData
            })
          }
        />
        <footer className="w-full absolute bottom-0 text-center p-2 text-xs text-gray-700">
          Paytm Insider Task by Shreyas
        </footer>
      </>
    );
  }
}

export default Dashboard;
