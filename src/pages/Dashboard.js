import React, { useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import { GithubContext } from '../context/context';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';
const Dashboard = () => { 
  const { isLoading } = useContext(GithubContext); 

  if(isLoading) {
    return <main>
        <Navbar /> 
        <Banner /> 
        <Search /> 
        <Spinner className="spinner"/>
      </main>
    }
    
    
    return (
      <main>
      <Navbar /> 
      <Banner /> 
      <Search /> 
      <Info /> 
      <User /> 
      <Repos /> 
    </main>
  );
};

export default Dashboard;
