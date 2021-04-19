import React, { useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import Spinner from '../components/Spinner';
const Dashboard = () => { 
  const { isLoading } = useContext(GithubContext); 

  if(isLoading) {
    return <main>
      <Navbar /> 
      <Search /> 
      <Spinner className="spinner"/>
    </main>
  }
  

  return (
    <main>
      <Navbar /> 
      <Search /> 
      <Info /> 
      <User /> 
      <Repos /> 
    </main>
  );
};

export default Dashboard;
