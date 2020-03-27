import React, { Component } from 'react';
import Header from '../layouts/header/Header';

export class Dashboard extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container mx-auto relative"></div>
        <footer className="w-full absolute bottom-0 text-center p-2">
          Paytm Insider Task by Shreyas
        </footer>
      </>
    );
  }
}

export default Dashboard;
