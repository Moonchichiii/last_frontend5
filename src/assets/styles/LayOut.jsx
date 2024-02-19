import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';


import GenericModal from '../../components/Modal';


const Layout = ({ children }) => (
  <>
    <NavBar />
    <GenericModal />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;