import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';


const GithubContext = React.createContext(); 

// Provider, Consumer - GithubContext.Provider 

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers ] = useState(mockFollowers);

    // Request loading
    const [request, setRequest] = useState(0)
    const [isLoading, setIsloading] = useState(false); 
    const [error, setError] = useState(false); 

    const searchGithubUser = async (user) => {
        // toggleError 
        toggleError(false);
        setIsloading(true) 
        const response = await axios(`${rootUrl}/users/${user}`)
        .catch((error) => console.log(error))  
        if(response) {
                setGithubUser(response.data);  
                const { login, followers_url } = response.data;  

                await Promise.allSettled([
                    axios(`${rootUrl}/users/${login}/repos?per_page=100`), 
                    axios(`${followers_url}?per_page=100`), 
                ]).then(results => {
                    console.log(results); 
                    const [repos, followers] = results; 
                    const status = 'fulfilled'; 
                    if(repos.status === status) {
                        setRepos(repos.value.data) 
                    } 

                    if(followers.status === status) {
                        setFollowers(followers.value.data) 
                    } 
                }).catch(error => console.log(error)) 

                // // repos 
                // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then((response) => {
                //     setRepos(response.data); 
                // }) 
                // // Followers 
                // axios(`${followers_url}?per_page=100`).then((response) => {
                //     setFollowers(response.data); 
                // }) 

        } else { 
            toggleError(true, "there is no user with that username ")
        }

        checkRequest(); 
        setIsloading(false)
    } 


    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({data}) => {
            let { rate: { remaining } } = data; 
            setRequest(remaining);  
            if(remaining === 0) {
                // throw an error
                toggleError(true, "Sorry, you have exceeded your hourly rate limit");  
            }
        }).catch((error) => console.log(error)) 
    }

    useEffect(() => checkRequest(), [])

    function toggleError(show = false, msg = "") {
        setError({ show, msg}); 
    } 


    return (
        <GithubContext.Provider value={{ githubUser, repos, followers, request, error, searchGithubUser, isLoading}}>
                {children}
        </GithubContext.Provider>
    )
}

export { GithubContext, GithubProvider}