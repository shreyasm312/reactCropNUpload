import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Upload from './upload';
export class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <Upload />
        <footer className="w-full absolute bottom-0 text-center p-2 text-xs text-gray-700">
          Paytm Insider Task by Shreyas
        </footer>
      </>
    );
  }
}

export default Dashboard;
